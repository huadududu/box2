(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/Global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4d84cHfepJMm5hdOQQhmuG8', 'Global', __filename);
// src/model/Global.js

"use strict";

cc._RF.push(module, '4d84cHfepJMm5hdOQQhmuG8', 'Global', __filename);
// src/model/Global.js

"use strict";

/*
 * Created by Ren on 2018/6/11.
 */

var GameConfig = require("GameConfig");
module.exports = function () {

    var lc = require("LocalStorage");
    var high = 'high';

    var cls = cc.Class({
        properties: {
            hard: 1,
            level: 1,
            gold: 0,
            gem: 0,
            exp: 0,
            openAdTimes: 0,
            inviteFriends: 0,
            hammer: {
                default: {}
            },
            efficiency: {
                default: {}
            },
            addgold: 0,
            addgem: 0,
            freindsInfo: {
                default: {}
            },
            bar1: 0, //加速1加速buff1
            bar2: 0, //加速1加速buff2,
            typebtn: null,
            skipID: 0,
            offlinetime: 0,
            language: 'English',
            InviteCount: 10

        },

        initInfo: function initInfo() {
            this.hard = 1;

            lc.get('level', 1, function (v) {
                if (typeof v == "string") {
                    this.level = parseInt(v);
                } else if (typeof v == "number") {
                    this.level = v;
                } else {
                    this.level = 1;
                }
            }.bind(this));
            lc.get('hard', 1, function (v) {
                if (typeof v == "string") {
                    this.hard = parseInt(v);
                } else if (typeof v == "number") {
                    this.hard = v;
                } else {
                    this.hard = 1;
                }
            }.bind(this));
            lc.get('gold', 0, function (v) {
                if (typeof v == "string") {
                    this.gold = parseInt(v);
                } else if (typeof v == "number") {
                    this.gold = v;
                } else {
                    this.gold = 0;
                }
            }.bind(this));

            lc.get('hammer', null, function (v) {
                if (v != null) {
                    this.hammer = JSON.parse(v);
                } else {
                    this.hammer = {};
                }
            }.bind(this));

            lc.get('exp', 0, function (v) {
                if (typeof v == "string") {
                    this.exp = parseInt(v);
                } else if (typeof v == "number") {
                    this.exp = v;
                } else {
                    this.exp = 0;
                }
            }.bind(this));

            lc.get('gem', 0, function (v) {
                if (typeof v == "string") {
                    this.gem = parseInt(v);
                } else if (typeof v == "number") {
                    this.gem = v;
                } else {
                    this.gem = 0;
                }
            }.bind(this));
            lc.get('openAdTimes', 0, function (v) {
                if (typeof v == "string") {
                    this.openAdTimes = parseInt(v);
                } else if (typeof v == "number") {
                    this.openAdTimes = v;
                } else {
                    this.openAdTimes = 0;
                }
            }.bind(this));
            lc.get('freindsInfo', {}, function (v) {
                if (v != null) {
                    this.freindsInfo = v;
                } else {
                    this.freindsInfo = {};
                }
            }.bind(this));
            lc.get('efficiency', null, function (v) {
                if (v != null) {
                    this.efficiency = JSON.parse(v);
                } else {
                    this.efficiency = {};
                }
            }.bind(this));
            this.InviteClaim = [true, false, false, false];
            lc.getMore(['Coins', "invite_0", "invite_1", "invite_2", "invite_3"], 0, this.syncPlayerInfo.bind(this));
        },

        saveLevel: function saveLevel(h) {

            lc.set('level', h);
            this.level = h;
        },

        saveHard: function saveHard(h) {
            lc.set('hard', h);
            this.hard = h;
        },

        saveExp: function saveExp(h) {
            lc.set('exp', h);
            this.exp = h;
        },

        saveHammer: function saveHammer(hammer) {
            lc.set('hammer', JSON.stringify(hammer));
            this.hammer = hammer;
        },

        saveGold: function saveGold(gold) {
            lc.set('gold', gold);
            this.gold = gold;
        },

        saveGem: function saveGem(gem) {
            lc.set('gem', gem);
            this.gem = gem;
        },
        saveOpenAdTimes: function saveInviteFriends(openAdTimes) {
            lc.set('openAdTimes', openAdTimes);
            this.openAdTimes = openAdTimes;
        },
        saveInviteFriends: function saveInviteFriends(inviteFriends) {
            lc.set('inviteFriends', inviteFriends);
            this.inviteFriends = inviteFriends;
        },
        saveEfficiency: function saveEfficiency(efficiency) {
            lc.set('efficiency', JSON.stringify(efficiency));
            this.efficiency = efficiency;
        },
        updateInviteFriends: function updateInviteFriends(count) {
            this.InviteCount = count;
        },
        syncPlayerInfoToFB: function syncPlayerInfoToFB() {
            LocalStorage.set(['Coins'], this.Coins);
        },

        syncPlayerInfo: function syncPlayerInfo(data) {
            if (typeof data["Coins"] != 'undefined') {
                this.Coins = data["Coins"];
            }

            this.InviteClaim = [];
            if (typeof data["invite_0"] != 'undefined') {
                this.InviteClaim.push(data["invite_0"]);
            } else {
                this.InviteClaim.push(false);
            }

            if (typeof data["invite_1"] != 'undefined') {
                this.InviteClaim.push(data["invite_1"]);
            } else {
                this.InviteClaim.push(false);
            }

            if (typeof data["invite_2"] != 'undefined') {
                this.InviteClaim.push(data["invite_2"]);
            } else {
                this.InviteClaim.push(false);
            }

            if (typeof data["invite_3"] != 'undefined') {
                this.InviteClaim.push(data["invite_3"]);
            } else {
                this.InviteClaim.push(false);
            }
        },

        syncInviteFriends: function syncInviteFriends() {

            // if(GameConfig.isFBInstantGame()){
            var now = new Date();
            var LocalStorage = require("LocalStorage");
            var key = "invaite" + now.getUTCFullYear().toString() + '-' + now.getUTCDate().toString() + "-" + now.getUTCDay();
            LocalStorage.get(key, 0, this.updateInviteFriends.bind(this));
            // }
        }

    });
    var instance = new cls();
    return instance;
}();

cc._RF.pop();

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
        //# sourceMappingURL=Global.js.map
        