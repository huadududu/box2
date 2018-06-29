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
var LanguageConfig = require("LanguageConfig");

var GameType = require("GameType");
var GameUtils = require("GameUtils");
var GameState = require("GameState");
var BlockBigFactory = require("BlockBigFactory");
var BlockSmallFactory = require("BlockSmallFactory");
var RewardItemFactory = require("RewardItemFactory");
var UILeadFactory = require("UILeadFactory");

var SpriteFrameCenter = require("SpriteFrameCenter");
var ParticleSystemCenter = require("ParticleSystemCenter");
var SkeletonDataCenter = require("SkeletonDataCenter");
var GameConfig = require("GameConfig");
// let GameMenuController = require('GameMenuController');

var Global = require('Global');

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
        uilead: cc.Prefab,
        inviteUI: cc.Prefab,
        inviteItem: cc.Prefab,
        Sky: cc.Node,
        Bgbz: cc.Node,
        Underground: cc.Node,
        motionStreak: cc.MotionStreak,
        // hammer: sp.Skeleton,
        boxSpine: sp.Skeleton,
        GameMenu: cc.Node,
        treasure: cc.Button,
        upgradView: cc.Node,
        loadingView: cc.Node,
        hammerNode: cc.Node,
        blockNodes: cc.Node,
        onLoadPage: cc.Node,
        openbox: cc.Node,
        hardlvl: cc.Label,
        type: {
            visible: false,
            default: 0
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
        startClock: 3,
        gameState: GameState.init, //0 init 1 playing 2 rolling 3 end,
        loadstate: 2

    },

    onLoad: function onLoad() {
        var _this = this;

        this.winsize = cc.winSize;
        this.BaseHeight = this.winsize.height / 2;
        this.BaseWidth = this.winsize.width / 2;
        this.GameHeight = this.winsize.height - 206;
        this.hammerStart = 1; //表示锤子的起始id
        this.hammerEnd = 10; //表示锤子的最后一个id
        this.boxLeadNode = null; //box的引导节点
        this.rowNum = 0;
        this.startCameraY = 0;
        this.blockLeadNode = null;
        this.blockPosNode = null;
        this.BoxID = 0;
        this.openSecond = 0;
        this.GameMenuController = cc.find("Canvas/GameMenu").getComponent("GameMenuController");
        // this.  loadingView = cc.find("Canvas/loading").getComponent("loadingView");
        // Global.initInfo();
        this.blocks = [];
        this.marginlist = [];
        this.hammers = {};
        this.rewardItem = [];
        this.accelerHammer = 1;
        this.accelerGold = 1;
        this.startPos = -this.GameHeight / 2;
        this.boxSpine.setCompleteListener(function (trackEntry) {
            var animationName1 = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName1);
            // this.restart();
            _this.addItems();
        });

        this.firstOpen = true;
    },
    onloadState: function onloadState() {
        this.startSC();
        this.initdata();
        this.onLoadPage.active = false;
    },
    start: function start() {
        Global.loadstate--;
        if (Global.loadstate <= 0) {
            this.onloadState();
        }
    },
    startSC: function startSC() {
        var _this2 = this;

        this.GameMenuController.initInfo();
        this.hammers = {};
        var timescale = 1;
        var hammer = Global.hammer;
        this.initEfficienyInfo(); //[改 延迟执行]
        // SpriteFrameCenter.preLoadAtlas("png/box", this.initdata.bind(this));

        var _loop = function _loop() {
            if (hammer[i] == undefined) return "continue";
            var node = new cc.Node();
            var nodehammer = node.addComponent(sp.Skeleton);
            var info = ToolConfig[i];
            var animation = info.animation;
            SkeletonDataCenter.addSkeletonData(animation, nodehammer);
            _this2.hammerNode.addChild(node);
            _this2.hammers[hammer[i].id] = nodehammer;
            nodehammer.node.active = false;
            var j = i;
            nodehammer.setCompleteListener(function (trackEntry) {
                var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                // cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
                nodehammer.node.active = false;
                if (_this2.checkCanHammer(j)) {
                    _this2.smCallback(j);
                }
            });
            var attribute = Global.hammer[i].attribute;
            var conf1 = AttributeConfig[attribute];
            nodehammer.timeScale = 0.17 * conf1.att / parseFloat(conf1.time) * _this2.accelerHammer;
            // nodehammer.timeScale =  conf1.att / parseFloat(conf1.time) * this.accelerHammer;
        };

        for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
            var _ret = _loop();

            if (_ret === "continue") continue;
        }
    },
    update: function update() {
        // this.cameraCentPosY();
    },
    restart: function restart() {
        this.openbox.active = false;
        if (StageConfig[Global.hard + 1] != null && StageConfig[Global.hard + 1] != undefined) {
            Global.hard++;
            Global.saveHard(Global.hard);
        }
        this.deleteBoxLead();
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
        this.openSecond++;
        var floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < BlockConfig.length; i++) {
            if (BlockConfig[i].blockwidth == StageConfig[Global.hard].size) {
                this.type = BlockConfig[i].type;
                break;
            }
        }
        this.hardlvlFun();
        this.rowNum = BlockConfig[this.type].count;
        this.blockWidth = BlockConfig[this.type].blockwidth;
        this.blockBlank = BlockConfig[this.type].blank;
        this.margins = BlockConfig[this.type].margins;

        this.addBlocks();
        this.cameraStartPosY();
        this.changeBlockLead();
        this.treasure.node.active = true;
        this.playHammers();
        this.initTreasure();
        if (this.firstOpen) {
            this.GameMenuController.addUIBottom();
            this.firstOpen = false;
        }
    },
    //-----------------------------锤子部分 start-------------------------
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
    startAddHammer: function startAddHammer() {},
    stopHammerSpine: function stopHammerSpine(hammerpos) {
        this.hammers[hammerpos].node.active = false;
    },
    addHammer: function addHammer(id) {
        var _this3 = this;

        var node = new cc.Node();
        var hammer = node.addComponent(sp.Skeleton);
        var info = ToolConfig[id];
        var animation = info.animation;
        var conf = AttributeConfig[info.attribute];

        SkeletonDataCenter.addSkeletonData(animation, hammer);
        this.hammerNode.addChild(node);
        this.hammers[id] = hammer;
        hammer.node.active = false;
        hammer.setCompleteListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            // cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
            hammer.node.active = false;
            if (_this3.checkCanHammer(id)) {
                _this3.smCallback(id);
            }
        });
        var timescale = 0.17 * conf.att / parseFloat(conf.time) * this.accelerHammer;
        // let timescale =  conf.att / parseFloat(conf.time) * this.accelerHammer;
        hammer.timeScale = timescale;
    },
    changeHammerSpine: function changeHammerSpine(data) {
        this.hammer.skeletonData = data;
    },

    checkCanHammer: function checkCanHammer(id) {
        var hammer = Global.hammer;
        if (hammer[id] != undefined && hammer[id].attribute != -1) return true;
        return false;
    },
    setSmPosition: function setSmPosition(hammerpos) {
        if (this.blockPosNode != null) {
            if (this.HattingPos == null) {
                this.HattingPos = {};
            }
            var startLine = this.blockPosNode.x;
            var startRow = this.blockPosNode.y;
            this.HattingPos[hammerpos] = this.blockPosNode;
            var position = this.hammerpos(startLine, startRow);
            // console.log("choose:",this.HattingPos[hammerpos]);
            this.hammers[hammerpos].node.position = position;
            this.hammers[hammerpos].node.active = true;
            this.playHammerSpine(hammerpos);
            this.blockPosNode = null;
            return;
        }
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
        // console.log("choose:",this.HattingPos[hammerpos]);
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
        // let cameraY = this.camera.node.getPositionY();
        // let gameY = this.gameNode.y;
        var realwidth = this.blockWidth + this.blockBlank;
        // let realx = row * realwidth + this.margins + this.blockBlank;
        // let realy = line * realwidth - cameraY ;
        // let hamX = realx - this.BaseWidth  + this.blockWidth - 50;
        // let hamY = realy + this.blockWidth -140;
        // return cc.p(hamX, hamY);
        var hamX = row * realwidth + this.margins + this.blockBlank - this.BaseWidth + 50;
        var hamY = line * realwidth - this.GameHeight / 2 + this.blockWidth;
        return cc.p(hamX, hamY);
    },
    smCallback: function smCallback(hammerpos) {
        if (this.HattingPos != null && this.HattingPos[hammerpos] != null) {

            var y = this.HattingPos[hammerpos].y;
            var x = this.HattingPos[hammerpos].x;
            // console.log("hammer:",x,y);
            if (cc.isValid(this.blocks[x][y])) {
                this.destroyBlock(x, y);
            }
            // this.changeBlockLead(true);
            this.setSmPosition(hammerpos);
        }
    },
    //-----------------------------锤子部分 end-------------------------
    //-----------------------------block start-------------------------

    resetMarginList: function resetMarginList() {
        if (this.marginlist && this.marginlist.length > 0) {
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
        if (this.blocks && this.blocks.length > 0) {
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
    addBlocks: function addBlocks() {

        this.resetBlockList();
        this.resetMarginList();
        var floorNum = StageConfig[Global.hard].layer;
        var thisfloor = floorNum - 2;
        for (var i = 0; i < floorNum - 1; i++) {

            var lineinfo = this.addLines(this.getPngName(StageConfig[Global.hard].cycleID, thisfloor), i);

            this.blocks.push(lineinfo);
            lineinfo = [];
            thisfloor--;
        }
        var topline = this.addLines(StageConfig[Global.hard].top, floorNum - 1);
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
        this.blockNodes.addChild(left);
        this.marginlist.push(left);
        var right = factory.createMargins(pngname);
        var endpos = this.BaseWidth - conf.margins / 2;
        right.position = cc.p(endpos, curY + this.blockWidth / 2);
        this.blockNodes.addChild(right);
        this.marginlist.push(right);

        for (var i = 0; i < count; i++) {
            var node = factory.create(pngname);
            node.position = cc.p(curX + this.blockWidth / 2, curY + this.blockWidth / 2);
            curX += this.blockWidth + conf.blank;
            this.blockNodes.addChild(node);
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
            // console.log("destroylog:", line, ":", row, location);
            ParticleSystemCenter.addParticleForNode(texiao + ".plist", this.GameMenuController.practice, location);
            node.removeFromParent(true);
            this.blocks[line][row] = null;
            this.destroyUpdate();
            this.cameraCentPosY();
        }
        this.firstblock = false;
        this.startClock--;
        this.changeBlockLead();
    },
    changeBlockLead: function changeBlockLead() {
        var bool = this.startClock > 0;
        if (Global.hard == 1 && bool) {
            if (!this.blockLeadNode) {
                var node = UILeadFactory.create();
                this.blockLeadNode = node;
                this.hammerNode.addChild(node);
            }
            var row = 3 + this.startClock;
            var line = 2;

            var position = this.hammerpos(line, row);
            position.y = position.y - 50;
            position.x = position.x;
            this.blockLeadNode.position = position;
            this.blockPosNode = { x: line, y: row };
        } else {
            if (this.blockLeadNode) {
                this.blockLeadNode.removeFromParent(true);
                this.blockLeadNode = null;
                this.blockPosNode = null;
            }
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
        var addexp = 1;
        var addgold = 1 * this.accelerGold + this.efficeGold;
        myinfo.exp = Global.exp + addexp;
        myinfo.gold = Global.gold + addgold;
        this.GameMenuController.updateDate(myinfo);
        this.GameMenuController.broadcastShows({ exp: addexp, coin: addgold });
        Global.saveExp(myinfo.exp);
        Global.saveGold(myinfo.gold);

        // ssssss
        var maxlinenum = this.maxLineNum();

        if (maxlinenum == 0) {
            var totoalRowNum = this.totoalRowNum(0);
            if (totoalRowNum == 0) {
                this.addBoxLead();
                this.GameMenuController.broadcastShows('finish');
                this.GameState = GameState.end;
            }
        }
    },
    maxLineNum: function maxLineNum() {
        var max = 0;
        var floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < floorNum; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                if (this.blocks && this.blocks[i] && this.blocks[i][j]) {
                    var node = this.blocks[i][j];
                    if (!cc.isValid(node)) continue;
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
    //-----------------------------block   end-------------------------
    //-----------------------------camera   start-------------------------

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
        // for (var i = this.hammerStart; i < this.hammerEnd; i++) {
        //     if(this.hammers[i] != undefined){
        //         let location=this.hammers[i].node.position;
        //         let action2 = cc.moveTo(0.1,{x:location.x,y:location.y+ralmovelength})
        //         this.hammers[i].node.runAction(action2);
        //     }
        // }
    },

    cameraStartPosY: function cameraStartPosY() {
        var floorNum = StageConfig[Global.hard].layer;
        var height = floorNum * (this.blockWidth + this.blockBlank);
        //地下
        this.Underground.height = height;
        var posbottom = (height - this.GameHeight) / 2;
        this.Underground.y = posbottom;
        //地面
        var totoal = this.Bgbz.height + height - 50;
        var skyposy = void 0;
        var bzYbottom = void 0;
        var other = this.GameHeight - totoal;
        bzYbottom = (totoal + height - this.GameHeight) / 2 - 25;
        this.Bgbz.y = bzYbottom;
        var movePos = 0;
        if (other > 0) {
            this.Sky.active = true;
            this.Sky.height = other + 10;
            skyposy = (this.GameHeight - other) / 2;
            this.Sky.y = skyposy;
            // this.camera.node.setPositionY(0);
            movePos = 0;
        } else {
            this.Sky.active = false;
            // this.camera.node.setPositionY(-other);
            movePos = -other;
        }
        this.camera.node.setPositionY(movePos);
        this.startCameraY = movePos;
        this.curMaxLine = floorNum - 1;
    },
    //-----------------------------camera   end-------------------------
    //----------------------------- treasure start----------------------
    playBoxSpine: function playBoxSpine() {
        this.boxSpine.node.active = true;
        this.boxSpine.setAnimation(0, "newAnimation", false);
    },
    stopBoxSpine: function stopBoxSpine() {
        this.boxSpine.node.active = false;
    },
    initTreasure: function initTreasure() {
        var BoxID = void 0;
        var Boxstr = StageConfig[Global.hard].box;
        if (Boxstr.indexOf(";") != -1) {
            var boxarr = Boxstr.split(";");
            var num = GameUtils.randomInt(0, boxarr.length - 1);
            BoxID = boxarr[num];
        } else {
            BoxID = parseInt(Boxstr);
        }

        this.BoxID = BoxID;
        var BoxConf = BoxConfig[BoxID];
        this.treasure.normalSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.pressedSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.hoverSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.disabledSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        var animation = BoxConf.animation;
        SkeletonDataCenter.addSkeletonDataWait(animation, this.boxSpine);
        this.treasure.node.y = -this.GameHeight / 2 + this.blockWidth + 35 - 20;
        this.boxSpine.node.y = -this.GameHeight / 2 + this.blockWidth + 35 - 20 + 103;
        // let loction  = this.gameNode.convertToWorldSpace(this.treasure.node.position);
        // let loction1 = this.openbox.convertToNodeSpace(loction);
        // this.boxSpine.node = loction1;
    },
    addItems: function addItems() {

        var hard = Global.hard;
        var rewardID = BoxConfig[this.BoxID].reward;
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
        for (var _i = 1; _i <= num; _i++) {
            if (reward[_i] != undefined) {
                if (reward[_i].indexOf(";") != -1) {
                    var rewardarry = reward[_i].split(";");
                    var valuestr = rewardarry[1];
                    var valueArr = void 0;
                    var startnum = 0;
                    if (valuestr.indexOf('*') != -1) {
                        valueArr = valuestr.split("*");
                        startnum = valueArr[0];
                        for (var _i2 = 1; _i2 < valueArr.length; _i2++) {
                            if (valueArr[_i2] == "lv") {
                                startnum *= Global.level;
                            }
                        }
                    } else {
                        startnum = parseInt(valuestr);
                    }
                    if (rewardarry[0] == 1001) {
                        gold += startnum;
                    } else if (rewardarry[0] == 1002) {
                        gem += startnum;
                    }
                }
            }
            this.createRewardItem(reward[_i], _i);
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
    createRewardItem: function createRewardItem(reward, i) {
        var _this4 = this;

        if (this.rewardItem[i]) {
            this.rewardItem[i].destroy();
            this.rewardItem[i] = null;
        }
        var start = -400 + i * 200;

        var node = RewardItemFactory.create(reward);
        var locationX = this.treasure.node.position.x;
        var locationY = this.treasure.node.position.y + 103;

        this.rewardItem[i] = node;
        node.position = cc.p(locationX, locationY);
        var action = cc.moveTo(0.5, cc.p(start, 100));
        var action2 = cc.callFunc(function () {
            node.getComponent("RewardItem").setFinish();
            _this4.canTouch = true;
        }, this);
        // node.runAction(cc. moveTo(0.5,cc.p(start,-20)));
        this.openbox.addChild(node);
        node.runAction(cc.sequence(action, action2));
    },
    onClickTreasure: function onClickTreasure(event) {
        var maxlinenum = this.maxLineNum();
        var totoalRowNum = this.totoalRowNum(0);
        if (maxlinenum != 0 || totoalRowNum != 0) {
            this.touchEndPoint = event.getLocation();

            this.updateTouch(this.touchEndPoint);
            return;
        }
        this.treasure.node.active = false;
        this.gameState = GameState.end;
        this.canTouch = false;
        this.openbox.active = true;
        this.playBoxSpine();
    },
    addBoxLead: function addBoxLead() {
        if (Global.hard > 1) return;
        var maxlinenum = this.maxLineNum();
        var totoalRowNum = this.totoalRowNum(0);
        if (maxlinenum == 0 && totoalRowNum == 0) {
            var node = UILeadFactory.create();
            node.position = this.treasure.node.position;
            node.ratation = 180;
            this.boxLeadNode = node;
            this.gameNode.addChild(node);
        }
    },
    deleteBoxLead: function deleteBoxLead() {
        if (this.boxLeadNode) {
            this.boxLeadNode.removeFromParent(true);
            this.boxLeadNode = null;
        }
    },
    //-----------------------------treasure end--------------------------
    //-----------------------------touch   start-------------------------
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
        // this.changeBlockLead(true);
    },
    touchStartCallBack: function touchStartCallBack(location1) {

        if (!this.canTouch) {
            return;
        }

        // console.log("touchStartCallBack");

        if (this.gameState == GameState.end) {

            //每打开3次弹出一个插屏广告
            if (GameConfig.isFBInstantGame()) {
                if (this.openSecond % 3 == 0) {
                    var FBP = require("FBPlugin");
                    FBP.InterstitialAdAsync();
                } else if (this.openSecond == 4) {
                    //第4个弹出创建icon
                    var _FBP = require("FBPlugin");
                    _FBP.chooseAsync();
                    this.restart();
                } else {
                    var _FBP2 = require("FBPlugin");
                    var num = GameUtils.randomInt(0, 100);
                    if (num < 70) {
                        _FBP2.createShortCut();
                    }
                }
            }
            this.restart();
        }

        if (this.touchState == undefined || this.touchState != 'start' && this.touchState != 'move') {
            this.touchState = 'start';
        } else {
            this.touchState = 'mult';
        }
        if (this.touchState == 'mult') {
            this.motionStreak.node.active = false;
        }
        var location = this.gameNode.convertToNodeSpace(location1);
        this.motionStreak.node.setPositionX(location1.x - this.BaseWidth);
        this.motionStreak.node.setPositionY(location1.y - this.BaseHeight);
        this.motionStreak.reset();
    },

    touchCancelCallBack: function touchCancelCallBack(location1) {
        this.touchState = 'cancle';
        var location = this.gameNode.convertToNodeSpace(location1);
        this.updateTouch(location);
        this.isTouching = false;
        this.motionStreak.reset();
        this.motionStreak.node.active = true;
    },

    touchEndCallBack: function touchEndCallBack(location1) {
        this.touchState = 'end';
        var location = this.gameNode.convertToNodeSpace(location1);
        this.updateTouch(location);
        this.isTouching = false;
        // console.log("touchEndCallBack");
        this.motionStreak.reset();
        this.previousPt = null;
        this.motionStreak.node.active = true;
    },
    touchMoveCallBack: function touchMoveCallBack(location1) {
        var location = this.gameNode.convertToNodeSpace(location1);
        if (!this.canTouch) {
            return;
        }
        this.touchState = "move";
        // console.log("touchMoveCallBack");
        this.motionStreak.node.setPositionX(location1.x - this.BaseWidth);
        this.motionStreak.node.setPositionY(location1.y - this.BaseHeight);
        if (location.x < this.margins || location.x > (2 * this.BaseWidth - this.margins || location.y < 216)) {
            this.motionStreak.reset();
            return;
        }
        this.updateTouch(location);
        // this.previousPt = location;
        // let motionpos = this.node.convertToNodeSpace(location1);
        // this.motionStreak.node.position=motionpos;
    },
    //多点触控
    multMoveCallBack: function multMoveCallBack(location01) {
        var location02 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this.touchState = "mult";
        this.motionStreak.reset();
        var location1 = this.gameNode.convertToNodeSpace(location01);
        // let location2 = this.gameNode.convertToNodeSpace(location02);
        // console.log("1",location1);
        // console.log("2",location2);
        if (this.previousPt == null) {
            this.previousPt = {};
            this.previousPt[0] = location1;
            // this.previousPt[1]= location2;
            return;
        }
        var distance = cc.pSub(this.previousPt[0], location1);
        if (distance.y != 0) {
            var origin = this.camera.node.getPositionY();
            var endpos = (origin + distance.y) * 0.5;
            if (endpos < 0) {
                endpos = 0;
            }
            if (endpos > this.startCameraY) {
                endpos = this.startCameraY;
            }
            if (endpos == 0) return;
            var move = origin - endpos;
            this.camera.node.setPositionY(endpos);
        }
    },
    //-----------------------------touch   end-------------------------
    //-----------------------------bottom   start-------------------------


    eventcallback: function eventcallback(type, id) {
        var string = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        // let node= this.itemList.indexOf(sender);
        switch (type) {
            case 0:
                this.type0deal(id, string);
                break;
            case 1:
                this.type1deal(id);
                break;
            case 2:
                this.type2deal(id, string);
                break;
        }
    },
    //----------------- efficiency tools config start----------------------

    type0deal: function type0deal(id) {
        var string = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (string == null) {
            //视频激励
            if (GameConfig.isFBInstantGame()) {
                if (id == 1) {
                    this.loadingView.active = true;
                    var _self = this;
                    var FBP = require("FBPlugin");
                    FBP.RewardedVideoAsync(function () {
                        // let FBP = require("FBPlugin");
                        // self.adGame();
                        _self.loadingView.active = false;
                        _self.accleleratorChange(id);
                    });
                } else {
                    var _FBP3 = require("FBPlugin");
                    _FBP3.chooseAsync(function () {
                        self.loadingView.active = false;
                        self.accleleratorChange(id);
                    });
                }
            } else {
                this.accleleratorChange(id);
            }
        } else {
            if (string == 'finish') {
                this.accleleratorrRecover(id);
            }
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
    //----------------- efficiency tools config end----------------------
    //----------------- hammers tools config start----------------------

    changeHammerSpeed: function changeHammerSpeed() {
        var speedHammer = 0;
        var speedGold = 0;
        for (var _i3 = 1; _i3 <= 2; _i3++) {
            if (Global['bar' + _i3] > 0) {
                speedHammer += AcceleratorConfig[_i3].speed;
                speedGold += AcceleratorConfig[_i3].coin;
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
                // this.hammers[i].timeScale =  (conf1.att / parseFloat(conf1.time)) * this.accelerHammer;
            }
        }
    },
    changeGoldSpeed: function changeGoldSpeed() {},
    type1deal: function type1deal(id) {
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
                // this.hammers[id].timeScale = (conf1.att / parseFloat(conf1.time)) * this.accelerHammer;
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
                var inviteFriends = void 0;
                if (GameConfig.isFBInstantGame()) {
                    if (Global.freindsInfo == null || Global.freindsInfo[id] == null) {
                        inviteFriends = 0;
                    } else {
                        inviteFriends = Global.freindsInfo[id].length;
                    }
                } else {
                    if (Global.freindsInfo == null || Global.freindsInfo[id] == null) {
                        inviteFriends = 0;
                    } else {
                        inviteFriends = Global.freindsInfo[id].length;
                    }
                    // inviteFriends = Global.inviteFriends;
                }
                if (inviteFriends < confArry[1]) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        return false;
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
                    this.loadingView.active = true;
                    var FBP = require("FBPlugin");
                    FBP.RewardedVideoAsync(function () {
                        var FBP = require("FBPlugin");
                        Global.openAdTimes++;
                        self.adGame();
                        self.GameMenuController.updateButtom();
                    });
                } else {
                    Global.openAdTimes++;
                    this.loadingView.active = true; //[change]
                }
            } else if (thisID == 3) {
                //邀请好友
                var FBP1 = require("FBPlugin");
                var _self2 = this;
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
                                var PopMsgController = require("PopMsgController");
                                PopMsgController.showMsg(LanguageConfig['10039'][Global.language]);
                                break;
                            }
                        }
                        if (!find) {
                            Global.freindsInfo[id].push(friendID);
                            Global.savefreindsInfo(Global.freindsInfo);
                            // Global.inviteFriends = Global.freindsInfo[id].length;
                        }
                        _self2.GameMenuController.updateButtom();
                    });
                } else {
                    // Global.inviteFriends++;
                    if (Global.freindsInfo == null) {
                        Global.freindsInfo = {};
                    }
                    if (Global.freindsInfo[id] == null) {
                        Global.freindsInfo[id] = [];
                    }
                    var friendID = Global.freindsInfo[id].length + 1;

                    Global.freindsInfo[id].push(friendID);
                    Global.savefreindsInfo(Global.freindsInfo);
                    _self2.GameMenuController.updateButtom();
                }
            }
        }
    },
    //----------------- hammers tools config end----------------------
    //----------------- accelerate  tools config start----------------------


    type2deal: function type2deal(id) {
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
    //----------------- accelerate  tools config start----------------------
    //-----------------------------bottom   end----------------------------
    //-----------------------------loading   start----------------------------

    adGame: function adGame() {
        this.loadingView.active = false;
    },
    //-----------------------------loading   end----------------------------
    //-----------------------------GM   part start-------------------------

    onClickBtnaddGem: function onClickBtnaddGem() {

        var gem = Global.gem + 100;
        this.GameMenuController.updateDate({ 'gem': gem });
        Global.saveGem(gem);
        this.GameMenuController.updateButtom();
    },
    onClickBtnsubGem: function onClickBtnsubGem() {

        var gem = Global.gem - 10 > 0 ? Global.gem - 10 : 0;
        this.GameMenuController.updateDate({ 'gem': gem });
        Global.saveGem(gem);
        this.GameMenuController.updateButtom();
    },
    onClickBtnaddGold: function onClickBtnaddGold() {

        var gold = Global.gold + 100000;
        this.GameMenuController.updateDate({ 'gold': gold });
        Global.saveGold(gold);
        this.GameMenuController.updateButtom();
    },
    onClickBtnsubGold: function onClickBtnsubGold() {

        // let localStorage = require("LocalStorage");
        // localStorage.get('gold',0,function (data) {
        //     console.log("fb data",data);
        // });
        // return;

        var gold = Global.gold - 10000 > 0 ? Global.gold - 10000 : 0;
        this.GameMenuController.updateDate({ 'gold': gold });
        Global.saveGold(gold);
        this.GameMenuController.updateButtom();
    },
    onClickBtnaddExp: function onClickBtnaddExp() {

        // let localStorage = require("LocalStorage");
        // localStorage.set('gold',1);
        // return;

        var exp = Global.exp + 500000;
        this.GameMenuController.updateDate({ 'exp': exp });
        Global.saveExp(exp);
        // this.GameMenuController.updateButtom();
    },
    onClickUnlockAll: function onClickUnlockAll() {
        for (var id = this.hammerStart; id <= this.hammerEnd; id++) {
            var info = ToolConfig[id];
            if (Global.hammer[id] == undefined) {
                Global.hammer[id] = { id: id, attribute: info.attribute };
                Global.saveHammer(Global.hammer);
                this.addHammer(id);
                this.setSmPosition(id);
            }
        }
    },

    hardlvlFun: function hardlvlFun() {
        this.hardlvl.string = Global.hard;
    }
    //-----------------------------GM   part end-------------------------
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
        