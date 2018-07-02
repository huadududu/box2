/*
 * Created by Ren on 2018/7/2.
 */
let Global = require("Global");
cc.Class({
    extends: cc.Component,
    properties: {
        scoreLabel: cc.Label,
        nextScoreLabel:require("Block"),

    },
    onLoad:function(){
        this.gameController = cc.find("Canvas").getComponent("GameController");
    },
    updateScore:function(){
        this.scoreLabel.string = Global.thisscore;
    },
    updateNext:function(num){
        this.nextScoreLabel.setBlockNumber(num);
    },
    onTouchPasueBtn:function(num){

        this.gameController.BlocksController.pauseAll();

    }

});