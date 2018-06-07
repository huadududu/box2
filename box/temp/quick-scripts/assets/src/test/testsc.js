(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/test/testsc.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a84605gUCFKqJjD7ofWD+7g', 'testsc', __filename);
// src/test/testsc.js

"use strict";

/**
 * Created by bing on 18/05/2018.
 */

cc.Class({
    extends: cc.Component,
    properties: {

        scName: ""
    },
    onClick: function onClick(event, custom) {
        cc.director.loadScene(custom);
    },

    onLoad: function onLoad() {
        console.log("onLoad  " + this.scName);
    },

    onDestroy: function onDestroy() {
        console.log("onDestroy  " + this.scName);
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
        //# sourceMappingURL=testsc.js.map
        