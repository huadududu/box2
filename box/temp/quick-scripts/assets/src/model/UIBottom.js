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
var btnPng = ["btn_juhuang", "btn_lanse", "btn_heise"];
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
        }

    },
    onLoad: function onLoad() {},
    setIcon: function setIcon() {
        var pngname = void 0;
        if (GameType.bottomRadio.Efficiency == this.type) {
            pngname = config[this.type][this.ID].coin;
        } else {
            pngname = config[this.type][this.ID].icon;
            this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", pngname + ".png");
        }
    },
    setDesc_1: function setDesc_1() {
        var desc = config[this.type][this.ID].desc;
        this.desc_1.string = desc;
    },
    setTitle: function setTitle() {
        var title = config[this.type][this.ID].title;
        if (title == null || title == undefined) {
            title = "unknow";
        } else if (LanguageConfig[title] && LanguageConfig[title][this.language]) {

            title = LanguageConfig[title][this.language];
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
    setBtnPng: function setBtnPng(type) {
        this.btn.node.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", btnPng[type] + ".png");
    },
    setConfigInfo: function setConfigInfo(type, info, callback) {
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
    setBtnState: function setBtnState() {
        var level = Global.level;
        if (this.type == 1) {
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
        