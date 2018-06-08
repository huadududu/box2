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

        thisCheck: {
            visible: false,
            default: 0
        },

        BoxController: {
            default: null,
            visible: false
        }

    },
    onLoad: function onLoad() {
        this.BoxController = cc.find("Canvas").getComponent("BoxController");

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
                var node = UIBottomFactory.create(i, this.config[i][j], "English", this.eventcallback.bind(this));
                node.position = cc.p(startpos + 75, 0);
                this.bottomlist.addChild(node);
                this.itemList.push(node);
                startpos += 156;
            }
        }
    },
    initInfo: function initInfo(info) {
        this.myinfo = info;
        this.setGoldNum(info.gold);
        this.setLevel(info.level);
        this.setGem(info.gem);
        var hard = info.hard;

        var exp = LevelConfig[info.hard].exp;

        this.setProgress(info.exp / exp);
        // this.ToggleContainer(info.gold);
    },
    getPositionInView: function getPositionInView(item) {
        // get item position in scrollview's node space
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
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
        this.TopProgressBar.progress = value;
    },
    toolChange: function toolChange(id) {
        var info = ToolConfig[id];
        var animation = info.animation;
        // this.BoxController.changeHammerSpine(animation);
        var node = this.BoxController.hammer;
        SkeletonDataCenter.addSkeletonData(animation, node);
    },
    changeHammerSpine: function changeHammerSpine(data) {
        this.BoxController.changeHammerSpine(data);
    },
    updateDate: function updateDate(data) {
        for (var name in data) {
            if (name == 'exp') {
                var exp = LevelConfig[this.myinfo.hard].exp;
                var pro = data.exp / exp;
                if (pro > 1) pro = 1;

                this.setProgress(pro);
            }
            if (name == "level") {

                this.setLevel(data.level);
            }
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
        var num2 = 3 * 156;
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
                var num2 = 4 * 156;
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
    eventcallback: function eventcallback(type, id) {
        // let node= this.itemList.indexOf(sender);
        switch (type) {
            case 0:
                break;
            case 1:
                // let info = ToolConfig[id];
                // let animation = info.animation;
                // // BoxController.changeHammerSpine(animation);
                // SkeletonDataCenter.addSkeletonData(animation, BoxController.changeHammerSpine);
                this.toolChange(id);
                break;
            case 2:
                break;
        }
    },

    //点击升级按钮
    onClickLevel: function onClickLevel() {
        if (this.TopProgressBar.progress >= 1) {
            this.myinfo.level += 1;
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
        