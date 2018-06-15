"use strict";
cc._RF.push(module, 'e82d1v8gBFO97NpiOTqbHmv', 'GameUtils');
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
            str = parseInt(num / 1000) + "K";
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
    }
};

cc._RF.pop();