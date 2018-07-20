/**
 * Created by bing on 05/06/2018.
 */
let SpriteFrameCenter = require("SpriteFrameCenter");
let Global = require("Global");
let GameConfig = require("GameConfig");
let pngname = ["common_zhuanhuan2", "common_shuaxin2", "common_zhalie2"];
cc.Class({

    extends: cc.Component,
    properties: {

        titleLb: cc.Label,
        cotentLb: cc.Label,
        curtext: cc.Label,
        icon_tool: cc.Sprite,
        contentdesc: cc.Label,
        btntext:cc.Label,
        touchAudio: {
            default: null,
            url: cc.AudioClip
        },
    },
    playTouchSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.touchAudio, false);
    },


    init: function (title, content, contentdesc, doCallback, type) {
        this.titleLb.string = title;
        this.cotentLb.string = content;
        this.contentdesc.string = contentdesc;
        this.doCallback = doCallback;
        this.type = type;
        this.icon_tool.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", pngname[type]);
        this.curtext.string = Global.GiftSendTimes[type] + "/" + GameConfig.GiftLimited;
        if(title == "GIFT"){
            this.btntext.string ="CLOSE";
        }else{
            this.btntext.string = "SEND";
        }
    },
    onSend: function () {
        this.playTouchSound();
        if (this.doCallback) {
            this.doCallback(this.type);
        }
    },


});