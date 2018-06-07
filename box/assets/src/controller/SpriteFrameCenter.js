/**
 * Created by bing on 09/05/2018.
 */



let SC= cc.Class({
    extends:cc.Object,

    properties:{

    },

    ctor:function () {

        this.spDic = {};
        this.atlas = {};
    },

    //单一的图片加载  "resources/png/" + pngname
    getFrameByName:function (fileName) {

        let spFrame = this.spDic[fileName];
        if(!spFrame){
            var realUrl = cc.url.raw(fileName);
            var texture = cc.textureCache.addImage(realUrl);
            spFrame = new cc.SpriteFrame(texture);
            this.spDic[fileName] = spFrame;
        }
        return spFrame;
    },



    preLoadAtlas:function (fileName,callBack) {

        let self = this;
        cc.loader.loadRes(fileName, cc.SpriteAtlas, function (err, atlas) {
            if(err){
                console.log("preLoadAtlas fail when load " + fileName);
            }else{
                console.log("preLoadAtlas OK -> " + fileName);
                self.atlas[fileName] = atlas;
                if(callBack){
                    callBack();
                }
            }
        });
    },


    //传入的xxx.png需要转化成xxx
    getFrameFromAtlas:function (fileName,frameNameIn) {
        if(!frameNameIn){
            console.log("your input file is wrong",frameNameIn);
            return null;
        }
        
        let frameName =  frameNameIn.split(".")[0];
        let atlas = this.atlas[fileName];
        let frame = null;
        if(atlas){
            frame = atlas.getSpriteFrame(frameName);
        }else{
            this.preLoadAtlas(fileName,this.getFrameFromAtlas.bind(this,fileName,frameName));
        }
        return frame;
    },



});


let Center = new SC();
module.exports = Center;