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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        BlocksController: require("BlocksControllers"),
        GameMenuController: require("GameMenuController"),
        startMenu: cc.Node,
        endMenu: cc.Node,
        continueMenu: cc.Node,
        loadingad: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.endMenu.active = false;
        this.startMenu.active = true;
    },


    start() {
        // this.createBlocks();
        // this.schedule(this.refreshBlocks, 0.5);
    },
    updeteFinish: function () {
        this.endMenu.active = true;
        Global.newHistory(Global.thisscore);
        Global.Coins +=Global.thisCoin;
        Global.syncPlayerInfoToFB();
        Global.thisscore = 0;
    },
    //create block;
    onTouchStartBtn: function () {
        this.startMenu.active = false;
        this.BlocksController.startMenu();

    },
    onTouchRestartBtn: function () {
        this.endMenu.active = false;
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
            this.BlocksController.restartMenu();
        }

    },

    onTouchShareBtn: function () {
        // onShare:function (event, intent) {
        if (GameConfig.isFBInstantGame()) {
            let FBP = require("Plugin");
            FBP.shareFb('SHARE');
        }
        // },
        // let FBP = require("Plugin");
        // FBP.chooseAsync();

    },
    onTouchPause: function () {
        // this.continueMenu.active = true;
        cc.director.pause();
    },

    onTouchResume: function () {
        this.continueMenu.active = false;
        cc.director.resume();
    },
    restartCallBack: function () {
        this.loadingad.active = false;
        this.BlocksController.restartMenu();
    },


    touchCancelCallBack: function (location) {
        if (this.GameMenuController.BoomState) {

        } else if (this.GameMenuController.ExchangeState) {

        } else {
            this.BlocksController.touchCancelCallBack(location);
        }
    },
    touchStartCallBack: function (location) {
        if (this.GameMenuController.BoomState) {

        } else if (this.GameMenuController.ExchangeState) {

        } else {
            this.BlocksController.touchStartCallBack(location);
        }
    },
    touchEndCallBack: function (location) {
        if (this.GameMenuController.BoomState) {
            this.BlocksController.onUseBoomTool(location);
        } else if (this.GameMenuController.ExchangeState) {

        } else {
            this.BlocksController.touchEndCallBack(location);
        }
    },
    touchMoveCallBack: function (location) {
        if (this.GameMenuController.BoomState) {
            return;

        } else if (this.GameMenuController.ExchangeState) {

        } else {
            this.BlocksController.touchMoveCallBack(location);
        }
        // this.previousPos = location;
    },

// update (dt) {},
})
;
