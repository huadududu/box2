/*
 * Created by Ren on 2018/6/7.
 */
let AcceleratorConfig = require("AcceleratorConfig");
let ToolConfig = require("ToolConfig");
let AttributeConfig = require("AttributeConfig");
let EfficiencyConfig = require("EfficiencyConfig");
let GameType = require("GameType");
let SpriteFrameCenter = require("SpriteFrameCenter");
let LanguageConfig = require("LanguageConfig");
const config=[AcceleratorConfig,ToolConfig,EfficiencyConfig];
const btnPng=["btn_juhuang","btn_lanse","btn_heise"];
let Global = require("Global");
let GameUtils = require("GameUtils");

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
    setConfigInfo:function (type,info,callback){
        this.type = type;
        this.ID = info.id;
        this.setTitle();
        this.setIcon();
        this.setDesc_1();
        this.setBtnDesc();
        this.setBtnVisible(true);
        this.setBtnPng(1);
        this.eventcallback = callback;
        this.setBtnState();
    },
    setBtnState:function(){
        let level = Global.level;
        if(this.type == 1){
            let conf = ToolConfig[this.ID];
            let thisID;
            let confArry;
            if("unlock" in conf){
                if(conf.unlock.indexOf(";") != -1){
                    confArry = conf.unlock.split(";");
                    thisID=confArry[0];
                }else{
                    thisID=parseInt(conf.unlock);
                }
                if(thisID == -1) {
                   return;
                }
                let active = false;
                if(Global.hammer[this.ID] == null || Global.hammer[this.ID]  == undefined){//没有激活
                    if(thisID == 0){//点击激活
                        this.ButtonState(1);
                        this.btntext.string="touch active";
                    }else if(thisID == 1){//视频激励
                        this.btntext.string = "n:"+thisID+"c:"+Global.openAdTimes;
                    }else if(thisID == 2){//等级激活
                        let needlvl = confArry[1];
                        if(level<needlvl){
                            this.ButtonState(0);
                            this.btntext.string=needlvl+"级解锁";
                        }else{
                            this.ButtonState(1);
                            this.btntext.string="touchactive";
                        }

                    }else if(thisID == 3){//邀请好友
                        this.btntext.string = "n:"+confArry[1]+"c:"+Global.inviteFriends;

                    }
                } else if(  AttributeConfig[Global.hammer[this.ID].attribute].next == -1){//达到最大
                    this.ButtonState(0);
                    this.btntext.string = "max";
                }
                else{//升级条件
                    let conf1= AttributeConfig[Global.hammer[this.ID].attribute];
                    if(conf1.costtype = 1001){
                        if(Global.gold>conf1.cost){
                            this.ButtonState(1);
                        }else{
                            this.ButtonState(0);
                        }
                        this.btntext.string = GameUtils.formatNum(conf1.cost);
                    }
                }

            }
        }
    },
    //1 可以点击  0 不可以点击
    ButtonState:function(v){
        if(v == 1){
            this.btn.interactable = true;
        }else{
            this.btn.interactable = false;
        }
    },
    onClickButton:function(){
        this.eventcallback(this.type,this.ID);
    }
})