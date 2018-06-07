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
        text:cc.Label ,
        lineNum:0,
        columnNum:0,
        type:{
            default:GameType.profabType.BlockBig,
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
        this.pngID= pngname;
          this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box",BlockConfig[this.pngID].resources+".png");
    },
    setPosNum:function(x,y){
        this.lineNum=x;
        this.columnNum = y;
        this.text.getComponent(cc.Label).string=x+","+y;
    },
    getLineNum:function() {
        return this.lineNum;
    },
    getcolumnNum:function(){
        return this.columnNum;
    },
    getPngId:function(){
        return BlockConfig[this.pngID].texiao;
    }
});