/*
 * Created by Ren on 2018/6/7.
 */
let AcceleratorConfig = require("AcceleratorConfig");
let ToolConfig = require("ToolConfig");
let EfficiencyConfig = require("EfficiencyConfig");
let GameType = require("GameType");
let SpriteFrameCenter = require("SpriteFrameCenter");
let LanguageConfig = require("LanguageConfig");
const config=[AcceleratorConfig,ToolConfig,EfficiencyConfig];
const btnPng=["btn_juhuang","btn_lanse","btn_heise"];

cc.Class({
    extends:cc.Component,

    properties:{
        title:cc.Label,
        icon:cc.Sprite,
        desc_1:cc.Label,
        desc_2:cc.Label,
        btn:cc.Button,
        btntext:cc.Label,


        type:{
            visible:false,
            default:2
        },
        language:{
            visible:false,
            default:"English"
        },
        ID: {
            visible: false,
            default: 1
        },
        eventcallback:{
            visible: false,
            default: null
        }

    },
    onLoad:function(){

    },
    setIcon:function(){
        let pngname;
        if(GameType.bottomRadio.Efficiency == this.type){
            pngname = config[this.type][this.ID].coin;

        }else{
            pngname = config[this.type][this.ID].icon;
            this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box",pngname+".png");
        }
    },
    setDesc_1:function() {
        let desc  = config[this.type][this.ID].desc;
        this.desc_1.string = desc;
    },
    setTitle:function (){
        let title  = config[this.type][this.ID].title;
        if(title == null || title == undefined){
            title = "unknow";
        }else if(LanguageConfig[title] && LanguageConfig[title][this.language]){

            title = LanguageConfig[title][this.language];
        }
        this.title.string = title;
    },
    setDesc:function(){
        let desc  = config[this.type][this.ID].desc;
        if(desc == null || title == undefined){
            desc = "unknow";
        }else  if(LanguageConfig[desc] && LanguageConfig[desc][this.language]){

            desc = LanguageConfig[desc][this.language];
        }
        this.desc_1.string = desc;
    },
    setBtnDesc:function(str){
        this.btntext.string = str;

    },
    setBtnVisible:function(bool){
        this.btn.node.active= bool;
    },
    setBtnPng:function(type){
        this.btn.node.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box",btnPng[type]+".png");

    },
    setConfigInfo:function (type,info,language,callback){
        this.type = type;
        this.ID = info.id;
        this.language = language;
        this.setTitle();
        this.setIcon();
        this.setDesc_1();
        this.setBtnDesc();
        this.setBtnVisible(true);
        this.setBtnPng(1);
        this.eventcallback = callback;
    },
    onClickButton:function(){
        this.eventcallback(this.type,this.ID);

    }
})