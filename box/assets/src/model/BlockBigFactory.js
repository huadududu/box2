/**
 * Created by bing on 18/04/2018.
 */

let GameType = require("GameType");
let FC = cc.Class({


    ctor:function () {
        this.pool = new cc.NodePool();
    },

    init:function (pngname) {

        let newNode = this.pool.get();
        if(!newNode){
            let prefab = cc.loader.getRes("prefab/blockbig");
            newNode= cc.instantiate(prefab);
        }
        let com = newNode.getComponent("BlockBig");
        com.setBlockPng(pngname);
        return newNode;
    },

    put:function (node) {
        let putnode =node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if(putnode.type!= GameType.profabType.BlockBig){
            debugger;
        }
        this.pool.put(node);
    },

    //
    create:function (pngname) {
        let obj= Factory.init(pngname);
        return obj;
    },
//边框
    initmargins:function(pngname){
        let newNode = this.pool.get();
        if(!newNode){
            let prefab = cc.loader.getRes("prefab/marginsb");
            newNode= cc.instantiate(prefab);
        }
        let com = newNode.getComponent("MarginsBig");
        com.setBlockPng(pngname);
        return newNode;

    },
    createMargins:function(pngname) {
        let obj = Factory.initmargins(pngname);
        return obj;
    }
});

let Factory = new FC();
module.exports = Factory;