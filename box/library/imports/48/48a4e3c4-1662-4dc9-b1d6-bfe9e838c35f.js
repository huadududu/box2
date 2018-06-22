"use strict";
cc._RF.push(module, '48a4ePEFmJNybHWv+noOMNf', 'MsgView');
// src/view/MsgView.js

"use strict";

/**
 * Created by bing on 08/05/2018.
 */

cc.Class({

    extends: cc.Component,
    properties: {
        msgLb: cc.Label
    },

    showMsg: function showMsg(msg) {
        this.msgLb.string = msg;
    },

    onLoad: function onLoad() {}

});

cc._RF.pop();