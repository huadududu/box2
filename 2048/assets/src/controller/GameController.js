// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
let BlockFactory = require("BlockFactory");
let Global = require("Global");
let GameState = require("GameState");
let BingLog = require("BingLog");
let GameUtils = require("GameUtils");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        BlocksController:require("BlocksController"),
        GameMenuController:require("GameMenuController"),
        startMenu:cc.Node,
        endMenu:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.endMenu.active = false;
        this.startMenu.active = true;
    },

    onPause:function(){

        cc.director.pause();
    },

    onResume:function(){

        cc.director.resume();
    },



    start() {
        // this.createBlocks();
        // this.schedule(this.refreshBlocks, 0.5);
    },
    updeteFinish:function(){
        this.endMenu.active = true;
    },
    //create block;
    onTouchStartBtn:function(){
        this.startMenu.active = false;
        this.BlocksController.startMenu();

    },
    onTouchRestartBtn:function(){
        this.endMenu.active = false;
        this.BlocksController.restartMenu();

    },
    onTouchShareBtn:function(){

    }
// update (dt) {},
})
;
