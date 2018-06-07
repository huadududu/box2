/**
 * Created by bing on 20/04/2018.
 */

let TouchView = require("TouchView");

cc.Class({
    extends:TouchView,
    properties:{
        controller:require("BoxController")
    },

    onLoad:function () {
        if(this.controller) {

            if (this.controller.touchStartCallBack) {
                this.touchStartCallBack = this.controller.touchStartCallBack.bind(this.controller);
            }

            if (this.controller.touchEndCallBack) {
                this.touchEndCallBack = this.controller.touchEndCallBack.bind(this.controller);
            }

            if (this.controller.touchMoveCallBack) {
                this.touchMoveCallBack = this.controller.touchMoveCallBack.bind(this.controller);
            }

            if (this.controller.touchMoveCallBack) {
                this.touchCancelCallBack = this.controller.touchCancelCallBack.bind(this.controller);
            }

        }
        this._super();
    },
});