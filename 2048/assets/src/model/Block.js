/**
 * Created by bing on 18/04/2018.
 */

// let GameType = require("GameType");
let SpriteFrameCenter = require("SpriteFrameCenter");
let BlockConfig = require("ToolConfig");
let fontColor = ["#766D66","#ffffff"];
cc.Class({
    extends:cc.Component,

    properties:{
        sp:cc.Sprite,
        numberLab:cc.Label,
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
    setBlockPng: function(num){
        this.pngID = num;
        this.number = num;
        if(num<=2){
            this.numberLab.node.color = new cc.Color(118,109,112);
        }else{
            this.numberLab.node.color = new cc.Color(255,255,255);
        }
        let showNum =  Math.pow(2,parseInt(num)).toString();
        this.numberLab.string = showNum;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game","common_"+showNum + ".png");
    },
    getBlockNumber: function () {
        return this.number;
    },
    setBlockNumber: function (num) {
        this.pngID = num;
        this.number = num;
        let showNum =  Math.pow(2,num).toString();
        this.numberLab.string = showNum;
        if(num<=2){
            this.numberLab.node.color = new cc.Color(118,109,112);
        }else{
            this.numberLab.node.color = new cc.Color(255,255,255);
        }
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", "common_"+showNum + ".png");
    },
    setBlockPos:function(line,row){
        this.lineNum = line;
        this.rowNum  = row;
    }
});