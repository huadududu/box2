(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/BoxController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '52eeadsoZ5Er4fzucc9O914', 'BoxController', __filename);
// src/controller/BoxController.js

"use strict";

/**
 * Created by bing on 20/04/2018.
 */

//负责head展现和变换。
var StageConfig = require("StageConfig");
var BlockConfig = require("BoxConfig1");
var CycleConfig = require("CycleConfig");
var ToolConfig = require("ToolConfig");
var AttributeConfig = require("AttributeConfig");
var AcceleratorConfig = require("AcceleratorConfig");
var EfficiencyConfig = require("EfficiencyConfig");
var BoxConfig = require("BoxConfig");
var RewardConfig = require("RewardConfig");

var GameType = require("GameType");
var GameUtils = require("GameUtils");
var GameState = require("GameState");
var BlockBigFactory = require("BlockBigFactory");
var BlockSmallFactory = require("BlockSmallFactory");
var RewardItemFactory = require("RewardItemFactory");
var SpriteFrameCenter = require("SpriteFrameCenter");
var ParticleSystemCenter = require("ParticleSystemCenter");
var SkeletonDataCenter = require("SkeletonDataCenter");
var GameConfig = require("GameConfig");
// let GameMenuController = require('GameMenuController');

var Global = require('Global');

var GameHeight = 514;
var GameCenterY = 0;
var BaseGame = GameHeight / 2;

