(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/SkeletonDataCenter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '08ee1dfvs9GP6ytIs1eghY2', 'SkeletonDataCenter', __filename);
// src/controller/SkeletonDataCenter.js

'use strict';

/**
 * Created by bing on 09/05/2018.
 */

var SC = cc.Class({
    extends: cc.Object,

    properties: {
        index: 0
    },

    ctor: function ctor() {

        this.Dic = {};
    },

    //
    addSkeletonData: function addSkeletonData(fileName, hammer, eventcallback) {
        cc.loader.loadRes('effect/' + fileName, sp.SkeletonData, function (err, data) {
            hammer.skeletonData = data;
            hammer.setAnimation(0, "newAnimation", true);
            if (eventcallback) {
                eventcallback();
            }
        });
    },
    addSkeletonDataForNode: function addSkeletonDataForNode(fileName, hammer) {
        var node = hammer.addComponent(sp.Skeleton);
        this.addSkeletonData(fileName, node);
    },
    addSkeletonDataWait: function addSkeletonDataWait(fileName, node) {
        cc.loader.loadRes('effect/' + fileName, sp.SkeletonData, function (err, data) {
            node.skeletonData = data;
        });
    }

});

var Center = new SC();
module.exports = Center;

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
        //# sourceMappingURL=SkeletonDataCenter.js.map
        