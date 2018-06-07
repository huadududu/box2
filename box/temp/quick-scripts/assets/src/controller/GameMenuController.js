(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/GameMenuController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1fc47DQ14RMSbRbdbHJzBGp', 'GameMenuController', __filename);
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
        ToggleContainer: cc.ToggleContainer

    },
    onLoad: function onLoad() {
        this.config = [AcceleratorConfig, ToolConfig, EfficiencyConfig];
    },
    addUIBottom: function addUIBottom() {
        var startpos = -this.bottomlist.width / 2;
        for (var i = 0; i < this.config.length; i++) {
            for (var j = 1; this.config[i][j] != undefined; j++) {
                var node = UIBottomFactory.create(i, this.config[i][j], "English");
                node.position = cc.p(startpos + 75, 0);
                this.bottomlist.addChild(node);
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
        