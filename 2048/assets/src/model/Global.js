/**
 * Created by bing on 26/04/2018.
 */



let GameConfig = require("GameConfig");
let GameState = require("GameState");
module.exports = function () {

    let LocalStorage = require("LocalStorage");
    const high = 'high';

    let cls = cc.Class({
        properties: {
            score: 0,
            thisscore: 0, //这次游戏从完到结束的最高分数。
            highScore: 0,

            shareCount: 5, //每局normal分享总的次数。
            shareIndex: 0, //每局分享

            showAdTimes: 1,//每局end 获得额外生命的次数
            // showRecord: false,
            // loadCount: 0, //1强制弹出choose
            // createShortCount: 0, //
            // InterstitialAdCount: 0,
            // InterstitialAdTime: Date.now(),

            GiftSendTimes: [0, 0, 0], //发送礼物的次数。
            GiftExtraLife: 0, //是否有额外生命。

            // //
            FirstLogin: 0, // 第一次登录。
            LoginIndex: 0,//这次打开游戏后，进入gamemene场景的次数。
            ifLogin: 0,//每次第一次进入
            Coins: 0,
            thisCoin: 0,
            thisState: 0,
            haveSkin: null,
            useSkin: "common",
            loadstate: 2,//加载游戏需要的信息个数 场景资源 服务器信息
            blocks: null,//场景中的块的位置信息，
            movingNode: null,//正在移动的块的信息（最新生成的块）
            new_list: null,
            stop_list: null,
            gameType: 0,
            nextnumber: null,


        },

        initHistory: function () {
            this.score = 0;
            this.showRecord = false;

            let todayStr = this.getGiftTimesKey();
            LocalStorage.get("0_" + todayStr, 0, this.updateGiftTimes0.bind(this));
            LocalStorage.get("1_" + todayStr, 0, this.updateGiftTimes1.bind(this));
            LocalStorage.get("2_" + todayStr, 0, this.updateGiftTimes2.bind(this));
            // LocalStorage.get("FirstLogin", 0, this.updateFirstLogin.bind(this));

            // this.InviteClaim = [true, false, false, false];
            // LocalStorage.get('Coins',0,this.syncPlayerInfo.bind(this));
            this.useTools = [false, false, false];
            LocalStorage.getMore(["Coins",
                    "high",
                    "thisState",
                    "blocks",
                    "useTools",
                    "haveTools",
                    "showAdTimes",
                    "thisscore",
                    "thisCoin",
                    "haveSkin",
                    "useSkin",
                    "movingNode",
                    "new_list",
                    "stop_list",
                    "nextnumber",
                    "gametype",
                    "panelmax",
                    "createcount"
                ],
                '',
                this.initMainInfo.bind(this)
            );

        },
        initMainInfo: function (data) {
            if (typeof data['Coins'] != 'undefined') {
                this.Coins = parseInt(data['Coins']);
            } else {
                this.Coins = 0;
            }
            if (typeof data['high'] != 'undefined') {
                this.highScore = parseInt(data['high']);
            } else {
                this.highScore = 0;
            }
            if (typeof data['thisState'] != 'undefined') {
                this.thisState = parseInt(data['thisState']);
            } else {
                this.thisState = GameState.start;
            }
            if (typeof data['blocks'] != 'undefined') {
                this.blocks = JSON.parse(data['blocks']);
            } else {
                let initBlockConfig = require("initBlockConfig");
                this.blocks = initBlockConfig;
            }
            if (typeof data['useTools'] != 'undefined') {
                this.useTools = JSON.parse(data['useTools']);
            } else {
                this.useTools = [false, false, false];// 0  change 1 refresh 2 bomb
            }
            if (typeof data['haveTools'] != 'undefined') {
                this.haveTools = JSON.parse(data['haveTools']);
            } else {
                this.haveTools = [0, 0, 0];
            }

            if (typeof data['showAdTimes'] != 'undefined') {
                this.showAdTimes = parseInt(data['showAdTimes']);
            } else {
                this.showAdTimes = 1;
            }
            if (typeof data['thisscore'] != 'undefined') {
                this.thisscore = parseInt(data['thisscore']);
            } else {
                this.thisscore = 0;
            }
            if (typeof data['thisCoin'] != 'undefined') {
                this.thisCoin = parseInt(data['thisCoin']);
            } else {
                this.thisCoin = 0;
            }
            if (typeof data['haveSkin'] != 'undefined') {
                this.haveSkin = JSON.parse(data['haveSkin']);
            } else {
                this.haveSkin = ["common"];
            }
            if (typeof data['useSkin'] != 'undefined') {
                this.useSkin = (data['useSkin']);
            } else {
                this.useSkin = "common";
            }
            if (typeof data['movingNode'] != 'undefined') {
                this.movingNode = JSON.parse(data['movingNode']);
            } else {
                this.movingNode = null;
            }
            if (typeof data['new_list'] != 'undefined') {
                this.new_list = JSON.parse(data['new_list']);
            } else {
                this.new_list = null;
            }
            if (typeof data['stop_list'] != 'undefined') {
                this.stop_list = JSON.parse(data['stop_list']);
            } else {
                this.stop_list = null;
            }
            if (typeof data['gametype'] != 'undefined') {
                this.gameType = parseInt(data['gametype']);
            } else {
                this.gameType = 0;
            }
            if (typeof data['nextnumber'] != 'undefined') {
                this.nextnumber = JSON.parse(data['nextnumber']);
            } else {
                this.nextnumber = null;
            }
            if (typeof data['panelmax'] != 'undefined') {
                this.panelMax = JSON.parse(data['panelmax']);
            } else {
                this.panelMax = 1;
            }
            if (typeof data['createcount'] != 'undefined') {
                this.createCount = JSON.parse(data['createcount']);
            } else {
                this.createCount = 0;
            }
            this.loadstate--;

        },

        syncPlayerInfoToFB: function () {
            LocalStorage.set('Coins', this.Coins);
        },

        syncPlayerInfo: function (data) {
            if (typeof data == 'number') {
                this.Coins = data;
            } else {
                this.updateFirstLoginCoins = 0;
            }
        },


        updateFirstLogin: function (count) {
            this.FirstLogin = count;
        },

        getGiftTimesKey: function () {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getUTCMonth();
            let day = today.getUTCDate();
            let todayStr = year.toString() + "-" + month.toString() + "-" + day.toString();
            return todayStr;
        },

        //是否可以发送gift
        canSendGift: function (type) {
            return this.GiftSendTimes[type] < GameConfig.GiftLimited;
        },

        setGiftTimes: function (count, type) {
            let todayStr = this.getGiftTimesKey();
            LocalStorage.set(type + "_" + todayStr, count);
            this.GiftSendTimes[type] = count;
        },

        setExtraLife: function (type, count) {
            if (count > 0) {
                if (this.haveTools[type] == 0) {
                    this.haveTools[type] = count;
                    LocalStorage.set('haveTools', JSON.stringify(this.haveTools));
                }
            } else {
                this.haveTools[type] = count;
                LocalStorage.set('haveTools', JSON.stringify(this.haveTools));
            }
            // LocalStorage.set("haveTools", count);
            // this.GiftExtraLife = count;
        },

        updateGiftTimes0: function (count) {
            this.GiftSendTimes[0] = count;
        },
        updateGiftTimes1: function (count) {
            this.GiftSendTimes[1] = count;
        },
        updateGiftTimes2: function (count) {
            this.GiftSendTimes[2] = count;
        },

        updateextraLife: function (count) {
            this.GiftExtraLife = count;
        },
        // updateHaveTools: function (index, count) {
        //     if (this.haveTools[type] < 5) {
        //         this.haveTools[type] += count;
        //         LocalStorage.set('haveTools', JSON.stringify(this.haveTools));
        //     }
        //
        //
        // },
        newHistory: function (h) {
            if (h > this.highScore) {
                LocalStorage.set(high, h);
                this.highScore = h;
            }
        },
        updateFirstLogin: function (count) {
            this.FirstLogin = count;
        },
        syncInviteFriends: function () {

            // if(GameConfig.isFBInstantGame()){
            let now = new Date();
            let LocalStorage = require("LocalStorage");
            let key = "invaite" + now.getUTCFullYear().toString() + '-' + now.getUTCDate().toString() + "-" + now.getUTCDay();
            LocalStorage.get(key, 0, this.updateInviteFriends.bind(this));
            // }
        },
        updateInviteFriends: function (count) {
            this.InviteCount = count;
        },
        saveCoins: function () {
            LocalStorage.set('Coins', this.Coins);
        },
        saveThisState: function () {
            LocalStorage.set('thisState', this.thisState);
        },
        saveBlockInfo: function () {
            LocalStorage.set('blocks', JSON.stringify(this.blocks));
        },
        saveUseTools: function () {
            LocalStorage.set('useTools', JSON.stringify(this.useTools));
        },
        saveHaveTools: function () {
            LocalStorage.set('haveTools', JSON.stringify(this.haveTools));
        },
        saveShowAdTimes: function () {
            LocalStorage.set('showAdTimes', this.showAdTimes);
        },
        saveThisScore: function () {
            LocalStorage.set('thisscore', this.thisscore);
        },
        saveThisCoin: function () {
            LocalStorage.set('thisCoin', this.thisCoin);
        },
        saveHaveSkin: function () {
            LocalStorage.set('haveSkin', JSON.stringify(this.haveSkin));
        },
        saveUseSkin: function () {
            LocalStorage.set('useSkin', this.useSkin);
        },
        saveMovingNode: function () {
            LocalStorage.set('movingNode', JSON.stringify(this.movingNode));
        },
        saveNewList: function () {
            LocalStorage.set('new_list', JSON.stringify(this.new_list));
        },
        saveStopList: function () {
            LocalStorage.set('stop_list', JSON.stringify(this.stop_list));
        },
        saveGameType: function (num) {// 0 直接下落部分 1 合成部分
            LocalStorage.set('gametype', num);
            this.gameType = num;
        },
        saveNextNumbers: function (num1, num2) {
            this.nextnumber = [num1, num2];
            LocalStorage.set("nextnumber", JSON.stringify(this.nextnumber));

        },
        savePanelMax: function () {
            LocalStorage.set("panelmax", this.panelMax);
        },
        saveCreateCount: function () {
            LocalStorage.set("createcount", this.createCount);
        }

    });

    let instance = new cls();

    return instance;
}();