(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/GameType.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2f82eH+hhhKIoMkB8u+Rd/V', 'GameType', __filename);
// src/model/GameType.js

"use strict";

/**
 * Created by bing on 18/04/2018.
 */

module.exports = {
    profabType: cc.Enum({
        BlockBig: 0, //大方格
        BlockSmall: 1, //小方格
        UIBottom: 2, //底部控件
        MarginsBig: 3,
        MarginsSmall: 4,
        RewardItem: 5,
        Lead: 6
    }),
    bottomRadio: cc.Enum({
        Accelerator: 0, //加速
        Tool: 1, //工具
        Efficiency: 2 //倍数
    })

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
        //# sourceMappingURL=GameType.js.map
        