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



});


let Center = new SC();
module.exports = Center;