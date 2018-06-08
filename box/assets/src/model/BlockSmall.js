/**
 * Created by bing on 18/04/2018.
 */

let GameType = require("GameType");
let SpriteFrameCenter = require("SpriteFrameCenter");
let BlockConfig = require("BlockConfig");
cc.Class({
        extends:cc.Component,

    properties:{
        sp:cc.Sprite,
        lineNum:0,
        columnNum:0,
        type:{
            default:GameType.profabType.BlockSmall,
            override:true,
            visible:false
        },
        pngID:{
            default:1,
            visible:false,
        }
    },

    //count
    init:function () {
        BingLog.log("BlockSmall init:");
    },

    onLoad:function () {
        // BingLog.log("tanke onLoad");
        // this.updateNode();
    },
    setBlockPng: function(pngname){
        this.pngID= pngname;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box",BlockConfig[pngname].resources+".png");
    },
    getPngId:function(){
        return BlockConfig[this.pngID].texiao;
    }
});