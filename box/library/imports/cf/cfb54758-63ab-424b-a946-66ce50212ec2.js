"use strict";
cc._RF.push(module, 'cfb54dYY6tCS6lGZs5QIS7C', 'GameConfig');
// src/model/GameConfig.js

"use strict";

/**
 * Created by bing on 17/04/2018.
 */
//class GameConfig

module.exports = function () {

    var Config = cc.Class({
        extends: cc.Object,
        properties: {
            DebugVersion: true, //false,
            InnerVersion: "0.0.2",
            // Platform:"webh5",
            Platform: "fbi111ntantgame",
            // 游戏中的常用数据配置。
            TankHeight: 70,
            TankWidth: 70,
            ItemWidth: 50,
            //ad
            InterstitialAdId: "488883394847366_506509883084717",
            RewardedVideoId: "488883394847366_506509619751410"
        },

        ctor: function ctor() {},

        isFBInstantGame: function isFBInstantGame() {
            return this.Platform == 'fbintantgame';
        }
    });
    return new Config();
}();

cc._RF.pop();