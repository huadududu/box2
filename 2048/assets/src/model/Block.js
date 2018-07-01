/**
 * Created by bing on 18/04/2018.
 */

// let GameType = require("GameType");
let SpriteFrameCenter = require("SpriteFrameCenter");
let BlockConfig = require("ToolConfig");
cc.Class({
    extends:cc.Component,

    properties:{
        sp:cc.Sprite,
        lineNum:0,
        columnNum:0,
        number:1,
        type:{
            default:1,
            override:true,
            visible:false,

        },
        pngID:{
            default:1,
            visible:false,
        }
    },

    //count
    init:function () {
        BingLog.log("Block"+status+" init:");
        // this.text.string= x+","+y;
    },

    onLoad:function () {
        // BingLog.log("tanke onLoad");
        // this.updateNode();
    },

    showBlockBig:function (show) {
        // this.sp.node.active = show;
    },
    setBlockPng: function(pngname){
        this.pngID = pngname;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", BlockConfig[this.number].icon + ".png");
    },
    getBlockNumber: function () {
        return this.number;
    }
});