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
    addSkeletonData:function (fileName,hammer) {
        cc.loader.loadRes('effect/'+fileName,sp.SkeletonData, function(err,data){
            hammer.skeletonData = data;
            hammer.setAnimation(0, "newAnimation", true);
        });
    },
    addSkeletonDataForNode:function (fileName,hammer){
        let     node = hammer.addComponent(sp.Skeleton);
        this.addSkeletonData(fileName,node);


    },
    addSkeletonDataWait:function (fileName,node) {
        cc.loader.loadRes('effect/'+fileName,sp.SkeletonData, function(err,data){
            node.skeletonData = data;
        });
    },




});


let Center = new SC();
module.exports = Center;