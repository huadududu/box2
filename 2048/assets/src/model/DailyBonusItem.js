/**
 * Created by bing on 18/04/2018.
 */



let Global = require("Global");
let DailyBonusConfig = require("DailyBonusConfig");
let RewardConfig = require("RewardConfig");
let DailyBonusCenter = require("DailyBonusCenter");
let SpriteFrameCenter = require('SpriteFrameCenter');

let Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let Bgs = {
    coming: "img_bonus_di1",
    claim: "img_bonus_di3",
    retrieve: "img_bonus_di4",
    done: "img_bonus_di5",
};

cc.Class({
    extends: cc.Component,

    properties: {
        coinLabel: cc.Label,
        dayLabel: cc.Label,
        retrievebtn: cc.Node,
        comingNode: cc.Node,
        doneNode: cc.Node,
        claimNode: cc.Node,
        itembg: cc.Node,
        index: 0,
        extraType: false,
    },

    onLoad: function () {
        this.gameMenu = cc.find("Canvas/bottom").getComponent("BottomController");
        this.dailybonusCtr = cc.find("Canvas/dailyBonusUI").getComponent("DailyBonusController");
    },

    updateItem: function (index, isExtra) {

        this.index = index;
        this.extraType = isExtra;
        let Con = DailyBonusConfig["Signin"][index];
        let rewardid = Con['rewardid'];
        let rewardCon = RewardConfig[rewardid.toString()];
        let coin = rewardCon['coin'];

        let st = DailyBonusCenter.getClaimState(this.index);
        //根据是否是extra和状态进行显示按钮。
        let dayText = "";
        if (this.extraType) {
            this.retrievebtn.active = false;
            let totalDays = DailyBonusCenter.getClaimDays();
            dayText = "(" + totalDays.toString() + "/7)";
            if (totalDays >= 7) {
                if (st) {
                    this.showDone();
                } else {
                    this.showClaim();
                }
            } else {
                this.showComing();
                // this.showClaim();
            }
        } else {

            dayText = Days[this.index];
            let dayIndex = DailyBonusCenter.getWeekDay();
            if (st) {
                this.showDone();
            } else {
                if (dayIndex == this.index) {
                    this.showClaim();
                } else if (dayIndex > this.index) {
                    this.showRetrieve();
                } else {
                    this.showComing();
                }
            }
        }

        this.dayLabel.string = dayText;
        this.coinLabel.string = coin.toString();
        this.updateBg();
    },

    updateTotalDays: function () {
        let totalDays = DailyBonusCenter.getClaimDays();
        this.dayLabel.string = "(" + totalDays.toString() + "/7)";
    },

    showComing: function () {
        this.retrievebtn.active = false;
        this.comingNode.active = true;
        this.doneNode.active = false;
        this.claimNode.active = false;
    },

    showDone: function () {
        this.retrievebtn.active = false;
        this.comingNode.active = false;
        this.doneNode.active = true;
        this.claimNode.active = false;
    },

    showRetrieve: function () {
        this.retrievebtn.active = true;
        this.comingNode.active = false;
        this.doneNode.active = false;
        this.claimNode.active = false;
    },

    showClaim: function () {
        this.retrievebtn.active = false;
        this.comingNode.active = false;
        this.doneNode.active = false;
        this.claimNode.active = true;
    },

    //修改背景图片。
    updateBg: function () {
        if (!this.extraType) {
            let st = DailyBonusCenter.getClaimState(this.index);
            let spName = "";
            if (st) {
                spName = Bgs["done"];
            } else {
                let dayIndex = DailyBonusCenter.getWeekDay();
                if (dayIndex == this.index) {
                    spName = Bgs["claim"];
                } else if (dayIndex > this.index) {
                    spName = Bgs["retrieve"];
                } else {
                    spName = Bgs["coming"];
                }
            }
            this.itembg.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", spName);
        }
    },


    onRetrieve: function () {
        let GameConfig = require("GameConfig");
        if (GameConfig.isFBInstantGame()) {
            let FBP = require("Plugin");
            FBP.chooseAsync(this.clickCoin.bind(this), this.clickCoin.bind(this));
        }
    },

    onClaim: function () {
        this.clickCoin();
    },

    clickCoin: function () {
        this.showDone();

        let Con = DailyBonusConfig["Signin"][this.index];
        let rewardid = Con['rewardid'];
        let rewardCon = RewardConfig[rewardid.toString()];
        let coin = rewardCon['coin'];
        Global.Coins += coin;
        Global.syncPlayerInfoToFB();
        DailyBonusCenter.setClaim(this.index);
        DailyBonusCenter.getRedTipState();
        //显示RedTip
        this.gameMenu.updateDailyBonusRedTip();
        this.dailybonusCtr.updateTotalDays();
    }


});