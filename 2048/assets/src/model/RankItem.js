/**
 * Created by bing on 31/05/2018.
 */


let GameUtils = require("GameUtils");
let SpriteFrameCenter = require("SpriteFrameCenter");

let randkImgs = ['rank_jinpai','rank_yinpai','rank_tongpai',''];
let randkcolors = [
    cc.hexToColor('#edc401'),
    cc.hexToColor('#b0bacc'),
    cc.hexToColor('#e7a071'),
    cc.hexToColor('#766d66'),
];
let rankFontSize = [30,30,30,25];

cc.Class({
    extends:cc.Component,

    properties:{

        rankIndexLb:cc.Label,
        rankIndexSp:cc.Sprite,
        playerimg:cc.Sprite,
        playerNameLb:cc.Label,
        playerScoreLb:cc.Label,
        isMyRank:0
    },

    onLoad:function () {

        // GameUtils.loadPhoto(FBP.getPhoto(),this.setPhoto.bind(this));

        // this.rankIndexLb.node.active = false;
        // this.rankIndexSp.node.active = false;
        // this.playerimg.node.active = false;
        // this.playerNameLb.node.active = false;
        // this.playerScoreLb.node.active = false;
    },

    //data
    //{index:1,name:"",score:11,photo:""}
    updateItem:function (data) {

        this.rankIndexLb.node.active = false;
        this.rankIndexSp.node.active = false;
        this.playerimg.node.active = false;


        let index = data.rank;
        //
        let randkcolor = randkcolors[randkcolors.length-1];
        let rankFontsz = rankFontSize[rankFontSize.length-1];
        if(index > 3 ){
            this.rankIndexLb.node.active = true;
            this.rankIndexSp.node.active = false;
            this.rankIndexLb.string = index.toString();
            if(this.isMyRank == 1){
                randkcolor = cc.hexToColor('#ffffff');
            }
        }else{
            this.rankIndexLb.node.active = false;
            this.rankIndexSp.node.active = true;
            this.rankIndexSp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game",randkImgs[index-1]);
            randkcolor = randkcolors[index-1];
            rankFontsz = rankFontSize[index-1];
        }
        //player
        this.playerNameLb.string = data.name;
        this.playerScoreLb.string = data.score.toString();
        this.playerScoreLb.node.setColor(randkcolor);
        this.playerScoreLb.fontSize = rankFontsz;


        GameUtils.loadPhoto(data.photo,this.setPhoto.bind(this));

    },

    setPhoto:function (texture) {
        this.playerimg.node.active = true;
        // this.playerimg.spriteFrame.setTexture(texture);
        this.playerimg.spriteFrame = new cc.SpriteFrame(texture);
    },


});