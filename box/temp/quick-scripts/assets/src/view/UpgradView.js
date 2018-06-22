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
var LanguageConfig = require("LanguageConfig");
cc.Class({

    extends: cc.Component,
    properties: {

        RewardLable: cc.Label,
        TitleLable: cc.Label,
        DescLable: cc.Label,
        vediodesc: cc.Label,
        nextdesc: cc.Label,
        BoxController: require('BoxController'),
        language: 'English'
    },

    onLoad: function onLoad() {
        this.type;
        this.msg = { 'uplevel': 3, 'skip': 2, 'outline': 2 };
    },
    onEnable: function onEnable() {
        this.type = this.msg[Global.btnType];
        if (Global.btnType == 'uplevel') {
            this.addlevel();
        } else if (Global.btnType == 'skip') {
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
        var claim = LanguageConfig['10028'][Global.language];
        this.TitleLable.string = LanguageConfig['10026'][Global.language];
        this.DescLable.string = LanguageConfig['10027'][Global.language];
        this.RewardLable.string = "x" + needgold;
        this.nextdesc.string = claim;
        this.vediodesc.string = claim + 'x' + this.type;
        Global.addgold = needgold;
        this.BoxController.GameMenuController.updateDate(myinfo);
    },
    //离线奖励
    outlineReward: function outlineReward() {

        var claim = LanguageConfig['10028'][Global.language];
        this.TitleLable.string = LanguageConfig['10033'][Global.language];
        this.DescLable.string = LanguageConfig['10032'][Global.language];
        this.RewardLable.string = "x" + Global.addgold;
        this.nextdesc.string = claim;
        this.vediodesc.string = claim + 'x' + this.type;
    },
    //跳过时间
    jumpTimeReward: function jumpTimeReward() {
        var claim = LanguageConfig['10028'][Global.language];
        var desc = LanguageConfig['10031'][Global.language];
        var time = EfficiencyConfig[Global.skipID].jumptime;
        desc = GameUtils.formatHour(desc, time);
        Global.addgold = Math.floor(Global.addgold);
        this.TitleLable.string = LanguageConfig['10017'][Global.language];
        this.DescLable.string = desc;
        this.RewardLable.string = "x" + Global.addgold;
        this.nextdesc.string = claim;
        this.vediodesc.string = claim + 'x' + this.type;
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
        