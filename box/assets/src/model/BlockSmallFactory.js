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
            let prefab = cc.loader.getRes("prefab/blocksmall");
            newNode= cc.instantiate(prefab);
        }
        let com = newNode.getComponent("BlockSmall");
        com.setBlockPng(pngname);
        return newNode;
    },
    put:function (node) {
        let putnode =node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if(putnode.type!= GameType.profabType.BlockSmall){
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
            let prefab = cc.loader.getRes("prefab/marginss");
            newNode= cc.instantiate(prefab);
        }
        let com = newNode.getComponent("MarginsSmall");
        com.setBlockPng(pngname);
        return newNode;

    },
    createMargins:function(pngname){
        let obj= Factory.initmargins(pngname);
        return obj;
    }

});

let Factory = new FC();
module.exports = Factory;