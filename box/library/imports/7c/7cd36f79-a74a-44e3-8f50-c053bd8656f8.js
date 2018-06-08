"use strict";
cc._RF.push(module, '7cd3695p0pE449QwFO9hlb4', 'BlockSmall');
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
    }
});

cc._RF.pop();