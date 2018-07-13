/**
 * Created by bing on 31/05/2018.
 */

let RankItemFactory = require("RankItemFactory");
let GameConfig = require("GameConfig");

let RankHeight = 90;
let winSize = cc.winSize;


cc.Class({
    extends: cc.Component,

    properties: {

        friendScrollView: cc.ScrollView,
        worldScrollView: cc.ScrollView,
        spawnCount: 0, // how many items we actually spawn
        totalCount: 0, // how many items we need for the whole list
        spacing: 0, // space between each item
        bufferZone: 0, // when item is away from bufferZone, we relocate it

        TopBarNode: cc.Node,
        friendNode: cc.Node,
        worldNode: cc.Node,
        friendTipLb: cc.Label,
        friendTipNode: cc.Node,
        // friendInvideNode:cc.Node,
        myRank: require("RankItem"),
    },

    // use this for initialization
    onLoad: function () {
        this.friendsContent = this.friendScrollView.content;
        this.worldContent = this.worldScrollView.content;


        this.friendTipNode.active = false;
        // this.friendInvideNode.active = false;

        this.friendNode.setPositionX(0);
        this.worldNode.setPositionX(winSize.width);
        // request data
        let DataCenter = require("DataCenter");
        DataCenter.requestFriends(this.initializeFriends.bind(this));
        DataCenter.requestWorld(this.initializeWorld.bind(this));
        DataCenter.getPlayerLeaderboard(this.initMyInfo.bind(this));
        if (!GameConfig.isFBInstantGame()) {
            this.initializeDemo();
        }

    },

    initializeDemo: function () {


        // this.friendInvideNode.active = true;
        for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
            let data = {
                rank: i + 1,
                name: "Marcher Lee",
                score: i * 30 + 125,
                photo: "https://lookaside.facebook.com/platform/profilepic/?psid=2063223640372248&height=50&width=50&ext=1528008224&hash=AeRL1ntBbxis94hX"
            };
            let item = RankItemFactory.create(data);
            this.friendsContent.addChild(item);
        }
        let item = RankItemFactory.createEmpty();
        this.friendsContent.addChild(item);

        // this.friendTipNode.active = true;

        for (let i = 0; i < 10; ++i) { // spawn items, we only need to do this once
            let data = {
                rank: i + 1,
                name: "world Ma",
                score: i * 29 + 1035,
                photo: "https://lookaside.facebook.com/platform/profilepic/?psid=2063223640372248&height=50&width=50&ext=1528008224&hash=AeRL1ntBbxis94hX"
            };
            let item = RankItemFactory.create(data);
            this.worldContent.addChild(item);
        }
        let data = {
            rank: 1,
            name: "me",
            score: 1* 29 + 1035,
            photo: "https://lookaside.facebook.com/platform/profilepic/?psid=2063223640372248&height=50&width=50&ext=1528008224&hash=AeRL1ntBbxis94hX"
        };
        this.myRank.updateItem(data);
    }
    ,


    initializeFriends: function (data) {

        if (data.length < 5) {
            this.friendTipNode.active = true;
            // this.friendInvideNode.active = false;
        }
        else {
            // this.friendInvideNode.active = true;
            for (let i = 0; i < data.length; ++i) {
                let dataitem = data[i];
                let item = RankItemFactory.create(dataitem);
                this.friendsContent.addChild(item);
            }

            let item = RankItemFactory.createEmpty();
            this.friendsContent.addChild(item);
        }

    },

    initializeWorld: function (data) {
        for (let i = 0; i < data.length; ++i) {
            let dataitem = data[i];
            let item = RankItemFactory.create(dataitem);
            this.worldContent.addChild(item);
        }

    },
    initMyInfo: function (data) {
        this.myRank.updateItem(data);
        // let item = RankItemFactory.create(dataitem);
        // this.worldContent.addChild(item);
    },
    topBarAnimate: function (friend = true) {
        this.TopBarNode.stopAllActions();
        this.friendNode.stopAllActions();
        this.worldNode.stopAllActions();

        let pt = this.TopBarNode.getPosition();
        let friendPt = this.friendNode.getPosition();
        let worldPt = this.worldNode.getPosition();
        if (friend) {
            pt.x = winSize.width * (-0.25);
            friendPt.x = 0;
            worldPt.x = winSize.width;
        } else {
            pt.x = winSize.width * (0.25);
            friendPt.x = winSize.width * (-1);
            worldPt.x = 0;
        }

        let time = 0.35;
        let mv = cc.moveTo(time, pt);
        this.TopBarNode.runAction(mv);

        let mvf = cc.moveTo(time, friendPt);
        this.friendNode.runAction(mvf);

        let mvw = cc.moveTo(time, worldPt);
        this.worldNode.runAction(mvw);

    },

    onClose: function () {
        this.node.removeFromParent(true);
    },

    onFriend: function () {
        this.topBarAnimate(true);
    },

    onWorld: function () {
        this.topBarAnimate(false);
    },

    scrollEvent: function (sender, event) {
        switch (event) {
            case 0:
                this.lblScrollEvent.string = "Scroll to Top";
                break;
            case 1:
                this.lblScrollEvent.string = "Scroll to Bottom";
                break;
            case 2:
                this.lblScrollEvent.string = "Scroll to Left";
                break;
            case 3:
                this.lblScrollEvent.string = "Scroll to Right";
                break;
            case 4:
                this.lblScrollEvent.string = "Scrolling";
                break;
            case 5:
                this.lblScrollEvent.string = "Bounce Top";
                break;
            case 6:
                this.lblScrollEvent.string = "Bounce bottom";
                break;
            case 7:
                this.lblScrollEvent.string = "Bounce left";
                break;
            case 8:
                this.lblScrollEvent.string = "Bounce right";
                break;
            case 9:
                this.lblScrollEvent.string = "Auto scroll ended";
                break;
        }
    },

    addItem: function () {
        this.content.height = (this.totalCount + 1) * (RankHeight + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount + 1;
    },

    removeItem: function () {
        if (this.totalCount - 1 < 30) {
            cc.error("can't remove item less than 30!");
            return;
        }

        this.content.height = (this.totalCount - 1) * (RankHeight + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount - 1;
    },
    scrollToFixedPosition: function () {
        this.scrollView.scrollToOffset(cc.p(0, 500), 2);
    }
});
