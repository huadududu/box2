//class InitialScript
require('JSExtends');
var GameConfig = require("GameConfig");
let BingLog = require("BingLog");
let Global  = require("Global");
let GameUtils = require("GameUtils");
let SpriteFrameCenter = require("SpriteFrameCenter");

cc.Class({
    extends: cc.Component,
    properties:{
        progress:cc.Label,
    },

    onLoad: function () {

        cc.log("InitialScript onLoad ");


        // cc.sys.localStorage.clear();
        this.printBaseInfo();
        BingLog.log("Init Script----------\n\n");
        BingLog.log("InitialScript sc name: ", cc.director.getScene().name);

        let randoms = [1,3,6,9];
        let index = GameUtils.randomInt(0,3);
        Global.initHistory();


    },

    start: function () {

        cc.log("InitialScript start ");
        BingLog.log("scene name:", cc.director.getScene().name);

        //add all resource here.
        let preloadFiles = [];
        // preloadFiles.push({ name:"prefab/HintController",type:"file"});
        preloadFiles.push({ name:"fonts",type:"dir"});
        preloadFiles.push({ name:"particle",type:"dir"});
        preloadFiles.push({ name:"png/share",type:"dir"});
        // preloadFiles.push({ name:"prefab",type:"dir"});


        let files = [
            "prefab/block",
        ];

        for(let i = 0; i <files.length;++i ){
            preloadFiles.push({ name:files[i],type:"file"});
        }


        let self = this;
        this.preloadCount = preloadFiles.length;
        this.loadedCount = 0;
        BingLog.log("preload:",this.loadedCount,this.preloadCount);
        this.loadRes = false;
        this.inited = false;

        for (let i = 0; i < preloadFiles.length; ++i) {
            let preloadFile  = preloadFiles[i];
            BingLog.log("will load file:",preloadFile.name);
            if(preloadFile.type === "file"){
                cc.loader.loadRes(preloadFile.name, function (err, result) {
                    if(err){
                        BingLog.warn("load file err:",err.message);
                    }
                    self.loadedCount++;
                    BingLog.log("loading:",self.loadedCount,self.loadedCount*100.0/self.preloadCount);

                    // let base = self.node.getComponent(Welcome).Stage1Percent;
                    // BingLog.log("percent:",base+self.loadedCount* (100-base)/self.preloadCount);
                    // self.node.getComponent(Welcome).updateUIProgress(base+self.loadedCount* (100-base)/self.preloadCount,0.5);
                    if(self.loadedCount == self.preloadCount){
                        self.loadRes = true;
                    }
                    self.updateProgress();
                });
            }else if(preloadFile.type === "dir"){
                //Music
                cc.loader.loadResDir(preloadFile.name, function (errs, assets) {
                    if(errs){
                        BingLog.warn("load file err:",errs.message);
                    }
                    self.loadedCount++;
                    BingLog.log("assets:",assets);
                    BingLog.log("loading:",self.loadedCount,self.loadedCount*100.0/self.preloadCount);
                    // let base = self.node.getComponent(Welcome).Stage1Percent;
                    // BingLog.log("percent:",base+self.loadedCount* (100-base)/self.preloadCount);
                    // self.node.getComponent(Welcome).updateUIProgress(base+self.loadedCount* (100-base)/self.preloadCount,0.5);
                    if(self.loadedCount == self.preloadCount){
                        self.loadRes = true;
                    }
                    self.updateProgress();
                });
            }
        }
    },

    updateProgress:function () {

        let progress = this.loadedCount*100.0/this.preloadCount;
        if(progress >100)
        {
            progress = 100;
        }
        this.progress.string = progress.toFixed(0).toString() + "%";

    },

    goMenu:function () {

        SpriteFrameCenter.preLoadAtlas("png/game",function () {
            cc.director.loadScene("game");
        });

        // cc.director.loadScene("gametest");

        // cc.director.loadScene("test");
    },

    update:function (dt) {
        if(this.loadRes&& !this.inited){
            this.loadRes = false;
            this.inited = true;
            this.goMenu();
        }
    },

    printBaseInfo: function () {

        BingLog.log("********   info   ********");
        BingLog.log("platform: ", cc.sys.platform);
        BingLog.log("isNative: ", cc.sys.isNative);
        BingLog.log("os: ", cc.sys.os);
        BingLog.log("osVersion: ", cc.sys.osVersion);
        BingLog.log("browserType: ", cc.sys.browserType);
        BingLog.log("UA: ", cc.sys.uaResult);
        BingLog.log("language: ", cc.sys.language);
        BingLog.log("windowPixelResolution: ", cc.sys.windowPixelResolution);
        if (cc.sys.isNative) {
            BingLog.log("windowPixelResolution: ", jsb.fileUtils.getWritablePath());
        }
        BingLog.log("******** end info ********");


        if(GameConfig.isFBInstantGame()){
            console.log("SupportedAPI:",FBInstant.getSupportedAPIs());
        }
        // cc.sys.localStorage.setItem("TotalSpinsHourBonus", 1001);
        // MurkaCore.Instance.BaseGameConfig.GameInited = "1234";
    }
});
