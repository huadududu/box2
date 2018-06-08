(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/MarginsBig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d795ZMVLpEF5KTPgLM7Nm9', 'MarginsBig', __filename);
// src/model/MarginsBig.js

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
            default: GameType.profabType.BlockBig,
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
        BingLog.log("Block" + status + " init:");
        // this.text.string= x+","+y;
    },

    onLoad: function onLoad() {
        // BingLog.log("tanke onLoad");
        // this.updateNode();
    },

    showBlockBig: function showBlockBig(show) {
        // this.sp.node.active = show;
    },
    setBlockPng: function setBlockPng(pngname) {
        this.pngID = pngname;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", BlockConfig[this.pngID].resources + ".png");
    },
    setPosNum: function setPosNum(x, y) {
        this.lineNum = x;
        this.columnNum = y;
        this.text.getComponent(cc.Label).string = x + "," + y;
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
        //# sourceMappingURL=MarginsBig.js.map
        