"use strict";
cc._RF.push(module, 'a3318QR6XpHdqfWZTxzb9Mc', 'PopMsgController');
// src/controller/PopMsgController.js

"use strict";

/**
 * Created by bing on 05/06/2018.
 */

module.exports = {

    showMsg: function showMsg(content) {
        var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var name = "prefab/popmsg";
        if (!animation) {
            name = "prefab/popmsg2";
        }
        var prefab = cc.loader.getRes(name);
        var newNode = cc.instantiate(prefab);

        var pop = newNode.getComponent("PopMsg");
        pop.init(content, animation);
        cc.find("Canvas").addChild(newNode);
        newNode.setPosition(0, 0);
    }

};

cc._RF.pop();