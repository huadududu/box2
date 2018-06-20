(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/UILeadFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '291b3Cm4e5Cc4o+//ekgcNW', 'UILeadFactory', __filename);
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
        //# sourceMappingURL=UILeadFactory.js.map
        