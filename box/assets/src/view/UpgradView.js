/*
 * Created by Ren on 2018/6/12.
 */
let Global = require('Global');
let StageConfig = require("StageConfig");
let BoxConfig = require("BoxConfig");
let RewardConfig = require("RewardConfig");
let GameConfig = require("GameConfig");
let GameUtils = require("GameUtils");
let LevelConfig =require("LevelConfig");
let EfficiencyConfig =require("EfficiencyConfig");
let LanguageConfig = require("LanguageConfig");
cc.Class({

    extends:cc.Component,
    properties:{

        RewardLable:cc.Label,
        TitleLable:cc.Label,
        DescLable:cc.Label,
        vediodesc:cc.Label,
        nextdesc:cc.Label,
        BoxController:require('BoxController'),
        language:'English'
    },

    onLoad:function () {
        this.type;
        this.msg={'uplevel':3,'skip':2,'outline':2};
    },
    onEnable:function(){
        this.type= this.msg[Global.btnType];
        if(Global.btnType == 'uplevel')
        {
            this.addlevel();

        }
        else if(Global.btnType == 'skip'){
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
        let claim = LanguageConfig['10028'][Global.language];
        this.TitleLable.string = LanguageConfig['10026'][Global.language];
        this.DescLable.string = LanguageConfig['10027'][Global.language];
        needgold = GameUtils.formatNumMAX(needgold);
        this.RewardLable.string = "x"+needgold;
        this.nextdesc.string = claim;
        this.vediodesc.string = claim+'x'+this.type;
        Global.addgold =needgold;
        this.BoxController.GameMenuController.updateDate(myinfo);
    },
    //离线奖励
    outlineReward:function(){

        let claim = LanguageConfig['10028'][Global.language];
        this.TitleLable.string = LanguageConfig['10033'][Global.language];
        this.DescLable.string = LanguageConfig['10032'][Global.language];
        let  needgold = GameUtils.formatNumMAX(Global.addgold);
        this.RewardLable.string = "x"+needgold;
        this.nextdesc.string = claim;
        this.vediodesc.string = claim+'x'+this.type;

    },
    //跳过时间
    jumpTimeReward:function(){
        let claim = LanguageConfig['10028'][Global.language];
        let desc= LanguageConfig['10031'][Global.language];
        let time = EfficiencyConfig[Global.skipID].jumptime;
        desc= GameUtils.formatHour(desc,time);
        Global.addgold = Math.floor(Global.addgold);
        this.TitleLable.string = LanguageConfig['10017'][Global.language];
        this.DescLable.string =desc;
        let  needgold = GameUtils.formatNumMAX(Global.addgold);
        this.RewardLable.string = "x"+needgold;
        this.nextdesc.string = claim;
        this.vediodesc.string = claim+'x'+this.type;
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

    },
    onVedioSureBtn:function() {


        if (GameConfig.isFBInstantGame()) {
            this.BoxController.loadingView.active = true;
            let FBP = require("FBPlugin");
            FBP.RewardedVideoAsync(this.seeAdCallBack);
        } else {
            this.BoxController.loadingView.active = true;//[change]
            this.seeAdCallBack();
        }

    },
    seeAdCallBack:function(){
        this.BoxController.loadingView.active= false;
        let golds = Global.gold+Global.addgold *  this.type;
        if(Global.addgold>0 ){
            this.BoxController.GameMenuController.updateDate({gold:golds});
            Global.saveGold(golds);
        }
        Global.addgold =0;
        this.node.active = false;


    },

});