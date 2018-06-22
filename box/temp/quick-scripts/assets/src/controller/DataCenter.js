(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/DataCenter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e59772MeTxJRYxSVvJIZBUi', 'DataCenter', __filename);
// src/controller/DataCenter.js

"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Created by bing on 31/05/2018.
 */
module.exports = function () {

    var FBP = require("FBPlugin");
    var GameConfig = require("GameConfig");

    var dc = cc.Class({

        extends: cc.Object,
        properties: {},

        ctor: function ctor() {

            this.friends = [];
            this.world = [];
            this.playerInfo = null;
        },

        //获取游戏中需要对比的玩家列表。
        getGamePlayers: function getGamePlayers() {
            var ret = [];
            if (this.playerInfo) {
                ret.push(this.playerInfo);
            }

            ret.push.apply(ret, _toConsumableArray(this.friends));

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
            ret.sort(function (a, b) {
                return b.score - a.score;
            });

            return ret;
        },

        friendsCallBack: function friendsCallBack(callback, data) {

            if (arguments.length == 2) {
                var _friends;

                (_friends = this.friends).push.apply(_friends, _toConsumableArray(data));
                if (callback) {
                    callback(data);
                }
            } else {
                var _friends2;

                (_friends2 = this.friends).push.apply(_friends2, _toConsumableArray(callback));
            }
        },

        worldCallBack: function worldCallBack(callback, data) {

            if (arguments.length == 2) {
                var _world;

                (_world = this.world).push.apply(_world, _toConsumableArray(data));
                if (callback) {
                    callback(data);
                }
            } else {
                var _world2;

                (_world2 = this.world).push.apply(_world2, _toConsumableArray(callback));
            }
        },

        playerCallBack: function playerCallBack(callback, data) {

            if (arguments.length == 2) {
                this.playerInfo = data;
                if (callback) {
                    callback(data);
                }
            } else {
                this.playerInfo = callback;
            }
        },

        getPlayerLeaderboard: function getPlayerLeaderboard(callback) {
            if (GameConfig.isFBInstantGame()) {
                if (!this.playerInfo) {
                    FBP.getPlayerLeaderboard(GameConfig.LeaderBoardName, this.playerCallBack.bind(this, callback));
                } else {
                    if (callback) {
                        callback(this.playerInfo);
                    }
                }
            }
        },

        requestWorld: function requestWorld(callback) {
            if (GameConfig.isFBInstantGame()) {
                if (this.world.length == 0) {
                    FBP.getWorldLeaderboard(GameConfig.LeaderBoardName, this.worldCallBack.bind(this, callback));
                } else {
                    if (callback) {
                        callback(this.world);
                    }
                }
            }
        },

        requestFriends: function requestFriends(callback) {
            if (GameConfig.isFBInstantGame()) {
                if (this.friends.length == 0) {
                    FBP.getFriendLeaderboard(GameConfig.LeaderBoardName, this.friendsCallBack.bind(this, callback));
                } else {
                    if (callback) {
                        callback(this.friends);
                    }
                }
            }
        }

    });

    var instance = new dc();
    return instance;
}();

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
        //# sourceMappingURL=DataCenter.js.map
        