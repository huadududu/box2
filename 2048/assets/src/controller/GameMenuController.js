/*
 * Created by Ren on 2018/7/2.
 */
let Global = require("Global");
let GameConfig = require("GameConfig");
let GameState = require("GameState");
cc.Class({
    extends: cc.Component,
    properties: {

        //beginpage:
        beginpage: cc.Node,
        beginScore: cc.Label,
        goldlab: cc.Label,


        endPage: cc.Node,
        endBestScore: cc.Label,
        endAddCion: cc.Label,
        thisScore: cc.Label,
        thisKing: cc.Sprite,
        bottom: require("BottomController"),
    },

    onTouchStart: function () {
        cc.director.loadScene("game");
    },
    onLoad: function () {
        let FBP = require("Plugin");
        // this.scheduleOnce(this.showHeler,3);
        Global.ifLogin = 1;
        let InviteCenter = require("InviteCenter");
        if(!InviteCenter.haveload){
            this.scheduleOnce(this.showHeler,3);
            FBP.entryGameAsync(this.userEntry.bind(this));
            InviteCenter.haveload = true;
        }

        if (Global.FirstLogin == 0) {
            //send data to server for notify his friends.
            FBP.ConnectedPlayers(function (players) {
                let playerids = [];
                for (let i = 0; i < players.length; ++i) {
                    let id = players[i].id;
                    playerids.push(id);
                }

                let str = 'players=' + playerids.join("#");
                let ServerMethods = require("ServerMethods");
                let url = GameConfig.ServerURL + GameConfig.Methods[ServerMethods.entergame] + "/" + GameConfig.GameName + "/" + FBP.getName();
                GameUtils.LoadRequest(url, str, function () {
                    console.log("send OK");
                  let   LocalStorage = require("LocalStorage");
                    LocalStorage.set("FirstLogin", Global.FirstLogin + 1);
                });
            });
        }

    },
    start: function () {
        if (Global.thisState == GameState.start) {
            this.beginpage.active = true;
            this.endPage.active = false;
            this.initStartPage();
        } else {
            this.beginpage.active = false;
            this.endPage.active = true;
            this.initEndPage();
        }
        // this.createBottom();
    },
    initStartPage: function () {
        this.beginScore.string = Global.highScore;
        this.goldlab.string = Global.Coins;

    },
    initEndPage: function () {

        Global.newHistory(Global.thisscore);
        this.endBestScore.string = "BEST:" + Global.highScore;
        this.endAddCion.string = "+" +Global.thisCoin;
        this.thisScore.string = Global.thisscore;
        this.thisKing.node.active = Global.highScore <= Global.thisscore;
        // let allCoin = Global.thisCoin+Global.Coins;
        //
        Global.Coins += Global.thisCoin;
        this.goldlab.string = Global.Coins;
        if (GameConfig.isFBInstantGame()) {
            let FBP = require("Plugin");
            FBP.setScoreAsync(GameConfig.LeaderBoardName, Global.highScore, null);
        }
        Global.thisState = GameState.start;
        Global.saveThisState();
        Global.saveCoins();
        Global.thisCoin = 0;
        Global.saveThisCoin();
        Global.thisscore = 0;
        Global.saveThisScore();
    },
    showHeler: function () {
        let InviteCenter = require("InviteCenter");
        if (InviteCenter.HelperNames.length > 0) {
            let helpers = InviteCenter.HelperNames.join(",");

            let GameConfig = require("GameConfig");
            let PopMsgController = require("PopMsgController");
            PopMsgController.showMsg(GameConfig.YourHelperNameTip.replace("XXX", helpers));
        }
    },
    // createBottom: function () {
    //     let prefab = cc.loader.getRes("prefab/bottom");
    //     let  newNode = cc.instantiate(prefab);
    //     newNode.setTag(112);
    //     cc.find("Canvas").addChild(newNode);
    // },
    userEntry: function (entryPointData) {

        // let GiftType = require("GiftType");
        let entrytype = entryPointData['type'];

        if (entrytype == 0) {
            // if(Global.GiftExtraLife == 0 && Global.LoginIndex == 0 ){
            //     let gifttype = entryPointData['gifttype'];
            //     let time = entryPointData['time'];
            //     let count = entryPointData['count'];
            //     let from = entryPointData['from'];
            //     if(gifttype == GiftType.ExtraLife) {
            //         let today = Date.now();
            //         if (Math.abs(today - time) < 1000 * 3600) {
            //             LocalStorage.get(time.toString(), 0, function (num) {
            //                 if(num == 0){
            //                     let PopDialogController = require("PopDialogController");
            //                     PopDialogController.showRecieveGift(from);
            //                     LocalStorage.set(time.toString(),1)
            //                 }
            //             }.bind(this));
            //         }
            //     }
            //     Global.LoginIndex++;
            // }

        } else if (entrytype == 1) {

            if (!entryPointData) {
                PopMsgController.showMsg("entryPointData is null");
            } else {
                let fromId = entryPointData['fromid'];
                let fromName = entryPointData['name'];
                let helperId = FBP.getID();
                let helperName = FBP.getName();

                if(fromId == helperId){
                    return;
                }
                let now = new Date();
                let nowkey = now.getUTCFullYear().toString() + '-' + now.getUTCMonth().toString() + "-" + now.getUTCDate();
                let v = GameStorage.get(fromId + nowkey, "0");
                //每天帮助只有一次。
                if (v == "0") {
                    //show tips。 send to server.
                    PopMsgController.showMsg(GameConfig.HelperEnterTip.replace("XXX", fromName));
                    // PopMsgController.showMsg("type :"+entrytype.toString(),false);
                    InviteCenter.HelperVirify(fromId, helperId, helperName);
                    GameStorage.set(fromId + nowkey, "1");
                }

            }

        }

    },


});