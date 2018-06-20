"use strict";
cc._RF.push(module, '0d5709ZvlNI17zWFWsrWtWL', 'OpenBoxTouchView');
// src/view/OpenBoxTouchView.js

"use strict";

/**
 * Created by bing on 20/04/2018.
 */

var TouchView = require("TouchView");

cc.Class({
    extends: TouchView,
    properties: {
        controller: require("BoxController")
    },

    onLoad: function onLoad() {
        if (this.controller) {

            if (this.controller.touchStartCallBack) {
                this.touchStartCallBack = this.controller.touchStartCallBack.bind(this.controller);
            }
        }
        this._super();
    }
});

cc._RF.pop();