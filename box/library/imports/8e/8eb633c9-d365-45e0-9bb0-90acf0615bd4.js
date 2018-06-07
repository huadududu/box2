"use strict";
cc._RF.push(module, '8eb63PJ02VF4JuwkKzwYVvU', 'BingLog');
// src/utils/BingLog.js

"use strict";

/**
 * Created by bing on 16/04/2018.
 */

var GameConfig = require("GameConfig");
var debug = GameConfig.DebugVersion;

module.exports = {

    log: function log() {
        if (debug) {
            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            for (var i = 0; i < arg.length; ++i) {
                console.log(arg[i]);
            }
        }
    },

    warn: function warn() {
        if (debug) {
            for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arg[_key2] = arguments[_key2];
            }

            for (var i = 0; i < arg.length; ++i) {
                console.warn(arg[i]);
            }
        }
    }
};

cc._RF.pop();