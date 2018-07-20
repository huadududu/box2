/*
 * Created by Ren on 2018/6/21.
 */
let GameConfig = require("GameConfig");
cc.Class({
    extends: cc.Component,
    properties: {
        loadingAdNode: cc.Node,
        loadingAdCloseNode: cc.Node,
        touchAudio: {
            default: null,
            url: cc.AudioClip
        },
        // type: {
        //     visible: false,
        //     default: 0,//0 :restart loading 1 end loading
        //
        // }
    },
    onLoad: function () {

    },
    playTouchSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.touchAudio, false);
    },
    onEnable: function () {
        this.loadingAdCloseNode.active = false;
        // if (this.type == 0) {
            this.scheduleOnce(this.showAdCloseBtn, 10);
        // }
    },
    onTouchCloseBtn() {
        this.playTouchSound();
        if (GameConfig.isFBInstantGame()) {
            // let FBP = require("Plugin");
            // FBP.shareFb('SHARE'     ,this.backFriend.bind(this));
            let FBP = require("Plugin");
            FBP.chooseAsync(this.backFriend.bind(this), this.backFriend.bind(this), this.backFriend.bind(this));
        }else{
            this.backFriend();
        }

    },
    showAdCloseBtn: function () {
        this.loadingAdCloseNode.active = true;
    },
    backFriend: function () {
        this.node.active = false;
        let text = "Click to help me to make a new RECORD,friend！";
        let FBP = require("Plugin");
        FBP.updateAsync(text);
        let gameController = cc.find("Canvas").getComponent("GameController");
        gameController.restartCallBack();
    },

});