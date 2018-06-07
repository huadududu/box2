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
    }
};

cc._RF.pop();