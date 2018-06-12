"use strict";
cc._RF.push(module, 'd970aczG6pOIpIZAG6lw9UN', 'BlockBigFactory');
// src/model/BlockBigFactory.js

"use strict";

/**
 * Created by bing on 18/04/2018.
 */

var GameType = require("GameType");
var FC = cc.Class({

    ctor: function ctor() {
        this.pool = new cc.NodePool();
    },

    init: function init(pngname) {

        var newNode = this.pool.get();
        if (!newNode) {
            var prefab = cc.loader.getRes("prefab/blockbig");
            newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("BlockBig");
        com.setBlockPng(pngname);
        return newNode;
    },

    put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if (putnode.type != GameType.profabType.BlockBig) {
            debugger;
        }
        this.pool.put(node);
    },

    //
    create: function create(pngname) {
        var obj = Factory.init(pngname);
        return obj;
    },
    //边框
    initmargins: function initmargins(pngname) {
        var newNode = this.pool.get();
        if (!newNode) {
            var prefab = cc.loader.getRes("prefab/marginsb");
            newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("MarginsBig");
        com.setBlockPng(pngname);
        return newNode;
    },
    createMargins: function createMargins(pngname) {
        var obj = Factory.initmargins(pngname);
        return obj;
    }
});

var Factory = new FC();
module.exports = Factory;

cc._RF.pop();