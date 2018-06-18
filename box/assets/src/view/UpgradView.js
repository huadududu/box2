/*
 * Created by Ren on 2018/6/12.
 */
let Global = require('Global');
let StageConfig = require("StageConfig");
let BoxConfig = require("BoxConfig");
let RewardConfig = require("RewardConfig");
let GameUtils = require("GameUtils");
let LevelConfig =require("LevelConfig");
let EfficiencyConfig =require("EfficiencyConfig");
cc.Class({

    extends:cc.Component,
    properties:{

        RewardLable:cc.Label,
        TitleLable:cc.Label,
        DescLable:cc.Label,
        vediodesc:cc.Label,
        BoxController:require('BoxController')
    },

    onLoad:function () {
        this.type;
        this.msg={'uplevel':3,'skip':2,'outline':2};
    },
    onEnable:function(){
        this.type= this.msg[Global.btnType];
        if(Global.typebtn == 'uplevel')
        {
            this.addlevel();

        }
        else if(Global.typebtn == 'skip'){
            this.jumpTimeReward();

        }else{
            this.outlineReward();
        }


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
        this.vediodesc.string = 'x'+this.type;
        this.RewardLable.string = "x"+needgold;
        Global.addgold =needgold;
        this.BoxController.GameMenuController.updateDate(myinfo);
    },
    //离线奖励
    outlineReward:function(){

        this.RewardLable.string = "x"+Global.addgold;
        this.vediodesc.string = 'x'+this.type;

    },
    //跳过时间
    jumpTimeReward:function(){
        this.RewardLable.string = "x"+Global.addgold;
        this.vediodesc.string = 'x'+this.type;

    },
    onVedioSureBtn:function(){
        let golds = Global.gold+Global.addgold *  this.type;
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