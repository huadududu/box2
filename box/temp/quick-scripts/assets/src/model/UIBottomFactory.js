(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/UIBottomFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '442f7sLwxpNsoqdNo9jbJQ7', 'UIBottomFactory', __filename);
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

    init: function init(type, info, eventcallback) {

        var newNode = this.pool.get();
        if (!newNode) {
            var prefab = cc.loader.getRes("prefab/ui_bottom");
            newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("UIBottom");
        com.setConfigInfo(type, info, eventcallback);
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
    create: function create(type, info, eventcallback) {
        var obj = Factory.init(type, info, eventcallback);
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
        //# sourceMappingURL=UIBottomFactory.js.map
        