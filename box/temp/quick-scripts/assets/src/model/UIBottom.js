(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/UIBottom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6dad3pwFptLA5hhznBCnVmV', 'UIBottom', __filename);
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
        iconLabel: cc.Label,
        desc_1: cc.Label,
        btn: cc.Button,
        progressBar: cc.ProgressBar,
        btntext: cc.Label,
        iconGem: cc.Sprite,
        iconlead: cc.Node,
        icon_gold: cc.Sprite,
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
        },
        lockState: {
            visible: false,
            default: false
        }
        // GameState:{
        //     visible:false,
        //     default:2
        // }

    },
    onLoad: function onLoad() {
        //0 can't active 1: can active 2:have active but can't upgrad,3:have active but can't upgrad,4:max
        this.GameState = 2;
    },
    init: function init() {},

    setIcon: function setIcon() {
        var pngname = void 0;
        var bool = GameType.bottomRadio.Efficiency == this.type;
        this.icon.node.active = !bool;
        this.iconLabel.node.active = bool;
        this.icon_gold.node.active = false;
        if (this.GameState == 0) {
            var iconpng = config[this.type][this.ID].locked;
            this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", iconpng + ".png");
            return;
        }
        if (bool) {
            var coin = config[this.type][this.ID].coin;
            if (coin > 0) {
                pngname = "X" + coin;
                this.icon_gold.node.active = true;
                this.iconLabel.node.x = -30;
            } else {
                var jumptime = config[this.type][this.ID].jumptime;
                pngname = this.formatDayTest(jumptime);
                this.iconLabel.node.x = -50;
                // pngname = "x"+config[this.type][this.ID].jumptime;
            }
            this.iconLabel.string = pngname;
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
        var desc = void 0;
        var attnum = void 0;
        this.desc_1.node.active = this.GameState != 0;
        if (this.type != 1) {
            desc = config[this.type][this.ID].desc;
        } else {

            if (Global.hammer[this.ID] != null) {
                attnum = Global.hammer[this.ID].attribute;
            } else {
                attnum = config[this.type][this.ID].attribute;
            }
            desc = AttributeConfig[attnum].desc;
        }
        if (!desc) {
            this.desc_1.string = "config fault";
            return;
        }
        if (LanguageConfig[desc] && LanguageConfig[desc][Global.language]) {
            desc = LanguageConfig[desc][Global.language];
        }
        if (this.type == 0) {
            if (config[this.type][this.ID].speed > 0) desc = this.formatPrint(desc, config[this.type][this.ID].speed, config[this.type][this.ID].coin);else desc = this.formatPrint(desc, config[this.type][this.ID].coin);
        } else if (this.type == 1) {
            desc = this.formatPrint(desc, AttributeConfig[attnum].att, AttributeConfig[attnum].time);
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
        this.title.node.active = this.GameState != 0;
        var title = config[this.type][this.ID].title;
        if (title == null || title == undefined) {
            title = "unknow";
        } else if (LanguageConfig[title] && LanguageConfig[title][Global.language]) {

            title = LanguageConfig[title][Global.language];
        }
        if (this.type == 2 && config[this.type][this.ID].coin > 0) {

            title = this.formatPrint(title, config[this.type][this.ID].coin);
        }
        this.title.string = title;
    },
    setBtnVisible: function setBtnVisible(bool) {
        this.btn.node.active = bool;
    },
    setConfigInfo: function setConfigInfo(type, info, callback) {
        this.type = type;
        this.ID = info.id;

        // this.setBtnVisible(true);
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
        this.setTitle();
        this.setDesc_1();
        this.setIcon();
        this.setLeadState();
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
                var iconpng = config[this.type][this.ID].locked;
                if (thisID == 0) {
                    //点击激活
                    this.btntext.string = LanguageConfig['10020'][Global.language];
                    this.GameState = 1;
                } else if (thisID == 1) {
                    //视频激励

                    if (Global.hammer[this.ID - 1]) {
                        this.GameState = 1;
                        if (Global.openAdTimes > 0) {
                            //看广告了
                            this.btntext.string = LanguageConfig['10020'][Global.language];
                        } else {
                            //没看
                            this.btntext.string = LanguageConfig['10022'][Global.language];
                        }
                    } else {
                        this.btntext.string = LanguageConfig['10022'][Global.language];
                        this.GameState = 0;
                    }
                } else if (thisID == 2) {
                    //等级激活
                    var needlvl = confArry[1];
                    var str = LanguageConfig['10021'][Global.language];
                    if (level < needlvl) {
                        this.GameState = 0;
                        this.btntext.string = this.formatPrint(str, needlvl);
                    } else {
                        if (Global.hammer[this.ID - 1]) {
                            this.GameState = 1;
                            this.btntext.string = LanguageConfig['10020'][Global.language];
                        } else {
                            this.GameState = 0;

                            this.btntext.string = this.formatPrint(str, needlvl);
                        }
                    }
                } else if (thisID == 3) {
                    //邀请好友
                    if (Global.freindsInfo == null || Global.freindsInfo[this.ID] == null || Global.freindsInfo[this.ID].length == 0) {
                        this.btntext.string = LanguageConfig['10023'][Global.language];
                    } else if (confArry[1] > Global.freindsInfo[this.ID].length) {
                        this.btntext.string = Global.freindsInfo[this.ID].length + '／' + confArry[1];
                    } else {
                        //邀请的数量够
                        this.btntext.string = LanguageConfig['10020'][Global.language];
                    }
                    if (Global.hammer[this.ID - 1]) {
                        this.GameState = 1;
                    } else {
                        this.GameState = 0;
                    }
                }
            } else if (AttributeConfig[Global.hammer[this.ID].attribute].next == -1) {
                //达到最大
                this.GameState = 4;
                this.btntext.string = LanguageConfig['10024'][Global.language];
            } else {
                //升级条件
                var conf1 = AttributeConfig[Global.hammer[this.ID].attribute];
                if (conf1.costtype = 1001) {
                    if (Global.gold > conf1.cost) {
                        this.GameState = 3;
                    } else {
                        this.GameState = 2;
                    }
                    this.btntext.string = GameUtils.formatNumMAX(conf1.cost);
                }
            }
        }
        this.ButtonState();
    },
    setType2BtnState: function setType2BtnState() {
        var bool = Global.efficiency[this.ID] != undefined && Global.efficiency[this.ID] != null;
        var conf = EfficiencyConfig[this.ID];
        this.btn.node.active = !bool;
        this.progressBar.node.active = bool;
        if (bool) {
            var timeleft = Global.efficiency[this.ID].timeleft;
            var _bool = timeleft > 0;
            if (timeleft > 0) {
                var self = this;
                self.btntext.string = GameUtils.formatTime(timeleft * 60);
                self.progressBar.progress = timeleft / conf.time;
                this.callback = function () {
                    if (Global.efficiency[this.ID] != null) {
                        timeleft = Global.efficiency[this.ID].timeleft;
                        timeleft = parseInt(timeleft - 1);
                        self.btntext.string = GameUtils.formatTime(timeleft * 60);
                        self.progressBar.progress = timeleft / conf.time;
                        if (timeleft > 0) {
                            Global.efficiency[this.ID].timeleft -= 1;
                            Global.saveEfficiency(Global.efficiency);
                        } else {
                            Global.efficiency[this.ID] = null;
                            Global.saveEfficiency(Global.efficiency);
                            this.checkisrun = false;
                            this.unschedule(this.callback);
                            self.eventcallback(this.type, self.ID, 'finish');
                        }
                    }
                };
                if (!this.checkisrun && _bool) {
                    this.checkisrun = true;
                    this.schedule(this.callback, 60);
                }
            }
            this.iconGem.node.active = false;
        } else {

            if (conf.costtype == 1002) {
                if (Global.gem >= conf.cost) {
                    // this.ButtonState(1);
                    this.GameState = 3;
                } else {
                    // this.ButtonState(0);
                    this.GameState = 2;
                }
                this.btntext.string = GameUtils.formatNum(conf.cost);
                this.iconGem.node.active = true;
            }
        }
        this.ButtonState();
    },
    //this.GameState = 1.3是可以点击的
    ButtonState: function ButtonState() {
        var v = this.GameState == 1 || this.GameState == 3;
        if (v) {
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
    },
    formatDayTest: function formatDayTest(jumptime) {
        var str = "";
        var jumpstr = "";
        if (jumptime >= 24) {
            str = LanguageConfig['10025'][Global.language];
            str = this.formatPrint(str, Math.floor(jumptime / 24));
            jumpstr += str;
            jumptime %= 24;
        }
        if (jumptime > 0) {
            str = LanguageConfig['10019'][Global.language];
            str = this.formatPrint(str, jumptime);
            jumpstr += str;
        }
        return jumpstr;
    },
    setLeadState: function setLeadState() {
        this.iconlead.active = this.GameState == 1;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=UIBottom.js.map
        