/*
 * Created by Ren on 2018/7/12.
 */
let Global = require("Global");
let GameState = require("GameState");
let GameConfig = require("GameConfig");
cc.Class({
    extends: cc.Component,
    properties: {
        showVideoBtn: cc.Button,
        showMoreLifePro: cc.ProgressBar,
        showRestart: cc.Button,
        bestScore: cc.Label,
        thisScore: cc.Label,
        thisAddCion: cc.Label,


    },
    onLoad: function () {
        this.bottomisDone = false;
        this.newNode = null;
        this.maxCount = 10;
        this.curCount = 10;
        this.showVideoBtn.node.active = false;
        this.showMoreLifePro.node.active = false;
        this.showRestart.node.active = false;
        this.gameController = cc.find("Canvas").getComponent("GameController");
        this.nohit = true;

    },
    onEnable: function () {
        if (!this.bottomisDone) {
            this.createBottom();
            this.bottomisDone = true;
        }
        let highScore = Global.highScore;
        let score = Global.thisscore;
        this.showMoreLifePro.progress = 1;
        this.curCount = 5;
        let bool = Global.showAdTimes >0;
        if (bool) {
            this.schedule(this.eventClock, 1);
        }
        this.showVideoBtn.node.active = bool;
        this.showMoreLifePro.node.active = bool;
        this.showRestart.node.active = !bool;
        this.bestScore.string = "BEST:" + Global.highScore;
        this.thisScore.string = Global.thisscore;
        this.thisAddCion.string = Global.thisCoin;
        if (GameConfig.isFBInstantGame()) {
            let FBP = require("Plugin");
            FBP.setScoreAsync(GameConfig.LeaderBoardName, Global.highScore, null);
        }
    },
    createBottom: function () {
        let prefab = cc.loader.getRes("prefab/bottom");
        let newNode = cc.instantiate(prefab);
        newNode.setTag(111);
        cc.find("Canvas").addChild(newNode);
    },
    eventClock: function () {

        if (this.curCount <= 0) {
            this.unschedule(this.eventClock);
            this.showVideoBtn.node.active = false;
            this.showMoreLifePro.node.active = false;
            this.showRestart.node.active = true;
        }
    },
    onClockAdBtn:function () {

        this.nohit = false;
        this.unschedule(this.eventClock);
        // this.clockNode.active  = false;
        this.gameController.loadingad.active  = true;
        if(GameConfig.isFBInstantGame()){
            let FBP = require("FBPlugin");
            FBP.RewardedVideoAsync(this.adGame.bind(this));
        }else{
            this.adGame();
        }
        // this.scheduleOnce(this.showAdCloseBtn,10);
    },

    adGame:function () {
        // this.unschedule(this.showAdCloseBtn);
        Global.showAdTimes --;
        this.gameController.moreLife();
        this.gameController.loadingad.active  = false;
        this.node.active = false;

    },
    OnTouchRestart: function () {
        Global.thisState = GameState.end;
        if (cc.find("Canvas").getChildByTag(111)) {
            cc.find("Canvas").getChildByTag(111).removeFromParent(true);
        }
        cc.director.loadScene("gamemenu");
    },
    update: function (dt) {
        if (this.curCount > 0  && this.nohit) {
            this.curCount -= dt;
            this.showMoreLifePro.progress = this.curCount / this.maxCount;
        }
    }

});