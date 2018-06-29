
/*
 * Created by Ren on 2018/6/11.
 */

var GameConfig = require("GameConfig");
module.exports = function () {

    var lc = require("LocalStorage");
    var high = 'high';

    var cls = cc.Class({
        properties: {
            loadstate:2,
            hard: 1,
            level: 1,
            gold: 0,
            gem: 0,
            exp: 0,
            openAdTimes: 0,

            hammer: {
                default: {}
            },
            efficiency: {
                default: {}
            },
            addgold: 0,
            addgem: 0,
            inviteFriends: 0,
            freindsInfo: {
                default: {}
            },
            bar1: 0,//加速1加速buff1
            bar2: 0,//加速1加速buff2,
            typebtn:null,
            skipID:0,
            offlinetime:0,
            language:'English',
            InviteCount:10,
            // BoxController:require("BoxController")


        },

        initHistory: function initInfo() {
            this.hard = 1;
            //
            // lc.get('level', 1, function (v) {
            //     if (typeof v == "string") {
            //         this.level = parseInt(v);
            //     } else if (typeof v == "number") {
            //         this.level = v;
            //     } else {
            //         this.level = 1;
            //     }
            //     this.BoxController.GameMenuController.
            // }.bind(this));
            // lc.get('hard', 1, function (v) {
            //     if (typeof v == "string") {
            //         this.hard = parseInt(v);
            //     } else if (typeof v == "number") {
            //         this.hard = v;
            //     } else {
            //         this.hard = 1;
            //     }
            //
            // }.bind(this));
            // lc.get('gold', 0, function (v) {
            //     if (typeof v == "string") {
            //         this.gold = parseInt(v);
            //     } else if (typeof v == "number") {
            //         this.gold = v;
            //     } else {
            //         this.gold = 0;
            //     }
            // }.bind(this));
            //
            // lc.get('hammer', null, function (v) {
            //     if (v != null) {
            //         this.hammer = JSON.parse(v);
            //     } else {
            //         this.hammer = {};
            //     }
            // }.bind(this));
            //
            // lc.get('exp', 0, function (v) {
            //     if (typeof v == "string") {
            //         this.exp = parseInt(v);
            //     } else if (typeof v == "number") {
            //         this.exp = v;
            //     } else {
            //         this.exp = 0;
            //     }
            // }.bind(this));
            //
            // lc.get('gem', 0, function (v) {
            //     if (typeof v == "string") {
            //         this.gem = parseInt(v);
            //     } else if (typeof v == "number") {
            //         this.gem = v;
            //     } else {
            //         this.gem = 0;
            //     }
            // }.bind(this));
            // lc.get('freindsInfo', null, function (v) {
            //     if (v != null) {
            //         this.freindsInfo = JSON.parse(v);
            //     } else {
            //         this.freindsInfo = null;
            //     }
            // }.bind(this));
            // lc.get('efficiency', null, function (v) {
            //     if (v != null) {
            //          this.efficiency = JSON.parse(v);
            //     } else {
            //         this.efficiency = {};
            //     }
            // }.bind(this));
            lc.getMore(['gold','gem','exp','level','hard','freindsInfo','efficiency','hammer'],0,this.syncPlayerInfoMainInfo.bind(this));
            this.InviteClaim  =[true,false,false,false];
            lc.getMore(['Coins',"invite_0","invite_1","invite_2","invite_3"],0,this.syncPlayerInfo.bind(this));

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
        saveOpenAdTimes: function saveOpenAdTimes(openAdTimes) {
            lc.set('openAdTimes', openAdTimes);
            this.openAdTimes = openAdTimes;
        },
        saveEfficiency: function saveEfficiency(efficiency) {
            lc.set('efficiency', JSON.stringify(efficiency));
            this.efficiency = efficiency;
        },
        savefreindsInfo:function (info) {
            lc.set('freindsInfo', JSON.stringify(info));
            this.freindsInfo =info;
        },
        saveInviteFriends: function saveInviteFriends(inviteFriends) {
            lc.set('inviteFriends',   inviteFriends.join(";"));
            // this.inviteFriends = inviteFriends;

            this.inviteFriends=[];
            this.inviteFriends.push(...inviteFriends);
        },

        updateInviteFriends:function (count) {
            this.InviteCount = count;
        },
        syncPlayerInfoToFB:function () {
            LocalStorage.set(['Coins',],this.Coins);
        },
        syncPlayerInfo:function (data) {
            if (typeof data["Coins"] != 'undefined') {
                this.Coins = data["Coins"];
            }

            this.InviteClaim  =[];
            if (typeof data["invite_0"] != 'undefined') {
                this.InviteClaim.push(data["invite_0"])
            }else{
                this.InviteClaim.push(false)
            }

            if (typeof data["invite_1"] != 'undefined') {
                this.InviteClaim.push(data["invite_1"])
            }else{
                this.InviteClaim.push(false)
            }

            if (typeof data["invite_2"] != 'undefined') {
                this.InviteClaim.push(data["invite_2"])
            }else{
                this.InviteClaim.push(false)
            }

            if (typeof data["invite_3"] != 'undefined') {
                this.InviteClaim.push(data["invite_3"])
            }else{
                this.InviteClaim.push(false)
            }

        },
        syncPlayerInfoMainInfo:function (data) {
            if(typeof data['gold'] != 'undefined'){
                if ( typeof data['gold']  == "string") {
                    this.gold = parseInt(data['gold']);
                } else if (typeof data['gold'] == "number") {
                    this.gold = data['gold'];
                } else {
                    this.gold = 0;
                }
            }
            if(typeof data['gem'] != 'undefined'){
                if ( typeof data['gem']  == "string") {
                    this.gem = parseInt(data['gem']);
                } else if (typeof data['gem'] == "number") {
                    this.gem = data['gem'];
                } else {
                    this.gem = 0;
                }
            }
            if(typeof data['exp'] != 'undefined'){
                if ( typeof data['exp']  == "string") {
                    this.exp = parseInt(data['exp']);
                } else if (typeof data['exp'] == "number") {
                    this.exp = data['exp'];
                } else {
                    this.exp = 0;
                }
            }
            if(typeof data['hard'] != 'undefined'){
                if ( typeof data['hard']  == "string") {
                    this.hard = parseInt(data['hard']);
                } else if (typeof data['hard'] == "number") {
                    this.hard = data['hard'];
                } else {
                    this.hard = 1;
                }
            }
            if(typeof data['level'] != 'undefined'){
                if ( typeof data['level']  == "string") {
                    this.level = parseInt(data['level']);
                } else if (typeof data['level'] == "number") {
                    this.level = data['level'];
                } else {
                    this.level = 1;
                }
            }
            this.hammer={};
            if(typeof data['hammer'] != 'undefined'){
                this.hammer = JSON.parse(data['hammer']);
            }
            this.freindsInfo=[];
            if(typeof data['freindsInfo'] != 'undefined'){
                this.freindsInfo.push(data['freindsInfo']);
            }
            this.efficiency={};
            if(typeof data['efficiency'] != 'undefined' ){
                this.efficiency = JSON.parse(data['efficiency']);
            }else{
                this.efficiency = {};
            }
            this.loadstate--;
            if(this.loadstate <= 0){
                let BoxController = cc.find("Canvas").getComponent("BoxController");
                 BoxController.onloadState();
            }
             //
            // this.BoxController.GameMenuController.initInfo();
            // this.BoxController.startSC();
        },
        syncInviteFriends:function () {

            // if(GameConfig.isFBInstantGame()){
            let now = new Date();
            let LocalStorage = require("LocalStorage");
            let key = "invaite" + now.getUTCFullYear().toString() + '-'+now.getUTCDate().toString() +"-"+now.getUTCDay();
            LocalStorage.get(key,0,this.updateInviteFriends.bind(this));
            // }
        },


    });
    var instance = new cls();
    return instance;
}();
