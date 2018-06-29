/**
 * Created by bing on 05/06/2018.
 */

cc.Class({

    extends:cc.Component,
    properties:{

        titleLb:cc.Label,
        cotentLb:cc.Label,

    },

    init:function (title,content,doCallback,closeCallback) {
        this.titleLb.string = title;
        this.cotentLb.string = content;
        this.doCallback = doCallback;
        this.closeCallback = closeCallback;
    },

    onSend:function () {
        if(this.doCallback){
            this.doCallback();
        }
    },

    onClose:function () {
        if(this.closeCallback){
            this.closeCallback();
        }
    }

});