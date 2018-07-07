// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
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
        gameNodeAni: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameState = 0;// 0 表示可以操作 否则表示正在被占用
        this.stopState = 0;// 0 表示可以操作 否则表示正在被占用
        this.joinState = 0;// 0 表示可以操作 否则表示正在被占用
        this.gameStateHorizon = 0;// 0 表示可以操作 否则表示正在被占用
        this.movelength = 0;
        this.moveRation = 0;// 0 down 1 left 2 right
        this.previousPos = null;
        this.blockWidth = 110;
        this.blockblank = 6;
        this.blockFloor = 7;
        this.blockRow = 5;
        this.TouchState = null;//start move end cancel
        this.moveState = false;
        this.blockNodes = [];//所有移动的点
        this.movingBlock = null;//最新点
        this.movingNodes = [];//正在移动点点
        this.newCreateList = [];
        this.newDownList = [];
        this.waitMovingNodes = [];//等待移动点
        this.stopMoveNodes = [];//刚停止移动的点

        this.addCount = 0;
        this.firstAction = 0;
        this.BlockNum = 1;
        this.panelMax = 1;
        this.NextBlockNum = this.createNextNum();
        this.gameController = cc.find("Canvas").getComponent("GameController");
        this.gameController.GameMenuController.updateNext(this.NextBlockNum);
        this.canhorizon = false;
        this.downspeed = 1;
        this.canrefresh = true;


    },

    start() {
    },


    startMenu: function () {

        this.createBlocks();
        this.schedule(this.refreshBlocks, 1);
    }
    ,
    restartMenu: function () {
        this.clearAll();
        this.createBlocks();
        this.schedule(this.refreshBlocks, 1);
    },
    clearAll: function () {
        this.gameNode.removeAllChildren(true);
        this.blockNodes = [];
    },
    finishGame: function () {
        // console.log("finish");
        this.unschedule(this.refreshBlocks);
        this.gameController.updeteFinish();
    },
    refreshBlocks: function (centernode = null) {
        if (this.gameState > 0 || this.stopState > 0 || this.joinState > 0)
            return;
        this.gameState = 0;
        this.stopState = 0;
        this.joinState = 0;
        // ////console.log("refresh:",this.centerBlock);

        // else
        // this.canrefresh = false;
        if (this.checkAllDownBlock()) {
            this.downAllBlock();
        } else {
            if (this.canhorizon) {
                this.downAllBlock();
            }

            if (this.gameState > 0 || this.stopState > 0 || this.joinState > 0)
                return;
            // if (this.canJoinBlock()) {
            //     this.joinBlock();
            // } else
            if (this.canAddNewBlock()) {
                this.createBlocks();
            } else {
                this.finishGame();
            }
        }
    },


    createBlocks: function () {
        if (this.gameState > 0)
            return;
        this.newCreateList = [];
        this.waitMovingNodes = [];//等待移动点
        this.stopMoveNodes = [];//刚停止移动的点
        let node = BlockFactory.create(this.BlockNum);// 写死生成的新的数组是math.pow(2,1)[改]
        //console.log(this.BlockNum);
        this.BlockNum = this.NextBlockNum;

        this.gameController.GameMenuController.updateNext(this.NextBlockNum);
        this.NextBlockNum = this.createNextNum();

        this.movingBlock = node;
        this.newCreateList = [];
        this.newCreateList[0] = node;
        this.gameNode.addChild(node);
        let realpath = this.blockWidth + this.blockblank;
        node.getComponent("Block").setBlockPos(6, 2);
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

    },
    canAddNewBlock: function () {
        if (!this.blockNodes[6] || !this.blockNodes[6][2]) {
            return true;
        }
        return false;
    },

    joinBlock: function (joinNode) {

        let endBlock = joinNode == null ? this.movingBlock : joinNode;
        let line = endBlock.getComponent("Block").getBlockLine();
        let row = endBlock.getComponent("Block").getBlockRow();
        let centerNumber = endBlock.getComponent("Block").getBlockNumber();
        let nextNode;
        let rightNode;
        let leftNode;
        let moveBlock = [];

        if (line > 0 && !this.checkisMoving(line - 1, row)) {
            if (this.blockNodes[line - 1] && this.blockNodes[line - 1][row]) {
                nextNode = this.blockNodes[line - 1][row];
                let nextNumber = nextNode.getComponent("Block").getBlockNumber();
                if (nextNumber == centerNumber) {
                    // this.moveBlock(nextNode.position,this.blockNodes[line][row].position);
                    moveBlock.push({line: line - 1, row: row});
                }
            }
        }
        if (row > 0 && row < this.blockRow && !this.checkisMoving(line, row - 1)) {//left
            for (let end = row - 1; end >= 0; end--) {
                if (this.blockNodes[line] && this.blockNodes[line][end]) {
                    leftNode = this.blockNodes[line][end];
                    let leftNumber = leftNode.getComponent("Block").getBlockNumber();
                    if (leftNumber == centerNumber) {
                        // this.moveBlock(leftNode.position,this.blockNodes[line][row].position);
                        // moveBlock.push(leftNode);
                        moveBlock.push({line: line, row: end});
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        if (row >= 0 && row < this.blockRow - 1 && !this.checkisMoving(line, row + 1)) {
            for (let start = row + 1; start <= this.blockRow - 1; start++) {
                if (this.blockNodes[line] && this.blockNodes[line][start]) {
                    rightNode = this.blockNodes[line][start];
                    let rightNumber = rightNode.getComponent("Block").getBlockNumber();
                    if (rightNumber == centerNumber) {
                        // this.moveBlock(rightNode.position,this.blockNodes[line][row].position);
                        // moveBlock.push(rightNode);
                        moveBlock.push({line: line, row: start});
                    } else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        if (moveBlock.length > 0) {
            this.canhorizon = false;
            this.joinAction(moveBlock, endBlock);
        }
    },
    //判断是否可以合并
    canJoinBlock: function (centernode = null) {
        // let line = this.centerBlock.y;
        // let row = this.centerBlock.x;
        // if (centernode != null) {
        //     line = centernode.y;
        //     row = centernode.x;
        // }
        let endBlock = centernode == null ? this.movingBlock : centernode;
        let line = endBlock.getComponent("Block").getBlockLine();
        let row = endBlock.getComponent("Block").getBlockRow();
        let centerNumber = endBlock.getComponent("Block").getBlockNumber();
        let nextNode;
        let rightNode;
        let leftNode;
        let moveBlock = [];
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
    checkisMoving: function (line, row) {

        for (let i = 0; i < this.waitMovingNodes.length; i++) {
            let x = this.waitMovingNodes[i].getComponent("Block").getBlockRow();
            let y = this.waitMovingNodes[i].getComponent("Block").getBlockLine();
            if (x == row && y == line) {
                return true;
            }
            return false;
        }
    },
    joinAction: function (startNodes, EndNode) {

        let moveNum = startNodes.length;
        console.log("joinstart:", startNodes);
        // console.log("joinend:",startNodes);
        let addCount = 0;
        for (let i = 0; i < moveNum; i++) {
            // let action1 = cc.moveTo(0.2, EndNode.position);
            this.joinState++;
            // console.log("joinAction.gameState1++", this.gameState);
            let action1 = cc.moveTo(0.1, EndNode.position);
            var action2 = cc.scaleTo(0.1, 1, 0.8);
            let spawn = cc.spawn(action1, action2);
            var action4 = cc.scaleTo(0.1, 1, 1);
            let thisNodePos = startNodes[i];
            let thisNode = this.blockNodes[thisNodePos.line][thisNodePos.row];
            let action3 = cc.callFunc(() => {

                ////console.log("destroy",thisNodePos);
                addCount++;

                if (addCount == moveNum) {
                    this.movingBlock = EndNode;
                    this.addScore(addCount);
                    this.stopState++;
                    // console.log("joinAction.gameState2++", this.stopState);
                    // ////console.log("othermove",this.centerBlock)

                    // let CenterBlock = this.blockNodes[EndNode.y][EndNode.x];

                    let action_1 = cc.scaleTo(0.1, 1, 0.8);
                    let action_2 = cc.scaleTo(0.1, 1, 1);
                    this.newCreateList = [];
                    this.newCreateList[0] = EndNode;
                    console.log("joinnewnode", EndNode.getComponent("Block").getBlockLine());
                    let action_3 = cc.callFunc(() => {
                        if (this.checkAllDownBlock()) {
                            this.downAllBlock();
                        } else if (this.canJoinBlock(EndNode)) {
                            this.joinBlock(EndNode);
                        } else {
                            // this.canrefresh = true;
                        }
                        this.stopState--;
                        // console.log("joinAction.gameState2--", this.stopState);
                    });
                    EndNode.runAction(cc.sequence(action_1, action_2, action_3));
                }
                this.joinState--;
                // console.log("joinAction.joinState--", this.joinState);
                if (this.blockNodes[thisNodePos.line][thisNodePos.row]) {
                    // this.joinState = 0;
                    // let run =  this.blockNodes[thisNodePos.line][thisNodePos.row].getNumberOfRunningActionsInTarget;
                    // this.joinState -=run;
                    // console.log("1", thisNodePos);
                    this.blockNodes[thisNodePos.line][thisNodePos.row].removeFromParent(true);
                    this.blockNodes[thisNodePos.line][thisNodePos.row] = null;
                    // console.log("2", thisNodePos);
                }

            }, this);

            thisNode.runAction(cc.sequence(spawn, action4, action3));
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
    canDownBlock: function (centerNode = null) {
        let line = this.movingBlock.getComponent("Block").getBlockLine();
        let row = this.movingBlock.getComponent("Block").getBlockRow();
        if (centerNode != null) {
            line = centerNode.getComponent("Block").getBlockLine();
            row = centerNode.getComponent("Block").getBlockRow();

        }
        if (line <= 0) {
            return false;
        }
        if (!this.blockNodes[line - 1] || !this.blockNodes[line - 1][row]) {
            return true;

        }
        return false;

    }
    ,
    findAllCanDownBlock: function () {
        let canDownList = [];
        for (let line = 0; line <= 6; line++) {
            for (let row = 0; row <= 4; row++) {
                if (!this.blockNodes[line] || !this.blockNodes[line][row]) {
                    continue;
                }
                else if (this.canDownBlock(this.blockNodes[line][row])) {
                    canDownList.push(this.blockNodes[line][row]);
                }
            }
        }
        return canDownList;
    },
    downAllBlock: function () {
        this.movingNodes = [];
        let canMoving = this.findAllCanDownBlock();
        let stopMoving = [];
        for (let i = 0; i < this.waitMovingNodes.length; i++) {
            let find = false;
            for (let j = 0; j < canMoving.length; j++) {
                if (canMoving[j] == this.waitMovingNodes[i]) {
                    find = true;
                }
            }
            if (!find) {
                stopMoving.push(this.waitMovingNodes[i]);
            }
        }
        this.waitMovingNodes = canMoving;
        this.stopMoveNodes = stopMoving;
        // for (let i = 0; i < stopMoving.length; i++) {
        if (this.stopMoveNodes > 0) {
            this.stopDownBlock(this.stopMoveNodes);
        }
        // }
        for (let i = 0; i < canMoving.length; i++) {
            this.downBlock(-1, canMoving[i]);
        }


    },


//向下移动 默认单位是1个格子
    downBlock: function (moveNum = -1, centerNode = null, acceler = false) {

        if (this.gameStateHorizon > 0) {
            return;
        }
        for (let i = 0; i < this.movingNodes.length; i++) {
            if (centerNode == this.movingNodes[i]) {
                return;
            }
        }
        this.movingNodes.push(centerNode);
        // let line = this.centerBlock.y;
        // let row = this.centerBlock.x;
        let realLine;
        // let line = this.movingBlock.getComponent("Block").getBlockLine();
        // let row = this.movingBlock.getComponent("Block").getBlockRow();
        // if (centerNode != null) {
        let line = centerNode.getComponent("Block").getBlockLine();
        let row = centerNode.getComponent("Block").getBlockRow();
        // }
        if (moveNum == -1) {
            realLine = line - 1;
        } else {
            realLine = moveNum;
        }
        if (realLine < 0) {
            realLine = 0;
        } else if (realLine > this.blockFloor - 1) {
            realLine = this.blockFloor - 1;
        }
        if (realLine == line)
            return;
        let realMove = line - realLine;
        let movelist = [];
        // console.log("downmoveing", realLine);
        for (let start = line; start <= this.blockFloor - 1; start++) {
            if (!this.blockNodes[start] || !this.blockNodes[start][row])
                continue;

            let beginLine = start;
            let endLine = beginLine - realMove;
            if (endLine < 0)
                continue;
            this.gameState++;
            // console.log("downBlock.gameState++", this.gameState);
            let startNode = this.blockNodes[beginLine][row];

            let movedis = realMove * (this.blockblank + this.blockWidth);
            // console.log("downposing", "row", row, "line", endLine, "y", y);
            let action1 = cc.moveBy(0.1, cc.p(0, -movedis));
            console.log("moveByposY", movedis);
            // console.log("endpos",endPos);
            movelist[endLine] = startNode;
            // var action2 = cc.scaleTo(0.1, 1, 0.8);
            // let spawn = cc.spawn(action1, action2);
            // var action3 = cc.scaleTo(0.1, 1, 1);

            let action4 = cc.callFunc(() => {

                if (!this.blockNodes[endLine]) {
                    this.blockNodes[endLine] = [];
                }
                for (let i = 0; i < this.movingNodes.length; i++) {
                    if (this.movingNodes[i] == movelist[endLine]) {
                        this.movingNodes.splice(i, 1);
                        break;
                    }
                }
                if (movelist[endLine]) {
                    let endrow = movelist[endLine].getComponent("Block").getBlockRow();
                    this.blockNodes[endLine][endrow] = movelist[endLine];
                    this.blockNodes[beginLine][endrow] = null;
                    // this.movingBlock = startNode;
                    ////console.log("destroy",moveNum,"position:",row,line);
                    // this.centerBlock.y = realLine;
                    movelist[endLine].getComponent("Block").setBlockLine(endLine);
                    let y = endLine * (this.blockblank + this.blockWidth);
                    console.log("endposY", y);
                    movelist[endLine].setPositionY(y);

                    // if (!this.canDownBlock(movelist[endLine])) {
                    // if (this.canJoinBlock(movelist[endLine])) {
                    //     this.joinBlock(movelist[endLine]);
                    // }
                    let bool = acceler || !this.canhorizon;
                    if (bool) {
                        for (let i = 0; i < this.waitMovingNodes.length; i++) {
                            if (this.waitMovingNodes[i] == movelist[endLine]) {
                                this.waitMovingNodes.splice(i, 1);
                                break;
                            }
                        }
                        this.stopDownBlock([movelist[endLine]]);
                        // }

                    }
                }
                else {
                    console.log("get two error");
                }
                console.log("downnewnode", movelist[endLine].getComponent("Block").getBlockLine());
                this.gameState--;
                // console.log("downBlock.gameState--", this.gameState);
            }, this);
            startNode.runAction(cc.sequence(action1, action4));
        }
    },
    /*
    stopDownBlock: function (stopBlockList) {
        let stopnum = 0;
        for (let i = 0; i < stopBlockList.length; i++) {
            let stopBlock = stopBlockList[i];
            let line = stopBlock.getComponent("Block").getBlockLine();
            let row = stopBlock.getComponent("Block").getBlockRow();
            for (let start = line; start <= this.blockFloor - 1; start++) {
                if (!this.blockNodes[start] || !this.blockNodes[start][row])
                    continue;
                // this.gameState++;
                this.stopState++;
                //movelist[endLine]("stopDownBlock stopState++", this.stopState);
                let curline = start;
                let currow = row;
                let action_1 = cc.scaleTo(0.05, 1, 0.8);
                let action_2 = cc.scaleTo(0.05, 1, 1);
                let action_3 = cc.callFunc(() => {
                    stopnum++;
                    let find = false;
                    this.stopState--;
                    if (this.stopState == 0) {
                        for (let i = 0; i < this.newCreateList.length; i++) {
                            if (this.canJoinBlock(this.newCreateList[i])) {
                                find = true;
                                this.joinBlock(this.newCreateList[i]);
                            }
                        }
                        if (!find) {
                            for (let i = 0; i < stopBlockList.length; i++) {
                                if (this.canJoinBlock(stopBlockList[i])) {
                                    find = true;
                                    this.joinBlock(stopBlockList[i]);
                                }
                            }

                        }
                        if (!find) {
                            this.canrefresh = true;
                        }
                    }
                    this.canhorizon = false;

                    //movelist[endLine]("stopDownBlock gameState--", this.gameState);

                },this);
                this.blockNodes[start][row].runAction(cc.sequence(action_1, action_2, action_3));
            }
        }
    },
*/
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

    changeNextNum: function (num) {
        this.BlockNum = num;
        this.gameController.GameMenuController.updateNext(this.BlockNum);
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
        this.gameStateHorizon++;
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
        this.gameStateHorizon--;
        // this.movingBlock.runAction(action3);
    }
    ,

//-------------- touch part -----------------------------
//-------------- touch part -----------------------------
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
                let maxMoveDown = this.maxTargetDown();
                if (maxMoveDown <= 0)
                    return;
                // console.log("maxMoveDown", maxMoveDown)
                // this.movingBlock.stopAllActions();
                // this.movingNodes = [];
                // this.gameState =0;
                // console.log("clearmove gameState", this.gameState);
                this.downBlock(maxMoveDown, this.movingBlock, true);
            }
        } else {
            let maxMoveDown = this.maxTargetDown();
            // console.log("maxMoveDown", maxMoveDown)
            // this.movingBlock.stopAllActions();
            // this.movingNodes = [];
            // this.gameState =0;
            // console.log("clearmovegameState", this.gameState);
            this.downBlock(maxMoveDown, this.movingBlock, true);
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
            if (this.gameStateHorizon <= 0) {
                this.horizontalMove(moveNum);
                this.previousPos = location;
                this.moveState = true;
            } else {
                console.log("点击不生效this.gameStateHorizon", this.gameStateHorizon);
            }
        }
    }
    ,
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
    }
})
;
