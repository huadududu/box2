/**
 * Created by bing on 31/05/2018.
 */

let Global = require("Global");
let GameUtils = require("GameUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        TimeTipLb:cc.Label,
        invitePrefab:cc.Prefab,
        inviteContent:cc.Node
    },

    // use this for initialization
    onLoad: function () {

        for(let i = 0; i < 4;++i){
            let node = this.addItem(i);
            node.setPosition(0,0);
            this.inviteContent.addChild(node);
        }

        //获取领取invite的几个条目。
        this.updateTip();
        this.schedule(this.updateTip,1);
    },

    onDestroy:function () {
        this.unschedule(this.updateTip);
    },

    //倒计时。
    updateTip:function () {

        let now = new Date();
        let tommorow = Date.UTC(now.getUTCFullYear(),now.getUTCDate(),now.getUTCDay()+1,0,0,0);
        let leftTime = tommorow-  Date.UTC(now.getUTCFullYear(),now.getUTCDate(),now.getUTCDay(),now.getUTCHours(),now.getUTCMinutes(),now.getUTCSeconds());
        let Hours = Math.floor(leftTime/1000.0/3600);
        let Mins = Math.floor((leftTime/1000.0- Hours*3600)/60);
        let Seconds = Math.floor(leftTime/1000.0- Hours*3600-60*Mins);

        Mins = GameUtils.padding(Mins,2);
        Seconds = GameUtils.padding(Seconds,2);
        this.TimeTipLb.string = Hours.toString() +":"+Mins.toString()+":"+Seconds.toString();
    },

    onClose:function () {
        this.node.removeFromParent(true);
    },

    addItem: function(index) {
        let node= cc.instantiate(this.invitePrefab);
        let InviteItem = node.getComponent('InviteItem');
        InviteItem.updateItem(index);
        return node;
    },

    updateItem:function () {
        
    }

});
