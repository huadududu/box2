(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/RewardItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '09777QBctNLYJN8Xk7DnA+r', 'RewardItem', __filename);
// src/model/RewardItem.js

'use strict';

/*
 * Created by Ren on 2018/6/12.
 */
var GameType = require("GameType");
var ItemConfig = require('ItemConfig');
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
        if (reward.indexOf(";") != -1) {
            var rewardarry = reward.split(";");
            this.pngID = rewardarry[0];
            this.text.string = rewardarry[1];
            this.text.node.active = false;
        }
        this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", ItemConfig[this.pngID].icon + ".png");
    },
    setFinish: function setFinish() {
        this.text.node.active = true;
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=RewardItem.js.map
        