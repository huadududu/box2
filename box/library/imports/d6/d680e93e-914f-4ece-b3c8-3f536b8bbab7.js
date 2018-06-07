"use strict";
cc._RF.push(module, 'd680ek+kU9OzrPIP1Nri7q3', 'smController');
// src/controller/smController.js

'use strict';

// /*
//  * Created by Ren on 2018/6/4.
//  */
// let BoxController = require('BoxController');
// cc.Class({
//     extends: cc.Component,
//     properties: {
//         sm: cc.Animation,
//         BoxController:BoxController
//     },
//     onSMCallBack:function(){
//         this.BoxController.smCallback();
//
//     }
//
// });
cc.Class({
    extends: cc.Component,

    onAnimCompleted: function onAnimCompleted(num, string) {
        console.log('onAnimCompleted: param1[%s], param2[%s]', num, string);
    }
});

cc._RF.pop();