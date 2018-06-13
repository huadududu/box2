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
            gold: 1,
            gem: 1,
            exp: 1,
            openAdTimes: 0,
            inviteFriends: 0,
            hammer: {
                default: {}
            },
            addgold: 0,
            addgem: 0,
            freindsInfo: [],
            bar1: 0, //加速1加速buff1
            bar2: 0 //加速1加速buff2,


        },

        initInfo: function initInfo() {
            this.hard = 1;

            lc.get('level', 1, function (v) {
                if (typeof v == "string") {
                    this.level = parseInt(v);
                } else if (typeof v == "number") {
                    this.level = v;
                } else {
                    this.level = 0;
                }
            }.bind(this));
            lc.get('gold', 1, function (v) {
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
            lc.get('inviteFriends', 0, function (v) {
                if (typeof v == "string") {
                    this.inviteFriends = parseInt(v);
                } else if (typeof v == "number") {
                    this.inviteFriends = v;
                } else {
                    this.inviteFriends = 0;
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
        