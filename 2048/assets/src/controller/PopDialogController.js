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

        showSendGift:function (giftType) {
            let prefab = cc.loader.getRes("prefab/popwin");
            let newNode= cc.instantiate(prefab);

            let popDialog = newNode.getComponent("PopDialog");
            let title = GameConfig.GiftSendTitle;
            let content = GameConfig.GiftSendTip;
            popDialog.init(title,content,this.onSend.bind(this),giftType);
            cc.find("Canvas").addChild(newNode);
            newNode.setPosition(0,0);
            this.popDialog = newNode;
            this.sendFree = false;
        },

        showRecieveGift:function (from,gifttype) {
            let prefab = cc.loader.getRes("prefab/popwin");
            let newNode= cc.instantiate(prefab);

            let popDialog = newNode.getComponent("PopDialog");
            let title = GameConfig.GiftRecieveTitle;
            let playerName = "unkonwn";
            if(from){
                playerName = from;
            }
            let content = GameConfig.GiftRecieveTip + playerName;
            popDialog.init(title,content,this.onSend.bind(this),this.onOk.bind(this));
            cc.find("Canvas").addChild(newNode);
            newNode.setPosition(0,0);

            // Global.setExtraLife(1);
            this.popDialog = newNode;
            this.sendFree = true;
        },

        sendCallBack:function (contextId) {
            let PopMsgController = require("PopMsgController");
            PopMsgController.showMsg(GameConfig.GiftSendAfterTip);

            //设置本地的时间。
            LocalStorage.set(contextId.toString(),Date.now());

            if(!this.sendFree){
                Global.setGiftTimes( Global.GiftSendTimes + 1);
                Global.setExtraLife(1);
            }

            // let gamemenu = cc.find("Canvas").getComponent("gamemenu");
            // if(gamemenu){
            //     gamemenu.showExtraLifeUi();
            // }
        },

        sendErrorCallBack:function (contextId) {
            LocalStorage.get(contextId.toString(),Date.now(),function (time) {
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

        onSend:function () {
            this.onOk();
            if(GameConfig.isFBInstantGame()){
                let FBP = require("Plugin");

                //相同的人，24小时才能重新发。
                FBP.chooseAsync(function (contextId) {
                    LocalStorage.get(contextId.toString(),0,function (time) {
                        //默认第一次发送。
                        if( time == 0 ){
                            FBP.updateGiftAsync(0,1,this.sendCallBack.bind(this))
                        }else{
                            let now = Date.now();
                            let diff =  (time + 24*3600*1000-now);
                            if(diff < 0){
                                FBP.updateGiftAsync(0,1,this.sendCallBack.bind(this))
                            }else{
                                this.sendErrorCallBack(time);
                            }
                        }
                    }.bind(this));

                   ;
                }.bind(this),this.sendErrorCallBack.bind(this));

            }
        },

        onOk:function () {

            if(cc.isValid(this.popDialog)){
                this.popDialog.removeFromParent(true);
            }
            let gamemenu = cc.find("Canvas").getComponent("gamemenu");
            if(gamemenu){
                gamemenu.showExtraLifeUi();
            }
        }
    });

    let instance =  new pop();
    return instance;

}();
