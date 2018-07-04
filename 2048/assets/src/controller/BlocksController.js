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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameState = 0;// 0 表示可以操作 否则表示正在被占用
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
        this.blockNodes = [];
        this.movingBlock = null;
        this.movingNodes = [];
        this.waitMovingNodes = [];
        this.addCount = 0;
        this.firstAction = 0;
        this.BlockNum = 1;
        this.panelMax = 1;
        this.NextBlockNum = this.createNextNum();
        this.gameController = cc.find("Canvas").getComponent("GameController");
        this.gameController.GameMenuController.updateNext(this.NextBlockNum);
        this.canhorizon = false;


    },

    start() {
        // this.createBlocks();
        // this.schedule(this.refreshBlocks, 0.5);
    },


    startMenu: function () {
        this.createBlocks();
        this.schedule(this.refreshBlocks, 0.6);
    }
    ,
    restartMenu: function () {
        this.clearAll();
        this.createBlocks();
        this.schedule(this.refreshBlocks, 0.6);
    },
    clearAll: function () {
        this.gameNode.removeAllChildren(true);
        this.blockNodes = [];
    },
    finishGame: function () {
        console.log("finish");
        this.unschedule(this.refreshBlocks);
        this.gameController.updeteFinish();
    },
    refreshBlocks: function (centernode = null) {
        if (this.gameState > 0)
            return;
        // ////console.log("refresh:",this.centerBlock);

        // else
        if (this.checkAllDownBlock()) {
            this.downAllBlock();
        } else {
            this.downAllBlock();
            if (this.gameState > 0)
                return;
            if (this.canJoinBlock()) {
                this.joinBlock();
            } else if (this.canAddNewBlock()) {
                this.createBlocks();
            } else {
                this.finishGame();
            }
        }
    },


    createBlocks: function () {
        if (this.gameState > 0)
            return;
        let node = BlockFactory.create(this.BlockNum);// 写死生成的新的数组是math.pow(2,1)[改]
        //console.log(this.BlockNum);
        this.BlockNum = this.NextBlockNum;

        this.gameController.GameMenuController.updateNext(this.NextBlockNum);
        this.NextBlockNum = this.createNextNum();
        node.getComponent("Block").setBlockPos(6, 2);
        this.centerBlock = cc.p(2, 6);
        this.movingBlock = node;
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

    },
    canAddNewBlock: function () {
        if (!this.blockNodes[6] || !this.blockNodes[6][2]) {
            return true;
        }
        return false;
    },

    joinBlock: function (joinNode) {
        // let line = this.centerBlock.y;
        // let row = this.centerBlock.x;

        let endBlock = joinNode == null ? this.movingBlock : joinNode;
        let line = endBlock.getComponent("Block").getBlockLine();
        let row = endBlock.getComponent("Block").getBlockRow();
        let centerNumber = endBlock.getComponent("Block").getBlockNumber();
        let nextNode;
        let rightNode;
        let leftNode;
        let moveBlock = [];
        // ////console.log("refresh:",this.centerBlock);

        // let centerNumber = this.blockNodes[line][row].getComponent("Block").getBlockNumber();

        if (line > 0) {
            if (this.blockNodes[line - 1] && this.blockNodes[line - 1][row]) {
                nextNode = this.blockNodes[line - 1][row];
                let nextNumber = nextNode.getComponent("Block").getBlockNumber();
                if (nextNumber == centerNumber) {
                    // this.moveBlock(nextNode.position,this.blockNodes[line][row].position);
                    moveBlock.push({line: line - 1, row: row});
                }
            }
        }
        if (row > 0) {
            if (this.blockNodes[line] && this.blockNodes[line][row - 1]) {
                leftNode = this.blockNodes[line][row - 1];
                let leftNumber = leftNode.getComponent("Block").getBlockNumber();
                if (leftNumber == centerNumber) {
                    // this.moveBlock(leftNode.position,this.blockNodes[line][row].position);
                    // moveBlock.push(leftNode);
                    moveBlock.push({line: line, row: row - 1});
                }
            }
        }
        if (row < this.blockRow - 1) {
            if (this.blockNodes[line] && this.blockNodes[line][row + 1]) {
                rightNode = this.blockNodes[line][row + 1];
                let rightNumber = rightNode.getComponent("Block").getBlockNumber();
                if (rightNumber == centerNumber) {
                    // this.moveBlock(rightNode.position,this.blockNodes[line][row].position);
                    // moveBlock.push(rightNode);
                    moveBlock.push({line: line, row: row + 1});
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
        if (line > 0) {
            if (this.blockNodes[line - 1] && this.blockNodes[line - 1][row]) {
                nextNode = this.blockNodes[line - 1][row];
                let nextNumber = nextNode.getComponent("Block").getBlockNumber();
                if (nextNumber == centerNumber) {
                    // this.moveBlock(nextNode.position,this.blockNodes[line][row].position);
                    return true;
                }
            }
        }
        if (row > 0 && row < this.blockRow) {
            if (this.blockNodes[line] && this.blockNodes[line][row - 1]) {
                leftNode = this.blockNodes[line][row - 1];
                let leftNumber = leftNode.getComponent("Block").getBlockNumber();
                if (leftNumber == centerNumber) {
                    // this.moveBlock(leftNode.position,this.blockNodes[line][row].position);
                    // moveBlock.push(leftNode);
                    return true;
                }
            }
        }
        if (row >= 0 && row < this.blockRow - 1) {
            if (this.blockNodes[line] && this.blockNodes[line][row + 1]) {
                rightNode = this.blockNodes[line][row + 1];
                let rightNumber = rightNode.getComponent("Block").getBlockNumber();
                if (rightNumber == centerNumber) {
                    // this.moveBlock(rightNode.position,this.blockNodes[line][row].position);
                    // moveBlock.push(rightNode);
                    return true;
                }
            }
        }
        return false;
    },
    joinAction: function (startNodes, EndNode) {

        console.log("this.gameState", this.gameState);
        let moveNum = startNodes.length;
        let addCount = 0;
        for (let i = 0; i < moveNum; i++) {
            // let action1 = cc.moveTo(0.2, EndNode.position);
            this.gameState++;
            console.log("this.gameState", this.gameState);
            let action1 = cc.moveTo(0.1, EndNode.position);
            var action2 = cc.scaleTo(0.05, 1, 0.8);
            let spawn = cc.spawn(action1, action2);
            var action4 = cc.scaleTo(0.05, 1, 1);
            let thisNodePos = startNodes[i];
            let thisNode = this.blockNodes[thisNodePos.line][thisNodePos.row];
            let action3 = cc.callFunc(() => {
                if (this.blockNodes[thisNodePos.line][thisNodePos.row]) {
                    this.blockNodes[thisNodePos.line][thisNodePos.row].removeFromParent(true);
                    this.blockNodes[thisNodePos.line][thisNodePos.row] = null;
                }
                ////console.log("destroy",thisNodePos);
                addCount++;

                console.log("this.gameState", this.gameState);
                if (addCount == moveNum) {
                    this.gameState++;
                    console.log("this.gameState", this.gameState);
                    this.addScore(addCount);
                    // ////console.log("othermove",this.centerBlock)

                    // let CenterBlock = this.blockNodes[EndNode.y][EndNode.x];

                    let action_1 = cc.scaleTo(0.05, 1, 0.8);
                    let action_2 = cc.scaleTo(0.05, 1, 1);
                    let action_3 = cc.callFunc(() => {
                        // if (this.canDownBlock()) {
                        //     this.downBlock();
                        // }
                        this.gameState--;
                        console.log("this.gameState", this.gameState);
                    });
                    EndNode.runAction(cc.sequence(action_1, action_2, action_3));
                }
                this.gameState--;
                console.log("this.gameState", this.gameState);

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
        for (let i = 0; i < stopMoving.length; i++) {
            this.stopDownBlock(stopMoving[i]);
        }
        for (let i = 0; i < canMoving.length; i++) {
            this.downBlock(-1, canMoving[i]);
        }


    },


//向下移动 默认单位是1个格子
    downBlock: function (moveNum = -1, centerNode = null) {

        // if (this.gameState > 0)
        //     return;
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
        console.log("downmoveing", realLine);
        for (let start = line; start <= this.blockFloor - 1; start++) {
            if (!this.blockNodes[start] || !this.blockNodes[start][row])
                continue;

            console.log("this.gameState", this.gameState);
            let beginLine = start;
            let endLine = beginLine - realMove;
            if (endLine < 0)
                continue;
            this.gameState++;
            let startNode = this.blockNodes[beginLine][row];
            let x = row * (this.blockblank + this.blockWidth);
            let y = endLine * (this.blockblank + this.blockWidth);
            let endPos = cc.p(x, y);
            console.log("downposing", "row", row, "line", endLine, "y", y);
            let action1 = cc.moveTo(0.1, endPos);
            movelist[endLine] = startNode;
            // var action2 = cc.scaleTo(0.1, 1, 0.8);
            // let spawn = cc.spawn(action1, action2);
            // var action3 = cc.scaleTo(0.1, 1, 1);

            let action4 = cc.callFunc(() => {

                if (!this.blockNodes[endLine]) {
                    this.blockNodes[endLine] = [];
                }
                if (movelist[endLine]) {
                    this.blockNodes[endLine][row] = movelist[endLine];
                    this.blockNodes[beginLine][row] = null;
                    // this.movingBlock = startNode;
                    ////console.log("destroy",moveNum,"position:",row,line);
                    // this.centerBlock.y = realLine;
                    this.blockNodes[endLine][row].getComponent("Block").setBlockLine(endLine);
                    this.blockNodes[endLine][row].position = endPos;
                    console.log("successdownposing", "row", row, "line", endLine, "position", this.blockNodes[endLine][row].position);
                    // if (!this.canDownBlock(movelist[endLine])) {
                    //
                    //     this.gameState++;
                    //     let action_1 = cc.scaleTo(0.2, 1, 0.8);
                    //     let action_2 = cc.scaleTo(0.2, 1, 1);
                    //     let action_3 = cc.callFunc(() => {
                    //         this.gameState--;
                    //         if (this.canJoinBlock()) {
                    //             this.joinBlock();
                    //         }
                    //     });
                    //     movelist[endLine].runAction(cc.sequence(action_1, action_2, action_3));
                    // }
                    // let ID = this.movingNodes.indexOf(movelist[endLine]);
                    for (let i = 0; i < this.movingNodes.length; i++) {
                        if (this.movingNodes[i] == movelist[endLine]) {
                            this.movingNodes.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    console.log("get two error");
                }
                this.gameState--;
                console.log("this.gameState", this.gameState);
            }, this);
            startNode.runAction(cc.sequence(action1, action4));
        }
    },
    stopDownBlock: function (stopBlock) {
        let line = stopBlock.getComponent("Block").getBlockLine();
        let row = stopBlock.getComponent("Block").getBlockRow();
        for (let start = line; start <= this.blockFloor - 1; start++) {
            if (!this.blockNodes[start] || !this.blockNodes[start][row])
                continue;
            this.gameState++;
            console.log("this.gameState", this.gameState);
            let curline = start;
            let currow = row;
            let action_1 = cc.scaleTo(0.05, 1, 0.8);
            let action_2 = cc.scaleTo(0.05, 1, 1);
            let action_3 = cc.callFunc(() => {
                this.gameState--;
                console.log("this.gameState", this.gameState);
                // if (this.canJoinBlock(this.blockNodes[curline][currow])) {
                //     this.joinBlock(this.blockNodes[curline][currow]);
                // }
                // let ID = this.waitMovingNodes.indexOf(this.blockNodes[curline][currow]);
                // if (ID != -1) {
                //     this.waitMovingNodes.splice(ID, 1);
                // }
                for (let i = 0; i < this.movingNodes.length; i++) {
                    if (this.movingNodes[i] == this.blockNodes[curline][currow]) {
                        this.movingNodes.splice(i, 1);
                        break;
                    }
                }
            });
            this.blockNodes[start][row].runAction(cc.sequence(action_1, action_2, action_3));
        }

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

    changeNextNum: function (num) {
        this.BlockNum = num;
        this.gameController.GameMenuController.updateNext(this.BlockNum);
    }
    ,
    addScore: function (addCount) {
        // let line = this.centerBlock.y;
        // let row = this.centerBlock.x;
        // let EndNode = this.blockNodes[line][row];
        let EndNode = this.movingBlock;
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

        // let line = this.centerBlock.y;
        // let row = this.centerBlock.x;
        if (!this.canhorizon)
            return;


        let line = this.movingBlock.getComponent("Block").getBlockLine();
        let row = this.movingBlock.getComponent("Block").getBlockRow();

        // let ID = this.movingNodes.indexOf(this.movingBlock);
        // if (ID != -1) {
        //     this.movingNodes.splice(ID, 1);
        //     this.movingBlock.stopAllActions();
        //     console.log("       他动不了 了");
        //
        // }
        for (let i = 0; i < this.movingNodes.length; i++) {
            if (this.movingNodes[i] == this.movingBlock) {
                this.movingNodes.splice(i, 1);
                break;
            }
        }
        if (!this.blockNodes[line][row]) {
            console.log("impossible");
            return;
        }
        // let startNode = this.blockNodes[line][row];
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
        console.log("moveRow", newRow);
        //console.log("startnewRow", newRow);
        //检查之间有没有其他的块
        if (newRow < row) {//left

            for (let start = row - 1; start >= newRow; start--) {
                if (this.blockNodes[line][start]) {
                    newRow = start + 1;
                    //console.log("leftnewRow", newRow);
                    break;
                } else {
                    //console.log("continue", start);
                }
            }
        } else {//right
            for (let start = row + 1; start <= newRow; start++) {
                if (this.blockNodes[line][start]) {
                    newRow = start - 1;
                    //console.log("rightnewRow", newRow);
                    break;
                } else {
                    //console.log("continue", start);
                }
            }
        }
        if (newRow == row) {
            return;
        }

        let x = newRow * (this.blockblank + this.blockWidth);
        let y = line * (this.blockblank + this.blockWidth);
        let endPos = cc.p(x, y);
        let action1 = cc.moveTo(0.1, endPos);
        console.log("horizontalMove", "row", newRow, "line", line, "y", y);

        let action3 = cc.callFunc(() => {

            if (this.blockNodes[line][row]) {

                this.movingBlock.getComponent("Block").setBlockRow(newRow);
                this.blockNodes[line][newRow] = this.blockNodes[line][row];
                this.movingBlock = startNode;
                this.blockNodes[line][row] = null;
                this.blockNodes[line][newRow].position = endPos;
                console.log("successhorizontalMove", "row", newRow, "line", line, "position", this.blockNodes[line][newRow].position);
                // this.centerBlock.x = newRow;
            } else {
                console.log("get one error");
            }
            this.gameStateHorizon--;
        }, this);

        this.gameStateHorizon++;

        startNode.runAction(cc.sequence(action1, action3));
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
        if (this.TouchState == 'move') {
            this.movelength = Math.abs(location.x - this.previousPos.x);
            // let moveNum = Math.floor(this.movelength / this.blockWidth);
            if (!this.moveState && this.movelength < 10) {
                let maxMoveDown = this.maxTargetDown();
                console.log("maxMoveDown", maxMoveDown)
                this.downBlock(maxMoveDown, this.movingBlock);
            }
        } else {
            let maxMoveDown = this.maxTargetDown();
            console.log("maxMoveDown", maxMoveDown)
            this.downBlock(maxMoveDown, this.movingBlock);
        }
        this.TouchState == 'end';
        this.moveState = false;
    }
    ,
    touchMoveCallBack: function (location) {
        this.TouchState = 'move';
        if (this.gameState > 0)
            return;
        if (!this.canDownBlock()) {
            return;
        }
        if (this.gameState > 0)
            return;
        this.movelength = Math.abs(location.x - this.previousPos.x) * 2;
        if (this.movelength >= this.blockWidth) {

            let moveNum = Math.floor(this.movelength / this.blockWidth);
            if (location.x < this.previousPos.x) {
                moveNum = -moveNum;
            }
            if (this.gameStateHorizon <= 0) {
                this.horizontalMove(moveNum);
                this.previousPos = location;
                this.moveState = true;
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
