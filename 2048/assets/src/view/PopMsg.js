/**
 * Created by bing on 05/06/2018.
 */

cc.Class({

    extends: cc.Component,
    properties: {
        cotentLb: cc.Label,
        animation: {
            default: 1,
            visible: false
        }
    },

    onLoad: function () {
        if(this.animation == 1){
            this.hideAction1();
            this.cotentLb.fontSize = 40;
        }
        else if(this.animation == 0){
            this.hideAction();
            this.cotentLb.fontSize = 40;
            this.cotentLb.node.setColor( cc.hexToColor('#766d66'));

        }else{
            // this.hideAction2();
        }

    },

    init: function (content, animation = 1) {
        this.animation = animation;
        this.cotentLb.string = content;
        // this.cotentLb.fontSize = 22;

    },

    removeNode: function () {

        this.node.removeFromParent(true);
    },
    //exp+1,coin+1
    hideAction1: function () {
        let time = 1;
        let faceOut = cc.fadeOut(1);
        // faceOut.easing(cc.easeIn(time));
        let winsize = cc.winSize;

        let mv = cc.moveTo(time, cc.p(  this.node.x, this.node.y+50));
        // mv.easing(cc.easeIn(time));
        let spawn = cc.spawn(mv, faceOut);
        var finished = cc.callFunc(this.removeNode, this);
        let seq = cc.sequence(spawn, faceOut, finished);
        this.node.runAction(seq);
    },
    hideAction:function () {
        let time = 5.0;
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
    onClose: function () {
        this.node.removeFromParent(true);
    }

});