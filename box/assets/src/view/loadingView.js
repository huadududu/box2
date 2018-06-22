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
        this.node.active = false;
    },
    showAdCloseBtn:function () {
        this.loadingAdCloseNode.active  = true;
    },
});