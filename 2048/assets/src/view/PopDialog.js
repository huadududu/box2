/**
 * Created by bing on 05/06/2018.
 */
let SpriteFrameCenter = require("SpriteFrameCenter");
let pngname =["common_zhuanghuan2","common_shuaxin2","common_zhalie2"];
cc.Class({

    extends:cc.Component,
    properties:{

        titleLb:cc.Label,
        cotentLb:cc.Label,
        icon_tool:cc.Sprite,
        curtext:cc.Label

    },

    init:function (title,content,doCallback,giftType) {
        this.titleLb.string = title;
        this.cotentLb.string = content;
        this.doCallback = doCallback;
        this.giftType = giftType;
        this.icon_tool.SpriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", pngname[giftType]);
        this.curtext.string = Global.haveTools[giftType]+"/"+"5";
    },
    onSend:function () {
        if(this.doCallback){
            this.doCallback();
        }
    },


});