/**
 * Created by bing on 26/04/2018.
 */



let GameConfig = require("GameConfig");
module.exports  =  function () {

    let LocalStorage = require("LocalStorage");
    const high = 'high';

    let cls = cc.Class({
        properties:{
            tankid:'1',
            score:0,
            thisscore:0, //这次游戏从完到结束的最高分数。
            shareCount:5, //每局normal分享总的次数。
            shareIndex:0, //每局分享
            highScore:0,
            showAdTimes:0,
            showRecord: false,
            loadCount:0, //1强制弹出choose
            createShortCount:0, //
            InterstitialAdCount:0,
            InterstitialAdTime:Date.now(),

            GiftSendTimes:0, //发送礼物的次数。
            GiftExtraLife:0, //是否有额外生命。

            //
            FirstLogin:0, // 第一次登录。
            LoginIndex:0,//这次打开游戏后，进入gamemene场景的次数。

            Coins:0,
        },

        initHistory:function () {
            this.score = 0;
            this.showRecord = false;
            this.showAdTimes = 0;

            LocalStorage.get(high,0,function (v) {
                if (typeof v == "string"){
                    this.highScore = parseInt(v);
                }else if(typeof v == "number"){
                    this.highScore = v;
                }else{
                    this.highScore = 10000;
                }

            }.bind(this));

            
            LocalStorage.get("extraLife",1,this.updateextraLife.bind(this));
            let todayStr = this.getGiftTimesKey();
            LocalStorage.get(todayStr,0,this.updateGiftTimes.bind(this));
            LocalStorage.get("FirstLogin",0,this.updateFirstLogin.bind(this));

            this.InviteClaim  =[true,false,false,false];
            LocalStorage.get('Coins',0,this.syncPlayerInfo.bind(this));

        },

        syncPlayerInfoToFB:function () {
            LocalStorage.set('Coins',this.Coins);
        },

        syncPlayerInfo:function (data) {
            if (typeof data == 'number') {
               this.Coins = data;
            }else{
                this.updateFirstLoginCoins = 0;
            }
        },
        

        updateFirstLogin:function (count) {
            this.FirstLogin = count;
        },

        getGiftTimesKey:function () {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getUTCMonth();
            let day = today.getUTCDate();
            let todayStr = year.toString() +"-"+month.toString() +"-"+day.toString();
            return todayStr;
        },

        //是否可以发送gift
        canSendGift:function () {
            return this.GiftSendTimes < GameConfig.GiftLimited;
        },

        setGiftTimes:function (count) {
            let todayStr = this.getGiftTimesKey();
            LocalStorage.set(todayStr,count);
            this.GiftSendTimes = count;
        },

        setExtraLife:function (count) {
            LocalStorage.set("extraLife",count);
            this.GiftExtraLife = count;
        },

        updateGiftTimes:function (count) {
            this.GiftSendTimes = count;
        },

        updateextraLife:function (count) {
            this.GiftExtraLife = count;
        },

        newHistory:function (h) {
            if(h>this.highScore){
                LocalStorage.set(high,h);
                this.highScore = h;
            }
        },

    });

    let instance = new cls();

    return instance;
}();