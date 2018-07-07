/*
 * Created by Ren on 2018/7/6.
 */
let BlockFactory = require("BlockFactory");
let Global = require("Global");
let GameState = require("GameState");
let BingLog = require("BingLog");
let GameUtils = require("GameUtils");
const MAX_NUM = 13;
cc.Class({
    extends: cc.Component,

    properties: {
        gameNode: cc.Node,
        canrefresh: {
            default: true,
            visible: false
        }
    },
    onLoad: function () {
        this.blockNodes = [];//所有点
        this.waitMovingNodes = [];//所有等待移动点//下落
        this.movingNodes = [];//正在移动的点
        this.needDestroy = [];//正在移动的点
        this.panelMax = 1;
        this.gameController = cc.find("Canvas").getComponent("GameController");
        this.downspeed = 1;
        this.joinspeed = 0.5;
        this.blockWidth = 110;
        this.blockblank = 6;
        this.blockFloor = 7;
        this.blockRow = 5;
        this.BlockNum = this.createNextNum();
        this.panelMax = this.BlockNum;
        this.NextBlockNum = this.createNextNum();
        this.gameController = cc.find("Canvas").getComponent("GameController");
        this.gameController.GameMenuController.updateNext(this.NextBlockNum);
        this.canrefresh = true;
        this.isacceler = false;
    },
    changeNextNum: function (num) {
        this.NextBlockNum = num;
        this.gameController.GameMenuController.updateNext(this.NextBlockNum);
    },
    startMenu: function () {
        // this.beforeBagin();
        this.createBlocks();
        // this.schedule(this.refreshBlocks, downspeed);
    }
    ,
    restartMenu: function () {
        this.clearAll();
        this.createBlocks();

    },
    clearAll: function () {
        this.gameNode.removeAllChildren(true);
        this.blockNodes = [];
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
        this.gameController.updeteFinish();
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
            } else {
                break;
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
            } else {
                create = i;
                break;
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

        if (this.canDownBlock(this.movingBlock)) {
            this.downBlockAction(this.movingBlock);
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
        this.canhorizon = true;
        this.newCreateList = [];
        this.waitMovingNodes = [];//等待移动点
        this.stopMoveNodes = [];//刚停止移动的点
        this.movingNodes = [];//正在移动的点
        this.needDestroy = [];// 准备删除点
        this.BlockNum = this.NextBlockNum;
        let node = BlockFactory.create(this.BlockNum);
        this.NextBlockNum = this.createNextNum();
        this.gameController.GameMenuController.updateNext(this.NextBlockNum);

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
        this.canhorizon = true;
        this.movingState = 0;// 0移动状态 1：正在抖动 2：抖动完成
        this.schedule(this.refreshBlocks, this.downspeed);
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
        this.unschedule(this.refreshBlocks);
        // this.schedule(this.refreshChoose.bind(this), this.joinspeed);
        this.movingState = 1;
        var action1 = cc.scaleTo(0.1, 1, 0.8);
        var action2 = cc.scaleTo(0.1, 1, 1);
        this.movingBlock.runAction(cc.sequence(action1, action2));
        this.scheduleOnce(this.doShakeCallBack.bind(this), 0.2);
        this.waitMovingNodes = [];
        this.waitMovingNodes.push(...this.movingBlock);
    },

    doShakeCallBack: function () {
        this.canhorizon = false;
        if (this.canJoinBlock(this.movingBlock)) {
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
        if (centerNumber >= Math.pow(2, MAX_NUM)) {
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

        let endBlock = joinNode == null ? this.movingBlock : joinNode;
        let line = endBlock.getComponent("Block").getBlockLine();
        let row = endBlock.getComponent("Block").getBlockRow();
        let centerNumber = endBlock.getComponent("Block").getBlockNumber();

        this.joinAllNodeList = [];
        this.findCanJoinNode(endBlock);
        if (this.joinAllNodeList.length > 0) {
            this.canhorizon = false;
            this.joinAction(this.joinAllNodeList, endBlock);
        }
    },
    //递归去找节点相同点点
    findCanJoinNode: function (endBlock, Direction = 'd') {//noDirection l left r right d down
        let line = endBlock.getComponent("Block").getBlockLine();
        let row = endBlock.getComponent("Block").getBlockRow();
        let centerNumber = endBlock.getComponent("Block").getBlockNumber();
        if (line > 0 && !this.checkisMoving(line - 1, row)) {
            if (this.blockNodes[line - 1] && this.blockNodes[line - 1][row]) {
               let  nextNode = this.blockNodes[line - 1][row];
                let nextNumber = nextNode.getComponent("Block").getBlockNumber();
                if (nextNumber == centerNumber) {
                    // this.moveBlock(nextNode.position,this.blockNodes[line][row].position);
                    this.joinAllNodeList.push({line: line - 1, row: row});
                }
            }
        }
        if (row > 0 && row < this.blockRow && !this.checkisMoving(line, row - 1) && Direction != 'r') {//left
            let end = row - 1;
            if (this.blockNodes[line] && this.blockNodes[line][end]) {
                let leftNode = this.blockNodes[line][end];
                let leftNumber = leftNode.getComponent("Block").getBlockNumber();
                if (leftNumber == centerNumber) {
                    // this.moveBlock(leftNode.position,this.blockNodes[line][row].position);
                    // moveBlock.push(leftNode);
                    this.joinAllNodeList.push({line: line, row: end});
                    this.findCanJoinNode(leftNode, 'l');
                }
            }

        }
        if (row >= 0 && row < this.blockRow - 1 && !this.checkisMoving(line, row + 1) && Direction != 'l') {
            let start = row + 1;
            if (this.blockNodes[line] && this.blockNodes[line][start]) {
               let  rightNode = this.blockNodes[line][start];
                let rightNumber = rightNode.getComponent("Block").getBlockNumber();
                if (rightNumber == centerNumber) {
                    // this.moveBlock(rightNode.position,this.blockNodes[line][row].position);
                    // moveBlock.push(rightNode);
                    // moveBlock.push({line: line, row: start});
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
            this.needDestroy.push(thisNode);
        }
        // this.joinCallback(startNodes, EndNode);

        this.scheduleOnce(this.joinCallback.bind(this, startNodes, EndNode), 0.2);
    },

    addScore: function (addCount, endNode) {
        let EndNode = endNode;
        let baseNumber = EndNode.getComponent("Block").getBlockNumber();
        let newScore = baseNumber + addCount;
        let showNumber = Math.pow(2, newScore);
        Global.thisscore += showNumber;

        if (this.panelMax < newScore) {
            this.panelMax = newScore;
        }
        EndNode.getComponent("Block").setBlockNumber(newScore);
        this.addCount = 0;
        this.gameController.GameMenuController.updateScore();
        let PopMsgController = require("PopMsgController");
        let x = EndNode.position.x + 55;
        let y = EndNode.position.y + 110;
        let position = cc.p(x, y);
        PopMsgController.showMsg("+" + showNumber, position);
    },
    joinCallback: function (startNodes, EndNode) {
        for (let i = 0; i < startNodes.length; i++) {
            let thisNodePos = startNodes[i];
            let thisNode = this.blockNodes[thisNodePos.line][thisNodePos.row];

            if (thisNode) {

                for (let i = 0; i < this.needDestroy.length; i++) {
                    if (thisNode == this.needDestroy[i]) {
                        this.needDestroy.splice(i, 1);
                        break;
                    }
                }
                for (let i = 0; i < this.waitMovingNodes.length; i++) {
                    if (thisNode == this.waitMovingNodes[i]) {
                        this.waitMovingNodes.splice(i, 1);
                        break;
                    }
                }
                thisNode.removeFromParent(true);
                this.blockNodes[thisNodePos.line][thisNodePos.row] = null;
            } else {
                console.log("error");
            }
        }
        let find = false;
        for (let i = 0; i < this.newCreateList.length; i++) {
            if (this.newCreateList[i] == EndNode) {
                find = true;
                break;
            }
        }
        if (!find) {
            this.newCreateList.push(EndNode);
        }
        this.addScore(startNodes.length, EndNode);
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
        this.scheduleOnce(this.downBlockCallback.bind(this, realLine, centerNode), 0.1);
        // }

    },
    accelarDownAction: function () {
        let realLine = this.maxTargetDown();
        this.unschedule(this.refreshBlocks);
        this.canhorizon = false;
        this.schedule(this.refreshChoose, this.joinspeed);
        this.movingBlock.stopAllActions();
        let row = this.movingBlock.getComponent("Block").getBlockRow();
        let line = this.movingBlock.getComponent("Block").getBlockLine();
        let moveY = realLine * (this.blockblank + this.blockWidth);
        let realY = line * (this.blockblank + this.blockWidth);
        let moveX = row * (this.blockblank + this.blockWidth);
        let action1 = cc.moveTo(0.1, cc.p(moveX, moveY));
        this.movingBlock.position = cc.p(moveX, realY);
        this.movingBlock.runAction(action1);
        this.scheduleOnce(this.downBlockCallback.bind(this, realLine, this.movingBlock), 0.1);

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
        // let stopMoving = [];
        // let stopList = [];

        // let find = false;
        // for (let i = 0; i < this.waitMovingNodes.length; i++) {
        //     find = false;
        //     for (let j = 0; j < canMoving.length; j++) {
        //         if (canMoving[j] == this.waitMovingNodes[i]) {
        //             find = true;
        //             break;
        //         }
        //     }
        //     if (!find) {
        //         this.stopMoveNodes.push(this.waitMovingNodes[i]);
        //     }
        // }
        this.waitMovingNodes = canMoving;

        // for(let i =0;i<  this.stopMoveNodes.length-1;i++){
        //     for(let j =i+1;j<   this.stopMoveNodes.length;j++){
        //         if(this.stopMoveNodes[i] == this.stopMoveNodes[j]){//  去除相同点节点
        //             this.stopMoveNodes.splice(i,1);
        //             j--;
        //         }
        //     }
        // }
        for (let i = 0; i < this.waitMovingNodes.length; i++) {
            this.downBlockAction(this.waitMovingNodes[i]);
        }
    },
    beforeJoinAll: function () {

        let find = false;
        // for (let i = 0; i < this.waitMovingNodes.length; i++) {
        //     find = false;
        //     for (let j = 0; j < this.stopMoveNodes.length; j++) {
        //         if (this.stopMoveNodes[j] == this.waitMovingNodes[i]) {
        //             find = true;
        //             break;
        //         }
        //     }
        //     if (!find) {
        //         this.stopMoveNodes.push(this.waitMovingNodes[i]);
        //     }
        // }
        this.stopMoveNodes = this.waitMovingNodes;


    },
    downBlockCallback: function (realLine, endNode) {

        let line = endNode.getComponent("Block").getBlockLine();
        let row = endNode.getComponent("Block").getBlockRow();
        console.log("brefore:", line, "after:", realLine);
        for (let i = 0; i < this.movingNodes.length; i++) {
            if (this.movingNodes[i] == endNode) {
                this.movingNodes.splice(i, 1);
                break;
            }
        }
        if (line <= realLine) {//异常情况
            console.log("exception");
            let endY = line * (this.blockWidth + this.blockblank);
            // endNode.setPositionY(endY);
            return;
        }
        if (!this.blockNodes[realLine]) {
            this.blockNodes[realLine] = [null, null, null, null, null];
        }
        if (!this.blockNodes[line][row]) {
            console.log("Error");
            return;
        }
        this.blockNodes[realLine][row] = endNode;
        endNode.getComponent("Block").setBlockLine(realLine);
        this.blockNodes[line][row] = null;
        let endY = realLine * (this.blockWidth + this.blockblank);
        // endNode.setPositionY(endY);
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

    // stopDownBlock: function () {
    //     let stopnum = 0;
    //     for (let i = 0; i < this.stopMoveNodes.length; i++) {
    //         let stopBlock = this.stopMoveNodes[i];
    //         let line = stopBlock.getComponent("Block").getBlockLine();
    //         let row = stopBlock.getComponent("Block").getBlockRow();
    //         for (let start = line; start <= this.blockFloor - 1; start++) {
    //             if (!this.blockNodes[start] || !this.blockNodes[start][row])
    //                 continue;
    //             let action_1 = cc.scaleTo(0.05, 1, 0.8);
    //             let action_2 = cc.scaleTo(0.05, 1, 1);
    //              this.stopMoveNodes[i].runAction(cc.sequence(action_1, action_2));
    //         }
    //     }
    //     // this.scheduleOnce(this.stopDownBlockCallBack.bind(this), 0.1);
    // },
    /*
    stopDownBlockCallBack: function () {
        let find = false;
        for (let i = 0; i < this.newCreateList.length; i++) {
            if (this.canDownBlock(this.newCreateList[i])) {
                find = true;
                this.downBlockAction(this.newCreateList[i]);
            } else if (this.canJoinBlock(this.newCreateList[i])) {
                find = true;
                this.joinBlock(this.newCreateList[i]);
            }
        }
        if (!find) {
            for (let i = 0; i < this.stopMoveNodes.length; i++) {
                if (this.canJoinBlock(this.stopMoveNodes[i])) {
                    find = true;
                    this.joinBlock(this.stopMoveNodes[i]);
                }
            }
        }
        if (!find) {
            this.canrefresh = true;
            this.createBlocks();
        }

    },*/
    checkCanAllJoin: function () {

        let find = false;
        for (let i = 0; i < this.newCreateList.length; i++) {
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
        for (let i = 0; i < this.newCreateList.length; i++) {
            if (this.canJoinBlock(this.newCreateList[i])) {
                this.joinBlock(this.newCreateList[i]);
                find = true;
                break;
            }
        }
        if (!find) {
            for (let i = 0; i < this.stopMoveNodes.length; i++) {
                if (this.canJoinBlock(this.stopMoveNodes[i])) {
                    this.joinBlock(this.stopMoveNodes[i]);
                }
            }
        }
    },
    refreshChoose: function () {

        if (this.checkAllDownBlock()) {
            this.downAllBlock();
        } else {
            this.beforeJoinAll();
            if (this.checkCanAllJoin()) {
                this.joinAllBlock();
            } else {
                this.unschedule(this.refreshChoose);
                this.createBlocks();
            }
        }
    },
    updateCheck: function () {
        if (this.canrefresh)
            return;
        if (!this.movingNodes)
            return;
        for (let i = 0; i < this.movingNodes.length; i++) {
            let startNode = this.movingNodes[i];
            let startLine = startNode.getComponent("Block").getBlockLine();
            let startY = startNode.getPositionY();
            let startRow = startNode.getComponent("Block").getBlockRow();
            if (startLine == 0) {
                this.movingNodes.splice(i, 1);
                i--;
                this.blockNodes[0][startRow].setPositionY(0);
                this.downAllBlock();

            } else {
                if (this.blockNodes[startLine - 1][startRow]) {
                    this.movingNodes.splice(i, 1);
                    i--;
                    if (this.movingNodes.length == 0) {
                        this.downAllBlock();
                    }
                } else {
                    let endY = (startLine - 1) * (this.blockWidth + this.blockblank);
                    if (Math.abs(startY - endY) < 10) {//误差20像素
                        let endLine = startLine - 1;
                        startNode.getComponent("Block").setBlockLine(endLine);
                        this.blockNodes[startLine][startRow] = null;
                        this.blockNodes[endLine][startRow] = startNode;
                        this.blockNodes[endLine][startRow].setPositionY(endY);
                        this.movingNodes.splice(i, 1);
                        i--;
                        if (this.movingNodes.length == 0) {
                            this.downAllBlock();
                        }


                    }
                }
            }

        }
    },


    update: function () {
        // this.updateCheck();
    },
    //-------------- touch part -----------------------------
    horizontalMove: function (moveNum) {

        if (!this.canhorizon)
            return;
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
        }
        //检查之间有没有其他的块
        if (newRow < row) {//left
            for (let start = row - 1; start >= newRow; start--) {
                if (this.blockNodes[line][start]) {
                    newRow = start + 1;
                    break;
                } else {
                }
            }
        } else {//right
            for (let start = row + 1; start <= newRow; start++) {
                if (this.blockNodes[line][start]) {
                    newRow = start - 1;
                    ////movelist[endLine]("rightnewRow", newRow);
                    break;
                } else {
                    ////movelist[endLine]("continue", start);
                }
            }
        }
        if (newRow == row) {
            return;
        }
        if (this.movingBlock) {
            //movelist[endLine]("get one error");
            // console.log("get one format", line, row, "->", line, newRow);
            let newline = this.movingBlock.getComponent("Block").getBlockLine();
            this.movingBlock.getComponent("Block").setBlockRow(newRow);
            this.blockNodes[newline][newRow] = this.movingBlock;
            this.blockNodes[newline][row] = null;
            let newx = newRow * (this.blockblank + this.blockWidth);
            this.blockNodes[newline][newRow].setPositionX(newx);
            // console.log("get one now", newline, newRow, "->", line, newRow);
        } else {
            console.log("get 3 error");
        }
        // this.gameStateHorizon--;
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
            console.log("点击不生效原因canhorizon", this.canhorizon);
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
            console.log("点击不生效原因canhorizon", this.canhorizon);
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
    }
    ,

});