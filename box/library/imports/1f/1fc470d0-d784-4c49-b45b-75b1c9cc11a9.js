"use strict";
cc._RF.push(module, '1fc47DQ14RMSbRbdbHJzBGp', 'GameMenuController');
// src/controller/GameMenuController.js

"use strict";

/*
 * Created by Ren on 2018/6/6.
 */
//let BoxController = require('BoxController');
var GameMenuView = require('GameMenuView');
var UIBottomFactory = require("UIBottomFactory");
var AcceleratorConfig = require("AcceleratorConfig");
var ToolConfig = require("ToolConfig");
var EfficiencyConfig = require("EfficiencyConfig");
var LevelConfig = require("LevelConfig");
var BoxController = require("BoxController");

cc.Class({
    extends: cc.Component,
    properties: {
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
        }

    },
    onLoad: function onLoad() {
        this.config = [AcceleratorConfig, ToolConfig, EfficiencyConfig];
    },
    addUIBottom: function addUIBottom() {
        if (this.config == undefined) {
            this.onLoad();
        }
        this.itemList = [];
        var startpos = -this.bottomlist.width / 2;
        for (var i = 0; i < this.config.length; i++) {
            for (var j = 1; this.config[i][j] != undefined; j++) {
                var node = UIBottomFactory.create(i, this.config[i][j], "English");
                node.position = cc.p(startpos + 75, 0);
                this.bottomlist.addChild(node);
                this.itemList.push(node);
                startpos += 156;
            }
        }
    },
    initInfo: function initInfo(info) {
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
        this.level.string = level;
    },
    setGem: function setGem(value) {
        this.gem.string = value;
    },
    setProgress: function setProgress(value) {
        this.TopProgressBar.progress = value;
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
        if (thispos.x < num1) {
            this.setCheckToggle(0);
        } else if (thispos.x < num2) {
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
        for (var i = 0; i < this.radioButton.length; i++) {
            if (i == num) {
                this.radioButton[i].isChecked = true;
            } else {
                this.radioButton[i].isChecked = false;
            }
        }
    }

});

cc._RF.pop();