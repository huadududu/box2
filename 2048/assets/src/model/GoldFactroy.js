/*
 * Created by Ren on 2018/7/10.
 */
let FC = cc.Class({


    ctor:function () {
        this.pool = new cc.NodePool();
    },
    init:function () {

        let newNode = this.pool.get();
        if(!newNode){
            let prefab = cc.loader.getRes("prefab/gold");
            newNode= cc.instantiate(prefab);
        }
        let com = newNode.getComponent("Gold");
        return newNode;
    },
    put:function (node) {
        let putnode =node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        // if(putnode.type!= GameType.profabType.BlockBig){
        debugger;
        // }
        this.pool.put(node);
    },
    create:function (pngname) {
        let obj= Factory.init(pngname);
        return obj;
    },
});

let Factory = new FC();
module.exports = Factory;
