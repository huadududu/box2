(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/PopMsgController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a3318QR6XpHdqfWZTxzb9Mc', 'PopMsgController', __filename);
// src/controller/PopMsgController.js

"use strict";

/**
 * Created by bing on 05/06/2018.
 */

module.exports = {

    showMsg: function showMsg(content) {
        var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var name = "prefab/popmsg";
        if (!animation) {
            name = "prefab/popmsg2";
        }
        var prefab = cc.loader.getRes(name);
        var newNode = cc.instantiate(prefab);

        var pop = newNode.getComponent("PopMsg");
        pop.init(content, animation);
        cc.find("Canvas").addChild(newNode);
        newNode.setPosition(0, 0);
    }

};

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
        //# sourceMappingURL=PopMsgController.js.map
        