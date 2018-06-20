/*
 * Created by Ren on 2018/6/12.
 */
let GameType = require("GameType");
let FC = cc.Class({


    ctor: function () {
        this.pool = new cc.NodePool();
    },
    init:function (pngname = null) {

        let newNode = this.pool.get();
        if(!newNode){
            let prefab = cc.loader.getRes("prefab/uilead");
            newNode= cc.instantiate(prefab);
        }
        return newNode;
    },
    put:function (node) {
        let putnode =node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if(putnode.type!= GameType.profabType.Lead){
            debugger;
        }
        this.pool.put(node);
    },
    create:function (pngname) {
        let obj= Factory.init(pngname);
        return obj;
    },
});
let Factory = new FC();
module.exports = Factory;