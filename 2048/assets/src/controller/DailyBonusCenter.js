/**
 * Created by bing on 31/05/2018.
 */

let Global = require("Global");
let GameUtils  = require("GameUtils");
let FBPlugin = require("Plugin");
let StorageKeys = require("StorageKeys");
let GameStorage = require("GameStorage");

let IC = cc.Class({
    extends: cc.Object,

    properties:{
        ShowRedTip:false, //是否显示红点提示。
    },


    init:function () {


        //先获取key，根据key保存的日期和现在日期对比，进行判断是否需要重制所有的签到。
        let nowClaimDate = this.getNowClaimDate();
        let storeClaimForKey = StorageKeys.Key_DailyBonus_Claim;
        let storDate = GameStorage.get(storeClaimForKey,"");
        //0-sunday
        this.Claims  = [false,false,false,false,false,false,false,false];
        if(storDate == ""){
            GameStorage.set(storeClaimForKey,nowClaimDate);
        }else{
            if(storDate !=  nowClaimDate){
                //以前的记录进行删除。
                GameStorage.set(storeClaimForKey,nowClaimDate);
                for(let i = 0; i < 8; ++i){
                    GameStorage.delete(StorageKeys.Key_DailyBonus_Claim+"_"+i.toString());
                    GameStorage.set(StorageKeys.Key_DailyBonus_Claim+"_"+i.toString(),'0');
                }
            }else{
                //如果存在，进行获取值
                for(let i = 0; i < 8; ++i){
                    let claimValue = GameStorage.get(StorageKeys.Key_DailyBonus_Claim + "_"+i.toString(),"0");
                     this.Claims[i] = (claimValue == "1");

                }
            }
        }

        this.getRedTipState();
    },


    getRedTipState:function () {
        let allClaim = true;
        let dayIndex = this.getWeekDay();
        let allClaimDays = 0;
        for(let i = 0; i < this.Claims.length;++i){
            if(!this.Claims[i]){
                allClaim = false;
                break;
            }else{
                allClaimDays +=1;
            }
        }
        if(dayIndex == 6){
            this.ShowRedTip = !allClaim;
        }else{
            this.ShowRedTip = !(dayIndex+1 == allClaimDays);
        }

    },

    //获取签到天数。
    getClaimDays:function () {
        let allClaim = 0;
        for(let i = 0; i < this.Claims.length-1;++i){
            if(this.Claims[i]){
                allClaim+=1;
            }
        }
        return allClaim;
    },


    getStartDay:function () {
        let now = new Date();
        let  number=  now.getDay();
        var startDay = new Date(now.getTime() - 24*60*60*1000*number)
        // let startDay = now.AddDays(-1*now.getDate());

        return startDay;//now.getDate();
    },

    //当前是第几天。
    getWeekDay:function () {
        let now = new Date();
        return now.getDay();  //0 represents Sunday.
    },

    getNowClaimDate:function () {
        let nowClaimDate = this.getStartDay().toDateString();
        return nowClaimDate;
    },

    setClaim:function (index) {
        let storeClaimForKey = StorageKeys.Key_DailyBonus_Claim;
        let storKey = GameStorage.get(storeClaimForKey,"");
        if(storKey == ""){
            GameStorage.set(storeClaimForKey,this.getNowClaimDate());
        }

        let nowClaimIndexkey = StorageKeys.Key_DailyBonus_Claim + "_" + index.toString();
        GameStorage.set(nowClaimIndexkey,"1");
        this.Claims[index] = true;
    },

    getClaimState:function (index) {
        return this.Claims[index];
    },

});


let instance = new IC();
instance.init();

module.exports = instance;