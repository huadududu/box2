"use strict";
cc._RF.push(module, '4d84cHfepJMm5hdOQQhmuG8', 'Global');
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
            freindsInfo: {},
            bar1: 0,//加速1加速buff1
            bar2: 0,//加速1加速buff2,
            typebtn:null,
            skipID:0,
            offlinetime:0,
            language:'English'


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
        },

        saveLevel: function saveLevel(h) {

            lc.set('level', h);
            this.level = h;
        },

        // saveHard: function saveHard(h) {
        //     lc.set('hard', h);
        //     this.hard = h;
        // },

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
        }
    });
    var instance = new cls();
    return instance;
}();

cc._RF.pop();