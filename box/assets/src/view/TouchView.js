cc.Class({

    extends: cc.Component,
    properties: {
        touchStartCallBack: {
            default:null,
            visible:false
        },
        touchEndCallBack:  {
            default:null,
            visible:false
        },
        touchCancelCallBack:{
            default:null,
            visible:false
        },
        touchMoveCallBack: {
            default:null,
            visible:false
        }
    },

    onLoad: function () {


        this.node.on(cc.Node.EventType.TOUCH_START, this.touchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEvent, this);

        this.touchRect = cc.rect(0, 0, this.node.width, this.node.height);
        // cc.log("touchRect:", this.touchRect.width, this.touchRect.height);

        this.eventMap = {};
        this.eventMap[cc.Node.EventType.TOUCH_START] = this.touchStartCallBack;
        this.eventMap[cc.Node.EventType.TOUCH_END] = this.touchEndCallBack;
        this.eventMap[cc.Node.EventType.TOUCH_MOVE] = this.touchMoveCallBack;
        this.eventMap[cc.Node.EventType.TOUCH_CANCEL] = this.touchCancelCallBack;

    },

    touchEvent: function (event) {
        let location = event.getLocation();
        // cc.log(event.type, event.type == cc.Node.EventType.TOUCH_END, event.eventPhase, location.x, location.y, event.getID());

        //相对于锚点的位置。
        // let locationInNode = event.currentTarget.convertToNodeSpaceAR(event.getLocation());
        let locationInNode = event.currentTarget.convertToNodeSpace(event.getLocation());
        // cc.log("locationInNode", locationInNode.x, locationInNode.y);

        if (cc.rectContainsPoint(this.touchRect, locationInNode)) {
            let callback = this.eventMap[event.type];
            if (callback) {
                let locationInNode1 = event.currentTarget.convertToWorldSpace(locationInNode);
                callback(locationInNode1);
            }
            // cc.log(" touch in");
        }else {
            // cc.log(" touch out");
        }
    },

})
;