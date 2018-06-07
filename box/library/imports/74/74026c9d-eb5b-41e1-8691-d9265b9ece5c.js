"use strict";
cc._RF.push(module, '74026yd61tB4YaR2SZbns5c', 'BlockSmallFactory');
// src/model/BlockSmallFactory.js

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
            var prefab = cc.loader.getRes("prefab/blocksmall");
            newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("BlockSmall");
        com.setBlockPng(pngname);
        return newNode;
    },

    put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if (putnode.type != GameType.profabType.BlockSmall) {
            debugger;
        }
        this.pool.put(node);
    },

    //
    create: function create(pngname) {
        var obj = Factory.init(pngname);
        return obj;
    }

});

var Factory = new FC();
module.exports = Factory;

cc._RF.pop();