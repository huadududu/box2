// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        bar: {
            get() {
                return this._bar;
            },
            set(value) {
                this._bar = value;
            }
        },
        game: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.movelength = 0;
        this.moveRation = 0;// 0 down 1 left 2 right
        this.previousPos = null;
        this.blockWidth = 110;
        this.blockFloor = 7;
        this.blockRow = 5;
        this.TouchState;//start move end cancel
        // this.schedule()

    },

    start() {

    },
    //create block;


    //-------------- touch part -----------------------------
    //-------------- touch part -----------------------------
    touchCancelCallBack: function (location) {
    },
    touchStartCallBack: function (location) {
        this.previousPos = location;
        this.TouchState = 'start';
    },
    touchEndCallBack: function (location) {
        if (this.TouchState == 'move') {
            return;
        }
    },
    touchMoveCallBack: function (location) {
        this.TouchState = 'move';
        this.movelength += movelength.x - this.previousPos.x;
        let moveNum = Math.floor(this.movelength / this.blockWidth);

    }

// update (dt) {},
})
;
