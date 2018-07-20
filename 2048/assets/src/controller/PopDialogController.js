/**
 * Created by bing on 05/06/2018.
 */


let GameConfig = require("GameConfig");
let Global = require("Global");
let LocalStorage = require("LocalStorage");

module.exports = function () {

    let pop  = cc.Class({

        extends:cc.Object,
        properties:{

            sendFree:false, //是否需要添加到记录次数中。
        },

        showSendGift:function (type) {
            let prefab = cc.loader.getRes("prefab/popwin");
            let newNode= cc.instantiate(prefab);

            let popDialog = newNode.getComponent("PopDialog");
            let title = GameConfig.GiftSendTitle;
            let content = GameConfig.GiftSendTip;
            let contentdesc = GameConfig.GiftSendTipdesc;
            popDialog.init(title,content,contentdesc,this.onSend.bind(this),type);
            cc.find("Canvas").addChild(newNode);
            newNode.setPosition(0,0);
            this.popDialog = newNode;
            this.sendFree = false;
        },

        showRecieveGift:function (from,type) {
            let prefab = cc.loader.getRes("prefab/popwin");
            let newNode= cc.instantiate(prefab);

            let popDialog = newNode.getComponent("PopDialog");
            let title = GameConfig.GiftRecieveTitle;
            let playerName = "unkonwn";
            if(from){
                playerName = from;
            }
            let content = GameConfig.GiftRecieveTip + playerName;
            let contentdesc = "";
            popDialog.init(title,content,contentdesc,this.onSend.bind(this),type);
            cc.find("Canvas").addChild(newNode);
            newNode.setPosition(0,0);

             Global.setExtraLife(type,1);
            this.popDialog = newNode;
            this.sendFree = true;
        },

        sendCallBack:function (contextId,type) {
            let PopMsgController = require("PopMsgController");
            PopMsgController.showMsg(GameConfig.GiftSendAfterTip);

            //设置本地的时间。
            LocalStorage.set(type+"_"+contextId.toString(),Date.now());

            if(!this.sendFree){
                Global.setGiftTimes( Global.GiftSendTimes[type] + 1,type);
                Global.setExtraLife(type,1);
            }

            let gamemenu = cc.find("Canvas").getComponent("GameController");
            if(gamemenu){
                gamemenu.refreshBottom(type);
            }
        },

        sendErrorCallBack:function (contextId,type) {
            LocalStorage.get(type+"_"+contextId.toString(),Date.now(),function (time) {
                let PopMsgController = require("PopMsgController");
                PopMsgController.showMsg(GameConfig.GiftSamePlayerTip +  this.diffTime(time));
            }.bind(this));
        },
        
        diffTime:function (time) {
            let now = Date.now();
            let diff =  (time + 24*3600*1000-now)/1000;
            let hours = Math.floor(diff/3600);
            let mins = Math.floor((diff-3600*hours)/60);
            return hours.toString() +" hours " + mins.toString() + " mins";
        },

        onSend:function (type) {
            if(this.sendFree){
                this.onClose();
                return;
            }
            if(GameConfig.isFBInstantGame()){
                let FBP = require("Plugin");

                //相同的人，24小时才能重新发。
                FBP.chooseAsync(function (contextId) {
                    LocalStorage.get(type+"_"+contextId.toString(),0,function (time) {
                        //默认第一次发送。

                        if( time == 0 ){
                            FBP.updateGiftAsync(type,1,this.sendCallBack.bind(this),this.onOk.bind(this))
                        }else{
                            let now = Date.now();
                            let diff =  (time + 24*3600*1000-now);
                            if(diff < 0){
                                FBP.updateGiftAsync(type,1,this.sendCallBack.bind(this),this.onOk.bind(this))
                            }else{
                                this.sendErrorCallBack(contextId,type);
                            }
                        }
                        this.onOk();
                    }.bind(this));

                }.bind(this),function(contextId){

                    this.sendErrorCallBack(contextId,type);
                    this.onOk();
                }.bind(this),this.onOk.bind(this));

            }else{
                this.sendCallBack(1111111,type);
                this.onOk();
            }
        },

        onOk:function () {

            if(cc.isValid(this.popDialog)){
                this.popDialog.removeFromParent(true);
            }
             let GameState = require("GameState");
             Global.thisState = GameState.isRuning;
            // let gamemenu = cc.find("Canvas").getComponent("GameController");
            // if(gamemenu){
            //     gamemenu.refreshBottom(type);
            // }
        },
        onClose:function(){
            if(cc.isValid(this.popDialog)){
                this.popDialog.removeFromParent(true);
            }
        }
    });

    let instance =  new pop();
    return instance;

}();
