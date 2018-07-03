/**
 * Created by bing on 17/04/2018.
 */
//class GameConfig

module.exports = function () {

    var Config = cc.Class({
        extends:cc.Object,
        properties: {
            DebugVersion: true,//false,
            InnerVersion : "0.0.3",
            // Platform:"webh5",
            Platform:"fbintantgame1",
            // 游戏中的常用数据配置。
            TankHeight : 70,
            TankWidth : 70,
            ItemWidth : 50,
            //ad
            InterstitialAdId:"234752730650527_235702233888910",
            RewardedVideoId:"234752730650527_235702997222167",
            AdInterval:8000,

            //leaderboard
            LeaderBoardName:"my_leaderboard1",

            //gift
            GiftLimited:10,

            GiftUseTip:"Extra life from friends",
            GiftSamePlayerTip:"You can sent gift to same friends after ",
            GiftBeyondTip:"You’ve sent 10 times gifts today,you can get one from your friends.",
            GiftSendTitle:"Send Gift",
            GiftSendTip:"You'll send 10 extra lives to different friends at one time，and you'll get one yourself.",
            GiftSendAfterTip:"You got an extra life yourself！",
            GiftRecieveTitle:"Gift",
            GiftRecieveTip:"You got an extra life from ",
            InviteSameTip:"You can't invite the same friends!",
            InviteAfterTip:"You will get the help util your friend enter game!",
            HelperEnterTip:"You helped XXX in daily task today",
            YourHelperNameTip:"XXX have helped you in daily task today",

            GameName:"2048", //tank //icegame
            //    server  test
            // ServerURL:"http://localhost:8088/",
            ServerURL:"https://77889900.space/",

        },


        ctor:function () {
            this.Methods = ["entergame","queryhelper","helpervirify","queryplayer"];
        },

        isFBInstantGame:function () {
            if(typeof FBInstant != 'undefined'){
                return true;
            }else{
                return false;
            }
            // return this.Platform == 'fbintantgame';
        },
    });
    return new Config();
}();
