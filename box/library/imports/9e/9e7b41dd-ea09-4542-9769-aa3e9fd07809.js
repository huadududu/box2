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
var GameUtils = require("GameUtils");
var LevelConfig = require("LevelConfig");
var EfficiencyConfig = require("EfficiencyConfig");
cc.Class({

    extends: cc.Component,
    properties: {

        RewardLable: cc.Label,
        TitleLable: cc.Label,
        DescLable: cc.Label,
        BoxController: require('BoxController')
    },

    onLoad: function onLoad() {
        this.type;
        this.uplevel = { 'uplevel': 3, 'skip': 2, 'outline': 2 };
    },
    onEnable: function onEnable() {
        this.type = this.uplevel[Global.typebtn];
        if (Global.typebtn == 'uplevel') {
            this.addlevel();
        } else if (Global.typebtn == 'skip') {
            this.skipReward();
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

        this.RewardLable.string = "x" + needgold;
        Global.addgold = needgold;
        this.BoxController.GameMenuController.updateDate(myinfo);
    },
    skipReward: function skipReward() {
        if (Global.skipID <= 0) return;else {
            var myinfo = {};
            // let conf = EfficiencyConfig[Global.skipID];
            this.RewardLable.string = "x" + Global.addgold;
        }
    },
    outlineReward: function outlineReward() {},
    onVedioSureBtn: function onVedioSureBtn() {
        var golds = Global.gold + Global.addgold * 3;
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