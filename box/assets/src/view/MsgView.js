/**
 * Created by bing on 08/05/2018.
 */



cc.Class({

    extends:cc.Component,
    properties:{
      msgLb:cc.Label,
    },

    showMsg:function (msg) {
        this.msgLb.string = msg;
    },

    onLoad:function () {

    },

});