(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/BlockBigFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd970aczG6pOIpIZAG6lw9UN', 'BlockBigFactory', __filename);
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
    }

});

var Factory = new FC();
module.exports = Factory;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=BlockBigFactory.js.map
        