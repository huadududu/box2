// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
let BlockFactory = require("BlockFactory");
let Global = require("Global");
let GameState = require("GameState");
let BingLog = require("BingLog");
let GameUtils = require("GameUtils");
let GameConfig = require("GameConfig");
cc.Class({
        extends: cc.Component,

        properties: {
            BlocksController: require("BlocksController"),
            endMenu: cc.Node,
            continueMenu: cc.Node,
            loadingad: cc.Node,
            scoreLabel: cc.Label,
            CoinLabel: cc.Label,
            nextBlockNumber: require("Block"),
            nextBlockNumber2: require("Block"),

            btnExchange: cc.Button,
            btnRefresh: cc.Button,
            btnBomb: cc.Button,

        },

        // LIFE-CYCLE CALLBACKS:

        onLoad() {
            this.endMenu.active = false;
            this.continueMenu.active = false;
            this.isUseChangeTool = false;
            this.isUseBombTool = false;
            this.isUseRefreshTool = false;
        },


        start() {//
            if (Global.thisState == GameState.start) {
                this.BlocksController.startMenu();
            }else if(Global.thisState == GameState.end){
                this.BlocksController.restartMenu();
            } else {//中断继续玩会走这
                if (Global.thisState == GameState.isRuning || Global.thisState == GameState.pasue) {
                    this.continueMenu.active = true;
                    Global.thisState = GameState.pasue;
                }
                Global.saveThisState();
                this.continueMenu.getComponent("continueView").createBottom();
                this.BlocksController.initBeforePage();
                this.refreshBottom();
            }
        }
        ,
        moreLife: function () {
            this.BlocksController.moreLife();
        }
        ,
        updateFinish: function () {
            Global.thisState = GameState.end;
            Global.saveThisState();
            this.endMenu.active = true;
            Global.newHistory(Global.thisscore);
            // Global.thisscore = 0;
            // Global.saveThisScore();
            // Global.Coins += Global.thisCoin;
            // Global.thisCoin = 0;
            Global.saveThisCoin();
            Global.syncPlayerInfoToFB();
        }
        ,
        updateScore: function () {
            this.scoreLabel.string = Global.thisscore;
        }
        ,
        updateNext: function (num) {
            this.nextBlockNumber.setBlockNumber(num);
        }
        ,
        updateNext2: function (num) {
            this.nextBlockNumber2.setBlockNumber(num);
        }
        ,
        updateCoin: function () {
            this.CoinLabel.string = Global.thisCoin;
        }
        ,
        showJoinMsg: function (num) {

            let find = false;
            let shownum = 0;
            if (num < 5 && num > 1) {
                find = true;
                shownum = num - 2;

            } else if (num >= 5) {
                find = true;
                shownum = 3;
            }
            if (find) {
                let PopMsgController = require("PopMsgController");
                PopMsgController.showBlockGet(shownum);
            }
        }
        ,
        refreshBottom: function () {
            this.btnExchange.interactable = this.canExchange();
            this.btnRefresh.interactable = this.canRefresh();
            this.btnBomb.interactable = this.canBomb();

        }
        ,
        canBomb: function () {
            if (this.isUseBombTool)
                return false;
            return true;
        }
        ,
        canExchange: function () {
            if (this.isUseChangeTool)
                return false;
            return true;
        }
        ,
        canRefresh: function () {
            if (this.isUseRefreshTool)
                return false;
            return true;
        }
        ,
        onTouchExchange: function () {

            if (Global.thisState != GameState.isRuning) {
                if (Global.thisState == GameState.useExchange) {
                    this.BlocksController.stopExchange();
                    Global.thisState = GameState.isRuning;
                    Global.saveThisState();
                    return;
                }
            }
            if (!this.canExchange())
                return;
            Global.thisState = GameState.useExchange;
            Global.saveThisState();
            this.BlocksController.updateExchange(true);
        }
        ,
        onStopExchange: function () {
            Global.thisState = GameState.isRuning;
            Global.saveThisState();
            // this.ExchangeState = false;
            // cc.director.resume();
            this.btnExchange.interactable = this.canExchange();
        }
        ,
        onTouchBomb: function () {
            if (Global.thisState != GameState.isRuning) {
                if (Global.thisState == GameState.useBomb) {
                    Global.thisState = GameState.isRuning;
                    Global.saveThisState();
                    return;
                }
            }
            if (!this.canBomb())
                return;
            Global.thisState = GameState.useBomb;
            Global.saveThisState();
        }
        ,
        stopBomb: function () {
            Global.thisState = GameState.isRuning;
            Global.saveThisState();
            this.btnBomb.interactable = this.canBomb();
        }
        ,
        onTouchRefresh() {
            if (!this.canRefresh())
                return;
            Global.thisState = GameState.useRefresh;
            Global.saveThisState();
            // this.isUseRefreshTool = true;
            this.onUseRefreshTool();

        }
        ,
        //create block;
        onTouchStartBtn: function () {
            // this.startMenu.active = false;
            this.BlocksController.startMenu();

        }
        ,
        onTouchRestartBtn: function () {
            // this.continueMenu.active = false;
            if (GameConfig.isFBInstantGame()) {
                let num = GameUtils.randomInt(0, 100);
                if (num < 30) {
                    let FBP = require("Plugin");
                    this.loadingad.active = true;
                    FBP.RewardedVideoAsync(this.restartCallBack.bind(this));
                } else if (num < 80) {
                    let FBP = require("Plugin");
                    this.loadingad.active = true;
                    FBP.InterstitialAdAsync(this.restartCallBack.bind(this));
                } else {
                    let FBP = require("Plugin");
                    this.loadingad.active = true;
                    FBP.chooseAsync(this.restartCallBack.bind(this));//[add]
                    // FBP.InterstitialAdAsync(this.restartCallBack.bind(this));
                    // this.BlocksController.restartMenu();
                }
            } else {
                this.restartCallBack();
            }

        }
        ,
        onTouchPause: function () {
            this.continueMenu.active = true;

            this.continueMenu.getComponent("continueView").createBottom();
            Global.thisState = GameState.pasue;
            Global.saveThisState();
            // cc.director.pause();
        }
        ,

        onTouchResume: function () {
            this.continueMenu.active = false;
            if (cc.find("Canvas").getChildByTag(110)) {
                cc.find("Canvas").getChildByTag(110).removeFromParent(true);
            }
            Global.thisState = GameState.isRuning;
            Global.saveThisState();
            // cc.director.resume();
        }
        ,
        restartCallBack: function () {
            this.loadingad.active = false;
            this.BlocksController.restartMenu();
            this.continueMenu.active = false;
            cc.find("Canvas").getChildByTag(110).removeFromParent(true);
            Global.thisState = GameState.isRuning;
            Global.saveThisState();
        }
        ,
        onUseRefreshTool: function () {
            let action1 = cc.scaleTo(0.2, 0.1, 0.1);
            let action2 = cc.scaleTo(0.2, 0.5, 0.5);
            Global.thisState = GameState.useRefresh;
            Global.saveThisState();
            this.nextBlockNumber.node.runAction(cc.sequence(action1, action2));
            let action3 = cc.scaleTo(0.2, 0.1, 0.1);
            let action4 = cc.scaleTo(0.2, 0.5, 0.5);
            this.nextBlockNumber2.node.runAction(cc.sequence(action3, action4));

            this.scheduleOnce(this.changeNextNum.bind(this), 0.2);
            this.scheduleOnce(this.finishRefresh.bind(this), 0.4);

        }
        ,
        changeNextNum: function () {
            this.BlocksController.changeNextNum();
        }
        ,
        finishRefresh: function () {
            Global.thisState = GameState.isRuning;
            Global.saveThisState();
            this.btnRefresh.interactable = this.canRefresh();
        }
        ,
        touchCancelCallBack: function (location) {

            if (Global.thisState == GameState.isRuning) {
                this.BlocksController.touchCancelCallBack(location);
            }

        }
        ,
        touchStartCallBack: function (location) {
            if (Global.thisState == GameState.isRuning) {
                this.BlocksController.touchStartCallBack(location);
            }
        }
        ,
        touchEndCallBack: function (location) {
            if (Global.thisState == GameState.useBomb) {
                this.BlocksController.onUseBombTool(location);
            } else if (Global.thisState == GameState.useExchange) {
                this.BlocksController.onUseChangeTool(location);
            } else {
                this.BlocksController.touchEndCallBack(location);
            }
        }
        ,
        touchMoveCallBack: function (location) {

            if (Global.thisState == GameState.isRuning) {
                this.BlocksController.touchMoveCallBack(location);
            }
        }
        ,

// update (dt) {},
    }
)
;
