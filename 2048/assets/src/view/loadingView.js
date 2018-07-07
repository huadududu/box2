/*
 * Created by Ren on 2018/6/21.
 */
cc.Class({
    extends:cc.Component,
    properties:{
        loadingAdNode:cc.Node,
        loadingAdCloseNode:cc.Node,
    },
    onLoad:function () {

    },

    onEnable:function(){
        this.loadingAdCloseNode.active = false;
        this.scheduleOnce(this.showAdCloseBtn,10);
    },
    onTouchCloseBtn(){
        // this.node.active = false;
        let FBP = require("Plugin");
        FBP.chooseAsync(this.backFriend.bind(this),this.backFriend.bind(this));
    },
    showAdCloseBtn:function () {
        this.loadingAdCloseNode.active  = true;
    },
    backFriend:function(){
        this.node.active = false;
        let gameController = cc.find("Canvas").getComponent("GameController");
        gameController.restartCallBack();
    }
});