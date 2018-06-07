(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/BlockSmall.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7cd3695p0pE449QwFO9hlb4', 'BlockSmall', __filename);
// src/model/BlockSmall.js

"use strict";

/**
 * Created by bing on 18/04/2018.
 */

var GameType = require("GameType");
var SpriteFrameCenter = require("SpriteFrameCenter");
var BlockConfig = require("BlockConfig");
cc.Class({
    extends: cc.Component,

    properties: {
        sp: cc.Sprite,
        lineNum: 0,
        columnNum: 0,
        type: {
            default: GameType.profabType.BlockSmall,
            override: true,
            visible: false
        },
        pngID: {
            default: 1,
            visible: false
        }
    },

    //count
    init: function init() {
        BingLog.log("BlockSmall init:");
    },

    onLoad: function onLoad() {
        // BingLog.log("tanke onLoad");
        // this.updateNode();
    },
    setBlockPng: function setBlockPng(pngname) {
        this.pngID = pngname;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", BlockConfig[pngname].resources + ".png");
    },
    getPngId: function getPngId() {
        return BlockConfig[this.pngID].texiao;
    },
    updateNode: function updateNode() {
        // let self=this;
        // cc.loader.loadRes('png/', cc.SpriteFrame, function (err, spriteFrame) {
        //     self.sp.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
    },
    runClick: function runClick() {
        // if(this.runAction){
        //   return;
        //}
        this.runAction = true;
        var s1 = cc.scaleTo(0.1, 1.1, 1.1);
        var s2 = cc.scaleTo(0.09, 1, 1);
        var callback = cc.callFunc(function () {
            this.runAction = false;
        }.bind(this));
        var seq = cc.sequence(s1, s2, callback);
        this.sp.node.runAction(seq);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=BlockSmall.js.map
        