/*
 * Created by Ren on 2018/6/6.
 */
let GameMenuView = require('GameMenuView');
let UIBottomFactory = require("UIBottomFactory");
let AcceleratorConfig = require("AcceleratorConfig");
let ToolConfig = require("ToolConfig");
let EfficiencyConfig = require("EfficiencyConfig");
let LevelConfig = require("LevelConfig");
let LanguageConfig = require("LanguageConfig");
let GameUtils = require("GameUtils");
let Global = require('Global');
let UILeadFactory = require("UILeadFactory");

cc.Class({
    extends:cc.Component,
    properties:{
        bottomlist:cc.Node,
        scrollView: cc.ScrollView,
        level: cc.Label,
        gold:cc.Label,
        gem:cc.Label,
        toplist:cc.Node,
        TopProgressBar:cc.ProgressBar,
        practice:cc.Node,
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
        this.itemlistNum=[];
        this.radiotext[0].string = LanguageConfig['10035'][Global.language];
        this.radiotext[1].string = LanguageConfig['10036'][Global.language];
        this.radiotext[2].string = LanguageConfig['10037'][Global.language];
        this.levelLeadNode=null;//level的引导节点

    },
    initInfo:function() {
        this.setGoldNum(Global.gold);
        this.setLevel(Global.level);
        this.setGem(Global.gem);
        let hard = Global.hard;

        let exp = LevelConfig[Global.level].exp;
        this.setProgress(Global.exp/exp);

    },
    addUIBottom:function(){
        if(this.config == undefined)
        {
            this.config=[AcceleratorConfig,ToolConfig,EfficiencyConfig];
        }
        this.itemList=[];
        let startpos = 0;

        for(var i = 0;i < this.config.length;i++){
            var j = 1;
            for(; this.config[i][j] != undefined;j++){
                let node = UIBottomFactory.create(i,this.config[i][j],this.eventcallback.bind(this));
                node.position = cc.p(startpos+75,0);
                this.bottomlist.addChild(node);
                this.itemList.push(node);
                startpos+=156;
            }
            this.itemlistNum[i]=j-1;

        }
        let single = this.itemlistNum[this.itemlistNum.length-1];
        if(single<7){
            startpos+=(7-single)*156;
        }
        let needlength = startpos+156;
        this.bottomlist.width = needlength;
        // this.bottomlist.x = needlength/2;


    },

    //设置金币
    setGoldNum: function (num) {
        let strnum = GameUtils.formatNum(num);
        this.gold.string = strnum;
    },
    setLevel: function (level) {
        this.level.string = "LEVEL"+level;
    },
    setGem: function (value){
        this.gem.string = value;
    },
    setProgress: function (value){
        let pro = this.TopProgressBar.progress;
        this.addLevelLead(value>=1);
        if (pro  == 1.0 && value ==1)
            return;
        this.levelupBtn.interactable = value>=1;

        this.TopProgressBar.progress = value;
    },

    addLevelLead:function(bool){
        if(Global.level ==1 && bool){
            if(!this.levelLeadNode){
                let node = UILeadFactory.create();
                node.position= this.levelupBtn.node.position;
                // node.ratation = 270;
                this.levelLeadNode = node;
                this.toplist.addChild(node);
            }
        }else{
            if(this.levelLeadNode && cc.isValid(this.levelLeadNode)){
                this.levelLeadNode.destroy();
                // this.levelLeadNode= null;
            }
        }
    },
    changeHammerSpine:function(data){
        this.BoxController.changeHammerSpine(data);
    },
    updateDate:function (data){
        if(data == null)
            return;
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
        if (name == "level" || name == "gold" || name == 'gem' ){
            this.updateButtom();
        }
    },
    scrollEvent: function(sender, event) {
        let thispos= sender.getScrollOffset();
        let movex = -thispos.x;
        let num1= this.itemlistNum[0]*156 - 6;
        let num2 = num1+this.itemlistNum[1]*156 - 6;
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
                let num0= this.itemlistNum[0]*156;
                this.scrollView.scrollToOffset(cc.p( num0, 0), 0.2);
                // title += "2";
                break;
            case 2:
                let num1= (this.itemlistNum[0]+this.itemlistNum[1])*156;
                this.scrollView.scrollToOffset(cc.p( num1, 0), 0.2);
                // title += "3";
                break;
            default:
                break;
        }
        // this.setCheckToggle(index);
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
            Global.btnType = 'uplevel';
            this.BoxController.upgradView.active = true;

        }
    },
    eventcallback: function(type, id,string=null) {

        this.BoxController.eventcallback(type,id,string);

    },
    updateButtom:function(){
        for(let i=0;i<this.itemList.length;i++){
            let node = this.itemList[i].getComponent("UIBottom");
            node.setBtnState();
        }
    },
    onCallBackFriends:function () {

        let prefab = cc.loader.getRes("prefab/inviteUI");
        let newNode= cc.instantiate(prefab);
        this.node.addChild(newNode);
    },


});