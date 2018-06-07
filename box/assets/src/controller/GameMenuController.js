/*
 * Created by Ren on 2018/6/6.
 */
//let BoxController = require('BoxController');
let GameMenuView = require('GameMenuView');
let UIBottomFactory = require("UIBottomFactory");
let AcceleratorConfig = require("AcceleratorConfig");
let ToolConfig = require("ToolConfig");
let EfficiencyConfig = require("EfficiencyConfig");
let LevelConfig = require("LevelConfig");
let BoxController = require("BoxController");

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
        } ,
        thisCheck:{
            visible:false,
            default:0
        }

    },
    onLoad:function(){
        this.config=[AcceleratorConfig,ToolConfig,EfficiencyConfig];
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
                let node = UIBottomFactory.create(i,this.config[i][j],"English");
                node.position = cc.p(startpos+75,0);
                this.bottomlist.addChild(node);
                this.itemList.push(node);
                startpos+=156;
            }
        }
    },
    initInfo:function(info) {
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
        this.level.string = level;
    },
    setGem: function (value){
        this.gem.string = value;
    },
    setProgress: function (value){
        this.TopProgressBar.progress = value;
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
        if(thispos.x <num1){
            this.setCheckToggle(0);
        }else if(thispos.x < num2){
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
        for( let i=0;i < this.radioButton.length;i++)
        {
            if(i == num){
                 this.radioButton[i].isChecked = true;
            }
            else{
                 this.radioButton[i].isChecked = false;
            }
        }
    }

});