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
        this.hideAction();

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
    hideAction: function () {
        let time = 1;
        let faceOut = cc.fadeOut(1);
        // faceOut.easing(cc.easeIn(time));
        let winsize = cc.winSize;
        this.node.x;
        let mv = cc.moveTo(time, cc.p(  this.node.x, this.node.y+50));
        // mv.easing(cc.easeIn(time));
        let spawn = cc.spawn(mv, faceOut);
        var finished = cc.callFunc(this.removeNode, this);
        let seq = cc.sequence(spawn, faceOut, finished);
        this.node.runAction(seq);
    },

    onClose: function () {
        this.node.removeFromParent(true);
    }

});