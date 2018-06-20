(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/model/UILead.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e61cLsIx5LaqqQ0foFL+Xk', 'UILead', __filename);
// src/model/UILead.js

"use strict";

/*
 * Created by Ren on 2018/6/20.
 */
var SpriteFrameCenter = require('SpriteFrameCenter');
var GameType = require("GameType");
cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: GameType.profabType.Lead,
            override: true,
            visible: false
        },

        pngID: {
            visible: false,
            default: 0
        }

    },
    onLoad: function onLoad() {}
    // setIconPng: function(reward){
    //     if(reward.indexOf(";") != -1){
    //         let rewardarry = reward.split(";");
    //         this.pngID = rewardarry[0];
    //         this.text.string = rewardarry[1];
    //         this.text.node.active= false;
    //     }
    //     this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box",ItemConfig[this.pngID].icon+".png");
    // },
    // setFinish:function(){
    //     this.text.node.active= true;
    // }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=UILead.js.map
        