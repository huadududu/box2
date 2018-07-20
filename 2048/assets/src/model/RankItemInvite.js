/**
 * Created by bing on 31/05/2018.
 */


let GameUtils = require("GameUtils");
let SpriteFrameCenter = require("SpriteFrameCenter");
let GameConfig = require("GameConfig");


cc.Class({
    extends:cc.Component,

    properties:{
        touchAudio: {
            default: null,
            url: cc.AudioClip
        },

    },
    playTouchSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.touchAudio, false);
    },

    onLoad:function () {

    },

    onInvite:function () {
        this.playTouchSound();
        if(GameConfig.isFBInstantGame()){
            let FBP = require("Plugin");
            FBP.chooseAsync();
        }
    },


});