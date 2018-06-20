(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/InviteItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'afc586YGmJLxqY27oHT1Xfv', 'InviteItem', __filename);
// src/model/InviteItem.js

"use strict";

/**
 * Created by bing on 18/04/2018.
 */

var Global = require("Global");
var InviteConfig = require("InviteConfig");
var RewardConfig = require("RewardConfig1");

cc.Class({
    extends: cc.Component,

    properties: {
        coinLabel: cc.Label,
        numLabel: cc.Label,
        btn: cc.Node,
        doneNode: cc.Node,
        claimNode: cc.Node,
        index: 0
    },

    onLoad: function onLoad() {},

    updateItem: function updateItem(index) {

        var inviteCon = InviteConfig["invite"][index];
        var num = inviteCon['num'];
        var rewardid = inviteCon['rewardid'];
        var rewardCon = RewardConfig[rewardid.toString()];
        var coin = rewardCon['coin'];

        this.coinLabel.string = "+" + coin.toString();
        this.claimNode.active = false;
        if (Global.InviteCount >= num) {
            this.numLabel.string = num.toString() + "/" + num.toString();

            this.btn.active = false;
            if (Global.InviteClaim[index]) {
                this.claimNode.active = false;
                this.doneNode.active = true;
            } else {
                this.doneNode.active = false;
                this.claimNode.active = true;
            }
        } else {
            this.numLabel.string = Global.InviteCount.toString() + "/" + num.toString();
            this.btn.active = true;
            this.doneNode.active = false;
        }
    },

    inviteOK: function inviteOK(contextId) {
        FBP.updateCallBackFriendsAsync(function () {
            var now = new Date();
            var Global = require("Global");
            var LocalStorage = require("LocalStorage");
            Global.InviteCount++;
            var key = "invaite" + now.getUTCFullYear().toString() + '-' + now.getUTCDate().toString() + "-" + now.getUTCDay();
            LocalStorage.set(key, Global.InviteCount);
            this.btn.active = false;
            this.claimNode.active = true;
            this.doneNode.active = true;
        }.bind(this));
    },

    errorCallBack: function errorCallBack() {
        var PopMsgController = require("PopMsgController");
        var GameConfig = require("GameConfig");
        PopMsgController.showMsg(GameConfig.InviteSameTip);
    },

    onInvite: function onInvite() {
        var FBP = require("FBPlugin");
        FBP.chooseAsync(this.inviteOK.bind(this), this.errorCallBack.bind(this));
    },

    onClaim: function onClaim() {
        this.btn.active = false;
        this.claimNode.active = false;
        this.doneNode.active = true;

        var inviteCon = InviteConfig["invite"][index];
        var rewardid = inviteCon['rewardid'];
        var rewardCon = RewardConfig[rewardid.toString()];
        var coin = rewardCon['coin'];
        Global.Coins += coin;
        Global.syncPlayerInfoToFB();
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
        //# sourceMappingURL=InviteItem.js.map
        