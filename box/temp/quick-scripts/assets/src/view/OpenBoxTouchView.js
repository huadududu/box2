(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/view/OpenBoxTouchView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d5709ZvlNI17zWFWsrWtWL', 'OpenBoxTouchView', __filename);
// src/view/OpenBoxTouchView.js

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
        //# sourceMappingURL=OpenBoxTouchView.js.map
        