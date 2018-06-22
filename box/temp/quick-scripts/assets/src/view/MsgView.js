(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/view/MsgView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '48a4ePEFmJNybHWv+noOMNf', 'MsgView', __filename);
// src/view/MsgView.js

"use strict";

/**
 * Created by bing on 08/05/2018.
 */

cc.Class({

    extends: cc.Component,
    properties: {
        msgLb: cc.Label
    },

    showMsg: function showMsg(msg) {
        this.msgLb.string = msg;
    },

    onLoad: function onLoad() {}

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
        //# sourceMappingURL=MsgView.js.map
        