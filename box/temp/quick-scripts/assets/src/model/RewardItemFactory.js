(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/RewardItemFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '307bbqNSopHArD1/+feSj9L', 'RewardItemFactory', __filename);
// src/model/RewardItemFactory.js

"use strict";

/*
 * Created by Ren on 2018/6/12.
 */
var GameType = require("GameType");
var FC = cc.Class({

    ctor: function ctor() {
        this.pool = new cc.NodePool();
    },
    init: function init(pngname) {

        var newNode = this.pool.get();
        if (!newNode) {
            var prefab = cc.loader.getRes("prefab/rewardItem");
            newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("RewardItem");
        com.setIconPng(pngname);
        return newNode;
    },
    put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        // console.log("type",putnode.type);
        if (putnode.type != GameType.profabType.RewardItem) {
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
        //# sourceMappingURL=RewardItemFactory.js.map
        