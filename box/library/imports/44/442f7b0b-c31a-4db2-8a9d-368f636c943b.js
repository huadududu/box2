"use strict";
cc._RF.push(module, '442f7sLwxpNsoqdNo9jbJQ7', 'UIBottomFactory');
// src/model/UIBottomFactory.js

"use strict";

/*
 * Created by Ren on 2018/6/7.
 */

var GameType = require("GameType");
var FC = cc.Class({

    ctor: function ctor() {
        this.pool = new cc.NodePool();
    },

    init: function init(type, info, language) {

        var newNode = this.pool.get();
        if (!newNode) {
            var prefab = cc.loader.getRes("prefab/ui_bottom");
            newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("UIBottom");
        com.setConfigInfo(type, info, language);
        return newNode;
    },

    put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if (putnode.type != GameType.profabType.UIBottom) {
            debugger;
        }
        this.pool.put(node);
    },

    //
    create: function create(type, info, language) {
        var obj = Factory.init(type, info, language);
        return obj;
    }

});

var Factory = new FC();
module.exports = Factory;

cc._RF.pop();