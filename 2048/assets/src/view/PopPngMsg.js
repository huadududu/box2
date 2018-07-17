/*
 * Created by Ren on 2018/7/11.
 */
let SpriteFrameCenter = require("SpriteFrameCenter");
const pngname = ["common_good","common_great","common_excellent","common_incredible"];
cc.Class({

    extends: cc.Component,
    properties: {
        cotentsp: cc.Sprite,
        animation: {
            default: 1,
            visible: false
        }
    },
    onLoad: function () {
        this.cotentsp.node.setScale = (0.5,0.5);
    },

    removeNode: function () {
        this.node.removeFromParent(true);
    },
    init: function (content, animation = 0) {
        this.animation = content;
        this.cotentsp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game",pngname[this.animation] + ".png");
        let act_1 = cc.scaleTo(0.1,1,1);
        let act_2 = cc.moveBy(0.8,cc.p(0,0));
        let act_3 = cc.scaleTo(0.1,0.1,0.1);
        let act_4 = cc.callFunc(this.removeNode,this);
        this.cotentsp.node.runAction(cc.sequence(act_1,act_2,act_3,act_4));
    },
    onClose: function () {
        this.node.removeFromParent(true);
    }
});