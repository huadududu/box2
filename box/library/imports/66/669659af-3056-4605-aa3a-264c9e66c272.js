"use strict";
cc._RF.push(module, '66965mvMFZGBao6JkyeZsJy', 'RankItemFactory');
// src/model/RankItemFactory.js

"use strict";

/**
 * Created by bing on 18/04/2018.
 */

var FC = cc.Class({

    ctor: function ctor() {
        this.pool = new cc.NodePool();
    },

    init: function init(data) {

        var newNode = this.pool.get();
        if (!newNode) {
            var prefab = cc.loader.getRes("prefab/rankitem");
            newNode = cc.instantiate(prefab);
        }
        newNode.getComponent("RankItem").updateItem(data);
        return newNode;
    },

    put: function put(node) {
        this.pool.put(node);
    },

    //
    create: function create(data) {
        var obj = this.init(data);
        return obj;
    },

    createInvite: function createInvite() {
        var prefab = cc.loader.getRes("prefab/rankitemInvite");
        var newNode = cc.instantiate(prefab);
        return newNode;
    },

    createEmpty: function createEmpty() {
        var prefab = cc.loader.getRes("prefab/rankitemEmpty");
        var newNode = cc.instantiate(prefab);
        return newNode;
    }

});

var Factory = new FC();
module.exports = Factory;

cc._RF.pop();