/**
 * Created by bing on 18/05/2018.
 */

cc.Class({
    extends:cc.Component,
    properties:{

        scName:""
    },
    onClick:function (event,custom) {
        cc.director.loadScene(custom);
    },

    onLoad:function () {
        console.log("onLoad  " +this.scName);
    },

    onDestroy:function () {
        console.log("onDestroy  " +this.scName);
    }

});