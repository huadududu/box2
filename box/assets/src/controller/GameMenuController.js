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
        ToggleContainer: cc.ToggleContainer,

    },
    onLoad:function(){
        this.config=[AcceleratorConfig,ToolConfig,EfficiencyConfig];
    },
    addUIBottom:function(){
        let startpos = -this.bottomlist.width/2;
        for(var i = 0;i < this.config.length;i++){
            for(var j = 1; this.config[i][j] != undefined;j++){
                let node = UIBottomFactory.create(i,this.config[i][j],"English");
                node.position = cc.p(startpos+75,0);
                this.bottomlist.addChild(node);
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
    }
});