(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/controller/InitialScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e527d3M3fVKkbU9FW2pq4sh', 'InitialScript', __filename);
// src/controller/InitialScript.js

"use strict";

//class InitialScript
require('JSExtends');
var GameConfig = require("GameConfig");
var BingLog = require("BingLog");
var Global = require("Global");
var GameUtils = require("GameUtils");
var SpriteFrameCenter = require("SpriteFrameCenter");

cc.Class({
    extends: cc.Component,
    properties: {
        progress: cc.Label
    },

    onLoad: function onLoad() {

        cc.log("InitialScript onLoad ");

        // cc.sys.localStorage.clear();
        this.printBaseInfo();
        BingLog.log("Init Script----------\n\n");
        BingLog.log("InitialScript sc name: ", cc.director.getScene().name);

        var randoms = [1, 3, 6, 9];
        var index = GameUtils.randomInt(0, 3);
        Global.initHistory();
        Global.syncInviteFriends();
        Global.tankid = randoms[index].toString();

        // request data
        var DataCenter = require("DataCenter");
        DataCenter.requestFriends(null);
        DataCenter.requestWorld(null);
        DataCenter.getPlayerLeaderboard(null);
    },

    start: function start() {

        cc.log("InitialScript start ");
        BingLog.log("scene name:", cc.director.getScene().name);

        //add all resource here.
        var preloadFiles = [];
        // preloadFiles.push({ name:"prefab/HintController",type:"file"});
        preloadFiles.push({ name: "fonts", type: "dir" });
        preloadFiles.push({ name: "particle", type: "dir" });
        preloadFiles.push({ name: "png/share", type: "dir" });
        // preloadFiles.push({ name:"prefab",type:"dir"});


        var files = ["prefab/bar", "prefab/block", "prefab/bullet", "prefab/item", "prefab/rankitem", "prefab/rankitemInvite", "prefab/rankitemEmpty", "prefab/rankUI", "prefab/inviteUI", "prefab/msg", "prefab/popwin", "prefab/popmsg", "prefab/tank", "prefab/tankhead", "png/game", "png/tanks"];

        for (var i = 0; i < files.length; ++i) {
            preloadFiles.push({ name: files[i], type: "file" });
        }

        var self = this;
        this.preloadCount = preloadFiles.length;
        this.loadedCount = 0;
        BingLog.log("preload:", this.loadedCount, this.preloadCount);
        this.loadRes = false;
        this.inited = false;

        for (var _i = 0; _i < preloadFiles.length; ++_i) {
            var preloadFile = preloadFiles[_i];
            BingLog.log("will load file:", preloadFile.name);
            if (preloadFile.type === "file") {
                cc.loader.loadRes(preloadFile.name, function (err, result) {
                    if (err) {
                        BingLog.warn("load file err:", err.message);
                    }
                    self.loadedCount++;
                    BingLog.log("loading:", self.loadedCount, self.loadedCount * 100.0 / self.preloadCount);

                    // let base = self.node.getComponent(Welcome).Stage1Percent;
                    // BingLog.log("percent:",base+self.loadedCount* (100-base)/self.preloadCount);
                    // self.node.getComponent(Welcome).updateUIProgress(base+self.loadedCount* (100-base)/self.preloadCount,0.5);
                    if (self.loadedCount == self.preloadCount) {
                        self.loadRes = true;
                    }
                    self.updateProgress();
                });
            } else if (preloadFile.type === "dir") {
                //Music
                cc.loader.loadResDir(preloadFile.name, function (errs, assets) {
                    if (errs) {
                        BingLog.warn("load file err:", errs.message);
                    }
                    self.loadedCount++;
                    BingLog.log("assets:", assets);
                    BingLog.log("loading:", self.loadedCount, self.loadedCount * 100.0 / self.preloadCount);
                    // let base = self.node.getComponent(Welcome).Stage1Percent;
                    // BingLog.log("percent:",base+self.loadedCount* (100-base)/self.preloadCount);
                    // self.node.getComponent(Welcome).updateUIProgress(base+self.loadedCount* (100-base)/self.preloadCount,0.5);
                    if (self.loadedCount == self.preloadCount) {
                        self.loadRes = true;
                    }
                    self.updateProgress();
                });
            }
        }
    },

    updateProgress: function updateProgress() {

        var progress = this.loadedCount * 100.0 / this.preloadCount;
        if (progress > 100) {
            progress = 100;
        }
        this.progress.string = progress.toFixed(0).toString() + "%";
    },

    goMenu: function goMenu() {

        SpriteFrameCenter.preLoadAtlas("png/game", function () {
            SpriteFrameCenter.preLoadAtlas("png/tanks", function () {
                cc.director.loadScene("gamemenu");
            });
        });

        // cc.director.loadScene("gametest");

        // cc.director.loadScene("test");
    },

    update: function update(dt) {
        if (this.loadRes && !this.inited) {
            this.loadRes = false;
            this.inited = true;
            this.goMenu();
        }
    },

    printBaseInfo: function printBaseInfo() {

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

        // cc.sys.localStorage.setItem("TotalSpinsHourBonus", 1001);
        // MurkaCore.Instance.BaseGameConfig.GameInited = "1234";
    }
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
        //# sourceMappingURL=InitialScript.js.map
        