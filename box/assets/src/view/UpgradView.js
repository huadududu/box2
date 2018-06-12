/*
 * Created by Ren on 2018/6/12.
 */
let Global = require('Global');
let StageConfig = require("StageConfig");
let BoxConfig = require("BoxConfig");
let RewardConfig = require("RewardConfig");
let GameUtils = require("GameUtils");
let LevelConfig =require("LevelConfig");
cc.Class({

    extends:cc.Component,
    properties:{

        RewardLable:cc.Label,
        TitleLable:cc.Label,
        DescLable:cc.Label,
        BoxController:require('BoxController')
    },

    onLoad:function () {
    },
    onEnable:function(){
        this.addlevel();

    },
    addlevel:function(){
        let myinfo ={};
        let level =Global.level;

        let needexp = LevelConfig[ level].exp;
        let needgold = LevelConfig[ level].rewardcoin;
        Global.addgold = needgold;
        myinfo.exp =Global.exp-needexp;
        myinfo.level =Global.level+1;
        Global.saveLevel( myinfo.level);
        Global.saveExp( myinfo.exp);

        this.RewardLable.string = "x"+needgold;
        Global.addgold =needgold;
        this.BoxController.GameMenuController.updateDate(myinfo);

    },
    onVedioSureBtn:function(){
        let golds = Global.gold+Global.addgold * 3;

        if(Global.addgold>0 ){
            this.BoxController.GameMenuController.updateDate({gold:golds});
            Global.saveGold(golds);
        }
        Global.addgold =0;
        this.node.active = false;

    },
    onNextBtn:function(){
        let golds = Global.gold+Global.addgold;
        this.BoxController.GameMenuController.updateDate({gold:golds});
        Global.saveGold(golds);
        if(Global.addgold>0 ){
            this.node.active = false;
            Global.saveGold(golds);
        }
        Global.addgold =0;
        this.node.active = false;
    }

});