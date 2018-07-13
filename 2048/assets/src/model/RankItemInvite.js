/**
 * Created by bing on 31/05/2018.
 */


let GameUtils = require("GameUtils");
let SpriteFrameCenter = require("SpriteFrameCenter");
let GameConfig = require("GameConfig");


cc.Class({
    extends:cc.Component,

    properties:{
    },

    onLoad:function () {

    },

    onInvite:function () {
        if(GameConfig.isFBInstantGame()){
            let FBP = require("Plugin");
            FBP.chooseAsync();
        }
    },


});