"use strict";
cc._RF.push(module, '7aa55Z6ndRPTYYFj6vs8IW5', 'PopMsg');
// src/view/PopMsg.js

"use strict";

/**
 * Created by bing on 05/06/2018.
 */

cc.Class({

    extends: cc.Component,
    properties: {
        cotentLb: cc.Label,
        animation: true

    },

    onLoad: function onLoad() {
        if (this.animation) {
            this.hideAction();
        }
    },

    init: function init(content, animation) {
        this.animation = animation;
        this.cotentLb.string = content;
    },

    removeNode: function removeNode() {

        this.node.removeFromParent(true);
    },

    hideAction: function hideAction() {
        var time = 1;
        var faceOut = cc.fadeOut(1);
        // faceOut.easing(cc.easeIn(time));
        var winsize = cc.winSize;
        var mv = cc.moveTo(time, cc.p(0, winsize.height * 0.3));
        // mv.easing(cc.easeIn(time));
        var spawn = cc.spawn(mv, faceOut);
        var finished = cc.callFunc(this.removeNode, this);
        var seq = cc.sequence(spawn, faceOut, finished);
        this.node.runAction(seq);
    },

    onClose: function onClose() {
        this.node.removeFromParent(true);
    }

});

cc._RF.pop();