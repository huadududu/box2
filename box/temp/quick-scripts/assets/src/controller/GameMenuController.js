(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/GameMenuController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1fc47DQ14RMSbRbdbHJzBGp', 'GameMenuController', __filename);
// src/controller/GameMenuController.js

"use strict";

/*
 * Created by Ren on 2018/6/6.
 */
var GameMenuView = require('GameMenuView');
var UIBottomFactory = require("UIBottomFactory");
var AcceleratorConfig = require("AcceleratorConfig");
var ToolConfig = require("ToolConfig");
var EfficiencyConfig = require("EfficiencyConfig");
var LevelConfig = require("LevelConfig");
var ParticleSystemCenter = require("ParticleSystemCenter");
var SkeletonDataCenter = require("SkeletonDataCenter");
var Global = require('Global');

cc.Class({
    extends: cc.Component,
    properties: {
        node: cc.Node,
        bottomlist: cc.Node,
        scrollView: cc.ScrollView,
        level: cc.Label,
        gold: cc.Label,
        gem: cc.Label,
        TopProgressBar: cc.ProgressBar,
        radioButton: {
            default: [],
            type: cc.Toggle
        },
        levelupBtn: cc.Button,
        thisCheck: {
            visible: false,
            default: 0
        },

        BoxController: require("BoxController")

    },
    onLoad: function onLoad() {

        this.config = [AcceleratorConfig, ToolConfig, EfficiencyConfig];
        this.itemList = [];
    },
    addUIBottom: function addUIBottom() {
        if (this.config == undefined) {
            this.config = [AcceleratorConfig, ToolConfig, EfficiencyConfig];
        }
        this.itemList = [];
        var startpos = -this.bottomlist.width / 2;
        for (var i = 0; i < this.config.length; i++) {
            for (var j = 1; this.config[i][j] != undefined; j++) {
                var node = UIBottomFactory.create(i, this.config[i][j], this.eventcallback.bind(this));
                node.position = cc.p(startpos + 75, 0);
                this.bottomlist.addChild(node);
                this.itemList.push(node);
                startpos += 156;
            }
        }
    },
    initInfo: function initInfo() {
        this.setGoldNum(Global.gold);
        this.setLevel(Global.level);
        this.setGem(Global.gem);
        var hard = Global.hard;

        var exp = LevelConfig[Global.level].exp;
        this.setProgress(Global.exp / exp);
    },
    //设置金币
    setGoldNum: function setGoldNum(num) {
        this.gold.string = num;
    },
    setLevel: function setLevel(level) {
        this.level.string = "level:" + level;
    },
    setGem: function setGem(value) {
        this.gem.string = value;
    },
    setProgress: function setProgress(value) {
        var pro = this.TopProgressBar.progress;
        if (pro == 1.0 && value == 1) return;
        this.levelupBtn.interactable = value >= 1;
        this.TopProgressBar.progress = value;
    },

    changeHammerSpine: function changeHammerSpine(data) {
        this.BoxController.changeHammerSpine(data);
    },
    updateDate: function updateDate(data) {
        for (var name in data) {
            if (name == 'exp') {
                var exp = LevelConfig[Global.level].exp;
                var pro = data.exp / exp;
                if (pro > 1) pro = 1;

                this.setProgress(pro);
            }
            if (name == "level") {

                this.setLevel(data.level);
            }
            if (name == "gold") {
                this.setGoldNum(data.gold);
            }
        }
        if (name == "level" || name == "gold") {
            this.updateButtom();
        }
    },
    scrollEvent: function scrollEvent(sender, event) {
        var thispos = sender.getScrollOffset();
        // switch(event) {
        //     case 2: //left
        //        // this.lblScrollEvent.string = "Scroll to Left";
        //        break;
        //     case 3: ////right
        //        // this.lblScrollEvent.string = "Scroll to Right"; 
        //        break;
        //    }
        var num1 = 2 * 156;
        var num2 = 8 * 156;
        if (-thispos.x < num1) {
            this.setCheckToggle(0);
        } else if (-thispos.x < num2) {
            this.setCheckToggle(1);
        } else {
            this.setCheckToggle(2);
        }
    },

    radioButtonClicked: function radioButtonClicked(toggle) {
        var index = this.radioButton.indexOf(toggle);
        // var title = "RadioButton";
        switch (index) {
            case 0:
                // title += "1";
                this.scrollView.scrollToOffset(cc.p(0, 0), 0.2);
                break;
            case 1:
                var num1 = 2 * 156;
                this.scrollView.scrollToOffset(cc.p(num1, 0), 0.2);
                // title += "2";
                break;
            case 2:
                var num2 = 8 * 156;
                this.scrollView.scrollToOffset(cc.p(num2, 0), 0.2);
                // title += "3";
                break;
            default:
                break;
        }
    },

    setCheckToggle: function setCheckToggle(num) {
        if (this.thisCheck == num) return;
        this.thisCheck = num;
        for (var i = 0; i < this.radioButton.length; i++) {
            if (i == num) {
                this.radioButton[i].isChecked = true;
            } else {
                this.radioButton[i].isChecked = false;
            }
        }
    },

    //点击升级按钮
    onClickLevel: function onClickLevel() {
        if (this.TopProgressBar.progress >= 1) {
            this.BoxController.upgradView.active = true;
        }
    },
    addlevel: function addlevel() {
        var myinfo = {};
        var level = Global.level + 1;
        var needexp = LevelConfig[level].exp;
        var needgold = LevelConfig[level].rewardcoin;
        myinfo.level = level;
        Global.saveLevel(level);
        myinfo.exp = Global.exp - needexp;
        Global.saveExp(myinfo.exp);
        myinfo.gold = Global.gold + needgold;
        Global.saveGold(myinfo.gold);
        this.updateDate(myinfo);
    },
    eventcallback: function eventcallback(type, id) {

        this.BoxController.eventcallback(type, id);
    },
    updateButtom: function updateButtom() {
        for (var i = 0; i < this.itemList.length; i++) {
            var node = this.itemList[i].getComponent("UIBottom");
            node.setBtnState();
        }
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
        //# sourceMappingURL=GameMenuController.js.map
        