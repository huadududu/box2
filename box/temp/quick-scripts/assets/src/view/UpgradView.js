(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/view/UpgradView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9e7b4Hd6glFQpdpqj6f0HgJ', 'UpgradView', __filename);
// src/view/UpgradView.js

"use strict";

/*
 * Created by Ren on 2018/6/12.
 */
var Global = require('Global');
var StageConfig = require("StageConfig");
var BoxConfig = require("BoxConfig");
var RewardConfig = require("RewardConfig");
var GameUtils = require("GameUtils");
var LevelConfig = require("LevelConfig");
var EfficiencyConfig = require("EfficiencyConfig");
cc.Class({

    extends: cc.Component,
    properties: {

        RewardLable: cc.Label,
        TitleLable: cc.Label,
        DescLable: cc.Label,
        vediodesc: cc.Label,
        BoxController: require('BoxController')
    },

    onLoad: function onLoad() {
        this.type;
        this.msg = { 'uplevel': 3, 'skip': 2, 'outline': 2 };
    },
    onEnable: function onEnable() {
        this.type = this.msg[Global.btnType];
        if (Global.typebtn == 'uplevel') {
            this.addlevel();
        } else if (Global.typebtn == 'skip') {
            this.jumpTimeReward();
        } else {
            this.outlineReward();
        }
    },
    addlevel: function addlevel() {
        var myinfo = {};
        var level = Global.level;
        var needexp = LevelConfig[level].exp;
        var needgold = LevelConfig[level].rewardcoin;
        Global.addgold = needgold;
        myinfo.exp = Global.exp - needexp;
        myinfo.level = Global.level + 1;
        Global.saveLevel(myinfo.level);
        Global.saveExp(myinfo.exp);
        this.vediodesc.string = 'x' + this.type;
        this.RewardLable.string = "x" + needgold;
        Global.addgold = needgold;
        this.BoxController.GameMenuController.updateDate(myinfo);
    },
    //离线奖励
    outlineReward: function outlineReward() {

        this.RewardLable.string = "x" + Global.addgold;
        this.vediodesc.string = 'x' + this.type;
    },
    //跳过时间
    jumpTimeReward: function jumpTimeReward() {
        this.RewardLable.string = "x" + Global.addgold;
        this.vediodesc.string = 'x' + this.type;
    },
    onVedioSureBtn: function onVedioSureBtn() {
        var golds = Global.gold + Global.addgold * this.type;
        if (Global.addgold > 0) {
            this.BoxController.GameMenuController.updateDate({ gold: golds });
            Global.saveGold(golds);
        }

        Global.addgold = 0;
        this.node.active = false;
    },
    onNextBtn: function onNextBtn() {
        var golds = Global.gold + Global.addgold;
        this.BoxController.GameMenuController.updateDate({ gold: golds });
        Global.saveGold(golds);
        if (Global.addgold > 0) {
            this.node.active = false;
            Global.saveGold(golds);
        }
        Global.addgold = 0;
        this.node.active = false;
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
        //# sourceMappingURL=UpgradView.js.map
        