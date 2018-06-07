"use strict";
cc._RF.push(module, '188aaBWJ7xJYK2luAOSUyWj', 'SpriteFrameCenter');
// src/controller/SpriteFrameCenter.js

"use strict";

/**
 * Created by bing on 09/05/2018.
 */

var SC = cc.Class({
    extends: cc.Object,

    properties: {},

    ctor: function ctor() {

        this.spDic = {};
        this.atlas = {};
    },

    //单一的图片加载  "resources/png/" + pngname
    getFrameByName: function getFrameByName(fileName) {

        var spFrame = this.spDic[fileName];
        if (!spFrame) {
            var realUrl = cc.url.raw(fileName);
            var texture = cc.textureCache.addImage(realUrl);
            spFrame = new cc.SpriteFrame(texture);
            this.spDic[fileName] = spFrame;
        }
        return spFrame;
    },

    preLoadAtlas: function preLoadAtlas(fileName, callBack) {

        var self = this;
        cc.loader.loadRes(fileName, cc.SpriteAtlas, function (err, atlas) {
            if (err) {
                console.log("preLoadAtlas fail when load " + fileName);
            } else {
                console.log("preLoadAtlas OK -> " + fileName);
                self.atlas[fileName] = atlas;
                if (callBack) {
                    callBack();
                }
            }
        });
    },

    //传入的xxx.png需要转化成xxx
    getFrameFromAtlas: function getFrameFromAtlas(fileName, frameNameIn) {
        if (!frameNameIn) {
            console.log("your input file is wrong", frameNameIn);
            return null;
        }

        var frameName = frameNameIn.split(".")[0];
        var atlas = this.atlas[fileName];
        var frame = null;
        if (atlas) {
            frame = atlas.getSpriteFrame(frameName);
        } else {
            this.preLoadAtlas(fileName, this.getFrameFromAtlas.bind(this, fileName, frameName));
        }
        return frame;
    }

});

var Center = new SC();
module.exports = Center;

cc._RF.pop();