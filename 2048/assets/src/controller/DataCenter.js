/**
 * Created by bing on 31/05/2018.
 */
module.exports = function () {

    let FBP = require("Plugin");
    let GameConfig = require("GameConfig");

    let dc = cc.Class({

        extends:cc.Object,
        properties:{


        },

        ctor:function () {

            this.friends = [];
            this.world = [];
            this.playerInfo = null;
        },

        //获取游戏中需要对比的玩家列表。
        getGamePlayers:function () {
            let ret = [];
            if(this.playerInfo){
                ret.push(this.playerInfo);
            }

            ret.push(...this.friends);

            //test
            // for (let i = 0; i < 10; ++i) { // spawn items, we only need to do this once
            //     let data = {
            //         rank: i + 1,
            //         name: "world "+i.toString(),
            //         score: i*4+10,
            //         photo: "https://lookaside.facebook.com/platform/profilepic/?psid=2063223640372248&height=50&width=50&ext=1528008224&hash=AeRL1ntBbxis94hX"
            //     };
            //
            //     ret.push(data);
            // }

            //根据score进行排序
            ret.sort(function(a, b) {
                return  b.score - a.score;
            });



            return ret;
        },
        
        friendsCallBack:function (callback,data) {

            if(arguments.length == 2){
                this.friends.push(...data);
                if(callback){
                    callback(data);
                }
            }else{
                this.friends.push(...callback);
            }
        },

        worldCallBack:function (callback,data) {

            if(arguments.length == 2){
                this.world.push(...data);
                if(callback){
                    callback(data);
                }
            }else{
                this.world.push(...callback);
            }
        },


        playerCallBack:function (callback,data) {

            if(arguments.length == 2){
                this.playerInfo = data;
                if(callback){
                    callback(data);
                }
            }else{
                this.playerInfo = callback;
            }
        },

        getPlayerLeaderboard:function (callback) {
        if(GameConfig.isFBInstantGame()){
            if(!this.playerInfo) {
                FBP.getPlayerLeaderboard(GameConfig.LeaderBoardName,this.playerCallBack.bind(this,callback));
            }else{
                if(callback){
                    callback(this.playerInfo);
                }
            }
        }
    },

        requestWorld:function (callback) {
            if(GameConfig.isFBInstantGame()){
                if(this.world.length == 0) {
                    FBP.getWorldLeaderboard(GameConfig.LeaderBoardName,this.worldCallBack.bind(this,callback));
                }else{
                    if(callback){
                        callback(this.world);
                    }
                }
            }
        },
        
        requestFriends:function (callback) {
            if(GameConfig.isFBInstantGame()){
                if(this.friends.length == 0){
                    FBP.getFriendLeaderboard(GameConfig.LeaderBoardName,this.friendsCallBack.bind(this,callback));
                }else{
                    if(callback){
                        callback(this.friends);
                    }
                }
            }
        },


    });

    let instance  = new dc();
    return instance;
}();