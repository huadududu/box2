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
let Global = require("Global");
let GameUtils = require("GameUtils");

cc.Class({
    extends:cc.Component,

    properties:{
        title:cc.Label,
        icon:cc.Sprite,
        iconLabel:cc.Label,
        desc_1:cc.Label,
        btn:cc.Button,
        progressBar:cc.ProgressBar,
        btntext:cc.Label,
        iconGem:cc.Sprite,

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
        },
        checkisrun:{
            visible:false,
            default:false
        }

    },
    onLoad:function(){
    },
    init: function(){
    },

    setIcon:function(pngicon = null){
        let pngname;
        var bool = GameType.bottomRadio.Efficiency == this.type;
        this.icon.node.active = !bool;
        this.iconLabel.node.active = bool;
        if(bool){
            if(pngicon != null){
                pngname = pngicon;
            }else{
                let time = config[this.type][this.ID].time;
                if(time >0){
                    pngname = "X"+time;
                }else{
                    let jumptime = config[this.type][this.ID].jumptime;
                    pngname = this.formatDayTest(jumptime);
                    // pngname = "x"+config[this.type][this.ID].jumptime;
                }
            }
            this.iconLabel.string =pngname;

        }else{
            if(pngicon != null){
                pngname = pngicon;
            }else{
                pngname = config[this.type][this.ID].icon;
            }
            this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box",pngname+".png");
        }
    },
    setBtnIcon:function(num){
        this.btnname=['btn_heise','btn_juhuang','btn_lanse'];
        // this.btn.sp.spriteFrame =SpriteFrameCenter.getFrameFromAtlas("png/box",this.btnname[num]+".png");
        this.btn.normalSprite =SpriteFrameCenter.getFrameFromAtlas("png/box",this.btnname[num]+".png");
        this.btn.pressedSprite =SpriteFrameCenter.getFrameFromAtlas("png/box",this.btnname[num]+".png");
        this.btn.hoverSprite =SpriteFrameCenter.getFrameFromAtlas("png/box",this.btnname[num]+".png");
    },
    setDesc_1:function() {
        let desc;
        let attnum;
        if(this.type != 1){
            desc = config[this.type][this.ID].desc;
        }else{

            if(Global.hammer[this.ID] != null){
                attnum = Global.hammer[this.ID].attribute;
            }else{
                attnum =config[this.type][this.ID].attribute;
            }
            desc = AttributeConfig[attnum].desc;

        }
        if(!desc){
            this.desc_1.string = "config fault";
            return;
        }
        if(LanguageConfig[desc] && LanguageConfig[desc][this.language]){
            desc=  LanguageConfig[desc][this.language];
        }
        if(this.type == 0 ){
            if(config[this.type][this.ID].speed>0)
                desc= this.formatPrint(desc,config[this.type][this.ID].speed,config[this.type][this.ID].coin);
            else
                desc= this.formatPrint(desc,config[this.type][this.ID].coin);
        }else if(this.type == 1){
            desc= this.formatPrint(desc,AttributeConfig[attnum].att,AttributeConfig[attnum].time);

        }else{
            if(config[this.type][this.ID].time>0){
                desc= this.formatPrint(desc,config[this.type][this.ID].time);
            }else{
                desc= this.formatPrint(desc,config[this.type][this.ID].jumptime);
            }
        }
        this.desc_1.string = desc;
    },
    setTitle:function (){
        let title  = config[this.type][this.ID].title;
        if(title == null || title == undefined){
            title = "unknow";
        }else if(LanguageConfig[title] && LanguageConfig[title][this.language]){

            title = LanguageConfig[title][this.language];
        }
        if(this.type == 2 &&config[this.type][this.ID].coin>0){

            title=this.formatPrint(title,config[this.type][this.ID].coin);
        }
        this.title.string = title;
    },
    setBtnVisible:function(bool){
        this.btn.node.active= bool;
    },
    setConfigInfo:function (type,info,callback){
        this.type = type;
        this.ID = info.id;
        this.setTitle();
        this.setDesc_1();
        this.setIcon();
        // this.setBtnVisible(true);
        this.eventcallback = callback;
        this.setBtnState();
        if(this.type ==1){
            this.setBtnIcon(2);
        }else if(this.type == 1){
            this.setBtnIcon(1);

        }
    },
    setBtnState:function(){

        switch(this.type){
            case 0:
                this.setType0BtnState();
                break;
            case 1:
                this.setType1BtnState();
                break;
            case 2:

                this.setType2BtnState();

                break;
        }

    },
    setType0BtnState:function(){
        if(this.checkisrun)
            return;
        let btntextColor=['#000000','#ffffff',];
        let conf = AcceleratorConfig[this.ID];
        let bool = Global['bar'+this.ID] <= 0;
        if(bool){
            this.btntext.string =GameUtils.formatTime(conf.time);
            this.btntext.node.color = new cc.Color(btntextColor[1]);
        }else{
            this.btntext.string =GameUtils.formatTime(Global['bar'+this.ID]);
            this.btntext.node.color = new cc.Color(btntextColor[0]);
        }
        this.btn.node.active = bool;
        this.progressBar.node.active = !bool;
        this.progressBar.progress = Global['bar'+this.ID]/conf.time;
        let self = this;
        this.callback = function(){
            Global['bar'+self.ID]--;
            self.btntext.string = GameUtils.formatTime(Global['bar'+self.ID]);

            self.progressBar.progress = Global['bar'+this.ID]/conf.time;
            if(Global['bar'+self.ID] <=0){

                this.unschedule(this.callback);
                this.checkisrun= false;
                self.eventcallback(this.type,self.ID,'finish');
            }

        }
        if(!bool){
            this.checkisrun= true;
            this.schedule(this.callback,1)
        }
    },
    setType1BtnState:function(){
        let level = Global.level;
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
                let iconpng = config[this.type][this.ID].locked;
                this.setIcon(iconpng);
                if(thisID == 0){//点击激活
                    this.ButtonState(1);
                    // this.btntext.string="touch active";
                    this.btntext.string= LanguageConfig['10020'][this.language];

                }else if(thisID == 1){//视频激励
                    // this.btntext.string = "n:"+thisID+"c:"+Global.openAdTimes;
                    this.btntext.string= LanguageConfig['10022'][this.language];
                    this.title.node.active = false;
                }else if(thisID == 2){//等级激活
                    let needlvl = confArry[1];
                    if(level<needlvl){
                        this.ButtonState(0);
                       let str= LanguageConfig['10021'][this.language];
                        // this.btntext.string='Lv'+needlvl;
                         this.btntext.string=this.formatPrint(str,needlvl);
                        this.title.node.active = false;
                    }else{
                        this.ButtonState(1);
                        // this.btntext.string="touchactive";
                        this.btntext.string= LanguageConfig['10020'][this.language];
                    }
                    this.title.node.active = false;
                }else if(thisID == 3){//邀请好友
                    // this.btntext.string = "n:"+confArry[1]+"c:"+Global.inviteFriends;
                    if(Global.inviteFriends == 0){
                        this.btntext.string= LanguageConfig['10023'][this.language];
                    }else if(confArry[1]>Global.inviteFriends){
                        this.btntext.string= Global.inviteFriends+'／'+confArry[1];
                    }else{//邀请的数量够
                        this.btntext.string= LanguageConfig['10020'][this.language];
                    }
                    this.title.node.active = false;
                }
            } else if(  AttributeConfig[Global.hammer[this.ID].attribute].next == -1){//达到最大
                this.ButtonState(0);
                // this.btntext.string = "max";
                this.btntext.string = LanguageConfig['10024'][this.language];
                this.setIcon();
            }
            else{//升级条件
                this.title.node.active = true;
                let conf1= AttributeConfig[Global.hammer[this.ID].attribute];
                if(conf1.costtype = 1001){
                    if(Global.gold>conf1.cost){
                        this.ButtonState(1);
                    }else{
                        this.ButtonState(0);
                    }
                    this.btntext.string = GameUtils.formatNum(conf1.cost);
                }
                this.setIcon();
            }


        }
        this.setDesc_1();
    },
    setType2BtnState:function(){
        let find = false;
        if(Global.efficiency[this.ID]){
            this.ButtonState(0);
            this.btntext.string ="max";
        }else{
            let conf = EfficiencyConfig[this.ID];
            if(conf.costtype == 1002){
                if(Global.gem>= conf.cost){
                    this.ButtonState(1);
                }
                else{
                    this.ButtonState(0);
                }
                this.btntext.string = GameUtils.formatNum(conf.cost);
                this.iconGem.node.active = true;
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
    },
    formatPrint:function() {
        var num = arguments.length;

        var oStr = arguments[0];

        for (var i = 1; i < num; i++) {
            oStr = oStr.replace(/s%/, arguments[i]);
        }

        return oStr;
    },
    formatDayTest:function(jumptime) {
        let str = "";
        let jumpstr="";
        if(jumptime>=24){
            str = LanguageConfig['10025'][this.language];
            str=this.formatPrint(str,Math.floor(jumptime/24));
            jumpstr+= str;
            jumptime%=24;

        }
        if(jumptime>0){
            str = LanguageConfig['10019'][this.language];
            str=this.formatPrint(str,jumptime);
            jumpstr+= str;
        }
        return jumpstr;
    }


})