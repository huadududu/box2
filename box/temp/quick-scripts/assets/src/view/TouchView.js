(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/view/TouchView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9adddbB9N9LN7L4ldfP0UfJ', 'TouchView', __filename);
// src/view/TouchView.js

"use strict";

cc.Class({

    extends: cc.Component,
    properties: {
        touchStartCallBack: {
            default: null,
            visible: false
        },
        touchEndCallBack: {
            default: null,
            visible: false
        },
        touchCancelCallBack: {
            default: null,
            visible: false
        },
        touchMoveCallBack: {
            default: null,
            visible: false
        },
        multMoveCallBack: {
            default: null,
            visible: false
        }
    },

    onLoad: function onLoad() {

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

    touchEvent: function touchEvent(event) {
        var touches = event.getTouches();
        console.log("touches:" + touches.length);
        if (touches.length >= 2) {
            var touch1 = touches[0];
            var touch2 = touches[1];
            var delta1 = touch1.getDelta(),
                delta2 = touch2.getDelta();
            var touchPoint1 = event.currentTarget.convertToNodeSpaceAR(touch1.getLocation());
            var touchPoint2 = event.currentTarget.convertToNodeSpaceAR(touch2.getLocation());
            // var touchPoint2 = null;
            if (this.multMoveCallBack) {
                this.multMoveCallBack(touchPoint1, touchPoint2);
            }
            // console.log("multMoveCallBack",this.multMoveCallBack);
            return;
        }
        // console.log('touches:'+touches.length);
        var location = event.getLocation();
        // console.log('location:'+location.length);
        var locationInNode = event.currentTarget.convertToNodeSpace(event.getLocation());

        if (cc.rectContainsPoint(this.touchRect, locationInNode)) {
            var callback = this.eventMap[event.type];
            if (callback) {
                var locationInNode1 = event.currentTarget.convertToWorldSpace(locationInNode);
                callback(locationInNode1);
            }
            // cc.log(" touch in");
        } else {
                // cc.log(" touch out");
            }
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
        //# sourceMappingURL=TouchView.js.map
        