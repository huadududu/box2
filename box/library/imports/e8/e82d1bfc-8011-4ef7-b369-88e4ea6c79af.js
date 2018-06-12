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
            str = parseInt(num / 1000) + "k";
        } else {
            str = "" + num;
        }
        return str;
    }
};

cc._RF.pop();