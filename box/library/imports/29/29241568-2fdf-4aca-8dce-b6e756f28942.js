"use strict";
cc._RF.push(module, '29241VoL99Kyo3OtudW8olC', 'loadingView');
// src/view/loadingView.js

"use strict";

/*
 * Created by Ren on 2018/6/21.
 */
cc.Class({
    extends: cc.Component,
    properties: {
        loadingAdNode: cc.Node,
        loadingAdCloseNode: cc.Node
    },
    onLoad: function onLoad() {},

    onEnable: function onEnable() {
        this.loadingAdCloseNode.active = false;
        this.scheduleOnce(this.showAdCloseBtn, 10);
    },
    onTouchCloseBtn: function onTouchCloseBtn() {
        this.node.active = false;
    },

    showAdCloseBtn: function showAdCloseBtn() {
        this.loadingAdCloseNode.active = true;
    }
});

cc._RF.pop();