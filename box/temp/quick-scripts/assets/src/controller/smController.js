(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/smController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd680ek+kU9OzrPIP1Nri7q3', 'smController', __filename);
// src/controller/smController.js

'use strict';

// /*
//  * Created by Ren on 2018/6/4.
//  */
// let BoxController = require('BoxController');
// cc.Class({
//     extends: cc.Component,
//     properties: {
//         sm: cc.Animation,
//         BoxController:BoxController
//     },
//     onSMCallBack:function(){
//         this.BoxController.smCallback();
//
//     }
//
// });
cc.Class({
    extends: cc.Component,

    onAnimCompleted: function onAnimCompleted(num, string) {
        console.log('onAnimCompleted: param1[%s], param2[%s]', num, string);
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
        //# sourceMappingURL=smController.js.map
        