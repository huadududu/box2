(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/utils/LocalStorage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '07735IQkn5JeYJII2d/Al2D', 'LocalStorage', __filename);
// src/utils/LocalStorage.js

'use strict';

/**
 * Created by bing on 02/05/2018.
 */

var GameConfig = require("GameConfig");

module.exports = function () {

    var LC = cc.Class({
        extends: cc.Object,

        get: function get(k) {
            var defaultv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var callback = arguments[2];


            if (GameConfig.isFBInstantGame()) {
                FBInstant.player.getDataAsync([k]).then(function (data) {
                    if (typeof data[k] !== 'undefined') {
                        callback(data[k]);
                    }
                });
            } else {

                var v = cc.sys.localStorage.getItem(k);
                if (!v) {
                    v = defaultv;
                }
                // return v;
                callback(v);
            }
        },
        getMore: function getMore(moreKeys) {
            var defaultv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var callback = arguments[2];

            if (GameConfig.isFBInstantGame()) {
                var defaultData = defaultv;
                console.log("get ", [k]);
                FBInstant.player.getDataAsync(moreKeys).then(function (data) {
                    console.log('data is get', data);
                    if (callback) {
                        if (typeof data != 'undefined') {
                            callback(data[k]);
                        } else {
                            callback(defaultData);
                        }
                    }
                });
            }
        },
        set: function set(k, v) {

            if (GameConfig.isFBInstantGame()) {
                FBInstant.player.setDataAsync({
                    k: v
                });
            } else {
                cc.sys.localStorage.setItem(k, v);
            }
        },

        delete: function _delete(k) {
            cc.sys.localStorage.removeItem(k);
        }

    });

    var instance = new LC();
    return instance;
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
        //# sourceMappingURL=LocalStorage.js.map
        