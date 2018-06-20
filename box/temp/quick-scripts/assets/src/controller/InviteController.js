(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/InviteController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b87dap5dKJLMI4WjnNe8rvn', 'InviteController', __filename);
// src/controller/InviteController.js

"use strict";

/**
 * Created by bing on 31/05/2018.
 */

var RankItemFactory = require("RankItemFactory");
var GameConfig = require("GameConfig");
var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        TimeTipLb: cc.Label,
        invitePrefab: cc.Prefab,
        inviteContent: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {

        for (var i = 0; i < 4; ++i) {
            var node = this.addItem(i);
            node.setPosition(0, 0);
            this.inviteContent.addChild(node);
        }

        //获取领取invite的几个条目。

        this.updateTip();
        this.schedule(this.updateTip, 1);
    },

    onDestroy: function onDestroy() {

        this.unschedule(this.updateTip);
    },

    updateTip: function updateTip() {

        var now = new Date();
        var tommorow = Date.UTC(now.getUTCFullYear(), now.getUTCDate(), now.getUTCDay() + 1, 0, 0, 0);
        var leftTime = tommorow - Date.UTC(now.getUTCFullYear(), now.getUTCDate(), now.getUTCDay(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        var Hours = Math.floor(leftTime / 1000.0 / 3600);
        var Mins = Math.floor((leftTime / 1000.0 - Hours * 3600) / 60);
        var Seconds = Math.floor(leftTime / 1000.0 - Hours * 3600 - 60 * Mins);
        this.TimeTipLb.string = Hours.toString() + ":" + Mins.toString() + ":" + Seconds.toString();
    },

    onClose: function onClose() {
        this.node.removeFromParent(true);
    },

    addItem: function addItem(index) {
        var node = cc.instantiate(this.invitePrefab);
        var InviteItem = node.getComponent('InviteItem');
        InviteItem.updateItem(index);
        return node;
    },

    showTip: function showTip() {

        //获取最后一个
        var inviteCon = InviteConfig["invite"][3];
        var num = inviteCon['num'];
        var rewardid = inviteCon['rewardid'];
        var rewardCon = RewardConfig[rewardid.toString()];
        var coin = rewardCon['coin'];
        this.coinLabel.string = "+" + coin.toString();
        if (Global.InviteCount >= num) {}
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
        //# sourceMappingURL=InviteController.js.map
        