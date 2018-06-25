"use strict";
cc._RF.push(module, '9e7b4Hd6glFQpdpqj6f0HgJ', 'UpgradView');
// src/view/UpgradView.js

"use strict";

/*
 * Created by Ren on 2018/6/12.
 */
var Global = require('Global');
var StageConfig = require("StageConfig");
var BoxConfig = require("BoxConfig");
var RewardConfig = require("RewardConfig");
var GameConfig = require("GameConfig");
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
        needgold = GameUtils.formatNumMAX(needgold);
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
        var needgold = GameUtils.formatNumMAX(Global.addgold);
        this.RewardLable.string = "x" + needgold;
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
        var needgold = GameUtils.formatNumMAX(Global.addgold);
        this.RewardLable.string = "x" + needgold;
        this.nextdesc.string = claim;
        this.vediodesc.string = claim + 'x' + this.type;
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
    },
    onVedioSureBtn: function onVedioSureBtn() {

        if (GameConfig.isFBInstantGame()) {
            this.BoxController.loadingView.active = true;
            var FBP = require("FBPlugin");
            FBP.RewardedVideoAsync(this.seeAdCallBack);
        } else {
            this.BoxController.loadingView.active = true; //[change]
            this.seeAdCallBack();
        }
    },
    seeAdCallBack: function seeAdCallBack() {
        this.BoxController.loadingView.active = false;
        var golds = Global.gold + Global.addgold * this.type;
        if (Global.addgold > 0) {
            this.BoxController.GameMenuController.updateDate({ gold: golds });
            Global.saveGold(golds);
        }
        Global.addgold = 0;
        this.node.active = false;
    }

});

cc._RF.pop();