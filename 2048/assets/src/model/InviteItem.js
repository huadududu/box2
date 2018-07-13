/**
 * Created by bing on 18/04/2018.
 */



let Global = require("Global");
let InviteConfig = require("InviteConfig");
let RewardConfig = require("RewardConfig");
let InviteCenter = require("InviteCenter");
let FBP = require("Plugin");

cc.Class({
    extends:cc.Component,

    properties:{
        coinLabel:cc.Label,
        numLabel:cc.Label,
        btn:cc.Node,
        doneNode:cc.Node,
        claimNode:cc.Node,
        index:0,
    },

    onLoad:function () {

        this.gameMenu = cc.find("Canvas/bottom").getComponent("BottomController");
    },
    
    updateItem:function(index) {

        this.index= index;
        let inviteCon = InviteConfig["invite"][index];
        let num = inviteCon['num'];
        let rewardid = inviteCon['rewardid'];
        let rewardCon = RewardConfig[rewardid.toString()];
        let coin = rewardCon['coin'];

        this.coinLabel.string =  "+" + coin.toString();
        this.claimNode.active = false;
        if(InviteCenter.InviteCount >= num){
            this.numLabel.string =  num.toString() +"/" + num.toString();

            this.btn.active = false;
            if(InviteCenter.InviteClaim[index]){
                this.claimNode.active = false;
                this.doneNode.active = true;
            }else{
                this.doneNode.active = false;
                this.claimNode.active = true;
            }

        }else{
            this.numLabel.string =  InviteCenter.InviteCount.toString() +"/" + num.toString();
            this.btn.active = true;
            this.doneNode.active = false;
        }
    },

    inviteOK:function (contextId) {

        FBP.updateCallBackFriendsAsync(function () {
            let PopMsgController = require("PopMsgController");
            let GameConfig = require("GameConfig");
            PopMsgController.showMsg(GameConfig.InviteAfterTip);
        }.bind(this))

    },

    errorCallBack:function(){
        let PopMsgController = require("PopMsgController");
        let GameConfig = require("GameConfig");
        PopMsgController.showMsg(GameConfig.InviteSameTip);
    },

    onInvite:function () {

        FBP.chooseAsync(this.inviteOK.bind(this),this.errorCallBack.bind(this));
    },
    
    onClaim:function () {
        this.btn.active = false;
        this.claimNode.active = false;
        this.doneNode.active = true;

        let inviteCon = InviteConfig["invite"][this.index];
        let rewardid = inviteCon['rewardid'];
        let rewardCon = RewardConfig[rewardid.toString()];
        let coin = rewardCon['coin'];
        Global.Coins+=coin;
        Global.syncPlayerInfoToFB();
        InviteCenter.setClaim(this.index);
        InviteCenter.getRedTipState();
        //显示RedTip
        this.gameMenu.updateInviteRedTip();
    }


});