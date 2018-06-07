/*
 * Created by Ren on 2018/6/7.
 */

let GameType = require("GameType");
let FC = cc.Class({


    ctor:function () {
        this.pool = new cc.NodePool();
    },

    init:function (type,info,language) {

        let newNode = this.pool.get();
        if(!newNode){
            let prefab = cc.loader.getRes("prefab/ui_bottom");
            newNode= cc.instantiate(prefab);
        }
        let com = newNode.getComponent("UIBottom");
        com.setConfigInfo(type,info,language);
        return newNode;
    },

    put:function (node) {
        let putnode =node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if(putnode.type!= GameType.profabType.UIBottom){
            debugger;
        }
        this.pool.put(node);
    },

    //
    create:function (type,info,language) {
        let obj= Factory.init(type,info,language);
        return obj;
    }




});

let Factory = new FC();
module.exports = Factory;