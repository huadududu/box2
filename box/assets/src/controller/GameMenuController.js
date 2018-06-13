/*
 * Created by Ren on 2018/6/6.
 */
let GameMenuView = require('GameMenuView');
let UIBottomFactory = require("UIBottomFactory");
let AcceleratorConfig = require("AcceleratorConfig");
let ToolConfig = require("ToolConfig");
let EfficiencyConfig = require("EfficiencyConfig");
let LevelConfig = require("LevelConfig");
let ParticleSystemCenter = require("ParticleSystemCenter");
let SkeletonDataCenter = require("SkeletonDataCenter");
let Global = require('Global');

cc.Class({
    extends:cc.Component,
    properties:{
        bottomlist:cc.Node,
        scrollView: cc.ScrollView,
        level: cc.Label,
        gold:cc.Label,
        gem:cc.Label,
        TopProgressBar:cc.ProgressBar,
        radioButton:{
            default:[],
            type:cc.Toggle
        },
        levelupBtn:cc.Button,
        thisCheck:{
            visible:false,
            default:0
        },
        radiotext:{
            default:[],
            type:cc.Label
        },
        BoxController: require("BoxController")

    },
    onLoad:function(){

        this.config=[AcceleratorConfig,ToolConfig,EfficiencyConfig];
        this.itemList=[];
        this.btnColor=['#ffa30f','#f9f9f9'];
        },
    addUIBottom:function(){
        if(this.config == undefined)
        {
            this.config=[AcceleratorConfig,ToolConfig,EfficiencyConfig];
        }
        this.itemList=[];
        let startpos = -this.bottomlist.width/2;
        for(var i = 0;i < this.config.length;i++){
            for(var j = 1; this.config[i][j] != undefined;j++){
                let node = UIBottomFactory.create(i,this.config[i][j],this.eventcallback.bind(this));
                node.position = cc.p(startpos+75,0);
                this.bottomlist.addChild(node);
                this.itemList.push(node);
                startpos+=156;
            }
        }
    },
    initInfo:function() {
        this.setGoldNum(Global.gold);
        this.setLevel(Global.level);
        this.setGem(Global.gem);
        let hard = Global.hard;

        let exp = LevelConfig[Global.level].exp;
        this.setProgress(Global.exp/exp);

    },
    //设置金币
    setGoldNum: function (num) {
        this.gold.string = num;
    },
    setLevel: function (level) {
        this.level.string = "level:"+level;
    },
    setGem: function (value){
        this.gem.string = value;
    },
    setProgress: function (value){
        let pro = this.TopProgressBar.progress;
        if (pro  == 1.0 && value ==1)
            return;
        this.levelupBtn.interactable = value>=1;
        this.TopProgressBar.progress = value;
    },

    changeHammerSpine:function(data){
        this.BoxController.changeHammerSpine(data);
    },
    updateDate:function (data){
        for( var name in data) {
            if (name == 'exp') {
                let exp = LevelConfig[Global.level].exp;
                let pro = data.exp / exp;
                if (pro > 1)
                    pro = 1;

                this.setProgress(pro);
            }
            if (name == "level") {

                this.setLevel(data.level);
            }
            if (name == "gold") {
                this.setGoldNum(data.gold);
            }
            if(name == 'gem'){
                this.setGem(data.gem);
            }
        }
        if (name == "level" || name == "gold" ){
            this.updateButtom();
        }
    },
    scrollEvent: function(sender, event) {
        let thispos= sender.getScrollOffset();
        let movex = -thispos.x;
        // switch(event) {
        //     case 2: //left
        //        // this.lblScrollEvent.string = "Scroll to Left";
        //        break;
        //     case 3: ////right
        //        // this.lblScrollEvent.string = "Scroll to Right"; 
        //        break;
        //    }
        let num1= 310;
        let num2 = 1240;
        if(movex <num1){
            this.setCheckToggle(0);
        }else if(movex <num2){
            this.setCheckToggle(1);

        }else{
            this.setCheckToggle(2);
        }
    },

    radioButtonClicked: function(toggle) {
        var index = this.radioButton.indexOf(toggle);
        // var title = "RadioButton";
        switch(index) {
            case 0:
                // title += "1";
                this.scrollView.scrollToOffset(cc.p(0 , 0), 0.2);
                break;
            case 1:
                let num1= 2*156;
                this.scrollView.scrollToOffset(cc.p( num1, 0), 0.2);
                // title += "2";
                break;
            case 2:
                let num2= 8*156;
                this.scrollView.scrollToOffset(cc.p( num2, 0), 0.2);
                // title += "3";
                break;
            default:
                break;
        }
        this.setCheckToggle(index);
    },

    setCheckToggle: function(num) {
        if( this.thisCheck == num )
            return;
        this.thisCheck= num;
        for( let i=0;i < this.radioButton.length;i++)
        {
            if(i == num){
                // this.radioButton[i].isChecked = true;
                this.radiotext[i].node.color = new cc.color(this.btnColor[0]);
            }
            else{
                // this.radioButton[i].isChecked = false;
                this.radiotext[i].node.color =new cc.color(this.btnColor[1]);
            }
        }
    },


    //点击升级按钮
    onClickLevel:function(){
        if(this.TopProgressBar.progress >=1){
            this.BoxController.upgradView.active = true;
        }
    },
    addlevel:function(){
            let myinfo ={};
            let level =Global.level+1;
            let needexp = LevelConfig[ level].exp;
            let needgold = LevelConfig[ level].rewardcoin;
            myinfo.level = level;
            Global.saveLevel( level);
            myinfo.exp =Global.exp-needexp;
            Global.saveExp( myinfo.exp);
            myinfo.gold = Global.gold+needgold;
            Global.saveGold(myinfo.gold);
            this.updateDate(myinfo);

    },
    eventcallback: function(type, id,string=null) {

        this.BoxController.eventcallback(type,id,string);


    },
    updateButtom:function(){
        for(let i=0;i<this.itemList.length;i++){
            let node = this.itemList[i].getComponent("UIBottom");
            node.setBtnState();
        }
    }
});