cc.Class({
    extends: cc.Component,

    properties: {
        gameNode: cc.Node,
        camera: cc.Camera,
        BlockBig: cc.Prefab,
        BlockSmall: cc.Prefab,
        MarginsBig: cc.Prefab,
        MarginsSmall: cc.Prefab,
        RewardItem: cc.Prefab,
        UIBottom: cc.Prefab,
        Sky: cc.Node,
        Bgbz: cc.Node,
        Underground: cc.Node,
        motionStreak: cc.MotionStreak,
        // hammer: sp.Skeleton,
        boxSpine: sp.Skeleton,
        btnbox: cc.Button,
        GameMenu: cc.Node,
        treasure: cc.Button,
        upgradView: cc.Node,
        openbox: cc.Node,
        // GameMenuController: GameMenuController,
        type: {
            visible: false,
            default: 0
        },
        rowNum: {
            visible: false,
            default: 5
        },
        blockWidth: 100,
        blockBlank: {
            visible: false,
            default: 0
        },
        moveNum: {
            visible: false,
            default: 0
        },
        margins: {
            visible: false,
            default: 0
        },
        curMaxLine: {
            visible: false,
            default: 0
        },
        canTouch: {
            visible: false,
            default: true
        },
        previousPt: {
            visible: false,
            default: null
        },
        Hatting: {
            visible: false,
            default: false
        },
        HattingPos: {
            visible: false,
            default: null
        },
        accelerHammer: {
            visible: false,
            default: 1
        },
        accelerGold: {
            visible: false,
            default: 1
        },
        efficeGold: 0,
        gameState: GameState.init //0 init 1 playing 2 rolling 3 end
    },

    onLoad: function onLoad() {
        var _this = this;

        this.winsize = cc.winSize;
        this.BaseHeight = this.winsize.height / 2;
        this.BaseWidth = this.winsize.width / 2;
        this.hammerStart = 1; //表示锤子的起始id
        this.hammerEnd = 10; //表示锤子的最后一个id


        SpriteFrameCenter.preLoadAtlas("png/box", this.initdata.bind(this));
        this.GameMenuController = cc.find("Canvas/GameMenu").getComponent("GameMenuController");
        Global.initInfo();
        this.blocks = [];
        this.marginlist = [];
        this.hammers = {};
        this.rewardItem = [];
        this.accelerHammer = 1;
        this.accelerGold = 1;
        this.startPos = -GameHeight / 2;
        this.boxSpine.setCompleteListener(function (trackEntry) {
            var animationName1 = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName1);
            // this.restart();
            _this.addItems();
        });
        this.firstOpen = true;
    },
    playBoxSpine: function playBoxSpine() {
        this.boxSpine.node.active = true;
        this.boxSpine.setAnimation(0, "newAnimation", false);
    },
    stopBoxSpine: function stopBoxSpine() {
        this.boxSpine.node.active = false;
    },
    playHammerSpine: function playHammerSpine(hammerpos) {

        this.hammers[hammerpos].node.active = true;
        this.hammers[hammerpos].setAnimation(0, "newAnimation", true);
    },
    playHammers: function playHammers() {
        for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
            if (this.hammers[i] != undefined) {
                this.setSmPosition(i);
            }
        }
    },
    stopHammerSpine: function stopHammerSpine(hammerpos) {
        this.hammers[hammerpos].node.active = false;
    },
    addHammer: function addHammer(id) {
        var _this2 = this;

        var node = new cc.Node();
        var hammer = node.addComponent(sp.Skeleton);
        var info = ToolConfig[id];
        var animation = info.animation;
        var conf = AttributeConfig[info.attribute];

        SkeletonDataCenter.addSkeletonData(animation, hammer);
        this.GameMenu.addChild(node);
        this.hammers[id] = hammer;
        hammer.node.active = false;
        hammer.setCompleteListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
            hammer.node.active = false;
            if (_this2.checkCanHammer(id)) {
                _this2.smCallback(id);
            }
        });
        var timescale = 0.17 * conf.att / parseFloat(conf.time) * this.accelerHammer;
        hammer.timeScale = timescale;
    },
    changeHammerSpine: function changeHammerSpine(data) {
        this.hammer.skeletonData = data;
    },
    start: function start() {
        var _this3 = this;

        this.GameMenuController.initInfo();
        this.hammers = {};
        var timescale = 1;
        var hammer = Global.hammer;
        this.initEfficienyInfo();

        var _loop = function _loop() {
            if (hammer[i] == undefined) return "continue";
            var node = new cc.Node();
            var nodehammer = node.addComponent(sp.Skeleton);
            var info = ToolConfig[i];
            var animation = info.animation;
            SkeletonDataCenter.addSkeletonData(animation, nodehammer);
            _this3.GameMenu.addChild(node);
            _this3.hammers[hammer[i].id] = nodehammer;
            nodehammer.node.active = false;
            var j = i;
            nodehammer.setCompleteListener(function (trackEntry) {
                var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
                nodehammer.node.active = false;
                if (_this3.checkCanHammer(j)) {
                    _this3.smCallback(j);
                }
            });
            var attribute = Global.hammer[i].attribute;
            var conf1 = AttributeConfig[attribute];
            nodehammer.timeScale = 0.17 * conf1.att / parseFloat(conf1.time) * _this3.accelerHammer;
        };

        for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
            var _ret = _loop();

            if (_ret === "continue") continue;
        }
    },
    restart: function restart() {
        if (Global.hard < 10) {
            Global.hard++;
        }
        this.boxSpine.node.active = false;
        for (var i = 1; i < 4; i++) {
            // let node = this.rewardItem[i];
            this.rewardItem[i].destroy();
            // if(cc.isValid( node)){
            //     node.destroy();
            // }
        }
        this.rewardItem = [];
        // this.addItems();
        this.initdata();
        this.gameState = GameState.hatting;
    },
    initdata: function initdata() {
        var floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < BlockConfig.length; i++) {
            if (BlockConfig[i].blockwidth == StageConfig[Global.hard].size) {
                this.type = BlockConfig[i].type;
                break;
            }
        }
        this.rowNum = BlockConfig[this.type].count;
        this.blockWidth = BlockConfig[this.type].blockwidth;
        this.blockBlank = BlockConfig[this.type].blank;
        this.margins = BlockConfig[this.type].margins;

        this.addBlocks();
        this.cameraStartPosY();
        this.btnbox.node.active = true;
        this.playHammers();
        this.initTreasure();
        if (this.firstOpen) {
            this.GameMenuController.addUIBottom();
            this.firstOpen = false;
        }
    },
    checkCanHammer: function checkCanHammer(id) {
        var hammer = Global.hammer;
        if (hammer[id] != undefined && hammer[id].attribute != -1) return true;
        return false;
    },
    resetMarginList: function resetMarginList() {
        if (this.marginlist.length > 0) {
            for (var i = 0; i < this.marginlist.length; i++) {
                var node = this.marginlist[i];
                if (cc.isValid(node)) {
                    node.destroy();
                }
            }
        }
        this.marginlist = [];
    },
    resetBlockList: function resetBlockList() {
        if (this.blocks.length > 0) {
            for (var i = 0; i < this.blocks.length; i++) {
                for (var _j = 0; _j < this.blocks[i].length; _j++) {
                    var node = this.blocks[i][_j];
                    if (cc.isValid(node)) {
                        node.destroy();
                    }
                }
            }
        }
        this.blocks = [];
    },
    //--------- block -----------------------
    addBlocks: function addBlocks() {

        this.resetBlockList();
        this.resetMarginList();
        var floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < floorNum - 1; i++) {

            var lineinfo = this.addLines(this.getPngName(StageConfig[Global.hard].cycleID, i), i);

            this.blocks.push(lineinfo);
            lineinfo = [];
        }
        var topline = this.addLines(StageConfig[Global.hard].top, i);
        this.blocks.push(topline);
    },
    addLines: function addLines(pngname, thisNum) {

        var conf = BlockConfig[this.type];
        var count = conf.count;
        var factory = this.type == 0 ? BlockBigFactory : BlockSmallFactory;
        var curX = conf.margins + conf.blank - this.BaseWidth;
        var curY = thisNum * (this.blockWidth + conf.blank) + this.startPos;
        var lineArray = [];
        var left = factory.createMargins(pngname);

        left.position = cc.p(conf.margins / 2 - this.BaseWidth, curY + this.blockWidth / 2);
        this.gameNode.addChild(left);
        this.marginlist.push(left);
        var right = factory.createMargins(pngname);
        var endpos = this.BaseWidth - conf.margins / 2;
        right.position = cc.p(endpos, curY + this.blockWidth / 2);
        this.gameNode.addChild(right);
        this.marginlist.push(right);

        for (var i = 0; i < count; i++) {
            var node = factory.create(pngname);
            node.position = cc.p(curX + this.blockWidth / 2, curY + this.blockWidth / 2);
            curX += this.blockWidth + conf.blank;
            this.gameNode.addChild(node);
            lineArray.push(node);
        }

        return lineArray;
    },

    //根据 获得 图片的名字
    getPngName: function getPngName(cycleID, thisNum) {
        var thisID = void 0;
        if (cycleID.indexOf(";") != -1) {
            var cycleArry = cycleID.split(";");
            var getnum = GameUtils.randomInt(0, cycleArry.length - 1);
            thisID = cycleArry[getnum];
        } else {
            thisID = parseInt(cycleID);
        }
        var neednumber = 0;
        for (var i = 1; i <= 10; i++) {
            if (CycleConfig[thisID]["num" + i] == 0) {
                i = 0;
                continue;
            }
            neednumber += CycleConfig[thisID]["num" + i];
            if (neednumber >= thisNum) {
                return CycleConfig[thisID]["block" + i];
            }
            if (i == 10) {
                i = 0;
            }
        }
    },

    //销毁砖块
    destroyBlock: function destroyBlock(line, row) {

        if (!this.blocks[line]) return;
        var node = this.blocks[line][row];

        if (node != null) {
            var location = this.hammerpos(line, row);
            var texiao = this.getEffByBlock(line, row);
            console.log("destroylog:", line, ":", row, location);
            ParticleSystemCenter.addParticleForNode(texiao + ".plist", this.GameMenuController.node, location);
            node.removeFromParent(true);
            this.blocks[line][row] = null;
            this.destroyUpdate();
            this.cameraCentPosY();
        }
    },
    checkCanDestroy: function checkCanDestroy(line, row) {
        if (!this.blocks[line] || !this.blocks[line][row]) return false;
        var floorNum = StageConfig[Global.hard].layer;
        if (line >= floorNum - 1) return true;
        var node = void 0;
        node = this.blocks[line + 1][row];
        if (!cc.isValid(node)) {
            return true;
        }
        if (line > 0) {
            node = this.blocks[line - 1][row];
            if (!cc.isValid(node)) {
                return true;
            }
        }
        if (row > 0 && row < this.rowNum - 1) {
            node = this.blocks[line][row - 1];
            if (!cc.isValid(node)) {
                return true;
            }
            node = this.blocks[line][row + 1];
            if (!cc.isValid(node)) {
                return true;
            }
        } else if (row == 0) {
            node = this.blocks[line][row + 1];
            if (!cc.isValid(node)) {
                return true;
            }
        } else if (row == this.rowNum - 1) {
            node = this.blocks[line][row - 1];
            if (!cc.isValid(node)) {
                return true;
            }
        }
        return false;
    },
    destroyUpdate: function destroyUpdate() {

        var myinfo = {};
        myinfo.exp = Global.exp + 1;
        myinfo.gold = Global.gold + 1 * this.accelerGold + this.efficeGold;
        this.GameMenuController.updateDate(myinfo);
        Global.saveExp(myinfo.exp);
        Global.saveGold(myinfo.gold);
    },
    //--------- block -----------------------
    maxLineNum: function maxLineNum() {
        var max = 0;
        var floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < floorNum; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                if (this.blocks && this.blocks[i] && this.blocks[i][j]) {
                    var node = this.blocks[i][j];
                    if (!cc.isValid(node)) continue;
                    // sss
                    if (i > max) {
                        max = i;
                    }
                    break;
                }
            }
        }
        return max;
    },

    totoalRowNum: function totoalRowNum(line) {
        //line 行拥有点的数量
        var max = 0;
        for (var j = 0; j < this.rowNum; j++) {
            var node = this.blocks[line][j];
            if (!cc.isValid(node)) continue;
            max++;
        }
        return max;
    },

    //************camera 相关设置 start **********************
    cameraCentPosY: function cameraCentPosY() {

        var maxline = this.maxLineNum();
        if (this.curMaxLine <= maxline) {
            return;
        }
        var move = this.curMaxLine - maxline;
        this.curMaxLine = maxline;
        var oldY = this.camera.node.getPositionY();
        if (oldY <= 0) {
            return;
        }
        var newY = oldY - this.blockWidth * move;
        var moveY = 0;
        if (newY >= 0) {
            moveY = newY;
        } else {
            moveY = 0;
        }
        var location = cc.p(0, moveY);
        var action1 = cc.moveTo(0.1, location);
        this.camera.node.runAction(action1);
        var ralmovelength = oldY - newY;
        for (var i = this.hammerStart; i < this.hammerEnd; i++) {
            if (this.hammers[i] != undefined) {
                var _location = this.hammers[i].node.position;
                var action2 = cc.moveTo(0.1, { x: _location.x, y: _location.y + ralmovelength });
                this.hammers[i].node.runAction(action2);
            }
        }
        // this.camera.node.setPositionY(moveY);

    },

    cameraStartPosY: function cameraStartPosY() {
        var floorNum = StageConfig[Global.hard].layer;
        var height = floorNum * (this.blockWidth + this.blockBlank);
        //地下
        this.Underground.height = height;
        var posbottom = (height - GameHeight) / 2;
        this.Underground.y = posbottom;
        //地面
        var totoal = this.Bgbz.height + height - 50;
        var skyposy = void 0;
        var bzYbottom = void 0;
        var other = GameHeight - totoal;
        bzYbottom = (totoal + height - GameHeight) / 2 - 25;
        this.Bgbz.y = bzYbottom;
        if (other > 0) {
            this.Sky.active = true;
            this.Sky.height = other + 10;
            skyposy = (GameHeight - other) / 2;
            this.Sky.y = skyposy;
            this.camera.node.setPositionY(0);
        } else {
            this.Sky.active = false;
            this.camera.node.setPositionY(-other);
        }
        this.curMaxLine = floorNum - 1;
    },

    //************camera 相关设置 end **********************
    //*********** 锤子 相关设置  start***************
    setSmPosition: function setSmPosition(hammerpos) {
        var realwidth = this.blockWidth + this.blockBlank;
        var maxline = this.curMaxLine;
        var maxrow = this.totoalRowNum(0);
        if (maxline == 0 && maxrow == 0) {
            this.HattingPos = null;
            // this.sm.node.visible = false;
            this.hammers[hammerpos].node.active = false;
            return;
        }
        var range = this.geScreenRange();
        var line = this.curMaxLine;
        var find = false;
        var canclick = [];
        var curline = line;
        for (; curline >= 0; curline--) {
            for (var i = 0; i < this.rowNum; i++) {
                //当前行可以删除的
                if (this.blocks[curline] && this.checkCanDestroy(curline, i)) {
                    var _find = false;
                    for (var j = this.hammerStart; j <= this.hammerEnd; j++) {
                        if (this.HattingPos && this.HattingPos[j]) {
                            if (this.HattingPos[j].x == curline && i == this.HattingPos[j].y) {
                                _find = true;
                                break;
                            }
                        }
                    }
                    if (!_find) {
                        canclick.push(i);
                    }
                }
            }
            if (canclick.length > 0) break;
        }
        if (canclick.length == 0) {
            this.HattingPos[hammerpos] = null;
            return;
        }
        var num = GameUtils.randomInt(0, canclick.length - 1);
        var row = canclick[num];
        var location = this.hammerpos(curline, row);
        if (this.HattingPos == null) {
            this.HattingPos = {};
        }
        this.HattingPos[hammerpos] = { x: curline, y: row };
        console.log("choose:", this.HattingPos[hammerpos]);
        this.hammers[hammerpos].node.position = location;
        this.hammers[hammerpos].node.active = true;
        this.playHammerSpine(hammerpos);
    },
    //根据小块的位置 过的特效文件
    getEffByBlock: function getEffByBlock(line, row) {

        var type = this.type == 0 ? "BlockBig" : "BlockSmall";
        var node = this.blocks[line][row].getComponent(type);
        return node.getPngId();
    },

    geScreenRange: function geScreenRange() {
        var max = this.curMaxLine;
        var cameraPosY = this.camera.node.getPositionY();
        var min = 0;
        var realwidth = this.blockWidth + this.blockBlank;
        if (cameraPosY <= this.BaseHeight) {
            min = 0;
        } else {
            var maxPosY = max * realwidth;
            var canshowy = (maxPosY - cameraPosY + this.BaseHeight) / realwidth;
            min = Math.floor(max - canshowy);
        }
        return { max: max, min: min };
    },
    //根据块的位置计算锤子的位置
    hammerpos: function hammerpos(line, row) {
        var cameraY = this.camera.node.getPositionY();
        var gameY = this.gameNode.y;
        var realwidth = this.blockWidth + this.blockBlank;
        var realx = row * realwidth + this.margins + this.blockBlank;
        var realy = line * realwidth - cameraY;
        var hamX = realx - this.BaseWidth - 42 + this.blockWidth;
        var hamY = realy - 42;
        return cc.p(hamX, hamY);
    },
    smCallback: function smCallback(hammerpos) {
        if (this.HattingPos != null && this.HattingPos[hammerpos] != null) {

            var y = this.HattingPos[hammerpos].y;
            var x = this.HattingPos[hammerpos].x;
            console.log("hammer:", x, y);
            if (cc.isValid(this.blocks[x][y])) {
                this.destroyBlock(x, y);
            }
            this.setSmPosition(hammerpos);
        }
    },
    //*********** 锤子 相关设置  end*****************

    updateTouch: function updateTouch(point) {
        var cameraY = this.camera.node.getPositionY();
        var gameY = this.gameNode.y;
        var realwidth = this.blockWidth + this.blockBlank;
        var line = Math.floor((point.y + cameraY) / realwidth);
        var row = Math.floor((point.x - this.margins - this.blockBlank) / realwidth);
        var find = false;
        if (this.checkCanDestroy(line, row)) {
            for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
                if (this.HattingPos != null && this.HattingPos[i] != null && this.HattingPos[i] != undefined) {
                    if (this.HattingPos[i].x == line && this.HattingPos[i].y == row) {
                        this.hammers[i].node.active = false;
                        // this.smCallback(i);

                        this.destroyBlock(line, row);
                        this.setSmPosition(i);
                        find = true;
                        break;
                    }
                }
            }
            if (!find) {
                this.destroyBlock(line, row);
            }
        }
    },
    touchStartCallBack: function touchStartCallBack(location) {
        if (!this.canTouch) {
            return;
        }
        if (this.gameState == GameState.end) {
            this.openbox.active = false;
            this.restart();
        }
        if (location.x < this.margins || location.x > 2 * this.BaseWidth - this.margins) {
            // this.motionStreak.reset();
            return;
        }
        console.log("touchStartCallBack");
        // this.previousPt = location;
        // let motionpos = this.motionStreak.node.convertToNodeSpace(location);
        // this.motionStreak.node.setPositionX(motionpos);
        // this.motionStreak.node.setPositionY(motionpos);
        this.motionStreak.reset();

        // this.isTouching = false;
    },

    touchCancelCallBack: function touchCancelCallBack(location1) {
        var location = this.gameNode.convertToNodeSpace(location1);
        this.updateTouch(location);
        this.isTouching = false;
        this.motionStreak.reset();
    },

    touchEndCallBack: function touchEndCallBack(location1) {
        // this.touchPosition(location);
        var location = this.gameNode.convertToNodeSpace(location1);
        this.updateTouch(location);
        this.isTouching = false;
        console.log("touchEndCallBack");
        this.motionStreak.reset();
        this.previousPt = null;
    },
    touchMoveCallBack: function touchMoveCallBack(location1) {
        // this.multMoveCallBack(location1);
        // return;
        var location = this.gameNode.convertToNodeSpace(location1);
        if (!this.canTouch) {
            return;
        }
        if (location.x < this.margins || location.x > (2 * this.BaseWidth - this.margins || location.y < 216)) {
            this.motionStreak.reset();
            return;
        }
        this.updateTouch(location);
        // this.previousPt = location;
        this.motionStreak.node.setPositionX(location1.x - this.BaseWidth);
        this.motionStreak.node.setPositionY(location1.y - this.BaseHeight);
        // let motionpos = this.node.convertToNodeSpace(location1);
        // this.motionStreak.node.position=motionpos;
    },
    //多点触控
    multMoveCallBack: function multMoveCallBack(location01) {
        var location02 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


        var location1 = this.gameNode.convertToNodeSpace(location01);
        // let location2 = this.gameNode.convertToNodeSpace(location02);
        console.log("1", location1);
        // console.log("2",location2);
        if (this.previousPt == null) {
            this.previousPt = {};
            this.previousPt[0] = location1;
            // this.previousPt[1]= location2;
            return;
        }
        var distance = cc.pSub(this.previousPt[0], location1);
        console.log("distance", distance);
        if (distance.y != 0) {
            var origin = this.camera.node.getPositionY();
            // if(origin == 0) {
            //     return;
            // }
            var endpos = (origin + distance.y) * 0.5;
            if (endpos < 0) {
                endpos = 0;
            }
            if (endpos > 300) {
                endpos = 300;
            }
            var move = origin - endpos;
            this.camera.node.setPositionY(endpos);
            for (var i = this.hammerStart; i < this.hammerEnd; i++) {
                if (this.hammers[i] != undefined) {
                    var location = this.hammers[i].node.position;
                    // let action2 = cc.moveTo(0.1,{x:location.x,y:location.y+move})
                    // this.hammers[i].node.runAction(action2);
                    this.hammers[i].node.setPositionY(location.y + move);
                }
            }
        }
    },
    onClickTreasure: function onClickTreasure(event) {
        var maxlinenum = this.maxLineNum();
        var totoalRowNum = this.totoalRowNum(0);
        if (maxlinenum != 0 || totoalRowNum != 0) {
            this.touchEndPoint = event.getLocation();

            this.updateTouch(this.touchEndPoint);
            return;
        }
        this.btnbox.node.active = false;
        this.gameState = GameState.end;
        this.canTouch = false;
        this.openbox.active = true;
        this.playBoxSpine();
    },
    update: function update() {
        // this.cameraCentPosY();
    },
    eventcallback: function eventcallback(type, id) {
        var string = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        // let node= this.itemList.indexOf(sender);
        switch (type) {
            case 0:
                if (string == null) this.accleleratorChange(id);else {
                    if (string == 'finish') {
                        this.accleleratorrRecover(id);
                    }
                }
                break;
            case 1:
                this.toolChange(id);
                break;
            case 2:
                this.efficiencyAdd(id, string);
                break;
        }
    },
    //广告加速开始
    accleleratorChange: function accleleratorChange(id) {
        var conf = AcceleratorConfig[id];
        Global['bar' + id] = conf.time;
        this.changeHammerSpeed();
        this.GameMenuController.updateButtom();
    },
    //广告加速结束
    accleleratorrRecover: function accleleratorrRecover(id) {
        this.changeHammerSpeed();
        this.GameMenuController.updateButtom();
    },

    changeHammerSpeed: function changeHammerSpeed() {
        var speedHammer = 0;
        var speedGold = 0;
        for (var _i = 1; _i <= 2; _i++) {
            if (Global['bar' + _i] > 0) {
                speedHammer += AcceleratorConfig[_i].speed;
                speedGold += AcceleratorConfig[_i].coin;
            }
        }
        if (speedHammer == 0) {
            speedHammer = 1;
        }
        if (speedGold == 0) {
            speedGold = 1;
        }
        this.accelerHammer = speedHammer;
        this.accelerGold = speedGold;
        for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
            if (this.hammers[i] != undefined) {
                var conf1 = AttributeConfig[Global.hammer[i].attribute];
                this.hammers[i].timeScale = 0.17 * (conf1.att / parseFloat(conf1.time)) * this.accelerHammer;
            }
        }
    },
    changeGoldSpeed: function changeGoldSpeed() {},
    toolChange: function toolChange(id) {
        var info = ToolConfig[id];

        if (Global.hammer[id] == undefined) {
            //激活
            var bool = this.checkCanAdd(id);
            if (bool) {
                Global.hammer[id] = { id: id, attribute: info.attribute };
                Global.saveHammer(Global.hammer);
                this.addHammer(id);
                this.setSmPosition(id);
            } else {
                this.addAdTime(id);
            }
            this.GameMenuController.updateButtom();
        } else {
            //升级
            var conf = AttributeConfig[Global.hammer[id].attribute];
            var mess = {};

            if (conf.costtype = 1001) {
                Global.gold -= conf.cost;
                mess['gold'] = Global.gold;
            } else if (conf.costtype = 1002) {
                Global.gem -= conf.cost;
                mess['gem'] = Global.gem;
            }
            if (conf.next != -1) {
                Global.hammer[id].attribute = conf.next;
                var conf1 = AttributeConfig[conf.next];
                Global.saveHammer(Global.hammer);
                this.hammers[id].timeScale = 0.17 * (conf1.att / parseFloat(conf1.time)) * this.accelerHammer;
            }
            this.GameMenuController.updateDate(mess);
        }
    },
    checkCanAdd: function checkCanAdd(id) {
        var conf = ToolConfig[id];
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
                return true;
            }
            if (thisID == 0) {
                //点击激活
                return true;
            } else if (thisID == 1) {
                //视频激励
                return Global.openAdTimes > 0;
            } else if (thisID == 2) {
                //等级激活
                var needlvl = confArry[1];
                if (Global.level < needlvl) {
                    return false;
                } else {
                    return true;
                }
            } else if (thisID == 3) {
                //邀请好友
                // if(Global.freindsInfo[id]&&Global.freindsInfo[id].length){
                //     Global.inviteFriends = Global.freindsInfo[id].length;
                // }else{
                //     Global.inviteFriends=0;
                // }
                if (Global.inviteFriends < confArry[1]) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        return false;
    },
    addFriendCallBack: function addFriendCallBack(friendId) {
        if (Global.freindsInfo == null) {
            Global.freindsInfo = {};
        }
    },
    addAdTime: function addAdTime(id) {
        var conf = ToolConfig[id];
        var thisID = void 0;
        var confArry = void 0;
        var self = this;
        if ("unlock" in conf) {
            if (conf.unlock.indexOf(";") != -1) {
                confArry = conf.unlock.split(";");
                thisID = confArry[0];
            } else {
                thisID = parseInt(conf.unlock);
            }
            if (thisID == 1) {
                //视频激励
                if (GameConfig.isFBInstantGame()) {
                    var FBP = require("FBPlugin");
                    FBP.RewardedVideoAsync(function () {
                        Global.openAdTimes++;
                        self.GameMenuController.updateButtom();
                    });
                } else {
                    Global.openAdTimes++;
                }
            } else if (thisID == 3) {
                //邀请好友
                var FBP1 = require("FBPlugin");
                var _self = this;
                if (GameConfig.isFBInstantGame()) {
                    FBP1.chooseAsync(function (friendID) {
                        if (Global.freindsInfo == null) {
                            Global.freindsInfo = {};
                        }
                        if (Global.freindsInfo[id] == null) {
                            Global.freindsInfo[id] = [];
                        }
                        var find = false;
                        for (var i = 0; i < Global.freindsInfo[id].length; i++) {
                            var oldFriend = Global.freindsInfo[id];
                            if (oldFriend == friendID) {
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            Global.freindsInfo[id].push(friendID);
                            Global.inviteFriends = Global.freindsInfo[id].length;
                        }
                        _self.GameMenuController.updateButtom();
                    });
                } else {
                    Global.inviteFriends++;
                }
            }
        }
    },
    addItems: function addItems() {

        var hard = Global.hard;
        var boxID = StageConfig[hard].box;
        var rewardID = BoxConfig[boxID].reward;
        var conf = RewardConfig[rewardID];
        var num = conf.num;
        var itemdata = {};
        var totoal = 0;
        var reward = {};
        var max = 0;
        for (var i = 1; i < 7; i++) {
            if (conf['rate' + i] != 0) {
                totoal = conf['rate' + i];
                if (i == 1) {
                    itemdata[i] = totoal;
                    max = itemdata[i];
                } else {
                    itemdata[i] = itemdata[i - 1] + totoal;
                    max = itemdata[i];
                }
            }
        }
        for (var _j2 = 1; _j2 <= num; _j2++) {
            var random = GameUtils.random(max);
            for (var z = 1; itemdata[z] != undefined; z++) {
                if (itemdata[z] < random) {
                    continue;
                }
                reward[_j2] = conf['item' + z];
                break;
            }
        }
        var gold = 0;
        var gem = 0;
        var str = "";
        for (var _i2 = 1; _i2 <= num; _i2++) {
            if (reward[_i2] != undefined) {
                str += reward[_i2] + "--";
                if (reward[_i2].indexOf(";") != -1) {
                    var rewardarry = reward[_i2].split(";");
                    if (rewardarry[0] == 1001) {
                        gold += parseInt(rewardarry[1]);
                    } else if (rewardarry[0] == 1002) {
                        gem += parseInt(rewardarry[1]);
                    }
                }
            }
            this.createRewardItem(reward[_i2], _i2);
            this.openbox.active = true;
        }
        if (gold > 0 || gem > 0) {
            var golds = Global.gold + gold;
            var gems = Global.gem + gem;
            this.GameMenuController.updateDate({ gold: golds, gem: gems });
            Global.saveGold(golds);
            Global.saveGem(gems);
        }
    },
    initTreasure: function initTreasure() {
        var BoxID = StageConfig[Global.hard].box;
        var BoxConf = BoxConfig[BoxID];
        this.treasure.normalSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.pressedSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.hoverSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.disabledSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        var animation = BoxConf.animation;
        SkeletonDataCenter.addSkeletonDataWait(animation, this.boxSpine);
        this.treasure.node.y = -GameHeight / 2 + this.blockWidth + 35 - 20;
        this.boxSpine.node.y = -GameHeight / 2 + this.blockWidth + 35 - 20;
    },
    createRewardItem: function createRewardItem(reward, i) {
        var _this4 = this;

        if (this.rewardItem[i]) {
            this.rewardItem[i].destroy();
            this.rewardItem[i] = null;
        }
        var start = -400 + i * 200;

        var node = RewardItemFactory.create(reward);
        var location = this.treasure.node.position;
        this.rewardItem[i] = node;
        node.position = location;
        var action = cc.moveTo(0.5, cc.p(start, 10));
        var action2 = cc.callFunc(function () {
            node.getComponent("RewardItem").setFinish();
            _this4.canTouch = true;
        }, this);
        // node.runAction(cc. moveTo(0.5,cc.p(start,-20)));
        this.openbox.addChild(node);
        node.runAction(cc.sequence(action, action2));
    },
    efficiencyAdd: function efficiencyAdd(id) {
        var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (str != null) {
            this.efficiencyChange();
            return;
        }
        var conf = EfficiencyConfig[id];
        var gem = 0;
        var addgold = 0;
        if (conf.costtype == 1002 && Global.gem >= conf.cost) {
            //enough gem
            gem = Global.gem - conf.cost;
            if (conf.coin > 0) {
                // this.efficeGold += conf.coin - 1;
                var timestamp = Date.parse(new Date()) / 1000; // 以秒为单位
                Global.efficiency[id] = { 'id': id, 'timeleft': conf.time, 'timestart': timestamp };
                this.efficiencyChange();
            }
            var myinfo = {};
            if (conf.jumptime > 0) {
                //jump time

                for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
                    if (Global.hammer[i] != undefined) {
                        var attr = AttributeConfig[Global.hammer[i].attribute];
                        addgold += conf.jumptime * 60 * 60 / attr.time * attr.att;
                    }
                }
                Global.addgold = addgold;
                Global.btnType = 'skip';
                Global.skipID = id;
                this.upgradView.active = true;
            }
        }
        this.GameMenuController.updateDate({ 'gem': gem });
        Global.saveGem(gem);
        Global.saveEfficiency(Global.efficiency);
        this.GameMenuController.updateButtom();
    },
    //进入游戏计算离线时间 并计算收益
    initEfficienyInfo: function initEfficienyInfo() {
        var nowtime = Date.parse(new Date()) / 1000; // 以秒为单位;
        var addgold = 0;
        for (var id in Global.efficiency) {
            if (Global.efficiency[id] == null) {
                continue;
            }
            var paseTime = (nowtime - Global.efficiency[id].timestart) / 60; //以min
            var conf = EfficiencyConfig[id];
            var useTime = conf.time - Global.efficiency[id].timeleft;
            if (paseTime > conf.time) {
                paseTime = conf.time;
            }
            var outlineTime = paseTime - useTime;
            var timeleft = conf.time - outlineTime - useTime;
            if (timeleft <= 0) {
                Global.efficiency[id] = null;
            } else {
                Global.efficiency[id].timeleft = parseInt(timeleft);
                this.efficeGold += conf.coin - 1;
            }
            for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
                if (Global.hammer[i] != undefined) {
                    var attr = AttributeConfig[Global.hammer[i].attribute];
                    addgold += conf.coin * outlineTime * 60 * attr.att / attr.time;
                }
            }
            if (Global.offlinetime < outlineTime) {
                Global.offlinetime = outlineTime;
            }
        }
        Global.saveEfficiency(Global.efficiency);
        addgold = parseInt(addgold);
        if (addgold > 0) {
            Global.addgold = parseInt(addgold);
            Global.btnType = 'outline';
            this.upgradView.active = true;
        }
    },
    //收益加速开始/结束
    efficiencyChange: function efficiencyChange() {
        var addeff = 0;

        for (var id in Global.efficiency) {
            if (Global.efficiency[id] == null) continue;
            var conf = EfficiencyConfig[id];
            addeff += conf.coin - 1;
        }
        this.efficeGold = addeff;
        this.GameMenuController.updateButtom();
    },
    onClickBtnaddGem: function onClickBtnaddGem() {

        var gem = Global.gem + 100;
        this.GameMenuController.updateDate({ 'gem': gem });
        Global.saveGem(gem);
        this.GameMenuController.updateButtom();
    },
    onClickBtnaddGold: function onClickBtnaddGold() {

        var gold = Global.gold + 10;
        this.GameMenuController.updateDate({ 'gold': gold });
        Global.saveGold(gold);
        this.GameMenuController.updateButtom();
    },
    onClickBtnsubGem: function onClickBtnsubGem() {

        var gem = Global.gem - 10 > 0 ? Global.gem - 10 : 0;
        this.GameMenuController.updateDate({ 'gem': gem });
        Global.saveGem(gem);
        this.GameMenuController.updateButtom();
    },
    onClickBtnsubGold: function onClickBtnsubGold() {

        var gold = Global.gold - 10 > 0 ? Global.gold - 10 : 0;
        this.GameMenuController.updateDate({ 'gold': gold });
        Global.saveGold(gold);
        this.GameMenuController.updateButtom();
    },
    onClickBtnaddExp: function onClickBtnaddExp() {

        var exp = Global.exp + 1000;
        this.GameMenuController.updateDate({ 'exp': exp });
        Global.saveExp(exp);
        // this.GameMenuController.updateButtom();
    }
});
//

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
        //# sourceMappingURL=BoxController.js.map
        