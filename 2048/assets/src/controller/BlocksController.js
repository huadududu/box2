/*
 * Created by Ren on 2018/7/6.
 */
let BlockFactory = require("BlockFactory");
let GoldFactroy = require("GoldFactroy");
let Global = require("Global");
let GameState = require("GameState");
let BingLog = require("BingLog");
let GameUtils = require("GameUtils");
const MAX_NUM = 13;
const MAX_GOLD = 5;
cc.Class({
    extends: cc.Component,

    properties: {
        gameNode: cc.Node,
        canrefresh: {
            default: true,
            visible: false
        },
        goldSound: {
            default: null,
            url: cc.AudioClip
        },
    },
    onLoad: function () {
        this.blockNodes = [];//所有点
        this.waitMovingNodes = [];//所有等待移动点//下落
        this.movingNodes = [];//正在移动的点
        this.needDestroy = [];//正在移动的点
        this.panelMax = 1;

        this.blockWidth = 110;
        this.blockblank = 6;
        this.blockFloor = 7;
        this.blockRow = 5;

        this.BlockNum = 1;
        this.panelMax = 1;
        this.gameController = cc.find("Canvas").getComponent("GameController");
        this.BlockNum = this.createNextNum();

        this.gameController.updateNext(this.BlockNum);
        this.NextBlockNum = this.createNextNum();
        this.gameController.updateNext2(this.NextBlockNum);
        this.canrefresh = true;
        this.createCount = 0;
        this.testCount = 0;
        this.goldList = [];
        this.joinCount = 0;
        // Global.blocks[6][2] = this.BlockNum;
        //         // Global.saveBlockInfo();
        this.gameController.updateCoin();
        this.exchangenum = 0;
        this.exchangeList = [];
        this.bombNode = null;
    },
    playGoldSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.goldSound, false);
    },
    changeNextNum: function (num = -1) {
        if (num == -1) {
            this.gameController.isUseRefreshTool = true;
            num = this.createNextNum();
            this.BlockNum = num;


            this.NextBlockNum = this.createNextNum();
            this.gameController.updateNext2(this.NextBlockNum);
            console.log("NextBlockNum", this.NextBlockNum);
        }
        this.BlockNum = num;
        this.gameController.updateNext(this.BlockNum);
        console.log("BlockNum", this.BlockNum);
        console.log("this.end");
    },
    startMenu: function () {
        this.clearAll();
        // this.beforeBagin();
        this.testCount = 0;
        this.createBlocks();
        // this.schedule(this.refreshBlocks, downspeed);
    }
    ,
    restartMenu: function () {
        this.clearAll();
        this.testCount = 0;
        this.createBlocks();
    },
    moreLife: function () {
        for (let line = this.blockFloor - 1; line >= this.blockFloor - 2; line--) {
            for (let row = 0; row < this.blockRow; row++) {
                if (this.blockNodes[line][row]) {
                    this.blockNodes[line][row].removeFromParent(true);
                    this.blockNodes[line][row] = null;
                    Global.blocks[line][row] = 0;
                }
            }
        }
        Global.saveBlockInfo();
        this.createBlocks();

    },
    clearAll: function () {
        Global.thisscore = 0;
        Global.saveThisScore();
        Global.thisCoin = 0;
        Global.saveThisCoin();
        this.gameNode.removeAllChildren(true);
        this.blockNodes = [];
        this.panelMax = 1;
        this.gameController.updateScore();
        this.blockNum = this.createNextNum();
        this.gameController.updateNext(this.blockNum);
        this.NextBlockNum = this.createNextNum();
        this.gameController.updateNext2(this.NextBlockNum);
        this.blockNum = 0;
        this.createCount = 0;
        this.goldList = [];
        Global.thisState = GameState.isRuning;
        Global.saveThisState();
        let initBlockConfig = require("initBlockConfig");
        Global.blocks = initBlockConfig;
        Global.saveBlockInfo();
        this.gameController.updateCoin();
        this.unschedule(this.refreshBlocks);
        this.unschedule(this.refreshChoose);
    },
    initBeforePage: function () {
        this.updateSpeed();
        this.blockNodes = [];
        for (let line = 0; line < this.blockFloor ; line++) {
            if (!Global.blocks[line]) {
                continue;
            }
            let showNode = Global.blocks[line];
            for (let row = 0; row < showNode.length; row++) {
                if (showNode[row] == 0)
                    continue;
                let node = BlockFactory.create(showNode[row]);// 写死生成的新的数组是math.pow(2,1)[改]
                this.gameNode.addChild(node);
                let realpath = this.blockWidth + this.blockblank;
                node.getComponent("Block").setBlockPos(line, row);
                let lineY = realpath * line;
                let rowX = realpath * row;
                node.position = cc.p(rowX, lineY);
                if (this.blockNodes == null) {
                    this.blockNodes = [];
                }
                if (this.blockNodes[line] == null) {
                    this.blockNodes[line] = [];
                }
                this.blockNodes[line][row] = node;
            }
        }
        if (Global.movingNode) {
            this.movingBlock = this.blockNodes[Global.movingNode.line][Global.movingNode.row];
        }
        this.stopMoveNodes = [];
        if (Global.stop_nodelist) {
            for (let i = 0; i < Global.stop_nodelist.length; i++) {
                let node = this.blockNodes[Global.stop_nodelist[i].line][Global.stop_nodelist[i].row];
                this.stopMoveNodes.push(node);
            }
        }
        if (Global.new_nodelist) {
            for (let i = 0; i < this.new_nodelist.length; i++) {
                let node = this.blockNodes[Global.new_nodelist[i].line][Global.new_nodelist[i].row];
                this.newCreateList.push(node);
            }
        } else {
            this.newCreateList = [];
        }
        this.schedule(this.refreshChoose, this.joinspeed);
        this.gameController.updateScore();
    },
    beforeBagin: function () {
        let testConfig = require("testConfig");

        for (let line = 0; line < this.blockFloor - 1; line++) {
            let showNode = testConfig[line];
            for (let row = 0; row < showNode.length; row++) {
                if (showNode[row] == 0)
                    continue;
                let node = BlockFactory.create(showNode[row]);// 写死生成的新的数组是math.pow(2,1)[改]
                this.gameNode.addChild(node);
                let realpath = this.blockWidth + this.blockblank;
                node.getComponent("Block").setBlockPos(line, row);
                let lineY = realpath * line;
                let rowX = realpath * row;
                node.position = cc.p(rowX, lineY);
                if (this.blockNodes == null) {
                    this.blockNodes = [];
                }
                if (this.blockNodes[line] == null) {
                    this.blockNodes[line] = [];
                }
                this.blockNodes[line][row] = node;
            }
        }
    },
    finishGame: function () {
        this.unschedule(this.refreshBlocks);
        this.gameController.updateFinish();

    },
    createNextNum: function () {
        let BlockConfig = require("BlockConfig");
        let conf = BlockConfig[this.panelMax];
        let create = 1;
        if (!conf) {
            conf = BlockConfig[MAX_NUM];
        }
        let max = 0;
        for (let i = 1; i <= MAX_NUM; i++) {
            if (conf['rate' + i] != 0) {
                max += conf['rate' + i];
            }
        }
        let curCoun = 0;
        let thiscont = GameUtils.randomInt(1, max);
        for (let i = 1; i <= MAX_NUM; i++) {
            if (conf['rate' + i] != 0) {
                curCoun += conf['rate' + i];
                if (curCoun <= thiscont) {
                    continue;
                } else {
                    create = i;
                    break;
                }
            }
        }
        return create;
    },
    maxTargetDown() {//
        // let line = this.centerBlock.y;
        // let row = this.centerBlock.x;
        let line = this.movingBlock.getComponent("Block").getBlockLine();
        let row = this.movingBlock.getComponent("Block").getBlockRow();
        let target = line;
        for (target = line - 1; target >= 0; target--) {
            if (!this.blockNodes[target] || !this.blockNodes[target][row]) {
                continue;
            }
            else {
                break;
            }
        }
        return target + 1;
    }
    ,
    refreshBlocks: function () {

        if (Global.thisState != GameState.isRuning) {
            return;
        }
        if (this.checkAllDownBlock()) {
            this.downAllBlock();
        } else {
            this.unschedule(this.refreshBlocks);
            if (this.movingState == 0) {
                this.doShake(this.movingBlock);
            } else if (this.movingState == 1) {
                return;
            }
        }
    },
    canAddNewBlock: function () {
        if (!this.blockNodes[6] || !this.blockNodes[6][2]) {
            return true;
        }
        return false;
    },
    createBlocks: function () {
        this.isacceler = false;
        if (!this.canAddNewBlock()) {
            this.finishGame();
            return;
        }
        this.newCreateList = [];
        this.waitMovingNodes = [];//等待移动点
        this.stopMoveNodes = [];//刚停止移动的点
        this.movingNodes = [];//正在移动的点
        this.needDestroy = [];// 准备删除点
        this.stopMoveNodes = [];//本轮中结束运动的点
        let node = BlockFactory.create(this.BlockNum);
        Global.blocks[6][2]= this.BlockNum;
        Global.saveBlockInfo();
        this.createCount++;
        node.getComponent("Block").setBlockPos(6, 2);
        this.movingBlock = node;
        this.newCreateList[0] = node;
        this.gameNode.addChild(node);
        let realpath = this.blockWidth + this.blockblank;
        let row = realpath * 2;
        let line = realpath * 6;
        node.position = cc.p(row, line);
        if (this.blockNodes == null) {
            this.blockNodes = [];
        }
        if (this.blockNodes[6] == null) {
            this.blockNodes[6] = [];
        }
        this.blockNodes[6][2] = node;
        this.movingState = 0;// 0移动状态 1：正在抖动 2：抖动完成
        this.updateSpeed();

        this.canhorizon = true;
        this.testmultext = 0;
        this.createCoin();
        this.joinCount = 0;
        this.schedule(this.refreshBlocks, this.downspeed);
        this.BlockNum = this.NextBlockNum;
        this.gameController.updateNext(this.BlockNum);
        this.NextBlockNum = this.createNextNum();
        this.gameController.updateNext2(this.NextBlockNum);
    },

    checkCanCreateCoin: function () {
        let CoinConfig = require("CoinConfig");
        if (CoinConfig[this.createCount] != undefined) {
            let rate = GameUtils.randomInt(1, Math.pow(10, 4));

            if (rate < CoinConfig[this.createCount].rate)
                return true;
            else {
                console.log(" you are not hit");
            }
        }
        console.log("gold number not in");
        return false;
    },

    createCoin: function () {

        let emptyPos = [];
        let curGoldPos = this.curCanUsePos();
        if (curGoldPos > MAX_GOLD) {
            console.log("gold create more than 5");
            return;
        }
        if (this.checkCanCreateCoin()) {
            emptyPos = this.findCanGoldPos();
            if (emptyPos.length <= 0) {
                return;
            }
            let choosePos = GameUtils.randomInt(0, emptyPos.length - 1);
            let goldNode = GoldFactroy.create();
            goldNode.getComponent("Gold").setNodeInfo(curGoldPos, this.GoldCallBack.bind(this));

            let nodeY = emptyPos[choosePos].line * (this.blockblank + this.blockWidth);
            let nodeX = emptyPos[choosePos].row * (this.blockblank + this.blockWidth);
            goldNode.position = cc.p(nodeX, nodeY);
            this.gameNode.addChild(goldNode);
            this.goldList[curGoldPos] = {};
            this.goldList[curGoldPos].row = emptyPos[choosePos].row;
            this.goldList[curGoldPos].line = emptyPos[choosePos].line;
            this.goldList[curGoldPos].node = goldNode;

        }
    },


    curCanUsePos: function () {
        if (this.goldList.length < MAX_GOLD) {
            return this.goldList.length;
        } else {
            for (let i = 0; i < this.goldList.length; i++) {
                if (this.goldList[i] == null)
                    return i;
            }
        }
        return MAX_GOLD + 1;
    },
    findCanGoldPos: function () {
        let canUsePos = [];
        for (let row = 0; row < this.blockRow; row++) {
            for (let line = 0; line < this.blockFloor; line++) {
                if (!this.blockNodes[line] || !this.blockNodes[line][row]) {
                    let find = false;
                    for (let goldpos = 0; goldpos < this.goldList.length; goldpos++) {

                        let goldnode = this.goldList[goldpos];
                        if (!goldnode)
                            continue;
                        if (goldnode.row == row && goldnode.line == line) {
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        canUsePos.push({line: line, row: row});
                    }
                    break;
                }

            }
        }

        return canUsePos;
    },
    GoldCallBack: function (type, GoldID) {
        this.goldList[GoldID].node.removeFromParent(true);
        this.goldList[GoldID] = null;
        switch (type) {
            case "end":
                break;
            case "get":
                Global.thisCoin++;
                Global.saveThisCoin();
                this.gameController.updateCoin();
                this.playGoldSound();
                // Global.syncPlayerInfoToFB();
                break;
        }

    },
    downGoldBlock: function () {

        for (let i = 0; i < this.goldList.length; i++) {
            if (this.goldList[i]) {
                let line = this.goldList[i].line;
                if (line <= 0)
                    continue;
                let row = this.goldList[i].row;
                if (!this.blockNodes[line - 1] || !this.blockNodes[line - 1][row]) {
                    this.goldList[i].line = this.goldList[i].line - 1;
                    let newY = this.goldList[i].line * (this.blockblank + this.blockWidth);
                    let newX = this.goldList[i].row * (this.blockblank + this.blockWidth);
                    let action1 = cc.moveTo(0.1, cc.p(newX, newY));
                    this.goldList[i].node.runAction(action1);
                    // this.goldList[i].node.setPositionY(newY);
                }
            }
        }
    },
    updateSpeed: function () {
        let curScore = Global.thisscore;
        let SpeedConfig = require("SpeedConfig");
        let max = 1;
        let find = false;
        for (let i = 2; SpeedConfig[i] != undefined; i++) {
            max = i;
            if (curScore < SpeedConfig[i].score && curScore >= SpeedConfig[i - 1].score) {
                find = true;
                this.downspeed = SpeedConfig[i].time;
                this.joinspeed = SpeedConfig[i].time;
                break;
            }
        }
        if (!find) {
            this.downspeed = SpeedConfig[max].time;
            this.joinspeed = SpeedConfig[max].time;
        }
    },
    canDownBlock: function (centerNode = null) {
        let line = centerNode.getComponent("Block").getBlockLine();
        let row = centerNode.getComponent("Block").getBlockRow();
        if (line <= 0) {
            return false;
        }
        if (!this.blockNodes[line - 1] || !this.blockNodes[line - 1][row]) {
            return true;
        }
        return false;

    },
    doShake: function () {
        this.movingState = 1;
        this.canhorizon = false;
        var action1 = cc.scaleTo(0.1, 1, 0.8);
        var action2 = cc.scaleTo(0.1, 1, 1);
        this.movingBlock.runAction(cc.sequence(action1, action2));
        this.scheduleOnce(this.doShakeCallBack.bind(this), 0.2);
        this.waitMovingNodes = [];
        this.waitMovingNodes.push(...this.movingBlock);
        this.movingBlock.getComponent("Block").playdownSound();
        console.log("  doShake:i am singing", this.testCount++);
    },

    doShakeCallBack: function () {
        // this.beforeJoinAll();
        if (this.checkCanAllJoin()) {
            this.schedule(this.refreshChoose, this.joinspeed);
        } else {
            this.createBlocks();
        }


    },
    checkisMoving: function (line, row) {
        // return

        for (let i = 0; i < this.needDestroy.length; i++) {
            let x = this.needDestroy[i].getComponent("Block").getBlockRow();
            let y = this.needDestroy[i].getComponent("Block").getBlockLine();
            if (x == row && y == line) {
                return true;
            }
        }
        return false;
    },
    //判断是否可以合并
    canJoinBlock: function (centernode = null) {

        let endBlock = centernode == null ? this.movingBlock : centernode;
        let line = endBlock.getComponent("Block").getBlockLine();
        let row = endBlock.getComponent("Block").getBlockRow();
        let centerNumber = endBlock.getComponent("Block").getBlockNumber();
        let nextNode;
        let rightNode;
        let leftNode;
        let moveBlock = [];
        if (this.canDownBlock(centernode)) {
            return;
        }
        if (centerNumber >= MAX_NUM) {
            return false;
        }
        if (line > 0 && !this.checkisMoving(line - 1, row)) {

            if (this.blockNodes[line - 1] && this.blockNodes[line - 1][row]) {
                nextNode = this.blockNodes[line - 1][row];
                let nextNumber = nextNode.getComponent("Block").getBlockNumber();
                if (nextNumber == centerNumber) {
                    return true;
                }
            }
        }
        if (row > 0 && row < this.blockRow && !this.checkisMoving(line, row - 1)) {
            if (this.blockNodes[line] && this.blockNodes[line][row - 1]) {
                leftNode = this.blockNodes[line][row - 1];
                let leftNumber = leftNode.getComponent("Block").getBlockNumber();
                if (leftNumber == centerNumber) {
                    return true;
                }
            }
        }
        if (row >= 0 && row < this.blockRow - 1 && !this.checkisMoving(line, row + 1)) {
            if (this.blockNodes[line] && this.blockNodes[line][row + 1]) {
                rightNode = this.blockNodes[line][row + 1];
                let rightNumber = rightNode.getComponent("Block").getBlockNumber();
                if (rightNumber == centerNumber) {
                    return true;
                }
            }
        }
        return false;
    },
    joinBlock: function (joinNode) {


        this.joinAllNodeList = [];
        this.findCanJoinNode(joinNode);
        let joinThisList = this.joinAllNodeList;
        return joinThisList;
        // if (this.joinAllNodeList.length > 0) {
        //     this.joinAction(this.joinAllNodeList, endBlock);
        // }
    },
    //递归去找节点相同的点
    findCanJoinNode: function (endBlock, Direction = 'n') {//Direction l left, r right, d down, t top, n nodirection
        let line = endBlock.getComponent("Block").getBlockLine();
        let row = endBlock.getComponent("Block").getBlockRow();
        let centerNumber = endBlock.getComponent("Block").getBlockNumber();

        if (line >= 0 && line < this.blockFloor - 1 && !this.checkisMoving(line - 1, row) && Direction != 'd') { //top
            if (this.blockNodes[line + 1] && this.blockNodes[line + 1][row]) {
                let topNode = this.blockNodes[line + 1][row];
                let nextNumber = topNode.getComponent("Block").getBlockNumber();
                if (nextNumber == centerNumber) {
                    this.joinAllNodeList.push({line: line + 1, row: row});
                    this.findCanJoinNode(topNode, 't');
                }
            }
        }
        if (line > 0 && line <= this.blockFloor - 1 && !this.checkisMoving(line - 1, row) && Direction != 't') {
            if (this.blockNodes[line - 1] && this.blockNodes[line - 1][row]) {
                let nextNode = this.blockNodes[line - 1][row];
                let nextNumber = nextNode.getComponent("Block").getBlockNumber();
                if (nextNumber == centerNumber) {

                    this.joinAllNodeList.push({line: line - 1, row: row});
                    this.findCanJoinNode(nextNode, 'd');
                }
            }
        }
        if (row > 0 && row < this.blockRow && !this.checkisMoving(line, row - 1) && Direction != 'r') {//left
            let end = row - 1;
            if (this.blockNodes[line] && this.blockNodes[line][end]) {
                let leftNode = this.blockNodes[line][end];
                let leftNumber = leftNode.getComponent("Block").getBlockNumber();
                if (leftNumber == centerNumber) {

                    this.joinAllNodeList.push({line: line, row: end});
                    this.findCanJoinNode(leftNode, 'l');
                }
            }

        }
        if (row >= 0 && row < this.blockRow - 1 && !this.checkisMoving(line, row + 1) && Direction != 'l') {
            let start = row + 1;
            if (this.blockNodes[line] && this.blockNodes[line][start]) {
                let rightNode = this.blockNodes[line][start];
                let rightNumber = rightNode.getComponent("Block").getBlockNumber();
                if (rightNumber == centerNumber) {
                    this.joinAllNodeList.push({line: line, row: start});
                    this.findCanJoinNode(rightNode, 'r');
                }

            }
        }
    },
    joinAction: function (startNodes, EndNode) {

        let moveNum = startNodes.length;
        // console.log("joinend:",startNodes);
        let addCount = 0;
        for (let i = 0; i < moveNum; i++) {
            let action1 = cc.moveTo(0.1, EndNode.position);
            var action2 = cc.scaleTo(0.1, 1, 0.8);
            let spawn = cc.spawn(action1, action2);
            var action4 = cc.scaleTo(0.1, 1, 1);
            let thisNodePos = startNodes[i];
            let thisNode = this.blockNodes[thisNodePos.line][thisNodePos.row];
            thisNode.runAction(cc.sequence(spawn, action4));
            thisNode.getComponent("Block").playJoinSound();
            this.needDestroy.push(thisNode);
        }

        this.scheduleOnce(this.joinCallback.bind(this, startNodes, EndNode), 0.2);
    },

    addScore: function (addCount, endNode) {
        let EndNode = endNode;
        let baseNumber = EndNode.getComponent("Block").getBlockNumber();
        let newScore = baseNumber + addCount;
        let showNumber = Math.pow(2, newScore);
        Global.thisscore += showNumber;
        Global.saveThisScore();

        if (this.panelMax < newScore) {
            this.panelMax = newScore;
        }
        EndNode.getComponent("Block").setBlockNumber(newScore);
        this.addCount = 0;
        this.gameController.updateScore();
        let PopMsgController = require("PopMsgController");
        let x = EndNode.position.x + 55;
        let y = EndNode.position.y + 110;
        let position = cc.p(x, y);
        PopMsgController.showBlockMsg("+" + showNumber, position);
    },
    joinCallback: function (startNodes, EndNode) {
        for (let i = 0; i < startNodes.length; i++) {
            let thisNodePos = startNodes[i];
            let thisNode = this.blockNodes[thisNodePos.line][thisNodePos.row];

            if (thisNode) {

                for (let i = 0; i < this.needDestroy.length; i++) {
                    if (thisNode == this.needDestroy[i]) {
                        this.needDestroy[i].removeFromParent(true);
                        this.needDestroy.splice(i, 1);

                        break;
                    }
                }
                // for (let i = 0; i < this.waitMovingNodes.length; i++) {
                //     if (thisNode == this.waitMovingNodes[i]) {
                //         this.waitMovingNodes.splice(i, 1);
                //         break;
                //     }
                // }
                for (let i = 0; i < this.stopMoveNodes.length; i++) {
                    if (thisNode == this.stopMoveNodes[i]) {
                        this.stopMoveNodes.splice(i, 1);
                        break;
                    }
                }
                // thisNode.removeFromParent(true);
                this.blockNodes[thisNodePos.line][thisNodePos.row] = null;
                Global.blocks[thisNodePos.line][thisNodePos.row] = 0;
                Global.saveBlockInfo();
            } else {
                console.log("error");
            }
        }
        let find = false;
        for (let i = 0; i < this.newCreateList.length; i++) {
            if (this.newCreateList[i] == EndNode) {
                find = true;
                if (i == this.newCreateList.length - 1) {
                    break;
                } else {
                    let newest = this.newCreateList[i];
                    for (let j = i; j < this.newCreateList.length - 1; j++) {
                        this.newCreateList[j] = this.newCreateList[j + 1];
                    }
                    this.newCreateList[this.newCreateList.length - 1] = newest;
                }
            }
        }
        if (!find) {
            this.newCreateList.push(EndNode);
        }
        this.addScore(startNodes.length, EndNode);
        this.downGoldBlock();
    },

    //向下移动 默认单位是1个格子
    downBlockAction: function (centerNode = null) {

        if (this.gameStateHorizon > 0) {
            return;
        }
        let line = centerNode.getComponent("Block").getBlockLine();
        let row = centerNode.getComponent("Block").getBlockRow();
        let realLine = line - 1;
        let realMove = 1;
        let find = false;
        for (let i = 0; i < this.movingNodes.length; i++) {
            if (this.movingNodes[i] == this.blockNodes[line][row]) {
                find = true;
                return;
            }

        }
        if (!find) {
            this.movingNodes.push(this.blockNodes[line][row]);

        }
        let moveY = realLine * (this.blockblank + this.blockWidth);
        let moveX = row * (this.blockblank + this.blockWidth);
        let action1 = cc.moveTo(0.1, cc.p(moveX, moveY));
        centerNode.runAction(action1);
        if (!this.blockNodes[realLine]) {
            this.blockNodes[realLine] = [null, null, null, null, null];
        }
        this.blockNodes[realLine][row] = centerNode;
        centerNode.getComponent("Block").setBlockLine(realLine);
        this.blockNodes[line][row] = null;
        Global.blocks[line][row]= 0;
        this.saveBlockInfo(centerNode);
        // Global.saveBlockInfo();
        this.scheduleOnce(this.downBlockCallback.bind(this, realLine, centerNode), 0.1);
        // }


    },
    doStopShake: function (EndNode) {
        if (this.canhorizon) {
            return;
        }
        if (!this.canDownBlock(EndNode)) {
            var action1 = cc.scaleTo(0.1, 1, 0.8);
            var action2 = cc.scaleTo(0.1, 1, 1);
            EndNode.runAction(cc.sequence(action1, action2));
            EndNode.getComponent("Block").playdownSound();
            console.log("  doStopShake:i am singing", this.testCount++);
        }


    },
    accelarDownAction: function () {
        let row = this.movingBlock.getComponent("Block").getBlockRow();
        let line = this.movingBlock.getComponent("Block").getBlockLine();
        let realLine = this.maxTargetDown();

        if (realLine >= line) {
            return;
        }
        this.unschedule(this.refreshBlocks);
        this.schedule(this.refreshChoose, this.joinspeed);
        this.canhorizon = false;
        this.movingBlock.stopAllActions();

        let moveY = realLine * (this.blockblank + this.blockWidth);
        let realY = line * (this.blockblank + this.blockWidth);
        let moveX = row * (this.blockblank + this.blockWidth);
        let action1 = cc.moveTo(0.1, cc.p(moveX, moveY));
        this.movingBlock.position = cc.p(moveX, realY);
        this.movingBlock.runAction(action1);
        this.movingBlock.getComponent("Block").playFallSound();
        if (!this.blockNodes[realLine]) {
            this.blockNodes[realLine] = [null, null, null, null, null];
        }
        this.blockNodes[line][row] = null;
        this.blockNodes[realLine][row] = this.movingBlock;
        this.movingBlock.getComponent("Block").setBlockLine(realLine);

        this.scheduleOnce(this.downBlockCallback.bind(this, realLine, this.movingBlock), 0.1);
        Global.blocks[line][row]= 0;
        Global.blocks[realLine][row]= this.movingBlock.getComponent("Block").getBlockNumber();
        Global.saveBlockInfo();

    },
    findAllCanDownBlock: function () {
        let canDownList = [];
        for (let line = 0; line <= 6; line++) {
            for (let row = 0; row <= 4; row++) {
                if (!this.blockNodes[line] || !this.blockNodes[line][row]) {
                    continue;
                }
                else if (this.canDownBlock(this.blockNodes[line][row])) {
                    for (let start = line; start <= this.blockFloor - 1; start++) {
                        if (!this.blockNodes[start] || !this.blockNodes[start][row]) {
                            continue;
                        } else if (this.blockNodes[start][row]) {
                            canDownList.push(this.blockNodes[start][row]);
                        }

                    }
                }
            }
        }
        return canDownList;
    },
    downAllBlock: function () {


        if (this.movingNodes.length > 0) {
            console.log("error");
        }
        this.movingNodes = [];
        let canMoving = this.findAllCanDownBlock();
        this.waitMovingNodes = canMoving;


        for (let i = 0; i < this.waitMovingNodes.length; i++) {
            this.downBlockAction(this.waitMovingNodes[i]);
            this.downGoldBlock();
        }
        this.beforeJoinAll();
    },
    beforeJoinAll: function () {

        let find = false;

        for (let i = 0; i < this.waitMovingNodes.length; i++) {
            find = false;
            for (let j = 0; j < this.stopMoveNodes.length; j++) {
                if (this.stopMoveNodes[j] == this.waitMovingNodes[i]) {
                    find = true;
                    break;
                }
            }
            if (!find) {
                this.stopMoveNodes.push(this.waitMovingNodes[i]);
            }
        }


    },
    downBlockCallback: function (realLine, endNode) {

        let line = endNode.getComponent("Block").getBlockLine();
        if (realLine == line) {
            this.doStopShake(endNode);
        } else {
            console.log("我是上一次的");
        }

        for (let i = 0; i < this.movingNodes.length; i++) {
            if (this.movingNodes[i] == endNode) {
                this.movingNodes.splice(i, 1);
                break;
            }
        }
    },
    checkAllDownBlock: function () {
        for (let line = 0; line <= 6; line++) {
            for (let row = 0; row <= 4; row++) {
                if (!this.blockNodes[line] || !this.blockNodes[line][row]) {
                    continue;
                }
                else if (this.canDownBlock(this.blockNodes[line][row])) {
                    // this.movingBlock = this.blockNodes[line][row];
                    return true;
                }

            }
        }
        return false;
    },

    checkCanAllJoin: function () {

        let find = false;
        for (let i = this.newCreateList.length - 1; i >= 0; i--) {
            if (this.canJoinBlock(this.newCreateList[i])) {
                return true;
            }
        }
        for (let i = 0; i < this.stopMoveNodes.length; i++) {
            if (this.canJoinBlock(this.stopMoveNodes[i])) {
                return true;
            }
        }
        return false;
    },
    joinAllBlock: function () {
        let find = false;
        let joinAllList = [];
        let joinnum = 0;
        for (let i = this.newCreateList.length - 1; i >= 0; i--) {

            if (this.canJoinBlock(this.newCreateList[i])) {
                find = false;
                let line = this.newCreateList[i].getComponent("Block").getBlockLine();
                let row = this.newCreateList[i].getComponent("Block").getBlockRow();
                for (let j = 0; j < joinAllList.length; j++) {
                    for (let z = 0; z < joinAllList[j].joinList.length; z++) {
                        let bejoinNode = joinAllList[j].joinList[z];
                        if (line == bejoinNode.line && row == bejoinNode.row) {
                            find = true;
                            break;
                        }
                    }
                    if (find) {
                        break;
                    }
                }
                if (find) {
                    continue;
                }
                let thisjoinlist = this.joinBlock(this.newCreateList[i]);
                if (thisjoinlist.length > 0) {
                    joinAllList.push({'joinList': thisjoinlist, 'endNode': this.newCreateList[i]});
                }
                // find = true;
                // break;
            }
        }
        // if (!find) {
        for (let i = 0; i < this.stopMoveNodes.length; i++) {

            find = false;
            for (let j = 0; j < this.newCreateList.length; j++) {
                if (this.newCreateList[j] == this.stopMoveNodes[i]) {
                    find = true;
                    break;
                }
            }
            if (find) {
                continue;
            }
            if (this.canJoinBlock(this.stopMoveNodes[i])) {
                let line = this.stopMoveNodes[i].getComponent("Block").getBlockLine();
                let row = this.stopMoveNodes[i].getComponent("Block").getBlockRow();
                for (let j = 0; j < joinAllList.length; j++) {
                    for (let z = 0; z < joinAllList[j].joinList.length; z++) {
                        let bejoinNode = joinAllList[j].joinList[z];
                        if (line == bejoinNode.line && row == bejoinNode.row) {
                            find = true;
                            break;
                        }
                    }
                    if (find) {
                        break;
                    }
                }
                if (find) {
                    continue;
                }
                let thisjoinlist = this.joinBlock(this.stopMoveNodes[i]);
                if (thisjoinlist.length > 0) {
                    joinAllList.push({'joinList': thisjoinlist, 'endNode': this.stopMoveNodes[i]});
                }
            }
        }
        for (let i = 0; i < joinAllList.length; i++) {
            this.joinAction(joinAllList[i].joinList, joinAllList[i].endNode);

        }
        if (joinAllList.length > 0) {
            this.joinCount += joinAllList.length;

        }

    },
    refreshChoose: function () {
        if (Global.thisState != GameState.isRuning) {
            return;
        }
        if (this.checkAllDownBlock()) {
            this.downAllBlock();
        } else {
            // this.beforeJoinAll();
            if (this.checkCanAllJoin()) {
                this.joinAllBlock();
            } else {
                this.gameController.showJoinMsg(this.joinCount);
                this.unschedule(this.refreshChoose);
                this.createBlocks();
            }
        }
    },

    update: function () {
    },
    //-------------- touch part -----------------------------
    horizontalMove: function (moveNum) {

        if (!this.canhorizon)
            return;
        if (this.gameStateHorizon > 0) {
            return;
        }
        this.gameStateHorizon++;
        let line = this.movingBlock.getComponent("Block").getBlockLine();
        let row = this.movingBlock.getComponent("Block").getBlockRow();

        if (!this.blockNodes[line][row]) {
            console.log("impossible");
            return;
        }
        let startNode = this.movingBlock;
        let newRow = row + moveNum;
        if (newRow < 0) {
            newRow = 0;
        } else if (newRow >= this.blockRow) {
            newRow = this.blockRow - 1;
        }
        if (newRow == row) {
            return;
        } else if (newRow < row) {//left
            for (let start = row - 1; start >= newRow; start--) {
                if (this.blockNodes[line][start]) {
                    newRow = start + 1;
                    console.log("can not move left");
                    break;
                }
            }
        } else {//right
            for (let start = row + 1; start <= newRow; start++) {
                if (this.blockNodes[line][start]) {
                    newRow = start - 1;
                    console.log("can not move right");
                    break;
                }
            }
        }
        if (newRow == row) {
            console.log(" can not move");
            return;
        }
        if (this.blockNodes[line][newRow]) {

            console.log("wrong!");
            return;
        }
        if (this.movingBlock) {
            //movelist[endLine]("get one error");

            let newline = this.movingBlock.getComponent("Block").getBlockLine();
            if (newline != line) {

                console.log(" can not in ");
                return;
            }

            this.movingBlock.getComponent("Block").setBlockRow(newRow);
            this.blockNodes[newline][row] = null;
            this.blockNodes[newline][newRow] = this.movingBlock;

            Global.blocks[newline][row]= 0;
            Global.blocks[newline][newRow]= this.movingBlock.getComponent("Block").getBlockNumber();
            Global.saveBlockInfo();
            let newx = newRow * (this.blockblank + this.blockWidth);
            this.movingBlock.getComponent("Block").playFallSound();
            this.blockNodes[newline][newRow].setPositionX(newx);
            // console.log("get one now", newline, newRow, "->", line, newRow);
        } else {
            console.log("get 3 error");
        }
        this.gameStateHorizon--;
    }
    ,

    touchCancelCallBack: function (location) {
        this.TouchState = 'cancel';
        this.moveState = false;
    }
    ,
    touchStartCallBack: function (location) {
        this.previousPos = location;
        this.TouchState = 'start';
    }
    ,
    touchEndCallBack: function (location) {
        if (!this.canhorizon) {
            // console.log("点击不生效原因canhorizon", this.canhorizon);
            return;
        }
        if (this.TouchState == 'move') {
            this.movelength = Math.abs(location.x - this.previousPos.x);
            // let moveNum = Math.floor(this.movelength / this.blockWidth);
            if (!this.moveState && this.movelength < 10) {

                this.accelarDownAction();
            }
        } else {
            this.accelarDownAction();
        }
        this.TouchState == 'end';
        this.moveState = false;
    }
    ,
    touchMoveCallBack: function (location) {
        this.TouchState = 'move';
        if (!this.canhorizon) {
            // console.log("点击不生效原因canhorizon", this.canhorizon);
            return;
        }
        this.movelength = Math.abs(location.x - this.previousPos.x);
        if (this.movelength >= this.blockWidth) {

            let moveNum = Math.floor(this.movelength / this.blockWidth);
            if (location.x < this.previousPos.x) {
                moveNum = -moveNum;
            }
            // if (this.gameStateHorizon <= 0) {
            this.horizontalMove(moveNum);
            this.previousPos = location;
            this.moveState = true;
            // } else {
            //     console.log("点击不生效this.gameStateHorizon", this.gameStateHorizon);
            // }
        }
    },
    saveBlockInfo: function (node, number = true) {
        let line = node.getComponent("Block").getBlockLine();
        let row = node.getComponent("Block").getBlockRow();

        if (number) {
            let numbers = node.getComponent("Block").getBlockNumber();
            Global.blocks[line][row] = numbers;
        }else{
            Global.blocks[line][row] = 0;
        }
        Global.saveBlockInfo();
    },
    onUseBombTool: function (location1) {
        let location = this.gameNode.convertToNodeSpaceAR(location1);
        let realWith = this.blockWidth + this.blockblank;
        let line = Math.floor(location.y / realWith);
        let row = Math.floor(location.x / realWith);
        if (!this.blockNodes[line] || !this.blockNodes[line][row]) {
            return;
        }
        else {
            this.gameController.isUseBombTool = true;
            this.bombNode = this.blockNodes[line][row];
            // let node = this.blockNodes[line][row];
            for (let i = 0; i < this.waitMovingNodes.length; i++) {
                if (this.bombNode == this.waitMovingNodes[i]) {
                    this.waitMovingNodes.splice(i, 1);
                    break;
                }

            }
            //[wrong] 写上所有可能涉及的数组 完善功能
            for (let i = 0; i < this.stopMoveNodes.length; i++) {//
                if (this.bombNode == this.stopMoveNodes[i]) {
                    this.stopMoveNodes.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < this.newCreateList.length; i++) {
                if (this.bombNode == this.newCreateList[i]) {
                    this.newCreateList.splice(i, 1);
                    break;
                }
            }

        }
        this.blockNodes[line][row] = null;

        Global.blocks[line][row] = 0;
        Global.saveBlockInfo();
        let act1 = cc.scaleTo(0.2, 1.2, 1.2);
        let act2 = cc.scaleTo(0.5, 0.1, 0.1);
        this.bombNode.runAction(cc.sequence(act1, act2));
        this.scheduleOnce(this.stopBomb.bind(this), 1);

    },
    stopBomb: function () {
        if (this.canhorizon && this.bombNode == this.movingBlock) {
            this.unschedule(this.refreshBlocks);
            this.schedule(this.refreshChoose, this.joinspeed);
        }
        this.bombNode.removeFromParent(true);
        this.gameController.stopBomb();
    },
    onUseChangeTool: function (location1) {

        let location = this.gameNode.convertToNodeSpaceAR(location1);
        let realWith = this.blockWidth + this.blockblank;
        let line = Math.floor(location.y / realWith);
        let row = Math.floor(location.x / realWith);
        if (!this.blockNodes[line] || !this.blockNodes[line][row]) {
            return;
        }
        this.exchangenum++;
        if (this.exchangeList == null) {
            this.exchangeList = [];
        }

        if (!this.canChangeNode(this.blockNodes[line][row])) {
            return;
        }
        this.exchangeList[this.exchangeList.length] = {'line': line, 'row': row};
        this.blockNodes[line][row].getComponent("Block").setHitState(true);
        if (this.exchangenum == 2) {
            if ((this.exchangeList[0].line == this.exchangeList[1].line) && (this.exchangeList[0].row == this.exchangeList[1].row)) {
                this.stopExchange();
                return;
            }
            this.gameController.isUseChangeTool = true;
            let node1 = this.blockNodes[this.exchangeList[0].line][this.exchangeList[0].row];
            let node2 = this.blockNodes[this.exchangeList[1].line][this.exchangeList[1].row];
            let find = false;
            for (let i = 0; i < this.stopMoveNodes.length; i++) {
                if (this.stopMoveNodes == node1) {
                    find = true;
                    break;
                }
            }
            if (!find) {
                this.stopMoveNodes.push(node1);
            }
            find = false;
            for (let i = 0; i < this.stopMoveNodes.length; i++) {
                if (this.stopMoveNodes == node2) {
                    find = true;
                    break;
                }
            }
            if (!find) {
                this.stopMoveNodes.push(node2);
            }

            let act1 = cc.moveTo(0.5, node2.position);
            let act2 = cc.moveTo(0.5, node1.position);

            this.blockNodes[this.exchangeList[0].line][this.exchangeList[0].row] = node2;
            this.blockNodes[this.exchangeList[1].line][this.exchangeList[1].row] = node1;
            node1.getComponent("Block").setBlockRow(this.exchangeList[1].row);
            node1.getComponent("Block").setBlockLine(this.exchangeList[1].line);
            node2.getComponent("Block").setBlockRow(this.exchangeList[0].row);
            node2.getComponent("Block").setBlockLine(this.exchangeList[0].line);
            node2.runAction(act2);
            node1.runAction(act1);


            // let number1 = node1.getComponent("Block").getBlockNumber();
            // let number2 = node2.getComponent("Block").getBlockNumber();
            // node1.getComponent("Block").setBlockNumber(number2);
            // node2.getComponent("Block").setBlockNumber(number1);

            cc.director.resume();
            // node1.runAction(act1);
            // node2.runAction(act2);
            this.scheduleOnce(this.stopExchange.bind(this), 1);
        }

    },
    stopExchange: function () {
        for (let i = 0; i < this.exchangeList.length; i++) {
            let node1 = this.blockNodes[this.exchangeList[i].line][this.exchangeList[i].row];
            node1.getComponent("Block").setHitState(false);
        }
        this.exchangeList = [];
        this.exchangenum = 0;
        this.updateExchange(false);
        this.gameController.onStopExchange();
    },
    GMCreateGold: function () {
        let curGoldPos = this.curCanUsePos();
        if (curGoldPos > MAX_GOLD) {
            console.log("gold create more than 5");
            return;
        }
        let emptyPos = this.findCanGoldPos();
        if (emptyPos.length <= 0) {
            return;
        }
        let choosePos = GameUtils.randomInt(0, emptyPos.length - 1);
        let goldNode = GoldFactroy.create();
        goldNode.getComponent("Gold").setNodeInfo(curGoldPos, this.GoldCallBack.bind(this));
        let nodeY = emptyPos[choosePos].line * (this.blockblank + this.blockWidth);
        let nodeX = emptyPos[choosePos].row * (this.blockblank + this.blockWidth);
        goldNode.position = cc.p(nodeX, nodeY);
        this.gameNode.addChild(goldNode);
        this.goldList[curGoldPos] = {};
        this.goldList[curGoldPos].row = emptyPos[choosePos].row;
        this.goldList[curGoldPos].line = emptyPos[choosePos].line;
        this.goldList[curGoldPos].node = goldNode;
    },
    updateExchange: function (bool = false) {

        for (let line = 0; line < this.blockFloor; line++) {
            if (!this.blockNodes[line])
                continue;
            if (bool) {
                for (let row = 0; row < this.blockRow; row++) {
                    if (this.blockNodes[line][row] && !this.canChangeNode(this.blockNodes[line][row])) {
                        let node = this.blockNodes[line][row];
                        node.getComponent("Block").setGrayState(true);
                    }
                }
            }
            else {
                for (let row = 0; row < this.blockRow; row++) {
                    if (this.blockNodes[line][row]) {
                        let node = this.blockNodes[line][row];
                        node.getComponent("Block").setGrayState(false);
                    }
                }
            }
        }

    },
    canChangeNode: function (node) {
        if (this.canDownBlock(node)) {
            return false;
        }
        if (this.canJoinBlock(node)) {
            return false;
        }
        return true;
    },


})
;