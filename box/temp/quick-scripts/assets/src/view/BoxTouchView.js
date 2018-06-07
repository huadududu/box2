(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/view/BoxTouchView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ddac9hkV9AOYdTysYQNeqW', 'BoxTouchView', __filename);
// src/view/BoxTouchView.js

"use strict";

/**
 * Created by bing on 20/04/2018.
 */

var TouchView = require("TouchView");

cc.Class({
    extends: TouchView,
    properties: {
        controller: require("BoxController")
    },

    onLoad: function onLoad() {
        if (this.controller) {

            if (this.controller.touchStartCallBack) {
                this.touchStartCallBack = this.controller.touchStartCallBack.bind(this.controller);
            }

            if (this.controller.touchEndCallBack) {
                this.touchEndCallBack = this.controller.touchEndCallBack.bind(this.controller);
            }

            if (this.controller.touchMoveCallBack) {
                this.touchMoveCallBack = this.controller.touchMoveCallBack.bind(this.controller);
            }

            if (this.controller.touchMoveCallBack) {
                this.touchCancelCallBack = this.controller.touchCancelCallBack.bind(this.controller);
            }
        }
        this._super();
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
        //# sourceMappingURL=BoxTouchView.js.map
        