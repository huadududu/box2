(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/view/loadingView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '29241VoL99Kyo3OtudW8olC', 'loadingView', __filename);
// src/view/loadingView.js

"use strict";

/*
 * Created by Ren on 2018/6/21.
 */
cc.Class({
    extends: cc.Component,
    properties: {
        loadingAdNode: cc.Node,
        loadingAdCloseNode: cc.Node
    },
    onLoad: function onLoad() {},

    onEnable: function onEnable() {
        this.loadingAdCloseNode.active = false;
        this.scheduleOnce(this.showAdCloseBtn, 10);
    },
    onTouchCloseBtn: function onTouchCloseBtn() {
        this.node.active = false;
    },

    showAdCloseBtn: function showAdCloseBtn() {
        this.loadingAdCloseNode.active = true;
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
        //# sourceMappingURL=loadingView.js.map
        