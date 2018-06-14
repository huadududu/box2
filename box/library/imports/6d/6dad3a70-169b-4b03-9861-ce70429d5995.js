"use strict";
cc._RF.push(module, '6dad3pwFptLA5hhznBCnVmV', 'UIBottom');
// src/model/UIBottom.js

"use strict";

/*
 * Created by Ren on 2018/6/7.
 */
var AcceleratorConfig = require("AcceleratorConfig");
var ToolConfig = require("ToolConfig");
var AttributeConfig = require("AttributeConfig");
var EfficiencyConfig = require("EfficiencyConfig");
var GameType = require("GameType");
var SpriteFrameCenter = require("SpriteFrameCenter");
var LanguageConfig = require("LanguageConfig");
var config = [AcceleratorConfig, ToolConfig, EfficiencyConfig];
var Global = require("Global");
var GameUtils = require("GameUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        icon: cc.Sprite,
        desc_1: cc.Label,
        desc_2: cc.Label,
        btn: cc.Button,
        progressBar: cc.ProgressBar,
        btntext: cc.Label,

        type: {
            visible: false,
            default: 2
        },
        language: {
            visible: false,
            default: "English"
        },
        ID: {
            visible: false,
            default: 1
        },
        eventcallback: {
            visible: false,
            default: null
        },
        checkisrun: {
            visible: false,
            default: false
        }

    },
    onLoad: function onLoad() {},
    init: function init() {},

    setIcon: function setIcon() {
        var pngname = void 0;
        if (GameType.bottomRadio.Efficiency == this.type) {
            pngname = config[this.type][this.ID].coin;
        } else {
            pngname = config[this.type][this.ID].icon;
            this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", pngname + ".png");
        }
    },
    setBtnIcon: function setBtnIcon(num) {
        this.btnname = ['btn_heise', 'btn_juhuang', 'btn_lanse'];
        // this.btn.sp.spriteFrame =SpriteFrameCenter.getFrameFromAtlas("png/box",this.btnname[num]+".png");
        this.btn.normalSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", this.btnname[num] + ".png");
        this.btn.pressedSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", this.btnname[num] + ".png");
        this.btn.hoverSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", this.btnname[num] + ".png");
    },
    setDesc_1: function setDesc_1() {
        var desc = config[this.type][this.ID].desc;
        if (!desc) {
            this.desc_1.string = "config fault";
            return;
        }
        if (LanguageConfig[desc] && LanguageConfig[desc][this.language]) {
            desc = LanguageConfig[desc][this.language];
        }
        if (this.type == 0) {
            if (config[this.type][this.ID].speed > 0) desc = this.formatPrint(desc, config[this.type][this.ID].speed, config[this.type][this.ID].coin);else desc = this.formatPrint(desc, config[this.type][this.ID].coin);
        } else if (this.type == 1) {
            desc = this.formatPrint(desc, config[this.type][this.ID].att, config[this.type][this.ID].time);
        } else {
            if (config[this.type][this.ID].time > 0) {
                desc = this.formatPrint(desc, config[this.type][this.ID].time);
            } else {
                desc = this.formatPrint(desc, config[this.type][this.ID].jumptime);
            }
        }
        this.desc_1.string = desc;
    },
    setTitle: function setTitle() {
        var title = config[this.type][this.ID].title;
        if (title == null || title == undefined) {
            title = "unknow";
        } else if (LanguageConfig[title] && LanguageConfig[title][this.language]) {

            title = LanguageConfig[title][this.language];
        }
        if (this.type == 2 && config[this.type][this.ID].coin > 0) {

            title = this.formatPrint(title, config[this.type][this.ID].coin);
        }
        this.title.string = title;
    },
    setDesc: function setDesc() {
        var desc = config[this.type][this.ID].desc;
        if (desc == null || title == undefined) {
            desc = "unknow";
        } else if (LanguageConfig[desc] && LanguageConfig[desc][this.language]) {

            desc = LanguageConfig[desc][this.language];
        }
        this.desc_1.string = desc;
    },
    setBtnDesc: function setBtnDesc(str) {
        this.btntext.string = str;
    },
    setBtnVisible: function setBtnVisible(bool) {
        this.btn.node.active = bool;
    },
    setConfigInfo: function setConfigInfo(type, info, callback) {
        this.type = type;
        this.ID = info.id;
        this.setTitle();
        this.setIcon();
        this.setDesc_1();
        this.setBtnDesc();
        this.setBtnVisible(true);
        this.eventcallback = callback;
        this.setBtnState();
        if (this.type == 1) {
            this.setBtnIcon(2);
        } else if (this.type == 1) {
            this.setBtnIcon(1);
        }
    },
    setBtnState: function setBtnState() {
        switch (this.type) {
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
    setType0BtnState: function setType0BtnState() {
        if (this.checkisrun) return;
        var btntextColor = ['#000000', '#ffffff'];
        var conf = AcceleratorConfig[this.ID];
        var bool = Global['bar' + this.ID] <= 0;
        if (bool) {
            this.btntext.string = GameUtils.formatTime(conf.time);
            this.btntext.node.color = new cc.Color(btntextColor[1]);
        } else {
            this.btntext.string = GameUtils.formatTime(Global['bar' + this.ID]);
            this.btntext.node.color = new cc.Color(btntextColor[0]);
        }
        this.btn.node.active = bool;
        this.progressBar.node.active = !bool;
        this.progressBar.progress = Global['bar' + this.ID] / conf.time;
        var self = this;
        this.callback = function () {
            Global['bar' + self.ID]--;
            self.btntext.string = GameUtils.formatTime(Global['bar' + self.ID]);

            self.progressBar.progress = Global['bar' + this.ID] / conf.time;
            if (Global['bar' + self.ID] <= 0) {

                this.unschedule(this.callback);
                this.checkisrun = false;
                self.eventcallback(this.type, self.ID, 'finish');
            }
        };
        if (!bool) {
            this.checkisrun = true;
            this.schedule(this.callback, 1);
        }
    },
    setType1BtnState: function setType1BtnState() {
        var level = Global.level;
        var conf = ToolConfig[this.ID];
        var thisID = void 0;
        var confArry = void 0;
        if ("unlock" in conf) {
            if (conf.unlock.indexOf(";") != -1) {
                confArry = conf.unlock.split(";");
                thisID = confArry[0];
            } else {
                thisID = parseInt(conf.unlock);
            }
            if (thisID == -1) {
                return;
            }
            var active = false;
            if (Global.hammer[this.ID] == null || Global.hammer[this.ID] == undefined) {
                //没有激活
                if (thisID == 0) {
                    //点击激活
                    this.ButtonState(1);
                    this.btntext.string = "touch active";
                } else if (thisID == 1) {
                    //视频激励
                    this.btntext.string = "n:" + thisID + "c:" + Global.openAdTimes;
                } else if (thisID == 2) {
                    //等级激活
                    var needlvl = confArry[1];
                    if (level < needlvl) {
                        this.ButtonState(0);
                        this.btntext.string = needlvl + "级解锁";
                    } else {
                        this.ButtonState(1);
                        this.btntext.string = "touchactive";
                    }
                } else if (thisID == 3) {
                    //邀请好友
                    this.btntext.string = "n:" + confArry[1] + "c:" + Global.inviteFriends;
                }
            } else if (AttributeConfig[Global.hammer[this.ID].attribute].next == -1) {
                //达到最大
                this.ButtonState(0);
                this.btntext.string = "max";
            } else {
                //升级条件
                var conf1 = AttributeConfig[Global.hammer[this.ID].attribute];
                if (conf1.costtype = 1001) {
                    if (Global.gold > conf1.cost) {
                        this.ButtonState(1);
                    } else {
                        this.ButtonState(0);
                    }
                    this.btntext.string = GameUtils.formatNum(conf1.cost);
                }
            }
        }
    },
    setType2BtnState: function setType2BtnState() {
        var find = false;
        if (Global.efficiency[this.ID]) {
            this.ButtonState(0);
            this.btntext.string = "max";
        } else {
            var conf = EfficiencyConfig[this.ID];
            if (conf.costtype == 1002) {
                if (Global.gem >= conf.cost) {
                    this.ButtonState(1);
                } else {
                    this.ButtonState(0);
                }
                this.btntext.string = GameUtils.formatNum(conf.cost) + "^";
            }
        }
    },
    //1 可以点击  0 不可以点击
    ButtonState: function ButtonState(v) {
        if (v == 1) {
            this.btn.interactable = true;
        } else {
            this.btn.interactable = false;
        }
    },
    onClickButton: function onClickButton() {
        this.eventcallback(this.type, this.ID);
    },
    formatPrint: function formatPrint() {
        var num = arguments.length;

        var oStr = arguments[0];

        for (var i = 1; i < num; i++) {
            oStr = oStr.replace(/s%/, arguments[i]);
        }

        return oStr;
    }
});

cc._RF.pop();