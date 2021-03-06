(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/utils/GameUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e82d1v8gBFO97NpiOTqbHmv', 'GameUtils', __filename);
// src/utils/GameUtils.js

'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by bing on 18/04/2018.
 */

var LanguageConfig = require('LanguageConfig');
var Global = require('Global');
module.exports = _defineProperty({

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
            str = (num / 1000).toFixed(1) + "K";
        } else {
            str = "" + num;
        }
        return str;
    },
    formatNumMAX: function formatNumMAX(num) {
        var str = void 0;
        var num1 = 0;
        if (num > 1000000000) {
            str = this.roundFun(num / 1000000000) + "G";
        } else if (num > 1000000) {
            str = this.roundFun(num / 1000000) + "M";
            num1;
        } else if (num > 1000) {
            str = this.roundFun(num / 1000) + "K";
        } else {
            str = num;
        }
        return str;
    },
    //保留n位小数
    roundFun: function roundFun(value, n) {
        var value1 = value.toString();
        var re = /([0-9]+\.[0-9]{1})[0-9]*/;
        value1 = value1.replace(re, "$1");
        return value1;
    },
    //标准钱币表达（不带小数点）
    stardandFun: function stardandFun(value) {
        value = value.toString();
        var temp = value.split('').reverse().join('').match(/(\d{1,3})/g);
        return temp.join(',').split('').reverse().join('');
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
    },

    formatPrint: function formatPrint() {
        var num = arguments.length;

        var oStr = arguments[0];

        for (var i = 1; i < num; i++) {

            var pattern = "/%s/";

            var re = new RegExp(pattern, "g");

            oStr = oStr.replace(re, arguments[i]);
        }
        return oStr;
    },
    formatHour: function formatHour(desc, num) {
        var str = "";
        if (num >= 24) {
            var strday = LanguageConfig['10025'][Global.language];
            str += this.formatPrint(strday, Math.floor(num / 24));
            num %= 24;
        }
        if (num > 0) {
            var strhour = LanguageConfig['10019'][Global.language];
            str += this.formatPrint(strhour, num);
        }
        str = this.formatPrint(desc, str);
        return str;
    }
}, 'formatPrint', function formatPrint() {
    var num = arguments.length;

    var oStr = arguments[0];

    for (var i = 1; i < num; i++) {
        oStr = oStr.replace(/s%/, arguments[i]);
    }

    return oStr;
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
        //# sourceMappingURL=GameUtils.js.map
        