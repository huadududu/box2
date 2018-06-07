(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/utils/JSExtends.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ded9ewZcoVJL5UzQw94X8Mu', 'JSExtends', __filename);
// src/utils/JSExtends.js

"use strict";

/**
 * Created by bing on 14/02/2017.
 * JSExtends
 */

var BingLog = require("BingLog");

module.exports = function () {

    Array.prototype.contains = function (obj) {
        var i = Object.keys(this).length; //this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    };

    Array.prototype.remove = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                this.splice(i, 1);
            }
        }
    };

    //Date
    Date.prototype.AddDays = function (number) {
        var adjustDate = new Date(this.getTime() + 24 * 60 * 60 * 1000 * number);
        return adjustDate;
    };

    Date.prototype.AddHours = function (number) {
        var adjustDate = new Date(this.getTime() + 60 * 60 * 1000 * number);
        return adjustDate;
    };

    Date.prototype.AddMinutes = function (number) {
        var adjustDate = new Date(this.getTime() + 60 * 1000 * number);
        return adjustDate;
    };

    Date.prototype.AddSeconds = function (number) {
        var adjustDate = new Date(this.getTime() + 1000 * number);
        return adjustDate;
    };

    Date.prototype.DayOfYear = function () {
        var start = new Date(this.getFullYear(), 0, 0);
        var diff = this - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    };

    //bug fix for 1.4.2 getRes
    cc.loader.getRes = function (url, type) {
        var item = this._cache[url];
        if (!item) {
            var uuid = this._getResUuid(url, type, true);
            if (uuid) {
                var ref = this._getReferenceKey(uuid);
                item = this._cache[ref];
            } else {
                return null;
            }
        }
        if (item && item.alias) {
            item = this._cache[item.alias];
        }
        return item && item.complete ? item.content : null;
    };

    //onlyroot true只显示当前节点下。
    //rootNode 需要打印节点。默认是场景的根节点。
    //path 显示路径。可选。
    cc.dumpNodes = function () {
        var onlyroot = arguments[0];
        var rootNode = arguments[1];
        var path = arguments[2];
        if (!rootNode) {
            rootNode = cc.director.getScene();
        }
        if (!path) {
            path = "";
        }

        var cNodes = rootNode.getChildren();
        for (var i = 0; i < cNodes.length; ++i) {
            var node = cNodes[i];
            var currentPath = path + '/' + node._name;
            BingLog.log(currentPath);
            if (onlyroot) {
                if (node.getChildrenCount() > 0) {
                    cc.dumpNodes(onlyroot, node, currentPath);
                }
            }
        }
    };

    cc.mypt = function (name) {
        console.log(name, cc.find(name).getPosition());
    };

    cc.cachedTextureInfo = function () {
        BingLog.log('native:', cc.sys.isNative);
        if (cc.sys.isNative) {
            var ret = cc.textureCache.getCachedTextureInfo();
            BingLog.log("dump:\n", ret);
            // jsb.textureCache.getCachedTextureInfo();
        } else {
            var AllTextures = cc.textureCache.getAllTextures();
            for (var i = 0; i < AllTextures.length; ++i) {
                var texture = AllTextures[i];
                BingLog.log(texture.name, texture.getPixelWidth(), texture.getPixelHeight(), texture.pixelFormat);
            }
        }
    };
}();

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
        //# sourceMappingURL=JSExtends.js.map
        