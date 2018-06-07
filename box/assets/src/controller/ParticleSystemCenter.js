/**
 * Created by bing on 09/05/2018.
 */

let SC= cc.Class({
    extends:cc.Object,


    properties:{
        index:0
    },

    ctor:function () {

        this.Dic = {};

    },


    //
    addParticleForNode:function (fileName,parentNode,nodePt) {

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
        // let newpt = parentNode.convertToNodeSpaceAR(nodePt);
        node.setPosition(nodePt.x, nodePt.y);
        parentNode.addChild(node);
        node.name = this.index.toString();
        this.index++;

        // ParticleSystemCenter.addParticleForNode("jk_lz.plist",cc.p(360,360));

        let particleSystem = node.addComponent(cc.ParticleSystem);
        particleSystem.file = cc.url.raw("resources/particle/"+fileName);
        particleSystem.autoRemoveOnFinish = true;
        particleSystem.resetSystem();

    },



});


let Center = new SC();
module.exports = Center;