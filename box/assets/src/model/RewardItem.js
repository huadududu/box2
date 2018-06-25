/*
 * Created by Ren on 2018/6/12.
 */
let GameType = require("GameType");
let ItemConfig = require('ItemConfig');
let Global = require('Global');
let SpriteFrameCenter = require('SpriteFrameCenter');
cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: GameType.profabType.RewardItem,
            override: true,
            visible: false,
        },
        icon:cc.Sprite,
        text:cc.Label,
        pngID:{
            visible:false,
            default:0
        }

    },
    onLoad:function(){
    },
    setIconPng: function(reward){
        // if(reward.indexOf(";") != -1){
        //     let rewardarry = reward.split(";");
        //     this.pngID = rewardarry[0];
        //     this.text.string = "+"+rewardarry[1];
        //     this.text.node.active= false;
        // }
        let startnum=0;
        if (reward.indexOf(";") != -1) {
            let rewardarry = reward.split(";");
            this.pngID = rewardarry[0];
            let valuestr = rewardarry[1];
            let valueArr;
            if(valuestr.indexOf('*') != -1){
                valueArr = valuestr.split("*");
                startnum = valueArr[0];
                for(let i = 1;i<valueArr.length;i++){
                    if(valueArr[i] == "lv"){
                        startnum*=Global.level;
                    }
                }
            }else{
                startnum = parseInt(valuestr);
            }
        }
        this.text.string = "+"+startnum;
        this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box",ItemConfig[this.pngID].icon+".png");
    },
    setFinish:function(){
        this.text.node.active= true;
    }

});