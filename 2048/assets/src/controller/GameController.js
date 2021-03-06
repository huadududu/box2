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
let SpriteFrameCenter = require("SpriteFrameCenter");
let btnPng = [["common_zhuanhuan1", "common_shuaxin", "common_zhalie"],
    ["common_zhuanhuan2", "common_shuaxin2", "common_zhalie2"]];
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

            btnExchange: cc.Sprite,
            btnRefresh: cc.Sprite,
            btnBomb: cc.Sprite,
            blockpanelUI: cc.Node,
            bottomUI: cc.Node,
            isShowNum2: {
                visible: false,
                default: false,
            },
            touchAudio: {
                default: null,
                url: cc.AudioClip
            },
        },

        // LIFE-CYCLE CALLBACKS:

        onLoad() {
            this.endMenu.active = false;
            this.continueMenu.active = false;

            let topY = this.blockpanelUI.y;
            let bottomY = -cc.winSize.height / 2;
            let bottomUIY = topY + (bottomY - topY) / 3;
            console.log("bottomUIY", bottomUIY);
            this.bottomUI.y = bottomUIY;
            let FBP = require("Plugin");
            // this.scheduleOnce(this.showHeler,3);
            let InviteCenter = require("InviteCenter");
            if (!InviteCenter.haveload && GameConfig.isFBInstantGame()) {
                this.scheduleOnce(this.showHeler, 3);
                FBP.entryGameAsync(this.userEntry.bind(this));
                InviteCenter.haveload = true;
            }else{
                let info = {"type":0,'time':1531917312123,'gifttype':1,'count':1,'from':'wangfuhui'};
                this.userEntry(info);
            }
            // Global.FirstLogin = 0;
        },
        start() {//
            if (Global.thisState == GameState.start) {
                this.BlocksController.startMenu();
                this.refreshBottom();
            } else if (Global.thisState == GameState.end) {
                this.BlocksController.restartMenu();
                this.refreshBottom();
            } else {//中断继续玩会走这
                // if (Global.thisState == GameState.isRuning || Global.thisState == GameState.pasue) {
                this.continueMenu.active = true;
                Global.thisState = GameState.pasue;
                // }
                Global.saveThisState();
                this.continueMenu.getComponent("continueView").createBottom();
                this.refreshBottom();
            }
        }
        ,
        playTouchSound: function () {
            // 调用声音引擎播放声音
            cc.audioEngine.playEffect(this.touchAudio, false);
        },
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
        updateNexts: function (number1, number2) {

            this.updateNext(number1);
            this.updateNext2(number2);
            this.nextBlockNumber.node.position = cc.p(571, 929);
            if (this.isShowNum2) {
                this.nextBlockNumber2.node.active = false;
            }

            let act1 = cc.moveTo(0.2, cc.p(571, 869));
            let act2 = cc.callFunc(function () {
                if (this.isShowNum2) {
                    this.nextBlockNumber2.node.active = true;
                }
            }, this);
            this.nextBlockNumber.node.runAction(cc.sequence(act1, act2));

        },
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
        refreshBottom: function (type = -1) {

            if (type == -1 || type == 0) {
                let bool = this.canExchange();
                if (bool) {
                    this.btnExchange.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", btnPng[1][0] + ".png");
                } else {
                    this.btnExchange.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", btnPng[0][0] + ".png");
                }
            }
            if (type == -1 || type == 1) {
                let bool = this.canRefresh();
                if (bool) {
                    this.btnRefresh.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", btnPng[1][1] + ".png");
                } else {
                    this.btnRefresh.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", btnPng[0][1] + ".png");
                }
            }
            if (type == -1 || type == 2) {
                let bool = this.canBomb();
                if (bool) {
                    this.btnBomb.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", btnPng[1][2] + ".png");
                } else {
                    this.btnBomb.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", btnPng[0][2] + ".png");
                }
            }
            // this.btnExchange.interactable = this.canExchange();
            // this.btnRefresh.interactable = this.canRefresh();
            // this.btnBomb.interactable = this.canBomb();

        }
        ,
        canBomb: function () {

            if (Global.haveTools[2] <= 0)
                return false;
            if (Global.useTools[2])
                return false;
            return true;
        }
        ,
        canExchange: function () {

            if (Global.haveTools[0] <= 0)
                return false;
            if (Global.useTools[0])
                return false;
            return true;
        }
        ,
        canRefresh: function () {

            if (Global.haveTools[1] <= 0)
                return false;
            if (Global.useTools[1])
                return false;
            return true;
        }
        ,
        onTouchExchange: function () {

            this.playTouchSound();
            if (Global.thisState != GameState.isRuning) {
                if (Global.thisState == GameState.useExchange) {
                    this.BlocksController.stopExchange();
                    Global.thisState = GameState.isRuning;
                    Global.saveThisState();
                    return;
                }
            }
            if (!this.canExchange()) {
                this.onAddGift(0);
                return;
            }
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
            this.playTouchSound();
            if (Global.thisState != GameState.isRuning) {
                if (Global.thisState == GameState.useBomb) {
                    Global.thisState = GameState.isRuning;
                    Global.saveThisState();
                    return;
                }
            }
            if (this.canBomb()) {
                Global.thisState = GameState.useBomb;
                Global.saveThisState();
            } else {
                if (Global.haveTools[2] <= 0) {
                    this.onAddGift(2);
                    return;
                }
                if (Global.useTools[2]) {
                    ssss
                    return false;
                }

            }

        }
        ,
        stopBomb: function () {
            Global.thisState = GameState.isRuning;
            Global.saveThisState();
            this.btnBomb.interactable = this.canBomb();
        }
        ,
        onTouchRefresh() {
            this.playTouchSound();
            if (!this.canRefresh()) {
                this.onAddGift(1);
                return;
            }
            Global.thisState = GameState.useRefresh;
            Global.saveThisState();
            this.onUseRefreshTool();

        }
        ,
        //create block;
        onTouchStartBtn: function () {
            // this.startMenu.active = false;
            this.playTouchSound();
            this.BlocksController.startMenu();

        }
        ,
        onTouchRestartBtn: function () {
            // this.continueMenu.active = false;
            this.playTouchSound();
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

        },
        onTouchHomeBtn: function () {
            this.playTouchSound();
            if (cc.find("Canvas").getChildByTag(110)) {
                cc.find("Canvas").getChildByTag(110).removeFromParent(true);
            }
            Global.thisState = GameState.start;
            Global.saveThisState();
            Global.newHistory(Global.thisscore);
            if (Global.thisCoin > 0) {
                Global.Coins += Global.thisCoin;
                Global.syncPlayerInfoToFB();
            }
            cc.director.loadScene("gamemenu");
        },
        onTouchPause: function () {
            this.playTouchSound();
            this.continueMenu.active = true;

            this.continueMenu.getComponent("continueView").createBottom();
            Global.thisState = GameState.pasue;
            Global.saveThisState();
            // cc.director.pause();
        }
        ,

        onTouchResume: function () {
            this.playTouchSound();
            this.continueMenu.active = false;
            if (Global.ifLogin == 0) {
                this.BlocksController.initBeforePage();
                Global.ifLogin++;
            }

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
        onAddGift: function (type) {
            if (Global.GiftSendTimes[type] >= GameConfig.GiftLimited) {
                let PopMsgController = require("PopMsgController");
                PopMsgController.showMsg(GameConfig.GiftBeyondTip);
                return;
            }
            Global.thisState = GameState.shareTool;
            let PopDialogController = require("PopDialogController");
            PopDialogController.showSendGift(type);
        },
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
        showHeler: function () {
            let InviteCenter = require("InviteCenter");
            if (InviteCenter.HelperNames.length > 0) {
                let helpers = InviteCenter.HelperNames.join(",");

                let GameConfig = require("GameConfig");
                let PopMsgController = require("PopMsgController");
                PopMsgController.showMsg(GameConfig.YourHelperNameTip.replace("XXX", helpers));
            }
        },

        userEntry: function (entryPointData) {

            // let GiftType = require("GiftType");
            let entrytype = entryPointData['type'];
            let PopMsgController = require("PopMsgController");
            let InviteCenter = require("InviteCenter");
            let GameStorage = require("GameStorage");
            let LocalStorage = require("LocalStorage");
            let GiftType = require("GiftType");
            let FBP = require("Plugin");

            if (entrytype == 0) {
                if (Global.LoginIndex == 0) {
                    let gifttype = entryPointData['gifttype'];
                    let time = entryPointData['time'];
                    let count = entryPointData['count'];
                    let from = entryPointData['from'];
                    // let helperId = FBP.getID();
                    if (gifttype == GiftType.exchange || gifttype == GiftType.bomb || gifttype == GiftType.refresh) {
                        let today = Date.now();
                        if (Math.abs(today - time) < 1000 * 3600) {
                            LocalStorage.get(time.toString(), 0, function (num) {
                                if (num == 0) {
                                    let PopDialogController = require("PopDialogController");
                                    PopDialogController.showRecieveGift(from, gifttype);
                                    LocalStorage.set(time.toString(), 1)
                                }
                            }.bind(this));
                        }
                    }
                    Global.LoginIndex++;
                }

            } else if (entrytype == 1) {

                if (!entryPointData) {
                    PopMsgController.showMsg("entryPointData is null");
                } else {
                    let fromId = entryPointData['fromid'];
                    let fromName = entryPointData['name'];
                    let helperId = FBP.getID();
                    let helperName = FBP.getName();

                    if (fromId == helperId) {
                        return;
                    }
                    let now = new Date();
                    let nowkey = now.getUTCFullYear().toString() + '-' + now.getUTCMonth().toString() + "-" + now.getUTCDate();
                    let v = GameStorage.get(fromId + nowkey, "0");
                    //每天帮助只有一次。
                    if (v == "0") {
                        //show tips。 send to server.
                        PopMsgController.showMsg(GameConfig.HelperEnterTip.replace("XXX", fromName));
                        // PopMsgController.showMsg("type :"+entrytype.toString(),false);
                        InviteCenter.HelperVirify(fromId, helperId, helperName);
                        GameStorage.set(fromId + nowkey, "1");
                    }

                }

            }

        },

// update (dt) {},
    }
)
;
