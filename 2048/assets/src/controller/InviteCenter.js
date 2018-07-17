/**
 * Created by bing on 31/05/2018.
 */

let GameConfig = require("GameConfig");
let Global = require("Global");
let GameUtils  = require("GameUtils");
let ServerMethods = require("ServerMethods");
let FBPlugin = require("Plugin");
let StorageKeys = require("StorageKeys");

let GameStorage = require("GameStorage");

let IC = cc.Class({
    extends: cc.Object,

    properties:{
        //invite Friend Count,
        InviteCount:0,
        HelperNames:null,
        HaveShow:false, //是否显示过helper
        ShowRedTip:false, //是否显示红点提示。
        haveload:false,
    },


    init:function () {
        this.HelperNames = [];
        this.HaveShow = false;

        //先获取key，根据key获取对应的claim的状态。
        let nowClaimkey = this.getNowClaimKey();
        let storeClaimForKey = StorageKeys.Key_Invite_Claim;
        let storKey = GameStorage.get(storeClaimForKey,"");
        this.InviteClaim  =[false,false,false,false];


        if(storKey == ""){
            this.InviteClaim  =[false,false,false,false];
        }else{
            if(storKey != nowClaimkey){
                //以前的记录进行删除。
                GameStorage.set(storeClaimForKey,nowClaimkey);
                for(let i = 0; i < 4; ++i){
                    GameStorage.delete(storKey+"_"+i.toString());
                    GameStorage.set(nowClaimkey+"_"+i.toString(),'0');
                }
            }else{
                //如果存在，进行获取值
                for(let i = 0; i < 4; ++i){
                    let claimValue = GameStorage.get(storKey + "_"+i.toString(),"0");
                    this.InviteClaim[i] = (claimValue == "1");
                }
            }
        }
        this.getRedTipState();

    },

    getRedTipState:function () {
        let allClaim = true;
        for(let i = 0; i < this.InviteClaim.length;++i){
            if(!this.InviteClaim[i]){
                allClaim = false;
                break;
            }
        }
        this.ShowRedTip = !allClaim;
        
    },

    getNowClaimKey:function () {
        let now = new Date();
        let nowClaimkey = StorageKeys.Key_Invite_Claim + now.getUTCFullYear().toString() + '-'+now.getUTCMonth().toString() +"-"+now.getUTCDate();
        return nowClaimkey;
    },

    setClaim:function (index) {
        let storeClaimForKey = StorageKeys.Key_Invite_Claim;
        let storKey = GameStorage.get(storeClaimForKey,"");
        if(storKey == ""){
            let nowClaimkey = this.getNowClaimKey();
            GameStorage.set(storeClaimForKey,nowClaimkey);
        }

        let nowClaimIndexkey = this.getNowClaimKey()+"_" + index.toString();
        GameStorage.set(nowClaimIndexkey,"1");
        this.InviteClaim[index] = true;
    },

    getClaimState:function (index) {
        return this.InviteClaim[index];
    },

    inviteFriends:function () {

    },

    queryHelper:function () {

        if(GameConfig.isFBInstantGame()){

            let str = 'fromid='+ FBPlugin.getID();
            let url = GameConfig.ServerURL + GameConfig.Methods[ServerMethods.queryhelper] + "/" + GameConfig.GameName;
            GameUtils.LoadRequest(url,str,function (response) {
                this.InviteCount =  response.objects.length;
                this.HelperNames=[];
                this.HelperNames.push(...response.objects);
            }.bind(this));
        }
    },

    HelperVirify:function (fromid,helperid,helperName) {
        if(GameConfig.isFBInstantGame()){
            if(fromid != helperid){
                let str = 'fromid='+fromid+"&helperid=" + helperid +"&helperName="+ helperName;
                let url = GameConfig.ServerURL + GameConfig.Methods[ServerMethods.helpervirify] + "/" + GameConfig.GameName;
                GameUtils.LoadRequest(url,str,function (response) {
                }.bind(this));
            }
        }
    },
});


let instance = new IC();
instance.init();
instance.queryHelper();

module.exports = instance;