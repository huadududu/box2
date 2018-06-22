/**
 * Created by bing on 05/06/2018.
 */

cc.Class({

    extends:cc.Component,
    properties:{
        cotentLb:cc.Label,
        animation:true


    },

    onLoad:function () {
        if(this.animation){
            this.hideAction();
        }
    },

    init:function (content,animation) {
        this.animation = animation;
        this.cotentLb.string = content;
    },

    removeNode:function () {

        this.node.removeFromParent(true);
    },

    hideAction:function () {
        let time = 2.0;
        let faceOut = cc.fadeOut(1);
        // faceOut.easing(cc.easeIn(time));
        let winsize = cc.winSize;
        let mv = cc.moveTo(time,cc.p(0,winsize.height*0.3));
        mv.easing(cc.easeIn(time));
        // let spawn = cc.spawn(mv,faceOut);
        var finished = cc.callFunc(this.removeNode, this);
        let seq = cc.sequence(mv,faceOut,finished);
        this.node.runAction(seq);
    },

    onClose:function () {
        this.node.removeFromParent(true);
    }

});