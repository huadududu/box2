"use strict";
cc._RF.push(module, '7edd0Qz0npFvbrpRru7Ma1j', 'GameConfig');
// src/config/GameConfig.js

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
            Platform: "fbintantgame1",
            // 游戏中的常用数据配置。
            TankHeight: 70,
            TankWidth: 70,
            ItemWidth: 50,
            //ad
            InterstitialAdId: "1022687211213478_1038887692926763",
            RewardedVideoId: "1022687211213478_1038888492926683",
            AdInterval: 8000,

            //leaderboard
            LeaderBoardName: "my_leaderboard1",

            //gift
            GiftLimited: 10,

            GiftUseTip: "Extra life from friends",
            GiftSamePlayerTip: "You can sent gift to same friends after ",
            GiftBeyondTip: "You’ve sent 10 times gifts today,you can get one from your friends.",
            GiftSendTitle: "Send Gift",
            GiftSendTip: "You'll send 10 extra lives to different friends at one time，and you'll get one yourself.",
            GiftSendAfterTip: "You got an extra life yourself！",
            GiftRecieveTitle: "Gift",
            GiftRecieveTip: "You got an extra life from ",

            //    server  test
            // ServerURL:"http://localhost:8088/entergame/tank/",
            ServerURL: "https://77889900.space/entergame/icegame/"

        },

        ctor: function ctor() {},

        isFBInstantGame: function isFBInstantGame() {
            if (typeof FBInstant != 'undefined') {
                return true;
            } else {
                return false;
            }
            // return this.Platform == 'fbintantgame';
        }
    });
    return new Config();
}();

cc._RF.pop();