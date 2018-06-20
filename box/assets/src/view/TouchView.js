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
        },
        multMoveCallBack:{
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
        let touches = event.getTouches();
        console.log("touches:"+touches.length, event.type);
        if( touches.length >=2 && cc.Node.EventType.TOUCH_MOVE == event.type){
            var touch1 = touches[0];
            var touch2 = touches[1];
            var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
            var touchPoint1 = event.currentTarget.convertToNodeSpaceAR(touch1.getLocation());
            var touchPoint2 = event.currentTarget.convertToNodeSpaceAR(touch2.getLocation());
            // var touchPoint2 = null;
            if(this.multMoveCallBack){
                this.multMoveCallBack(touchPoint1,touchPoint2);
            }
            this.mutiTouch  =true;
           // console.log("multMoveCallBack",this.multMoveCallBack);
            return;
        }

        if(this.mutiTouch &&
            cc.Node.EventType.TOUCH_END != event.type)
        {
            //TODO::
            return;
        }else{
            this.mutiTouch  = false;
        }

        // console.log('touches:'+touches.length);
        let location = event.getLocation();
        // console.log('location:'+location.length);
        let locationInNode = event.currentTarget.convertToNodeSpace(event.getLocation());

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