"use strict";
cc._RF.push(module, '09777QBctNLYJN8Xk7DnA+r', 'RewardItem');
// src/model/RewardItem.js

'use strict';

/*
 * Created by Ren on 2018/6/12.
 */
var GameType = require("GameType");
var ItemConfig = require('ItemConfig');
var Global = require('Global');
var SpriteFrameCenter = require('SpriteFrameCenter');
cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: GameType.profabType.RewardItem,
            override: true,
            visible: false
        },
        icon: cc.Sprite,
        text: cc.Label,
        pngID: {
            visible: false,
            default: 0
        }

    },
    onLoad: function onLoad() {},
    setIconPng: function setIconPng(reward) {
        // if(reward.indexOf(";") != -1){
        //     let rewardarry = reward.split(";");
        //     this.pngID = rewardarry[0];
        //     this.text.string = "+"+rewardarry[1];
        //     this.text.node.active= false;
        // }
        var startnum = 0;
        if (reward.indexOf(";") != -1) {
            var rewardarry = reward.split(";");
            this.pngID = rewardarry[0];
            var valuestr = rewardarry[1];
            var valueArr = void 0;
            if (valuestr.indexOf('*') != -1) {
                valueArr = valuestr.split("*");
                startnum = valueArr[0];
                for (var i = 1; i < valueArr.length; i++) {
                    if (valueArr[i] == "lv") {
                        startnum *= Global.level;
                    }
                }
            } else {
                startnum = parseInt(valuestr);
            }
        }
        this.text.string = "+" + startnum;
        this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", ItemConfig[this.pngID].icon + ".png");
    },
    setFinish: function setFinish() {
        this.text.node.active = true;
    }

});

cc._RF.pop();