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

cc.Class({
    extends:cc.Component,
    properties:{
        node:cc.Node,
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

        thisCheck:{
            visible:false,
            default:0
        },

        BoxController:{
            default:null,
            visible:false
        },

    },
    onLoad:function(){
        this.BoxController = cc.find("Canvas").getComponent("BoxController");

        this.config=[AcceleratorConfig,ToolConfig,EfficiencyConfig];
        this.itemList=[];
        if(this.myinfo == null || this.myinfo  == undefined) {
            this.myinfo = null;
        }


    },
    addUIBottom:function(){
        if(this.config == undefined)
        {
            this.onLoad();
        }
        this.itemList=[];
        let startpos = -this.bottomlist.width/2;
        for(var i = 0;i < this.config.length;i++){
            for(var j = 1; this.config[i][j] != undefined;j++){
                let node = UIBottomFactory.create(i,this.config[i][j],"English",this.eventcallback.bind(this));
                node.position = cc.p(startpos+75,0);
                this.bottomlist.addChild(node);
                this.itemList.push(node);
                startpos+=156;
            }
        }
    },
    initInfo:function(info) {
        this.myinfo = info;
        this.setGoldNum(info.gold);
        this.setLevel(info.level);
        this.setGem(info.gem);
        let hard = info.hard;

        let exp = LevelConfig[info.hard].exp;

        this.setProgress(info.exp/exp);
        // this.ToggleContainer(info.gold);

    },
    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
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
        this.TopProgressBar.progress = value;
    },
    toolChange:function(id) {
        let info = ToolConfig[id];
        let animation = info.animation;
         // this.BoxController.changeHammerSpine(animation);
        let node = this.BoxController.hammer;
        SkeletonDataCenter.addSkeletonData(animation,node);
    },
    changeHammerSpine:function(data){
         this.BoxController.changeHammerSpine(data);
    },
    updateDate:function (data){
        for( var name in data){
            if(name =='exp'){
                let exp = LevelConfig[this.myinfo.hard].exp;
                let pro = data.exp/exp;
                if(pro >1)
                    pro = 1;

                this.setProgress(pro);
            }
            if(name == "level"){

                this.setLevel(data.level);

            }
        }
    },
    scrollEvent: function(sender, event) {
        let thispos= sender.getScrollOffset();
        // switch(event) {
        //     case 2: //left
        //        // this.lblScrollEvent.string = "Scroll to Left";
        //        break;
        //     case 3: ////right
        //        // this.lblScrollEvent.string = "Scroll to Right"; 
        //        break;
        //    }
        let num1= 2*156;
        let num2 = 3*156;
        if(-thispos.x <num1){
            this.setCheckToggle(0);
        }else if(-thispos.x < num2){
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
                let num2= 4*156;
                this.scrollView.scrollToOffset(cc.p( num2, 0), 0.2);
                // title += "3";
                break;
            default:
                break;
        }
    },

    setCheckToggle: function(num) {
        if( this.thisCheck == num )
            return;
        this.thisCheck= num;
        for( let i=0;i < this.radioButton.length;i++)
        {
            if(i == num){
                this.radioButton[i].isChecked = true;
            }
            else{
                this.radioButton[i].isChecked = false;
            }
        }
    },
    eventcallback: function(type, id) {
        // let node= this.itemList.indexOf(sender);
        switch (type) {
            case 0:
                break;
            case 1:
                // let info = ToolConfig[id];
                // let animation = info.animation;
                // // BoxController.changeHammerSpine(animation);
                // SkeletonDataCenter.addSkeletonData(animation, BoxController.changeHammerSpine);
                this.toolChange(id);
                break;
            case 2:
                break;
        }
    },

    //点击升级按钮
    onClickLevel:function(){
        if(this.TopProgressBar.progress >=1){
            this.myinfo.level+=1;

        }

    },

});