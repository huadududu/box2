(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/utils/GameUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e82d1v8gBFO97NpiOTqbHmv', 'GameUtils', __filename);
// src/utils/GameUtils.js

"use strict";

/**
 * Created by bing on 18/04/2018.
 */

module.exports = {

    //[min,max]
    randomInt: function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    //随机的 [0 ～ number]
    random: function random(number) {
        return this.randomInt(0, number);
    },
    formatNum: function formatNum(num) {
        var str = void 0;
        if (num > 1000) {
            str = parseInt(num / 1000) + "k";
        } else {
            str = "" + num;
        }
        return str;
    },
    formatTime: function formatTime(num) {
        var str = "";
        if (num >= 3600) {
            str += Math.floor(num / 3600) + "h";
            num %= 3600;
        }
        if (num >= 60) {
            str += Math.floor(num / 60) + "min";
            num %= 60;
        }
        if (num > 0) {
            str += Math.floor(num) + "s";
        }
        return str;
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
        //# sourceMappingURL=GameUtils.js.map
        