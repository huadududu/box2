/*
 * Created by Ren on 2018/7/12.
 */
let Global = require("Global");
let GameConfig = require("GameConfig");
let DailyBonusCenter = require("DailyBonusCenter");
 let InviteCenter = require("InviteCenter");

cc.Class({
    extends: cc.Component,

    properties: {
        // bottomPrefab: cc.Prefab,
        btnSkin: cc.Button,
        btnBonus: cc.Button,
        btnInvite: cc.Button,
        btnRank: cc.Button,
        btnShare: cc.Button,
        tipSkin: cc.Node,
        dailybonusTip: cc.Node,
        inviteTip: cc.Node,

    },
    onLoad: function () {

        this.gameMenu = cc.find("Canvas").getComponent("GameController");
        if(!this.gameMenu){
            this.gameMenu = cc.find("Canvas").getComponent("GameMenuController");
        }
        this.inviteTip.active = false;
        this.updateInviteRedTip();

        this.dailybonusTip.active = false;
        this.updateDailyBonusRedTip();
    },
    start: function () {

    },
    onClose: function () {
        this.node.removeFromParent(true);
    },
    onTouchBtnSkin() {
        let PopMsgController  = require("PopMsgController");
        PopMsgController.showMsg("Being developing......");
    },
    onTouchBtnBonus() {
        let prefab = cc.loader.getRes("prefab/dailyBonusUI");
        let newNode = cc.instantiate(prefab);
        cc.find("Canvas").addChild(newNode);
    },
    onTouchBtnInvite() {
        let prefab = cc.loader.getRes("prefab/inviteUI");
        let newNode = cc.instantiate(prefab);
        cc.find("Canvas").addChild(newNode);
    },
    onTouchBtnRank() {
        let prefab = cc.loader.getRes("prefab/rankUI");
        let newNode= cc.instantiate(prefab);
        cc.find("Canvas").addChild(newNode);
    },
    onTouchBtnShare() {
        if(GameConfig.isFBInstantGame()){
            let FBP = require("Plugin");
            FBP.shareFb('SHARE');
        }
    },
    updateInviteRedTip: function () {
        this.inviteTip.active = InviteCenter.ShowRedTip;
        this.updateCoinLabel();
    },
    updateDailyBonusRedTip: function () {
        this.dailybonusTip.active = DailyBonusCenter.ShowRedTip;
        this.updateCoinLabel();
    },
    updateCoinLabel: function () {
        // this.gem.string  = Global.Coins;
        // this.setGoldNum(Global.gold);
        // this.setGem(Global.gem);
    },

});