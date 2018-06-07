"use strict";
cc._RF.push(module, 'a84605gUCFKqJjD7ofWD+7g', 'testsc');
// src/test/testsc.js

"use strict";

/**
 * Created by bing on 18/05/2018.
 */

cc.Class({
    extends: cc.Component,
    properties: {

        scName: ""
    },
    onClick: function onClick(event, custom) {
        cc.director.loadScene(custom);
    },

    onLoad: function onLoad() {
        console.log("onLoad  " + this.scName);
    },

    onDestroy: function onDestroy() {
        console.log("onDestroy  " + this.scName);
    }

});

cc._RF.pop();