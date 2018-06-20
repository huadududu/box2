"use strict";
cc._RF.push(module, '291b3Cm4e5Cc4o+//ekgcNW', 'UILeadFactory');
// src/model/UILeadFactory.js

"use strict";

/*
 * Created by Ren on 2018/6/12.
 */
var GameType = require("GameType");
var FC = cc.Class({

    ctor: function ctor() {
        this.pool = new cc.NodePool();
    },
    init: function init() {
        var pngname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var newNode = this.pool.get();
        if (!newNode) {
            var prefab = cc.loader.getRes("prefab/uilead");
            newNode = cc.instantiate(prefab);
        }
        return newNode;
    },
    put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if (putnode.type != GameType.profabType.Lead) {
            debugger;
        }
        this.pool.put(node);
    },
    create: function create(pngname) {
        var obj = Factory.init(pngname);
        return obj;
    }
});
var Factory = new FC();
module.exports = Factory;

cc._RF.pop();