(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/UIBottom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6dad3pwFptLA5hhznBCnVmV', 'UIBottom', __filename);
// src/model/UIBottom.js

"use strict";

/*
 * Created by Ren on 2018/6/7.
 */
var AcceleratorConfig = require("AcceleratorConfig");
var ToolConfig = require("ToolConfig");
var EfficiencyConfig = require("EfficiencyConfig");
var GameType = require("GameType");
var SpriteFrameCenter = require("SpriteFrameCenter");
var LanguageConfig = require("LanguageConfig");
var config = [AcceleratorConfig, ToolConfig, EfficiencyConfig];
var btnPng = ["btn_juhuang", "btn_lanse", "btn_heise"];
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
    setConfigInfo: function setConfigInfo(type, info, language) {
        this.type = type;
        this.ID = info.id;
        this.language = language;
        this.setTitle();
        this.setIcon();
        this.setDesc_1();
        this.setBtnDesc();
        this.setBtnVisible(true);
        this.setBtnPng(1);
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
        