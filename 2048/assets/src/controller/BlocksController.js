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
cc.Class({
    extends: cc.Component,

    properties: {
        gameNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameState = GameState.init;
        this.movelength = 0;
        this.moveRation = 0;// 0 down 1 left 2 right
        this.previousPos = null;
        this.blockWidth = 110;
        this.blockblank = 6;
        this.blockFloor = 7;
        this.blockRow = 5;
        this.TouchState = null;//start move end cancel
        this.blockNodes = [];
        this.centerBlock = null;
        this.addCount = 0;
        this.firstAction = 0;
        this.BlockNum = 1;
        this.NextBlockNum = GameUtils.randomInt(1, 6);
        this.gameController = cc.find("Canvas").getComponent("GameController");
        this.gameController.GameMenuController.updateNext(this.NextBlockNum);
    },


    start() {
        // this.createBlocks();
        // this.schedule(this.refreshBlocks, 0.5);
    },
    //create block;
    createBlocks: function () {
        if (this.gameState == GameState.moving)
            return;
        let node = BlockFactory.create(this.BlockNum);// 写死生成的新的数组是math.pow(2,1)[改]
        console.log(this.BlockNum);
        this.BlockNum = this.NextBlockNum;

        this.gameController.GameMenuController.updateNext(this.NextBlockNum);
        this.NextBlockNum = GameUtils.randomInt(1, 6);
        node.getComponent("Block").setBlockPos(6, 2);
        this.centerBlock = cc.p(2, 6);
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

    },
    canAddNewBlock: function () {
        if (!this.blockNodes[6] || !this.blockNodes[6][2]) {
            return true;
        }
        return false;
    },
    refreshBlocks: function (centernode = null) {
        if (this.gameState == GameState.moving)
            return;
        // //console.log("refresh:",this.centerBlock);

        // else
        if (this.canDownBlock()) {
            this.downBlock();
        } else if (this.checkAllJoinBlock()){

        } else if (this.canJoinBlock()) {
            this.joinBlock();
        } else if (this.canAddNewBlock()) {
            this.createBlocks();
        } else {
            this.finishGame();
        }
    },

    joinBlock: function (centernode = null) {
        let line = this.centerBlock.y;
        let row = this.centerBlock.x;
        if (centernode != null) {
            line = centernode.y;
            row = centernode.x;
        }
        let nextNode;
        let rightNode;
        let leftNode;
        let moveBlock = [];
        // //console.log("refresh:",this.centerBlock);
        let centerNumber = this.blockNodes[line][row].getComponent("Block").getBlockNumber();
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
            this.moveAction(moveBlock, {x: row, y: line});
        }
    },
    //判断是否可以合并
    canJoinBlock: function (centernode = null) {
        let line = this.centerBlock.y;
        let row = this.centerBlock.x;
        if (centernode != null) {
            line = centernode.y;
            row = centernode.x;
        }
        let nextNode;
        let rightNode;
        let leftNode;
        let moveBlock = [];
        // //console.log("refresh:",this.centerBlock);
        let centerNumber = this.blockNodes[line][row].getComponent("Block").getBlockNumber();
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
        if (row > 0) {
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
        if (row < this.blockRow - 1) {
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
    checkAllJoinBlock: function () {
        let bool = false;
        for (let line = 6; line >= 0; line--) {
            for (let row = 4; row >= 0; row--) {
                if (!this.blockNodes[line] || !this.blockNodes[line][row]) {
                    continue;
                }
                else {
                    if (this.canDownBlock({y:line,x:row})) {
                        this.downBlock({y:line,x:row});
                        bool = true;
                    } else if (this.canJoinBlock({y:line,x:row})) {
                        bool = true;
                        this.joinBlock({y:line,x:row});
                    }
                }
            }
        }
        return bool;
    },
    addScore: function () {
        let line = this.centerBlock.y;
        let row = this.centerBlock.x;
        let EndNode = this.blockNodes[line][row];
        let baseNumber = EndNode.getComponent("Block").getBlockNumber();
        let newScore = baseNumber + this.addCount;
        let showNumber = Math.pow(2, newScore);
        Global.thisscore += showNumber;
        EndNode.getComponent("Block").setBlockNumber(newScore);
        this.addCount = 0;
        this.gameController.GameMenuController.updateScore();
    },

    horizontalMove: function (moveNum) {

        let line = this.centerBlock.y;
        let row = this.centerBlock.x;
        let startNode = this.blockNodes[line][row];
        let newRow = row + moveNum;
        if (newRow < 0) {
            newRow = 0;
        } else if (newRow >= this.blockRow) {
            newRow = this.blockRow - 1;
        }
        if (newRow == row) {
            return;
        }
        console.log("startnewRow", newRow);
        //检查之间有没有其他的块
        if (newRow < row) {//left

            for (let start = row - 1; start >= newRow; start--) {
                if (this.blockNodes[line][start]) {
                    newRow = start + 1;
                    console.log("leftnewRow", newRow);
                    break;
                } else {
                    console.log("continue", start);
                }
            }
        } else {//right
            for (let start = row + 1; start <= newRow; start++) {
                if (this.blockNodes[line][start]) {
                    newRow = start - 1;
                    console.log("rightnewRow", newRow);
                    break;
                } else {
                    console.log("continue", start);
                }
            }
        }
        if (newRow == row) {
            return;
        }
        this.gameState = GameState.moving;
        let x = newRow * (this.blockblank + this.blockWidth);
        let y = line * (this.blockblank + this.blockWidth);
        let endPos = cc.p(x, y);
        let action1 = cc.moveTo(0.1, endPos);
        let action2 = cc.callFunc(() => {
            this.blockNodes[line][row] = null;
            this.blockNodes[line][newRow] = startNode;
            //console.log("destroy",moveNum,row,line);
            this.centerBlock.x = newRow;
            //console.log("horizontalMove",moveNum,this.centerBlock,this.blockNodes[line][newRow]);
            this.gameState = GameState.end;
        }, this);
        startNode.runAction(cc.sequence(action1, action2));
    },

    //向下移动 默认单位是1个格子
    downBlock: function (moveNum = 1, centerNode = null) {

        if (this.gameState == GameState.moving)
            return;
        let line = this.centerBlock.y;
        let row = this.centerBlock.x;
        if (centerNode != null) {
            line = centerNode.y;
            row = centerNode.x;
        }
        let realLine = line - moveNum;
        if (realLine < 0) {
            realLine = 0;
        } else if (realLine > this.blockFloor - 1) {
            realLine = this.blockFloor - 1;
        }
        if (realLine == line)
            return;
        this.gameState = GameState.moving;
        //console.log("GameState.moving");
        let startNode = this.blockNodes[line][row];
        let x = row * (this.blockblank + this.blockWidth);
        let y = realLine * (this.blockblank + this.blockWidth);
        let endPos = cc.p(x, y);
        let action1 = cc.moveTo(0.1, endPos);
        let action2 = cc.callFunc(() => {
            if (!this.blockNodes[realLine]) {
                this.blockNodes[realLine] = [];
            }
            this.blockNodes[realLine][row] = startNode;
            this.blockNodes[line][row] = null;
            //console.log("destroy",moveNum,"position:",row,line);
            this.centerBlock.y = realLine;
            this.gameState = GameState.end;
            //console.log("downMove",moveNum,this.centerBlock)
            //console.log("GameState.end");
        }, this);
        startNode.runAction(cc.sequence(action1, action2));
    },
    canDownBlock: function (centerNode = null) {
        let line = this.centerBlock.y;
        let row = this.centerBlock.x;
        if (centerNode != null) {
            line = centerNode.y;
            row = centerNode.x;
        }
        if (line <= 0) {
            return false;
        }
        if (!this.blockNodes[line - 1] || !this.blockNodes[line - 1][row]) {
            return true;
        }
        return false;

    },
    maxMoveDown() {
        let num = 1;
        let line = this.centerBlock.y;
        let row = this.centerBlock.x;
        for (; num <= line; num++) {
            if (!this.blockNodes[line - num] || !this.blockNodes[line - num][row]) {
                continue;
            }
            else {
                break;
            }
        }
        return num - 1;
    },

    // more  blocks add
    moveAction: function (startNodes, EndNode) {
        this.gameState = GameState.moving;
        let moveNum = startNodes.length;
        for (let i = 0; i < moveNum; i++) {
            let action1 = cc.moveTo(0.1, EndNode.position);
            let thisNodePos = startNodes[i];
            let thisNode = this.blockNodes[thisNodePos.line][thisNodePos.row];
            //console.log("destroy",moveNum,"position:",thisNodePos);
            let action2 = cc.callFunc(() => {
                thisNode.removeFromParent(true);
                this.blockNodes[thisNodePos.line][thisNodePos.row] = null;
                //console.log("destroy",thisNodePos);
                this.addCount++;
                if (this.addCount == moveNum) {
                    this.addScore();
                    // //console.log("othermove",this.centerBlock)
                    this.gameState = GameState.end;
                }

            }, this);
            thisNode.runAction(cc.sequence(action1, action2));
        }
    },
    finishGame: function () {
        this.unschedule(this.refreshBlocks);
        this.gameController.updeteFinish();
    },

    startMenu: function () {
        this.createBlocks();
        this.schedule(this.refreshBlocks, 0.5);
    },
    restartMenu: function () {
        this.clearAll();
        this.createBlocks();
        this.schedule(this.refreshBlocks, 0.5);
    },
    clearAll: function () {
        this.gameNode.removeAllChildren(true);
        this.blockNodes = [];
    },


    //-------------- touch part -----------------------------
    //-------------- touch part -----------------------------
    touchCancelCallBack: function (location) {
        this.TouchState = 'cancel';
    },
    touchStartCallBack: function (location) {
        this.previousPos = location;
        this.TouchState = 'start';
    },
    touchEndCallBack: function (location) {
        if (this.TouchState == 'move') {
            this.TouchState = 'end';
            return;
        } else {
            let maxMoveDown = this.maxMoveDown();
            this.downBlock(maxMoveDown);
        }
        this.TouchState = 'end';
    },
    touchMoveCallBack: function (location) {
        this.TouchState = 'move';
        if (this.gameState == GameState.moving)
            return;
        this.movelength = location.x - this.previousPos.x;
        let moveNum = Math.floor(this.movelength / this.blockWidth);
        if (moveNum != 0) {

            console.log("moveNum", moveNum)
            this.horizontalMove(moveNum);
            this.movelength = 0;
            this.previousPos = location;
        }
        // this.previousPos = location;
    },
// update (dt) {},
})
;
