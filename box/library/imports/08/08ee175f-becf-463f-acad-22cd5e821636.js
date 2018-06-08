"use strict";
cc._RF.push(module, '08ee1dfvs9GP6ytIs1eghY2', 'SkeletonDataCenter');
// src/controller/SkeletonDataCenter.js

"use strict";

/**
 * Created by bing on 09/05/2018.
 */

var SC = cc.Class({
    extends: cc.Object,

    properties: {
        index: 0
    },

    ctor: function ctor() {

        this.Dic = {};
    },

    //
    addSkeletonData: function addSkeletonData(fileName, hammer) {
        cc.loader.loadRes('effect/' + fileName, sp.SkeletonData, function (err, data) {
            hammer.skeletonData = data;
            hammer.setAnimation(0, "newAnimation", true);
        });
    }

});

var Center = new SC();
module.exports = Center;

cc._RF.pop();