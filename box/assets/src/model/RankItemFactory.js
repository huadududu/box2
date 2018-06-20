/**
 * Created by bing on 18/04/2018.
 */



let FC = cc.Class({

    ctor:function () {
        this.pool = new cc.NodePool();
    },

    init:function (data) {

        let newNode = this.pool.get();
        if(!newNode){
            let prefab = cc.loader.getRes("prefab/rankitem");
            newNode= cc.instantiate(prefab);
        }
        newNode.getComponent("RankItem").updateItem(data);
        return newNode;
    },

    put:function (node) {
        this.pool.put(node);
    },

    //
    create:function (data) {
        let obj= this.init(data);
        return obj;
    },

    createInvite:function () {
        let prefab = cc.loader.getRes("prefab/rankitemInvite");
        let newNode= cc.instantiate(prefab);
        return newNode;
    },

    createEmpty:function () {
        let prefab = cc.loader.getRes("prefab/rankitemEmpty");
        let newNode= cc.instantiate(prefab);
        return newNode;
    },

});

let Factory = new FC();
module.exports = Factory;
