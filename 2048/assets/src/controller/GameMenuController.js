/*
 * Created by Ren on 2018/7/2.
 */
let Global = require("Global");
cc.Class({
    extends: cc.Component,
    properties: {
        scoreLabel: cc.Label,
        CoinLabel:cc.Label,
        nextBlockNumber:require("Block"),
        nextBlockNumber2:require("Block"),
        JoinLabel:cc.Label,

    },
    onLoad:function(){
        this.gameController = cc.find("Canvas").getComponent("GameController");
        this.joinMes =["Good！","Great！","Excellent","Incredible"];
        this.ExchangeState = false;
        this.BoomState = false;

    },

    updateScore:function(){
        this.scoreLabel.string = Global.thisscore;
    },
    updateNext:function(num){
        this.nextBlockNumber.setBlockNumber(num);
    },
    updateNext2:function(num){
        this.nextBlockNumber2.setBlockNumber(num);
    },
    updateCoin:function(){
        this.CoinLabel.string = Global.thisCoin;
    },
    showJoinMsg:function(num){

        let find = false;
        let shownum = 0;
        if(num<5 && num>1){
            find = true;
            shownum =num - 2;
            // this.JoinLabel.string = num+","+this.joinMes[num-2];

        }else if(num>=5){
            find = true;
            let shownum =3;
            // this.JoinLabel.string = num+","+this.joinMes[3];
        }
        if(find){
            let PopMsgController = require("PopMsgController");
            PopMsgController.showBlockGet(shownum);
            // this.JoinLabel.node.stopAllActions();
            // this.JoinLabel.node.active = true;
            // this.JoinLabel.node.setScale(0.5,0.5);
            //
            // let act_1 = cc.scaleTo(0.1,1,1);
            //
            // let act_2 = cc.moveBy(0.3,cc.p(0,0));
            // let act_3 = cc.scaleTo(0.1,0.1,0.1);
            // let act_4 = cc.callFunc(function(){
            //     this.JoinLabel.node.active = false;
            // },this);
            // this.JoinLabel.node.runAction(cc.sequence(act_1,act_2,act_3,act_4));
        }
    },
    canBoom:function(){
        return true;
    },
    canExchaneg:function(){
        return true;
    },
    canRefresh:function(){
        return true;
    },
    onTouchExchange:function(){

        if(this.BoomState)
            return;
        if(!this.canExchaneg())
            return;
        this.ExchangeState = !this.ExchangeState;
        if(this.ExchangeState){//暂停
            cc.director.pause();
        }else{
            cc.director.resume();
        }
    },
    onStopExchange:function(){
        this.ExchangeState = false;
        cc.director.resume();
    },
    onTouchBoom:function(){
        if(this.ExchangeState)
            return;
        if(!this.canBoom())
            return;
        this.BoomState = !this.BoomState;
        if(this.BoomState){//暂停
            cc.director.pause();
        }else{
            cc.director.resume();
        }
    },
    stopBoom:function(){
        this.BoomState= false;
        cc.director.resume();
    },
    onTouchRefresh(){
        if(!this.canRefresh())
            return;
        this.gameController.BlocksController.changeNextNum();
    }

});