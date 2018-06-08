(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/BoxController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '52eeadsoZ5Er4fzucc9O914', 'BoxController', __filename);
// src/controller/BoxController.js

"use strict";

/**
 * Created by bing on 20/04/2018.
 */

//负责head展现和变换。
var CameraController = require('CameraController');
var StageConfig = require("StageConfig");
var BlockConfig = require("BoxConfig1");
var CycleConfig = require("CycleConfig");
var GameType = require("GameType");
var GameUtils = require("GameUtils");
var BlockBigFactory = require("BlockBigFactory");
var BlockSmallFactory = require("BlockSmallFactory");
var SpriteFrameCenter = require("SpriteFrameCenter");
var ParticleSystemCenter = require("ParticleSystemCenter");
var GameMenuController = require('GameMenuController');

var winsize = cc.winSize;
var BaseHeight = winsize.height / 2;
var BaseWidth = winsize.width / 2;
var GameHeight = 514;
var GameCenterY = 360;
var BaseGame = 257;

cc.Class({
    extends: cc.Component,

    properties: {
        gameNode: cc.Node,
        camera: cc.Camera,
        BlockBig: cc.Prefab,
        BlockSmall: cc.Prefab,
        MarginsBig: cc.Prefab,
        MarginsSmall: cc.Prefab,
        UIBottom: cc.Prefab,
        Sky: cc.Node,
        Bgbz: cc.Node,
        Underground: cc.Node,
        motionStreak: cc.MotionStreak,
        hammer: sp.Skeleton,
        boxSpine: sp.Skeleton,
        btnbox: cc.Button,
        GameMenuController: GameMenuController,
        language: {
            visible: false,
            default: "English"
        },
        hard: {
            visible: true,
            default: 5
        },
        myinfo: {
            visible: true,
            default: null
        },
        type: {
            visible: false,
            default: 0
        },
        floorNum: {
            visible: false,
            default: 5
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
        }
    },

    onLoad: function onLoad() {
        var _this = this;

        SpriteFrameCenter.preLoadAtlas("png/box", this.initdata.bind(this));
        this.blocks = [];
        this.marginlist = [];
        this.startPos = -GameHeight / 2;
        // this.sm.on('stop',      this.smCallback,        this);
        this.hammer.setCompleteListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
            _this.hammer.node.active = false;
            _this.smCallback();
        });
        this.boxSpine.node.active = false;
        this.boxSpine.setCompleteListener(function (trackEntry) {
            var animationName1 = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName1);
            _this.restart();
            _this.boxSpine.node.active = false;
        });
    },
    playBoxSpine: function playBoxSpine() {
        this.boxSpine.node.active = true;
        this.boxSpine.setAnimation(0, "newAnimation", false);
    },

    stopBoxSpine: function stopBoxSpine() {
        this.boxSpine.node.active = false;
    },
    playHammerSpine: function playHammerSpine() {

        this.hammer.node.active = true;
        this.hammer.setAnimation(0, "newAnimation", true);
    },
    stopHammerSpine: function stopHammerSpine() {
        this.hammer.node.active = false;
    },
    changeHammerSpine: function changeHammerSpine(data) {
        // this.hammer.node.active = false;
        this.hammer.skeletonData = data;
    },
    start: function start() {
        // this.initdata();
        this.myinfo = JSON.parse(cc.sys.localStorage.getItem('myinfo'));
        if (this.myinfo == null) {
            this.myinfo = { hard: 1, level: 1, gold: 1, gem: 1, exp: 1, hammer: [] };
        }
        this.hard = this.myinfo["hard"];
        this.GameMenuController.initInfo(this.myinfo);
    },
    restart: function restart() {
        this.hard++;

        this.initdata();
    },
    initdata: function initdata() {
        this.floorNum = StageConfig[this.hard].layer;
        for (var i = 0; i < BlockConfig.length; i++) {
            if (BlockConfig[i].blockwidth == StageConfig[this.hard].size) {
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
        this.setSmPosition();
        this.GameMenuController.addUIBottom();
        this.playHammerSpine();
        this.btnbox.node.active = true;
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
                for (var j = 0; j < this.blocks[i].length; j++) {
                    var node = this.blocks[i][j];
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
        for (var i = 0; i < this.floorNum - 1; i++) {

            var lineinfo = this.addLines(this.getPngName(StageConfig[this.hard].cycleID, i), i);

            this.blocks.push(lineinfo);
            lineinfo = [];
        }
        var topline = this.addLines(StageConfig[this.hard].top, i);
        this.blocks.push(topline);
    },
    addLines: function addLines(pngname, thisNum) {

        var conf = BlockConfig[this.type];
        var count = conf.count;
        var factory = this.type == 0 ? BlockBigFactory : BlockSmallFactory;
        var curX = conf.margins + conf.blank - BaseWidth;
        var curY = thisNum * (this.blockWidth + conf.blank) + this.startPos;
        var lineArray = [];
        var left = factory.createMargins(pngname);

        left.position = cc.p(conf.margins / 2 - BaseWidth, curY + this.blockWidth / 2);
        this.gameNode.addChild(left);
        this.marginlist.push(left);
        var right = factory.createMargins(pngname);
        var endpos = BaseWidth - conf.margins / 2;
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
        if (cc.isValid(node)) {
            node.destroy();
            this.destroyUpdate();
        }
    },
    checkCanDestroy: function checkCanDestroy(line, row) {
        if (!cc.isValid(this.blocks[line]) || !cc.isValid(this.blocks[line][row])) return false;
        if (line >= this.floorNum - 1) return true;
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
        this.myinfo.exp++;
        cc.sys.localStorage.setItem('myinfo', JSON.stringify(this.myinfo));
        this.GameMenuController.updateDate({ exp: this.myinfo.exp });
    },
    //--------- block -----------------------
    maxLineNum: function maxLineNum() {
        var max = 0;
        for (var i = 0; i < this.floorNum; i++) {
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

    //************camera 相关设置 start **********************
    cameraCentPosY: function cameraCentPosY() {

        var maxline = this.maxLineNum();
        if (this.curMaxLine <= maxline) {
            return;
        }
        var move = this.curMaxLine - maxline;
        this.curMaxLine = maxline;
        var oldY = this.camera.node.getPositionY();
        if (oldY <= GameCenterY) {
            return;
        }
        var newY = oldY - this.blockWidth * move;
        if (newY >= GameCenterY) {
            this.camera.node.setPositionY(newY);
        } else {
            this.camera.node.setPositionY(GameCenterY);
        }
    },

    cameraStartPosY: function cameraStartPosY() {
        var height = this.floorNum * (this.blockWidth + this.blockBlank);
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
            this.camera.node.setPositionY(GameCenterY);
        } else {
            this.Sky.active = false;
            this.camera.node.setPositionY(GameCenterY - other);
        }
        this.curMaxLine = this.floorNum - 1;
    },

    //************camera 相关设置 end **********************
    //*********** 锤子 相关设置  start***************
    setSmPosition: function setSmPosition() {
        var realwidth = this.blockWidth + this.blockBlank;
        var maxline = this.curMaxLine;
        var maxrow = this.totoalRowNum(0);
        if (maxline == 0 && maxrow == 0) {
            this.HattingPos = null;
            // this.sm.node.visible = false;
            this.hammer.node.active = false;
            return;
        }
        this.hammer.node.active = true;
        var range = this.geScreenRange();
        // let line = GameUtils.randomInt(range.min,range.max);
        var line = this.curMaxLine;
        var find = false;
        var canclick = [];
        for (var i = 0; i < this.rowNum; i++) {
            if (this.blocks[line] && this.checkCanDestroy(line, i)) {
                canclick.push(i);
            }
        }

        var num = GameUtils.randomInt(0, canclick.length - 1);
        var row = canclick[num];

        var location = this.hammerpos(line, row);
        var texiao = this.getEffByBlock(line, row);
        ParticleSystemCenter.addParticleForNode(texiao + ".plist", this.GameMenuController.node, location);
        this.HattingPos = { x: line, y: row };
        this.hammer.node.position = location;
        this.playHammerSpine();
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
        if (cameraPosY <= BaseHeight) {
            min = 0;
        } else {
            var maxPosY = max * realwidth;
            var canshowy = (maxPosY - cameraPosY + BaseHeight) / realwidth;
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
        var realy = line * realwidth + gameY - cameraY - BaseGame;
        var hamX = realx - BaseWidth + 42 + this.blockWidth;
        var hamY = realy - 42;
        return cc.p(hamX, hamY);
    },
    smCallback: function smCallback() {
        if (this.HattingPos != null) {
            var y = this.HattingPos.y;
            var x = this.HattingPos.x;
            if (cc.isValid(this.blocks[x][y])) {
                // this.blocks[x][y].destroy();
                this.destroyBlock(x, y);
            }
            this.cameraCentPosY();
            this.setSmPosition();
        }
    },
    //*********** 锤子 相关设置  end*****************

    updateTouch: function updateTouch(point) {
        var cameraY = this.camera.node.getPositionY();
        var gameY = this.gameNode.y;
        var realwidth = this.blockWidth + this.blockBlank;
        var line = Math.floor((point.y - (gameY - cameraY + BaseHeight - BaseGame)) / realwidth);
        var row = Math.floor((point.x - this.margins - this.blockBlank) / realwidth);
        if (this.checkCanDestroy(line, row)) {
            var location = this.hammerpos(line, row);
            var texiao = this.getEffByBlock(line, row);
            ParticleSystemCenter.addParticleForNode(texiao + ".plist", this.GameMenuController.node, location);
            this.destroyBlock(line, row);
        }
    },
    touchStartCallBack: function touchStartCallBack(location) {
        if (!this.canTouch) {
            return;
        }
        if (location.x < this.margins || location.x > 2 * BaseWidth - this.margins) {
            this.motionStreak.reset();
            return;
        }
        console.log("touchStartCallBack");
        this.previousPt = location;
        this.motionStreak.node.setPositionX(location.x);
        this.motionStreak.node.setPositionY(location.y);
        this.motionStreak.reset();
        // this.isTouching = false;
    },

    touchCancelCallBack: function touchCancelCallBack(location) {
        this.updateTouch(location);
        this.isTouching = false;
        this.motionStreak.reset();
    },

    touchEndCallBack: function touchEndCallBack(location) {
        // this.touchPosition(location);
        this.updateTouch(location);
        this.isTouching = false;
        console.log("touchEndCallBack");
        this.motionStreak.reset();
    },
    touchMoveCallBack: function touchMoveCallBack(location) {
        if (location.x < this.margins || location.x > (2 * BaseWidth - this.margins || location.y < 216)) {
            this.motionStreak.reset();
            return;
        }
        this.updateTouch(location);
        this.previousPt = location;
        this.motionStreak.node.setPositionX(location.x);
        this.motionStreak.node.setPositionY(location.y);
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
        this.playBoxSpine();
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
    toolChange: function toolChange(id) {
        var info = ToolConfig[id];
        var animation = info.animation;
        // BoxController.changeHammerSpine(animation);
        SkeletonDataCenter.addSkeletonData(animation, this.changeHammerSpine.bind(this));
    },
    update: function update() {
        this.cameraCentPosY();
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
        //# sourceMappingURL=BoxController.js.map
        