/*
 * Created by Ren on 2018/7/3.
 */
let Global = require("Global");
cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function () {
        this.gameController = cc.find("Canvas").getComponent("GameController");
    },
    updateScore: function () {
        this.scoreLabel.string = Global.thisscore;
    },

    onTouchBtn2: function () {

        this.gameController.BlocksController.changeNextNum(1);

    },
    onTouchBtn4: function () {

        this.gameController.BlocksController.changeNextNum(2);

    },

    onTouchBtn8: function () {

        this.gameController.BlocksController.changeNextNum(3);

    },

    onTouchBtn16: function () {

        this.gameController.BlocksController.changeNextNum(4);

    },

    onTouchBtn32: function () {

        this.gameController.BlocksController.changeNextNum(5);

    },
    onTouchBtn64: function () {

        this.gameController.BlocksController.changeNextNum(6);

    },
    onTouchBtnOther: function (even,num) {
        let next = parseInt(num)

        this.gameController.BlocksController.changeNextNum(next);

    },
    onTouchCreatGold: function () {

        this.gameController.BlocksController.GMCreateGold();
        // cc.director.loadScene("gamemenu");
    },
    onTouchResetMyRank:function(){
        let GameConfig = require("GameConfig");
        if (GameConfig.isFBInstantGame()) {
            let FBP = require("Plugin");
            FBP.setScoreAsync(GameConfig.LeaderBoardName, 68673, null);
        }
    }

});