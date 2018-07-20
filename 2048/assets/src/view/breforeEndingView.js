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
        loadingAdNode: cc.Node,
        loadingAdCloseNode: cc.Node,
        touchAudio: {
            default: null,
            url: cc.AudioClip
        },
        timeAudio: {
            default: null,
            url: cc.AudioClip
        },

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
    playTouchSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.touchAudio, false);
    },
    playTimeSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.timeAudio, false);
    },
    onEnable: function () {
        if (!this.bottomisDone) {
            this.createBottom();
            this.bottomisDone = true;
        }
        let highScore = Global.highScore;
        let score = Global.thisscore;
        this.showMoreLifePro.progress = 1;
        this.curCount = 10;
        let bool = Global.showAdTimes > 0;
        if (bool) {
            this.schedule(this.eventClock, 1);
        }
        this.showVideoBtn.node.active = bool;
        this.showMoreLifePro.node.active = bool;
        this.showRestart.node.active = !bool;
        this.bestScore.string = "BEST:" + Global.highScore;
        this.thisScore.string = Global.thisscore;
        this.thisAddCion.string ="+"+ Global.thisCoin;
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

        this.playTimeSound();
        if (this.curCount <= 0) {
            this.unschedule(this.eventClock);
            this.showVideoBtn.node.active = false;
            this.showMoreLifePro.node.active = false;
            this.showRestart.node.active = true;
        }
    },
    onTouchMoreLife: function () {

        this.playTouchSound();
        this.nohit = false;
        this.unschedule(this.eventClock);
        // this.clockNode.active  = false;
        this.loadingAdNode.active = true;
        this.loadingAdCloseNode.active = false;
        this.scheduleOnce(this.showAdCloseBtn.bind(this), 10);//[gan]
        if (GameConfig.isFBInstantGame()) {
            let FBP = require("Plugin");
            FBP.RewardedVideoAsync(this.adGame.bind(this));
        } else {
             this.adGame();
        }
        // this.scheduleOnce(this.showAdCloseBtn,10);
    },

    adGame: function () {
        Global.showAdTimes--;
        Global.saveShowAdTimes();
        this.loadingAdNode.active = false;
        if (cc.find("Canvas").getChildByTag(111)) {
            cc.find("Canvas").getChildByTag(111).removeFromParent(true);
            this.bottomisDone = false;
        }
        this.gameController.moreLife();

        this.node.active = false;

    },
    OnTouchRestart: function () {
        this.playTouchSound();
        Global.thisState = GameState.end;
        Global.saveThisState();
        if (cc.find("Canvas").getChildByTag(111)) {
            cc.find("Canvas").getChildByTag(111).removeFromParent(true);
            this.bottomisDone = false;
        }
        cc.director.loadScene("gamemenu");
    },
    showAdCloseBtn: function () {

        this.loadingAdCloseNode.active = true;


    },
    onTouchAdClose:function(){
        this.playTouchSound();
        this.loadingAdNode.active = false;
        if (Global.showAdTimes > 0) {
            this.nohit = true;
            this.schedule(this.eventClock, 1);
        }
    },
    update: function (dt) {
        if (this.curCount > 0 && this.nohit) {
            this.curCount -= dt;
            this.showMoreLifePro.progress = this.curCount / this.maxCount;
        }
    }

});