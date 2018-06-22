(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/GameMenuController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1fc47DQ14RMSbRbdbHJzBGp', 'GameMenuController', __filename);
// src/controller/GameMenuController.js

"use strict";

/*
 * Created by Ren on 2018/6/6.
 */
var UIBottomFactory = require("UIBottomFactory");
var AcceleratorConfig = require("AcceleratorConfig");
var ToolConfig = require("ToolConfig");
var EfficiencyConfig = require("EfficiencyConfig");
var LevelConfig = require("LevelConfig");
var LanguageConfig = require("LanguageConfig");
var GameUtils = require("GameUtils");
var Global = require('Global');
var UILeadFactory = require("UILeadFactory");

cc.Class({
    extends: cc.Component,
    properties: {
        bottomlist: cc.Node,
        scrollView: cc.ScrollView,
        level: cc.Label,
        gold: cc.Label,
        golddesc: cc.Label,
        gem: cc.Label,
        toplist: cc.Node,
        TopProgressBar: cc.ProgressBar,
        practice: cc.Node,
        broadcast: cc.Label,
        radioButton: {
            default: [],
            type: cc.Toggle
        },
        levelupBtn: cc.Button,
        thisCheck: {
            visible: false,
            default: 0
        },
        radiotext: {
            default: [],
            type: cc.Label
        },
        BoxController: require("BoxController")

    },

    onLoad: function onLoad() {

        this.config = [AcceleratorConfig, ToolConfig, EfficiencyConfig];
        this.itemList = [];
        this.btnColor = ['#ffa30f', '#f9f9f9'];
        this.itemlistNum = [];
        this.radiotext[0].string = LanguageConfig['10035'][Global.language];
        this.radiotext[1].string = LanguageConfig['10036'][Global.language];
        this.radiotext[2].string = LanguageConfig['10037'][Global.language];
        this.levelLeadNode = null; //level的引导节点
        this.newBroadcast = 0;
        // this.broadcast.onEnable(trackEntry =>{
        //     // this.schedule(this.broadcastCallBack,0.5);
        //     // this.newBroadcast=0;
        //
        // });
    },
    broadcastShows: function broadcastShows(info) {

        if (!this.showThings) {
            this.showThings = [];
        }
        this.showThings.push("coin+" + info.coin);
        this.showThings.push("exp+" + info.exp);
        var str = "coin+" + info.coin + "\nexp+" + info.exp;
        // if(this.showThings.length>5){
        //     let deletenum = this.showThings.length-5;
        //     this.showThings.splice(0,deletenum);
        // }
        // let str ="";
        //
        // for(let i=0;i<this.showThings.length;i++)
        // {
        //     str+=this.showThings[i]+"\n";
        //
        // }
        var PopMsgController = require("PopMsgController");
        PopMsgController.showMsg(str);
        // this.broadcast.string = str;
        // this.broadcast.node.active = true;
        // if(this.checkisrun){
        //     this.unschedule(this.callback)
        //     this.checkisrun= false;
        // }
        // let self = this;
        // this.callback=function(){
        //         self.broadcast.node.active =false ;
        //         self.checkisrun = false;
        // }
        // if(!this.checkisrun){
        //     this.checkisrun = true;
        //     this.schedule(this.callback,1,1);
        //
        // }
    },
    initInfo: function initInfo() {
        this.setGoldNum(Global.gold);
        this.setLevel(Global.level);
        this.setGem(Global.gem);
        var hard = Global.hard;

        var exp = LevelConfig[Global.level].exp;
        this.setProgress(Global.exp / exp);
    },
    addUIBottom: function addUIBottom() {
        this.config = [AcceleratorConfig, ToolConfig, EfficiencyConfig];
        this.itemList = [];
        var startpos = 0;
        this.itemlistNum = [];
        for (var i = 0; i < this.config.length; i++) {
            var j = 1;
            for (; this.config[i][j] != undefined; j++) {
                var node = UIBottomFactory.create(i, this.config[i][j], this.eventcallback.bind(this));
                node.position = cc.p(startpos + 75, 0);
                this.bottomlist.addChild(node);
                this.itemList.push(node);
                startpos += 156;
            }
            this.itemlistNum[i] = j - 1;
        }
        var single = this.itemlistNum[this.itemlistNum.length - 1];
        if (single < 7) {
            startpos += (7 - single) * 156;
        }
        var needlength = startpos + 156;
        this.bottomlist.width = needlength;
        // this.bottomlist.x = needlength/2;

    },

    //设置金币
    setGoldNum: function setGoldNum(num) {
        var strnum1 = GameUtils.formatNumMAX(num);
        this.gold.string = strnum1;
        if (num >= 1000) {
            this.golddesc.string = '(' + GameUtils.stardandFun(num) + ')';
            this.golddesc.node.active = true;
        } else {
            this.golddesc.node.active = false;
        }
    },
    setLevel: function setLevel(level) {
        this.level.string = "LEVEL" + level;
    },
    setGem: function setGem(value) {
        this.gem.string = value;
    },
    setProgress: function setProgress(value) {
        var pro = this.TopProgressBar.progress;
        this.addLevelLead(value >= 1);
        if (pro == 1.0 && value == 1) return;
        this.levelupBtn.interactable = value >= 1;

        this.TopProgressBar.progress = value;
    },

    addLevelLead: function addLevelLead(bool) {
        if (Global.level == 1 && bool) {
            if (!this.levelLeadNode) {
                var node = UILeadFactory.create();
                var position = this.levelupBtn.node.position;
                position.y = position.y - 15;
                node.position = position;
                // node.ratation = 270;
                this.levelLeadNode = node;
                this.toplist.addChild(node);
            }
        } else {
            if (this.levelLeadNode && cc.isValid(this.levelLeadNode)) {
                this.levelLeadNode.destroy();
                // this.levelLeadNode= null;
            }
        }
    },
    changeHammerSpine: function changeHammerSpine(data) {
        this.BoxController.changeHammerSpine(data);
    },
    updateDate: function updateDate(data) {
        if (data == null) return;
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
            if (name == 'gem') {
                this.setGem(data.gem);
            }
        }
        if (name == "level" || name == "gold" || name == 'gem') {
            this.updateButtom();
        }
    },
    scrollEvent: function scrollEvent(sender, event) {
        var thispos = sender.getScrollOffset();
        var movex = -thispos.x;
        var num1 = this.itemlistNum[0] * 156 - 6;
        var num2 = num1 + this.itemlistNum[1] * 156 - 6;
        if (movex < num1) {
            this.setCheckToggle(0);
        } else if (movex < num2) {
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
                var num0 = this.itemlistNum[0] * 156;
                this.scrollView.scrollToOffset(cc.p(num0, 0), 0.2);
                // title += "2";
                break;
            case 2:
                var num1 = (this.itemlistNum[0] + this.itemlistNum[1]) * 156;
                this.scrollView.scrollToOffset(cc.p(num1, 0), 0.2);
                // title += "3";
                break;
            default:
                break;
        }
        // this.setCheckToggle(index);
    },

    setCheckToggle: function setCheckToggle(num) {
        if (this.thisCheck == num) return;
        this.thisCheck = num;
        for (var i = 0; i < this.radioButton.length; i++) {
            if (i == num) {
                // this.radioButton[i].isChecked = true;
                this.radiotext[i].node.color = new cc.color(this.btnColor[0]);
            } else {
                // this.radioButton[i].isChecked = false;
                this.radiotext[i].node.color = new cc.color(this.btnColor[1]);
            }
        }
    },

    //点击升级按钮
    onClickLevel: function onClickLevel() {
        if (this.TopProgressBar.progress >= 1) {
            Global.btnType = 'uplevel';
            this.BoxController.upgradView.active = true;
        }
    },
    eventcallback: function eventcallback(type, id) {
        var string = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


        this.BoxController.eventcallback(type, id, string);
    },
    updateButtom: function updateButtom() {
        for (var i = 0; i < this.itemList.length; i++) {
            var node = this.itemList[i].getComponent("UIBottom");
            node.setBtnState();
        }
    },
    onCallBackFriends: function onCallBackFriends() {

        var prefab = cc.loader.getRes("prefab/inviteUI");
        var newNode = cc.instantiate(prefab);
        this.node.addChild(newNode);
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
        