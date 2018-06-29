/**
 * Created by bing on 20/04/2018.
 */

//负责head展现和变换。
let StageConfig = require("StageConfig");
let BlockConfig = require("BoxConfig1");
let CycleConfig = require("CycleConfig");
let ToolConfig = require("ToolConfig");
let AttributeConfig = require("AttributeConfig");
let AcceleratorConfig = require("AcceleratorConfig");
let EfficiencyConfig = require("EfficiencyConfig");
let BoxConfig = require("BoxConfig");
let RewardConfig = require("RewardConfig");
let LanguageConfig = require("LanguageConfig");



let GameType = require("GameType");
let GameUtils = require("GameUtils");
let GameState = require("GameState");
let BlockBigFactory = require("BlockBigFactory");
let BlockSmallFactory = require("BlockSmallFactory");
let RewardItemFactory = require("RewardItemFactory");
let UILeadFactory = require("UILeadFactory");

let SpriteFrameCenter = require("SpriteFrameCenter");
let ParticleSystemCenter = require("ParticleSystemCenter");
let SkeletonDataCenter = require("SkeletonDataCenter");
let GameConfig = require("GameConfig");
// let GameMenuController = require('GameMenuController');

let Global = require('Global');


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
        inviteUI:cc.Prefab,
        inviteItem:cc.Prefab,
        Sky: cc.Node,
        Bgbz: cc.Node,
        Underground: cc.Node,
        motionStreak: cc.MotionStreak,
        // hammer: sp.Skeleton,
        boxSpine: sp.Skeleton,
        GameMenu:cc.Node,
        treasure: cc.Button,
        upgradView: cc.Node,
        loadingView:cc.Node,
        hammerNode:cc.Node,
        blockNodes:cc.Node,
        onLoadPage:cc.Node,
        openbox: cc.Node,
        hardlvl:cc.Label,
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
        startClock:3,
        gameState: GameState.init,//0 init 1 playing 2 rolling 3 end,
        loadstate:2,

    },


    onLoad: function () {
        this.winsize = cc.winSize;
        this.BaseHeight = this.winsize.height / 2;
        this.BaseWidth = this.winsize.width / 2;
        this.GameHeight = this.winsize.height - 206;
        this.hammerStart = 1;//表示锤子的起始id
        this.hammerEnd = 10;//表示锤子的最后一个id
        this.boxLeadNode = null;//box的引导节点
        this.rowNum = 0;
        this.startCameraY=0;
        this.blockLeadNode = null;
        this.blockPosNode = null;
        this.BoxID = 0;
        this.openSecond =0;
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
        this.boxSpine.setCompleteListener(trackEntry => {
            var animationName1 = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName1);
            // this.restart();
            this.addItems();

        });

        this.firstOpen = true;

    },
    onloadState:function(){
            this.startSC();
            this.initdata();
             this.onLoadPage.active = false;
    },
    start: function () {
        Global.loadstate--;
        if(Global.loadstate<=0) {
            this.onloadState();
        }
    },
    startSC: function () {
        this.GameMenuController.initInfo();
        this.hammers = {};
        let timescale = 1;
        let hammer = Global.hammer;
        this.initEfficienyInfo();//[改 延迟执行]
        // SpriteFrameCenter.preLoadAtlas("png/box", this.initdata.bind(this));
        for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
            if (hammer[i] == undefined)
                continue;
            let node = new cc.Node();
            let nodehammer = node.addComponent(sp.Skeleton);
            let info = ToolConfig[i];
            let animation = info.animation;
            SkeletonDataCenter.addSkeletonData(animation, nodehammer);
            this.hammerNode.addChild(node);
            this.hammers[hammer[i].id] = nodehammer;
            nodehammer.node.active = false;
            let j=i;
            nodehammer.setCompleteListener(trackEntry => {
                var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                // cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
                nodehammer.node.active = false;
                if (this.checkCanHammer(j)) {
                    this.smCallback(j);
                }
            });
            let attribute = Global.hammer[i].attribute;
            let conf1 = AttributeConfig[attribute];
            nodehammer.timeScale = 0.17 * conf1.att / parseFloat(conf1.time) * this.accelerHammer;
            // nodehammer.timeScale =  conf1.att / parseFloat(conf1.time) * this.accelerHammer;
        }

    },
    update: function () {
        // this.cameraCentPosY();
    },
    restart: function () {
        this.openbox.active = false;
        if (StageConfig[Global.hard+1] != null && StageConfig[Global.hard+1] != undefined) {
            Global.hard++;
            Global.saveHard(Global.hard);
        }
        this.deleteBoxLead();
        this.boxSpine.node.active = false;
        for (let i = 1; i < 4; i++) {
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
    initdata: function () {
        this.openSecond++;
        let floorNum = StageConfig[Global.hard].layer;
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
        if(this.firstOpen) {
            this.GameMenuController.addUIBottom();
            this.firstOpen = false;
        }


    },
    //-----------------------------锤子部分 start-------------------------
    playHammerSpine: function (hammerpos) {

        this.hammers[hammerpos].node.active = true;
        this.hammers[hammerpos].setAnimation(0, "newAnimation", true);
    },
    playHammers: function () {
        for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
            if (this.hammers[i] != undefined) {
                this.setSmPosition(i);
            }
        }
    },
    startAddHammer:function(){

    },
    stopHammerSpine: function (hammerpos) {
        this.hammers[hammerpos].node.active = false;
    },
    addHammer: function (id) {
        let node = new cc.Node();
        let hammer = node.addComponent(sp.Skeleton);
        let info = ToolConfig[id];
        let animation = info.animation;
        let conf = AttributeConfig[info.attribute];

        SkeletonDataCenter.addSkeletonData(animation, hammer);
        this.hammerNode.addChild(node);
        this.hammers[id] = hammer;
        hammer.node.active = false;
        hammer.setCompleteListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            // cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
            hammer.node.active = false;
            if (this.checkCanHammer(id)) {
                    this.smCallback(id);
            }
        });
        let timescale = 0.17 * conf.att / parseFloat(conf.time) * this.accelerHammer;
        // let timescale =  conf.att / parseFloat(conf.time) * this.accelerHammer;
        hammer.timeScale = timescale;
    },
    changeHammerSpine: function (data) {
        this.hammer.skeletonData = data;
    },


    checkCanHammer: function (id) {
        var hammer = Global.hammer;
        if (hammer[id] != undefined && hammer[id].attribute != -1)
            return true;
        return false;
    },
    setSmPosition: function (hammerpos) {
        if(this.blockPosNode !=null){
            if (this.HattingPos == null) {
                this.HattingPos = {};
            }
            let startLine = this.blockPosNode.x;
            let startRow = this.blockPosNode.y;
            this.HattingPos[hammerpos] = this.blockPosNode;
            let position = this.hammerpos(startLine,startRow);
            // console.log("choose:",this.HattingPos[hammerpos]);
            this.hammers[hammerpos].node.position = position;
            this.hammers[hammerpos].node.active = true;
            this.playHammerSpine(hammerpos);
            this.blockPosNode = null;
            return;
        }
        let realwidth = this.blockWidth + this.blockBlank;
        let maxline = this.curMaxLine;
        let maxrow = this.totoalRowNum(0);
        if (maxline == 0 && maxrow == 0) {
            this.HattingPos = null;
            // this.sm.node.visible = false;
            this.hammers[hammerpos].node.active = false;
            return;
        }

        let range = this.geScreenRange();
        let line = this.curMaxLine;
        let find = false;
        let canclick = [];
        let curline = line;
        for (; curline >= 0; curline--) {
            for (var i = 0; i < this.rowNum; i++) {//当前行可以删除的
                if (this.blocks[curline] && this.checkCanDestroy(curline, i)) {
                    let find = false;
                    for (var j = this.hammerStart; j <= this.hammerEnd; j++) {
                        if (this.HattingPos && this.HattingPos[j]) {
                            if (this.HattingPos[j].x == curline && i == this.HattingPos[j].y) {
                                find = true;
                                break;
                            }
                        }
                    }
                    if (!find) {
                        canclick.push(i);
                    }
                }
            }
            if (canclick.length > 0)
                break;
        }
        if (canclick.length == 0) {
            this.HattingPos[hammerpos] = null;
            return;
        }
        let num = GameUtils.randomInt(0, canclick.length - 1);
        let row = canclick[num];
        let location = this.hammerpos(curline, row);
        if (this.HattingPos == null) {
            this.HattingPos = {};
        }
        this.HattingPos[hammerpos] = {x: curline, y: row};
        // console.log("choose:",this.HattingPos[hammerpos]);
        this.hammers[hammerpos].node.position = location;
        this.hammers[hammerpos].node.active = true;
        this.playHammerSpine(hammerpos);
    },
    //根据小块的位置 过的特效文件
    getEffByBlock(line, row) {

        let type = this.type == 0 ? "BlockBig" : "BlockSmall";
        let node = this.blocks[line][row].getComponent(type);
        return node.getPngId();
    },
    geScreenRange: function () {
        let max = this.curMaxLine;
        let cameraPosY = this.camera.node.getPositionY();
        let min = 0;
        let realwidth = this.blockWidth + this.blockBlank;
        if (cameraPosY <= this.BaseHeight) {
            min = 0;
        } else {
            let maxPosY = max * realwidth;
            let canshowy = (maxPosY - cameraPosY + this.BaseHeight) / realwidth;
            min = Math.floor(max - canshowy);
        }
        return {max: max, min: min};
    },
    //根据块的位置计算锤子的位置
    hammerpos: function (line, row) {
        // let cameraY = this.camera.node.getPositionY();
        // let gameY = this.gameNode.y;
        let realwidth = this.blockWidth + this.blockBlank;
        // let realx = row * realwidth + this.margins + this.blockBlank;
        // let realy = line * realwidth - cameraY ;
        // let hamX = realx - this.BaseWidth  + this.blockWidth - 50;
        // let hamY = realy + this.blockWidth -140;
        // return cc.p(hamX, hamY);
        let hamX = row * realwidth + this.margins + this.blockBlank -  this.BaseWidth + 50;
        let hamY = line * realwidth - this.GameHeight/2+this.blockWidth;
        return cc.p(hamX, hamY)


    },
    smCallback: function (hammerpos) {
        if (this.HattingPos != null && this.HattingPos[hammerpos] != null) {

            let y = this.HattingPos[hammerpos].y;
            let x = this.HattingPos[hammerpos].x;
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

    resetMarginList: function () {
        if (this.marginlist && this.marginlist.length > 0) {
            for (let i = 0; i < this.marginlist.length; i++) {
                let node = this.marginlist[i];
                if (cc.isValid(node)) {
                    node.destroy();
                }
            }
        }
        this.marginlist = [];
    },
    resetBlockList: function () {
        if (this.blocks && this.blocks.length > 0) {
            for (let i = 0; i < this.blocks.length; i++) {
                for (let j = 0; j < this.blocks[i].length; j++) {
                    let node = this.blocks[i][j];
                    if (cc.isValid(node)) {
                        node.destroy();
                    }
                }
            }
        }
        this.blocks = [];
    },
    addBlocks: function () {

        this.resetBlockList();
        this.resetMarginList();
        let floorNum = StageConfig[Global.hard].layer;
        let thisfloor = floorNum-2;
        for (var i = 0; i <floorNum - 1 ; i++) {

            var lineinfo = this.addLines(this.getPngName(StageConfig[Global.hard].cycleID, thisfloor), i);

            this.blocks.push(lineinfo);
            lineinfo = [];
            thisfloor--;
        }
        let topline = this.addLines(StageConfig[Global.hard].top, floorNum-1);
        this.blocks.push(topline);
    },
    addLines: function (pngname, thisNum) {

        let conf = BlockConfig[this.type];
        let count = conf.count;
        let factory = this.type == 0 ? BlockBigFactory : BlockSmallFactory;
        let curX = conf.margins + conf.blank - this.BaseWidth;
        let curY = thisNum * (this.blockWidth + conf.blank) + this.startPos;
        let lineArray = [];
        let left = factory.createMargins(pngname);

        left.position = cc.p(conf.margins / 2 - this.BaseWidth, curY + this.blockWidth / 2);
        this.blockNodes.addChild(left);
        this.marginlist.push(left);
        let right = factory.createMargins(pngname);
        let endpos = this.BaseWidth - conf.margins / 2;
        right.position = cc.p(endpos, curY + this.blockWidth / 2);
        this.blockNodes.addChild(right);
        this.marginlist.push(right);

        for (var i = 0; i < count; i++) {
            let node = factory.create(pngname);
            node.position = cc.p(curX + this.blockWidth / 2, curY + this.blockWidth / 2);
            curX += this.blockWidth + conf.blank;
            this.blockNodes.addChild(node);
            lineArray.push(node);
        }

        return lineArray;
    },

    //根据 获得 图片的名字
    getPngName(cycleID, thisNum) {
        let thisID;
        if (cycleID.indexOf(";") != -1) {
            let cycleArry = cycleID.split(";");
            let getnum = GameUtils.randomInt(0, cycleArry.length - 1);
            thisID = cycleArry[getnum];
        } else {
            thisID = parseInt(cycleID);
        }
        let neednumber = 0;
        for (var i = 1; i <= 10; i++) {
            if (CycleConfig[thisID]["num" + i] == 0) {
                i = 0;
                continue;
            }
            neednumber += CycleConfig[thisID]["num" + i];
            if (neednumber >= thisNum) {
                return CycleConfig[thisID]["block" + i]
            }
            if (i == 10) {
                i = 0;
            }
        }
    },
    //销毁砖块
    destroyBlock: function (line, row) {

        if (!this.blocks[line])
            return;
        let node = this.blocks[line][row];

        if (node != null) {
            let location = this.hammerpos(line, row);
            let texiao = this.getEffByBlock(line, row);
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
    changeBlockLead:function(){
        let bool = this.startClock>0;
        if(Global.hard == 1 && bool){
            if(!this.blockLeadNode){
                var node = UILeadFactory.create();
                this.blockLeadNode= node;
                this.hammerNode.addChild(node);
            }
            let row =3+this.startClock;
            let line = 2;

            let position = this.hammerpos(line,row);
            position.y = position.y - 50;
            position.x = position.x;
            this.blockLeadNode.position = position;
            this.blockPosNode = {x: line,y:row};
        }else {
            if (this.blockLeadNode) {
                this.blockLeadNode.removeFromParent(true);
                this.blockLeadNode = null;
                this.blockPosNode = null;
            }

        }

    },
    checkCanDestroy: function (line, row) {
        if (!this.blocks[line] || !this.blocks[line][row])
            return false;
        let floorNum = StageConfig[Global.hard].layer;
        if (line >= floorNum - 1)
            return true;
        let node;
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
    destroyUpdate: function () {

        let myinfo = {};
        let addexp =1;
        let addgold = 1 * (this.accelerGold) + this.efficeGold;
        myinfo.exp = Global.exp + addexp;
        myinfo.gold = Global.gold + addgold;
        this.GameMenuController.updateDate(myinfo);
        this.GameMenuController.broadcastShows({exp:addexp,coin:addgold});
        Global.saveExp(myinfo.exp);
        Global.saveGold(myinfo.gold);

        // ssssss
        var maxlinenum = this.maxLineNum();

        if(maxlinenum == 0){
            var totoalRowNum = this.totoalRowNum(0);
            if(totoalRowNum == 0){
                this.addBoxLead();
                this.GameMenuController.broadcastShows('finish');
                this.GameState = GameState.end;
            }
        }


    },
    maxLineNum: function () {
        var max = 0;
        let floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < floorNum; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                if (this.blocks && this.blocks[i] && this.blocks[i][j]) {
                    var node = this.blocks[i][j];
                    if (!cc.isValid(node))
                        continue;
                    if (i > max) {
                        max = i;
                    }
                    break;
                }
            }
        }
        return max;
    },

    totoalRowNum: function (line) {//line 行拥有点的数量
        var max = 0;
        for (var j = 0; j < this.rowNum; j++) {
            var node = this.blocks[line][j];
            if (!cc.isValid(node))
                continue;
            max++;
        }
        return max;
    },
    //-----------------------------block   end-------------------------
    //-----------------------------camera   start-------------------------

    cameraCentPosY: function () {

        let maxline = this.maxLineNum();
        if (this.curMaxLine <= maxline) {
            return;
        }
        let move = this.curMaxLine - maxline;
        this.curMaxLine = maxline;
        let oldY = this.camera.node.getPositionY();
        if (oldY <= 0) {
            return;
        }
        let newY = oldY - this.blockWidth * move;
        let moveY = 0;
        if (newY >= 0) {
            moveY = newY;
        } else {
            moveY = 0;
        }
        let location = cc.p(0, moveY);
        let action1 = cc.moveTo(0.1, location);
        this.camera.node.runAction(action1);
        let ralmovelength = oldY - newY;
        // for (var i = this.hammerStart; i < this.hammerEnd; i++) {
        //     if(this.hammers[i] != undefined){
        //         let location=this.hammers[i].node.position;
        //         let action2 = cc.moveTo(0.1,{x:location.x,y:location.y+ralmovelength})
        //         this.hammers[i].node.runAction(action2);
        //     }
        // }
    },

    cameraStartPosY: function () {
        let floorNum = StageConfig[Global.hard].layer;
        let height = floorNum * (this.blockWidth + this.blockBlank);
        //地下
        this.Underground.height = height;
        let posbottom = (height - this.GameHeight) / 2;
        this.Underground.y = posbottom;
        //地面
        let totoal = this.Bgbz.height + height - 50;
        let skyposy;
        let bzYbottom;
        let other = this.GameHeight - totoal;
        bzYbottom = (totoal + height - this.GameHeight) / 2 - 25;
        this.Bgbz.y = bzYbottom;
        let movePos = 0;
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
    playBoxSpine: function () {
        this.boxSpine.node.active = true;
        this.boxSpine.setAnimation(0, "newAnimation", false);
    },
    stopBoxSpine: function () {
        this.boxSpine.node.active = false;
    },
    initTreasure: function () {
        let BoxID;
        let Boxstr = StageConfig[Global.hard].box;
        if(Boxstr.indexOf(";") != -1){
            let boxarr = Boxstr.split(";");
            let num = GameUtils.randomInt(0, boxarr.length - 1);
            BoxID= boxarr[num];
        }else{
            BoxID= parseInt(Boxstr);
        }

        this.BoxID = BoxID;
        let BoxConf = BoxConfig[BoxID];
        this.treasure.normalSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.pressedSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.hoverSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.disabledSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        let animation = BoxConf.animation;
        SkeletonDataCenter.addSkeletonDataWait(animation, this.boxSpine);
        this.treasure.node.y = -this.GameHeight / 2 + this.blockWidth + 35 - 20;
        this.boxSpine.node.y = -this.GameHeight / 2 + this.blockWidth + 35 - 20+103;
        // let loction  = this.gameNode.convertToWorldSpace(this.treasure.node.position);
        // let loction1 = this.openbox.convertToNodeSpace(loction);
        // this.boxSpine.node = loction1;

    },
    addItems: function () {

        let hard = Global.hard;
        let rewardID = BoxConfig[this.BoxID].reward;
        let conf = RewardConfig[rewardID];
        let num = conf.num;
        let itemdata = {};
        let totoal = 0;
        let reward = {};
        let max = 0;
        for (let i = 1; i < 7; i++) {
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
        for (let j = 1; j <= num; j++) {
            let random = GameUtils.random(max);
            for (let z = 1; itemdata[z] != undefined; z++) {
                if (itemdata[z] < random) {
                    continue;
                }
                reward[j] = conf['item' + z];
                break;
            }
        }
        let gold = 0;
        let gem = 0;
        for (let i = 1; i <= num; i++) {
            if (reward[i] != undefined) {
                if (reward[i].indexOf(";") != -1) {
                    let rewardarry = reward[i].split(";");
                    let valuestr = rewardarry[1];
                    let valueArr;
                    let startnum=0;
                    if(valuestr.indexOf('*') != -1){
                        valueArr = valuestr.split("*");
                        startnum = valueArr[0];
                        for(let i = 1;i<valueArr.length;i++){
                            if(valueArr[i] == "lv"){
                                startnum*=Global.level;
                            }
                        }
                    }else{
                        startnum = parseInt(valuestr);
                    }
                    if (rewardarry[0] == 1001) {
                        gold += startnum;
                    } else if (rewardarry[0] == 1002) {
                        gem += startnum;
                    }
                }
            }
            this.createRewardItem(reward[i], i);
            this.openbox.active = true;
        }
        if (gold > 0 || gem > 0) {
            let golds = Global.gold + gold;
            let gems = Global.gem + gem;
            this.GameMenuController.updateDate({gold: golds, gem: gems});
            Global.saveGold(golds);
            Global.saveGem(gems);
        }

    },
    createRewardItem: function (reward, i) {
        if (this.rewardItem[i]) {
            this.rewardItem[i].destroy();
            this.rewardItem[i] = null;
        }
        let start = -400 + i * 200;

        let node = RewardItemFactory.create(reward);
        let locationX = this.treasure.node.position.x;
        let locationY = this.treasure.node.position.y+103;

        this.rewardItem[i] = (node);
        node.position = cc.p(locationX,locationY);
        let action = cc.moveTo(0.5, cc.p(start, 100));
        let action2 = cc.callFunc(() => {
            node.getComponent("RewardItem").setFinish();
            this.canTouch = true;
        }, this);
        // node.runAction(cc. moveTo(0.5,cc.p(start,-20)));
        this.openbox.addChild(node);
        node.runAction(cc.sequence(action, action2));
    },
    onClickTreasure: function (event) {
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
        this.openbox.active= true;
        this.playBoxSpine();
    },
    addBoxLead:function(){
        if(Global.hard > 1)
            return;
        var maxlinenum = this.maxLineNum();
        var totoalRowNum = this.totoalRowNum(0);
        if (maxlinenum == 0 && totoalRowNum == 0) {
            let node = UILeadFactory.create();
            node.position= this.treasure.node.position;
            node.ratation = 180;
            this.boxLeadNode = node;
            this.gameNode.addChild(node);
        }
    },
    deleteBoxLead:function(){
        if(this.boxLeadNode){
            this.boxLeadNode.removeFromParent(true);
            this.boxLeadNode= null;
        }
    },
    //-----------------------------treasure end--------------------------
    //-----------------------------touch   start-------------------------
    updateTouch: function (point) {
        let cameraY = this.camera.node.getPositionY();
        let gameY = this.gameNode.y;
        let realwidth = this.blockWidth + this.blockBlank;
        var line = Math.floor((point.y + cameraY) / realwidth);
        var row = Math.floor((point.x - this.margins - this.blockBlank) / realwidth);
        let find = false;
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
    touchStartCallBack: function (location1) {

        if (!this.canTouch) {
            return;
        }

        // console.log("touchStartCallBack");

        if (this.gameState == GameState.end) {

            //每打开3次弹出一个插屏广告
            if(GameConfig.isFBInstantGame()) {
                if( this.openSecond%3 ==0){
                    let FBP = require("FBPlugin");
                    FBP.InterstitialAdAsync();
                }else if(this.openSecond ==4){//第4个弹出创建icon
                    let FBP = require("FBPlugin");
                    FBP.chooseAsync();
                    this.restart();
                }else{
                    let FBP = require("FBPlugin");
                    let  num = GameUtils.randomInt(0,100);
                    if(num<70){
                        FBP.createShortCut();
                    }
                }

            }
            this.restart();
        }

        if(this.touchState == undefined ||( this.touchState != 'start'  && this.touchState != 'move')){
            this.touchState = 'start';
        }else{
            this.touchState = 'mult';
        }
        if(this.touchState == 'mult'){
            this.motionStreak.node.active = false;
        }
        let location= this.gameNode.convertToNodeSpace(location1);
        this.motionStreak.node.setPositionX(location1.x - this.BaseWidth);
        this.motionStreak.node.setPositionY(location1.y - this.BaseHeight);
        this.motionStreak.reset();

    },

    touchCancelCallBack: function (location1) {
        this.touchState = 'cancle';
        let location= this.gameNode.convertToNodeSpace(location1);
        this.updateTouch(location);
        this.isTouching = false;
        this.motionStreak.reset();
        this.motionStreak.node.active = true;

    },

    touchEndCallBack: function (location1) {
        this.touchState = 'end';
        let location= this.gameNode.convertToNodeSpace(location1);
        this.updateTouch(location);
        this.isTouching = false;
        // console.log("touchEndCallBack");
        this.motionStreak.reset();
        this.previousPt=null;
        this.motionStreak.node.active = true;

    },
    touchMoveCallBack: function (location1) {
        let location= this.gameNode.convertToNodeSpace(location1);
        if (!this.canTouch) {
            return;
        }
        this.touchState ="move";
        // console.log("touchMoveCallBack");
        this.motionStreak.node.setPositionX(location1.x - this.BaseWidth);
        this.motionStreak.node.setPositionY(location1.y - this.BaseHeight);
        if (location.x < this.margins || location.x > (2 * this.BaseWidth - this.margins
            || location.y < 216)) {
            this.motionStreak.reset();
            return;
        }
        this.updateTouch(location);
        // this.previousPt = location;
        // let motionpos = this.node.convertToNodeSpace(location1);
        // this.motionStreak.node.position=motionpos;
    },
    //多点触控
    multMoveCallBack:function(location01,location02 = null){
        this.touchState ="mult";
        this.motionStreak.reset();
        let location1 = this.gameNode.convertToNodeSpace(location01);
        // let location2 = this.gameNode.convertToNodeSpace(location02);
        // console.log("1",location1);
        // console.log("2",location2);
        if(this.previousPt == null){
            this.previousPt={};
            this.previousPt[0]= location1;
            // this.previousPt[1]= location2;
            return;
        }
        var distance = cc.pSub( this.previousPt[0],location1);
        if(distance.y != 0){
            let origin = this.camera.node.getPositionY();
            let endpos =( origin+distance.y)*0.5;
            if(endpos <0 ){
                endpos =0;
            }
            if(endpos >this.startCameraY){
                endpos = this.startCameraY;
            }
            if(endpos== 0)
                return;
            let move = origin - endpos;
            this.camera.node.setPositionY(endpos);
        }
    },
    //-----------------------------touch   end-------------------------
    //-----------------------------bottom   start-------------------------



    eventcallback: function (type, id, string = null) {
        // let node= this.itemList.indexOf(sender);
        switch (type) {
            case 0:
                this.type0deal(id,string);
                break;
            case 1:
                this.type1deal(id);
                break;
            case 2:
                this.type2deal(id,string);
                break;
        }
    },
    //----------------- efficiency tools config start----------------------

    type0deal:function(id,string=null){
        if (string == null){
            //视频激励
            if(GameConfig.isFBInstantGame() ){
                if(id == 1){
                    this.loadingView.active  = true;
                    let self = this;
                    let FBP = require("FBPlugin");
                    FBP.RewardedVideoAsync(function(){
                            // let FBP = require("FBPlugin");
                            // self.adGame();
                            self.loadingView.active  = false;
                            self.accleleratorChange(id);
                        }
                    );
                }else{
                    let FBP = require("FBPlugin");
                    FBP.chooseAsync(function(){
                            self.loadingView.active  = false;
                            self.accleleratorChange(id);
                        }
                    );

                }
            }else{
                this.accleleratorChange(id);
            }

        }
        else {
            if (string == 'finish') {
                this.accleleratorrRecover(id);
            }
        }
    },

    //广告加速开始
    accleleratorChange: function (id) {
        let conf = AcceleratorConfig[id];
        Global['bar' + id] = conf.time;
        this.changeHammerSpeed();
        this.GameMenuController.updateButtom();

    },
    //广告加速结束
    accleleratorrRecover: function (id) {
        this.changeHammerSpeed();
        this.GameMenuController.updateButtom();
    },
    //----------------- efficiency tools config end----------------------
    //----------------- hammers tools config start----------------------

    changeHammerSpeed: function () {
        let speedHammer = 0;
        let speedGold = 0;
        for (let i = 1; i <= 2; i++) {
            if (Global['bar' + i] > 0) {
                speedHammer += AcceleratorConfig[i].speed;
                speedGold += AcceleratorConfig[i].coin;
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
                let conf1 = AttributeConfig[Global.hammer[i].attribute];
                this.hammers[i].timeScale = 0.17 * (conf1.att / parseFloat(conf1.time)) * this.accelerHammer;
                // this.hammers[i].timeScale =  (conf1.att / parseFloat(conf1.time)) * this.accelerHammer;
            }
        }
    },
    changeGoldSpeed: function () {

    },
    type1deal: function (id) {
        let info = ToolConfig[id];

        if (Global.hammer[id] == undefined) {//激活
            let bool = this.checkCanAdd(id);
            if (bool) {
                Global.hammer[id] = {id: id, attribute: info.attribute};
                Global.saveHammer(Global.hammer);
                this.addHammer(id);
                this.setSmPosition(id);
            } else {
                this.addAdTime(id);
            }
            this.GameMenuController.updateButtom();

        } else {//升级
            let conf = AttributeConfig[Global.hammer[id].attribute];
            let mess = {};

            if (conf.costtype = 1001) {
                Global.gold -= conf.cost;
                mess['gold'] = Global.gold;
            } else if (conf.costtype = 1002) {
                Global.gem -= conf.cost;
                mess['gem'] = Global.gem;
            }
            if (conf.next != -1) {
                Global.hammer[id].attribute = conf.next;
                let conf1 = AttributeConfig[conf.next];
                Global.saveHammer(Global.hammer);
                this.hammers[id].timeScale = 0.17 * (conf1.att / parseFloat(conf1.time)) * this.accelerHammer;
                // this.hammers[id].timeScale = (conf1.att / parseFloat(conf1.time)) * this.accelerHammer;
            }
            this.GameMenuController.updateDate(mess);
        }
    },
    checkCanAdd: function (id) {
        let conf = ToolConfig[id];
        let thisID;
        let confArry;
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
            if (thisID == 0) {//点击激活
                return true;
            } else if (thisID == 1) {//视频激励
                return Global.openAdTimes > 0;
            } else if (thisID == 2) {//等级激活
                let needlvl = confArry[1];
                if (Global.level < needlvl) {
                    return false;
                } else {
                    return true;
                }
            } else if (thisID == 3) {//邀请好友
                let inviteFriends;
                if(GameConfig.isFBInstantGame()){
                    if(Global.freindsInfo == null || Global.freindsInfo[id] == null){
                        inviteFriends = 0
                    }
                    else{
                        inviteFriends = Global.freindsInfo[id].length;
                    }
                }else{
                    if(Global.freindsInfo == null || Global.freindsInfo[id] == null){
                        inviteFriends = 0
                    }
                    else{
                        inviteFriends = Global.freindsInfo[id].length;
                    }
                    // inviteFriends = Global.inviteFriends;
                }
                if(inviteFriends<confArry[1]){
                    return false;
                }else{
                    return true;
                }

            }
        }
        return false;
    },

    addAdTime: function (id) {
        let conf = ToolConfig[id];
        let thisID;
        let confArry;
        let self = this;
        if ("unlock" in conf) {
            if (conf.unlock.indexOf(";") != -1) {
                confArry = conf.unlock.split(";");
                thisID = confArry[0];
            } else {
                thisID = parseInt(conf.unlock);
            }
            if (thisID == 1) {//视频激励

                if(GameConfig.isFBInstantGame()){
                    this.loadingView.active  = true;
                    let FBP = require("FBPlugin");
                    FBP.RewardedVideoAsync(function(){
                        let FBP = require("FBPlugin");
                            Global.openAdTimes++;
                            self.adGame();
                            self.GameMenuController.updateButtom();
                        }
                    );
                }else{
                    Global.openAdTimes++;
                    this.loadingView.active  = true;//[change]
                }
            } else if (thisID == 3) {//邀请好友
                let FBP1 = require("FBPlugin");
                let self = this;
                if(GameConfig.isFBInstantGame()){
                    FBP1.chooseAsync(function(friendID){
                        if(Global.freindsInfo== null){
                            Global.freindsInfo = {};
                        }
                        if( Global.freindsInfo[id] == null){
                            Global.freindsInfo[id] =[];
                        }
                        var find = false;
                        for(var i = 0;i<Global.freindsInfo[id].length;i++){
                            let oldFriend = Global.freindsInfo[id];
                            if(oldFriend ==friendID ){
                                find= true;
                                let PopMsgController = require("PopMsgController");
                                PopMsgController.showMsg(LanguageConfig['10039'][Global.language]);
                                break;
                            }
                        }
                        if(!find){
                            Global.freindsInfo[id].push(friendID);
                            Global.savefreindsInfo(Global.freindsInfo);
                            // Global.inviteFriends = Global.freindsInfo[id].length;
                        }
                        self.GameMenuController.updateButtom();
                    });
                }else{
                    // Global.inviteFriends++;
                    if(Global.freindsInfo== null){
                        Global.freindsInfo = {};
                    }
                    if( Global.freindsInfo[id] == null){
                        Global.freindsInfo[id] =[];
                    }
                    let friendID = Global.freindsInfo[id].length+1;

                    Global.freindsInfo[id].push(friendID);
                    Global.savefreindsInfo(Global.freindsInfo);
                    self.GameMenuController.updateButtom();
                }
            }
        }
    },
    //----------------- hammers tools config end----------------------
    //----------------- accelerate  tools config start----------------------


    type2deal: function (id,str = null) {
        if(str != null){
            this.efficiencyChange();
            return;
        }
        let conf = EfficiencyConfig[id];
        let gem = 0;
        let addgold=0;
        if (conf.costtype == 1002 && Global.gem >= conf.cost) {//enough gem
            gem = Global.gem - conf.cost;
            if (conf.coin > 0) {
                // this.efficeGold += conf.coin - 1;
                let timestamp = Date.parse( new Date())/1000;// 以秒为单位
                Global.efficiency[id] = {'id':id,'timeleft':conf.time,'timestart':timestamp};
                this.efficiencyChange();
            }
            let myinfo = {};
            if (conf.jumptime > 0) {//jump time

                for(let i=this.hammerStart;i<=this.hammerEnd; i++){
                    if(Global.hammer[i] != undefined){
                        let attr = AttributeConfig[Global.hammer[i].attribute];
                        addgold+=conf.jumptime*60*60/attr.time* attr.att;
                    }
                }
                Global.addgold = addgold;
                Global.btnType = 'skip';
                Global.skipID = id;
                this.upgradView.active= true;
            }
        }
        this.GameMenuController.updateDate({'gem': gem});
        Global.saveGem(gem);
        Global.saveEfficiency(Global.efficiency);
        this.GameMenuController.updateButtom();
    },
    //进入游戏计算离线时间 并计算收益
    initEfficienyInfo:function(){
        let nowtime= Date.parse( new Date())/1000;// 以秒为单位;
        let addgold = 0;
        for (let id in Global.efficiency) {
            if ( Global.efficiency[id] == null){
                continue;
            }
            let paseTime = (nowtime - Global.efficiency[id].timestart)/60;//以min
            let conf = EfficiencyConfig[id];
            let useTime = conf.time - Global.efficiency[id].timeleft;
            if(paseTime > conf.time) {
                paseTime = conf.time;
            }
            let outlineTime= paseTime - useTime;
            let timeleft = conf.time - outlineTime - useTime;
            if(timeleft <=0){
                Global.efficiency[id] = null;
            }else{
                Global.efficiency[id].timeleft = parseInt(timeleft);
                this.efficeGold += conf.coin - 1;
            }
            for(let i=this.hammerStart;i<=this.hammerEnd; i++){
                if(Global.hammer[i] != undefined){
                    let attr = AttributeConfig[Global.hammer[i].attribute];
                    addgold+=conf.coin*outlineTime*60* attr.att/attr.time;
                }
            }
            if(Global.offlinetime<outlineTime){
                Global.offlinetime = outlineTime;
            }
        }
        Global.saveEfficiency(Global.efficiency);
        addgold  = parseInt(addgold);
        if(addgold >0) {
            Global.addgold = parseInt(addgold);
            Global.btnType = 'outline';
            this.upgradView.active = true;
        }
    },
    //收益加速开始/结束
    efficiencyChange: function () {
        let addeff=0;

        for( let id in Global.efficiency){
            if(Global.efficiency[id] == null)
                continue;
            let conf = EfficiencyConfig[id];
            addeff+=conf.coin - 1;
        }
        this.efficeGold = addeff;
        this.GameMenuController.updateButtom();
    },
    //----------------- accelerate  tools config start----------------------
    //-----------------------------bottom   end----------------------------
    //-----------------------------loading   start----------------------------

    adGame:function () {
        this.loadingView.active  = false;
    },
    //-----------------------------loading   end----------------------------
    //-----------------------------GM   part start-------------------------

    onClickBtnaddGem() {

        let gem = Global.gem + 100;
        this.GameMenuController.updateDate({'gem': gem});
        Global.saveGem(gem);
        this.GameMenuController.updateButtom();
    },

    onClickBtnsubGem() {

        let gem = Global.gem - 10 > 0 ? Global.gem - 10 : 0;
        this.GameMenuController.updateDate({'gem': gem});
        Global.saveGem(gem);
        this.GameMenuController.updateButtom();
    },
    onClickBtnaddGold() {

        let gold = Global.gold + 100000;
        this.GameMenuController.updateDate({'gold': gold});
        Global.saveGold(gold);
        this.GameMenuController.updateButtom();
    },
    onClickBtnsubGold() {

        // let localStorage = require("LocalStorage");
        // localStorage.get('gold',0,function (data) {
        //     console.log("fb data",data);
        // });
        // return;

        let gold = Global.gold - 10000 > 0 ? Global.gold - 10000 : 0;
        this.GameMenuController.updateDate({'gold': gold});
        Global.saveGold(gold);
        this.GameMenuController.updateButtom();
    },
    onClickBtnaddExp() {


        // let localStorage = require("LocalStorage");
        // localStorage.set('gold',1);
        // return;

        let exp = Global.exp +500000;
        this.GameMenuController.updateDate({'exp': exp});
        Global.saveExp(exp);
        // this.GameMenuController.updateButtom();
    }
    ,
    onClickUnlockAll(){
        for (var id = this.hammerStart; id <=this.hammerEnd; id++) {
            let info = ToolConfig[id];
            if(Global.hammer[id] == undefined){
                Global.hammer[id] = {id: id, attribute: info.attribute};
                Global.saveHammer(Global.hammer);
                this.addHammer(id);
                this.setSmPosition(id);
            }
        }
    },
    hardlvlFun:function(){
        this.hardlvl.string= Global.hard;

    }
    //-----------------------------GM   part end-------------------------
});
//