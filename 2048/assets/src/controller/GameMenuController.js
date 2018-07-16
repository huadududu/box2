/*
 * Created by Ren on 2018/7/2.
 */
let Global = require("Global");
let GameConfig = require("GameConfig");
let GameState = require("GameState");
cc.Class({
    extends: cc.Component,
    properties: {

        //beginpage:
        beginpage: cc.Node,
        beginScore: cc.Label,
        goldlab: cc.Label,


        endPage: cc.Node,
        endBestScore: cc.Label,
        endAddCion: cc.Label,
        thisScore: cc.Label,
        thisKing: cc.Sprite,
        bottom: require("BottomController"),
    },

    onTouchStart: function () {
        cc.director.loadScene("game");
    },
    onLoad: function () {
        // this.scheduleOnce(this.showHeler,3);


    },
    start: function () {
        if (Global.thisState == GameState.start) {
            this.beginpage.active = true;
            this.endPage.active = false;
            this.initStartPage();
        } else {
            this.beginpage.active = false;
            this.endPage.active = true;
            this.initEndPage();
        }
        // this.createBottom();
    },
    initStartPage: function () {
        this.beginScore.string = Global.highScore;
        this.goldlab.string = Global.Coins;

    },
    initEndPage: function () {

        Global.newHistory(Global.thisscore);
        this.endBestScore.string = "BEST:" + Global.highScore;
        this.endAddCion.string = Global.thisCoin;
        this.thisScore.string = Global.thisscore;
        this.thisKing.node.active = Global.highScore <= Global.thisscore;
        // let allCoin = Global.thisCoin+Global.Coins;
        //
        Global.Coins += Global.thisCoin;
        this.goldlab.string = Global.Coins;
        if (GameConfig.isFBInstantGame()) {
            let FBP = require("Plugin");
            FBP.setScoreAsync(GameConfig.LeaderBoardName, Global.highScore, null);
        }
        Global.thisState = GameState.start;
        Global.saveThisState();
        Global.saveCoins();
        Global.thisCoin = 0;
        Global.saveThisCoin();
        Global.thisscore = 0;
        Global.saveThisScore();
    },
    showHeler: function () {
        let InviteCenter = require("InviteCenter");
        if (InviteCenter.HelperNames.length > 0) {
            let helpers = InviteCenter.HelperNames.join(",");

            let GameConfig = require("GameConfig");
            let PopMsgController = require("PopMsgController");
            PopMsgController.showMsg(GameConfig.YourHelperNameTip.replace("XXX", helpers));
        }
    },
    // createBottom: function () {
    //     let prefab = cc.loader.getRes("prefab/bottom");
    //     let  newNode = cc.instantiate(prefab);
    //     newNode.setTag(112);
    //     cc.find("Canvas").addChild(newNode);
    // },


});