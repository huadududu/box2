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
        node.setPosition(nodePt.x, nodePt.y);
        parentNode.addChild(node);
        node.name = this.index.toString();
        this.index++;
        fileName = fileName.replace(/\s+/g,"");
        // ParticleSystemCenter.addParticleForNode("jk_lz.plist",cc.p(360,360));
        // console.log(fileName);
        let particleSystem = node.addComponent(cc.ParticleSystem);
        particleSystem.file = cc.url.raw("resources/particle/"+fileName);
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

    },



});


let Center = new SC();
module.exports = Center;