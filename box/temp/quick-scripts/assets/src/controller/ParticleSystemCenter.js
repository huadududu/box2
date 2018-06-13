(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/ParticleSystemCenter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4593dwEYhdAzbtPA2sfa92H', 'ParticleSystemCenter', __filename);
// src/controller/ParticleSystemCenter.js

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
    addParticleForNode: function addParticleForNode(fileName, parentNode, nodePt) {

        // let node = new cc.Node();
        // // let particleSystem = node.getComponent(cc.ParticleSystem);
        // // if(!particleSystem){
        //     let particleSystem = node.addComponent(cc.ParticleSystem);
        //     particleSystem.file = cc.url.raw("resources/test/"+fileName);
        // // }
        //
        // node.setPosition(nodePt.x,nodePt.y);
        // particleSystem.autoRemoveOnFinish = true;
        // particleSystem.resetSystem();


        var node = new cc.Node();
        node.setPosition(nodePt.x, nodePt.y);
        parentNode.addChild(node);
        node.name = this.index.toString();
        this.index++;
        fileName = fileName.replace(/\s+/g, "");
        // ParticleSystemCenter.addParticleForNode("jk_lz.plist",cc.p(360,360));
        console.log(fileName);
        var particleSystem = node.addComponent(cc.ParticleSystem);
        particleSystem.file = cc.url.raw("resources/particle/" + fileName);
        particleSystem.autoRemoveOnFinish = true;
        // particleSystem.resetSystem();
        // console.log(nodePt);

        // cc.loader.loadRes('particle/'+fileName, cc.ParticleAsset, function (err, atlas) {
        //     if(err){
        //         console.log("preLoadAtlas fail when load " + fileName);
        //     }else{
        //         console.log("preLoadAtlas OK -> " + fileName);
        //         particleSystem= atlas;
        //         particleSystem.autoRemoveOnFinish = true;
        //         // particleSystem.resetSystem();
        //     }
        // });
        // particleSystem.onDestroy(trackEntry =>{
        //     console.log("particleSystem end.", trackEntry.trackIndex, node.name);
        //     }
        //
        // );
    }

});

var Center = new SC();
module.exports = Center;

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
        //# sourceMappingURL=ParticleSystemCenter.js.map
        