require = function() {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n || e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = "function" == typeof require && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }
  return e;
}()({
  AcceleratorConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b275707wFGKKIynYEsN2x6", "AcceleratorConfig");
    "use strict";
    module.exports = {
      1: {
        name: "广告大",
        title: 10001,
        time: 180,
        checkdes: "speed xs%, coin xs%",
        desc: 10003,
        coin: 2,
        speed: 3,
        id: "1",
        icon: "icon_shipin"
      },
      2: {
        name: "广告小",
        title: 10002,
        time: 60,
        checkdes: "coin xs%",
        desc: 10004,
        coin: 2,
        speed: 0,
        id: "2",
        icon: "icon_shipin"
      }
    };
    cc._RF.pop();
  }, {} ],
  AttributeConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "45308UwjVxAi7M80kIjeiQ4", "AttributeConfig");
    "use strict";
    module.exports = {
      201: {
        costtype: 1001,
        relate: "铲子",
        next: 202,
        att: 2,
        cost: 100,
        time: "1.0",
        checkdes: "s% per s%s",
        id: "201",
        desc: 10015
      },
      203: {
        costtype: 1001,
        relate: "铲子",
        next: 204,
        att: 2,
        cost: 300,
        time: "0.8",
        checkdes: "s% per s%s",
        id: "203",
        desc: 10015
      },
      202: {
        costtype: 1001,
        relate: "铲子",
        next: 203,
        att: 2,
        cost: 200,
        time: "0.9",
        checkdes: "s% per s%s",
        id: "202",
        desc: 10015
      },
      204: {
        costtype: 1001,
        relate: "铲子",
        next: -1,
        att: 2,
        cost: 400,
        time: "0.7",
        checkdes: "s% per s%s",
        id: "204",
        desc: 10015
      },
      301: {
        costtype: 1001,
        relate: "小锤子",
        next: 302,
        att: 3,
        cost: 500,
        time: "2.0",
        checkdes: "s% per s%s",
        id: "301",
        desc: 10015
      },
      302: {
        costtype: 1001,
        relate: "小锤子",
        next: 303,
        att: 3,
        cost: 600,
        time: "1.9",
        checkdes: "s% per s%s",
        id: "302",
        desc: 10015
      },
      303: {
        costtype: 1001,
        relate: "小锤子",
        next: 304,
        att: 3,
        cost: 700,
        time: "1.8",
        checkdes: "s% per s%s",
        id: "303",
        desc: 10015
      },
      304: {
        costtype: 1001,
        relate: "小锤子",
        next: 305,
        att: 3,
        cost: 800,
        time: "1.7",
        checkdes: "s% per s%s",
        id: "304",
        desc: 10015
      },
      305: {
        costtype: 1001,
        relate: "小锤子",
        next: -1,
        att: 3,
        cost: -1,
        time: "1.6",
        checkdes: "s% per s%s",
        id: "305",
        desc: 10015
      },
      407: {
        costtype: 1001,
        relate: "钻头",
        next: 408,
        att: 5,
        cost: 5e4,
        time: "3.4",
        checkdes: "s% per s%s",
        id: "407",
        desc: 10015
      },
      406: {
        costtype: 1001,
        relate: "钻头",
        next: 407,
        att: 5,
        cost: 25e3,
        time: "3.5",
        checkdes: "s% per s%s",
        id: "406",
        desc: 10015
      },
      405: {
        costtype: 1001,
        relate: "钻头",
        next: 406,
        att: 5,
        cost: 16e3,
        time: "3.6",
        checkdes: "s% per s%s",
        id: "405",
        desc: 10015
      },
      404: {
        costtype: 1001,
        relate: "钻头",
        next: 405,
        att: 5,
        cost: 8e3,
        time: "3.7",
        checkdes: "s% per s%s",
        id: "404",
        desc: 10015
      },
      403: {
        costtype: 1001,
        relate: "钻头",
        next: 404,
        att: 5,
        cost: 4e3,
        time: "3.8",
        checkdes: "s% per s%s",
        id: "403",
        desc: 10015
      },
      402: {
        costtype: 1001,
        relate: "钻头",
        next: 403,
        att: 5,
        cost: 2e3,
        time: "3.9",
        checkdes: "s% per s%s",
        id: "402",
        desc: 10015
      },
      401: {
        costtype: 1001,
        relate: "钻头",
        next: 402,
        att: 5,
        cost: 1e3,
        time: "4.0",
        checkdes: "s% per s%s",
        id: "401",
        desc: 10015
      },
      102: {
        costtype: 1001,
        relate: "锄头",
        next: 103,
        att: 1,
        cost: 50,
        time: "0.9",
        checkdes: "s% per s%s",
        id: "102",
        desc: 10015
      },
      103: {
        costtype: 1001,
        relate: "锄头",
        next: -1,
        att: 1,
        cost: -1,
        time: "0.8",
        checkdes: "s% per s%s",
        id: "103",
        desc: 10015
      },
      101: {
        costtype: 1001,
        relate: "锄头",
        next: 102,
        att: 1,
        cost: 10,
        time: "1.0",
        checkdes: "s% per s%s",
        id: "101",
        desc: 10015
      },
      408: {
        costtype: 1001,
        relate: "钻头",
        next: -1,
        att: 5,
        cost: -1,
        time: "3.2",
        checkdes: "s% per s%s",
        id: "408",
        desc: 10015
      }
    };
    cc._RF.pop();
  }, {} ],
  BingLog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8eb63PJ02VF4JuwkKzwYVvU", "BingLog");
    "use strict";
    var GameConfig = require("GameConfig");
    var debug = GameConfig.DebugVersion;
    module.exports = {
      log: function log() {
        if (debug) {
          for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) arg[_key] = arguments[_key];
          for (var i = 0; i < arg.length; ++i) console.log(arg[i]);
        }
      },
      warn: function warn() {
        if (debug) {
          for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) arg[_key2] = arguments[_key2];
          for (var i = 0; i < arg.length; ++i) console.warn(arg[i]);
        }
      }
    };
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  BlockBigFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d970aczG6pOIpIZAG6lw9UN", "BlockBigFactory");
    "use strict";
    var GameType = require("GameType");
    var FC = cc.Class({
      ctor: function ctor() {
        this.pool = new cc.NodePool();
      },
      init: function init(pngname) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/blockbig");
          newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("BlockBig");
        com.setBlockPng(pngname);
        return newNode;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.profabType.BlockBig) debugger;
        this.pool.put(node);
      },
      create: function create(pngname) {
        var obj = Factory.init(pngname);
        return obj;
      },
      initmargins: function initmargins(pngname) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/marginsb");
          newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("MarginsBig");
        com.setBlockPng(pngname);
        return newNode;
      },
      createMargins: function createMargins(pngname) {
        var obj = Factory.initmargins(pngname);
        return obj;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    GameType: "GameType"
  } ],
  BlockBig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "efc26s3XmVDSKEqtpWDjjyy", "BlockBig");
    "use strict";
    var GameType = require("GameType");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var BlockConfig = require("BlockConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        sp: cc.Sprite,
        lineNum: 0,
        columnNum: 0,
        type: {
          default: GameType.profabType.BlockBig,
          override: true,
          visible: false
        },
        pngID: {
          default: 1,
          visible: false
        }
      },
      init: function init() {
        BingLog.log("Block" + status + " init:");
      },
      onLoad: function onLoad() {},
      showBlockBig: function showBlockBig(show) {},
      setBlockPng: function setBlockPng(pngname) {
        this.pngID = pngname;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", BlockConfig[this.pngID].resources + ".png");
      },
      setPosNum: function setPosNum(x, y) {
        this.lineNum = x;
        this.columnNum = y;
        this.text.getComponent(cc.Label).string = x + "," + y;
      },
      getLineNum: function getLineNum() {
        return this.lineNum;
      },
      getcolumnNum: function getcolumnNum() {
        return this.columnNum;
      },
      getPngId: function getPngId() {
        return BlockConfig[this.pngID].texiao;
      }
    });
    cc._RF.pop();
  }, {
    BlockConfig: "BlockConfig",
    GameType: "GameType",
    SpriteFrameCenter: "SpriteFrameCenter"
  } ],
  BlockConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f18b5c3k9VGmLpXiTnps1M8", "BlockConfig");
    "use strict";
    module.exports = {
      11: {
        texiao: "j_3",
        id: "11",
        resources: "j_3",
        size: 41
      },
      10: {
        texiao: "j_2",
        id: "10",
        resources: "j_2",
        size: 40
      },
      13: {
        texiao: "t_1_100",
        id: "13",
        resources: "t_1_100",
        size: 100
      },
      12: {
        texiao: "t_0_100",
        id: "12",
        resources: "t_0_100",
        size: 100
      },
      15: {
        texiao: "t_1_100",
        id: "15",
        resources: "t_3_100",
        size: 100
      },
      14: {
        texiao: "t_1_100",
        id: "14",
        resources: "t_2_100",
        size: 100
      },
      17: {
        texiao: "s_1_100",
        id: "17",
        resources: "s_2_100",
        size: 100
      },
      16: {
        texiao: "s_1_100",
        id: "16",
        resources: "s_1_100",
        size: 100
      },
      18: {
        texiao: "j_1_100",
        id: "18",
        resources: "j_1_100",
        size: 100
      },
      1: {
        texiao: "t_0",
        id: "1",
        resources: "t_0",
        size: 40
      },
      3: {
        texiao: "t_2",
        id: "3",
        resources: "t_2",
        size: 40
      },
      2: {
        texiao: "t_1",
        id: "2",
        resources: "t_1",
        size: 40
      },
      5: {
        texiao: "t_4",
        id: "5",
        resources: "t_4",
        size: 40
      },
      4: {
        texiao: "t_3",
        id: "4",
        resources: "t_3",
        size: 40
      },
      7: {
        texiao: "s_2",
        id: "7",
        resources: "s_2",
        size: 40
      },
      6: {
        texiao: "s_1",
        id: "6",
        resources: "s_1",
        size: 40
      },
      9: {
        texiao: "j_1",
        id: "9",
        resources: "j_1",
        size: 40
      },
      8: {
        texiao: "s_3",
        id: "8",
        resources: "s_3",
        size: 40
      }
    };
    cc._RF.pop();
  }, {} ],
  BlockSmallFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "74026yd61tB4YaR2SZbns5c", "BlockSmallFactory");
    "use strict";
    var GameType = require("GameType");
    var FC = cc.Class({
      ctor: function ctor() {
        this.pool = new cc.NodePool();
      },
      init: function init(pngname) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/blocksmall");
          newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("BlockSmall");
        com.setBlockPng(pngname);
        return newNode;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.profabType.BlockSmall) debugger;
        this.pool.put(node);
      },
      create: function create(pngname) {
        var obj = Factory.init(pngname);
        return obj;
      },
      initmargins: function initmargins(pngname) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/marginss");
          newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("MarginsSmall");
        com.setBlockPng(pngname);
        return newNode;
      },
      createMargins: function createMargins(pngname) {
        var obj = Factory.initmargins(pngname);
        return obj;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    GameType: "GameType"
  } ],
  BlockSmall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7cd3695p0pE449QwFO9hlb4", "BlockSmall");
    "use strict";
    var GameType = require("GameType");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var BlockConfig = require("BlockConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        sp: cc.Sprite,
        lineNum: 0,
        columnNum: 0,
        type: {
          default: GameType.profabType.BlockSmall,
          override: true,
          visible: false
        },
        pngID: {
          default: 1,
          visible: false
        }
      },
      init: function init() {
        BingLog.log("BlockSmall init:");
      },
      onLoad: function onLoad() {},
      setBlockPng: function setBlockPng(pngname) {
        this.pngID = pngname;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", BlockConfig[pngname].resources + ".png");
      },
      getPngId: function getPngId() {
        return BlockConfig[this.pngID].texiao;
      }
    });
    cc._RF.pop();
  }, {
    BlockConfig: "BlockConfig",
    GameType: "GameType",
    SpriteFrameCenter: "SpriteFrameCenter"
  } ],
  BoxConfig1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0696ViZRJMv4aCX3YiKvMc", "BoxConfig1");
    "use strict";
    module.exports = [ {
      type: 0,
      blockwidth: 100,
      blank: 4,
      margins: 43,
      count: 10
    }, {
      type: 1,
      blockwidth: 40,
      blank: 4,
      margins: 13,
      count: 25
    } ];
    cc._RF.pop();
  }, {} ],
  BoxConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "15835vaHxtEAbzxvP/epsG2", "BoxConfig");
    "use strict";
    module.exports = {
      108: {
        reward: 108,
        animation: "box-silver",
        id: "108",
        icon: "box-silver"
      },
      109: {
        reward: 109,
        animation: "box-silver",
        id: "109",
        icon: "box-silver"
      },
      110: {
        reward: 110,
        animation: "box-silver",
        id: "110",
        icon: "box-silver"
      },
      102: {
        reward: 102,
        animation: "box-silver",
        id: "102",
        icon: "box-silver"
      },
      103: {
        reward: 103,
        animation: "box-silver",
        id: "103",
        icon: "box-silver"
      },
      101: {
        reward: 101,
        animation: "box-gold",
        id: "101",
        icon: "box-gold"
      },
      106: {
        reward: 106,
        animation: "box-silver",
        id: "106",
        icon: "box-silver"
      },
      107: {
        reward: 107,
        animation: "box-silver",
        id: "107",
        icon: "box-silver"
      },
      104: {
        reward: 104,
        animation: "box-silver",
        id: "104",
        icon: "box-silver"
      },
      105: {
        reward: 105,
        animation: "box-silver",
        id: "105",
        icon: "box-silver"
      }
    };
    cc._RF.pop();
  }, {} ],
  BoxController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52eeadsoZ5Er4fzucc9O914", "BoxController");
    "use strict";
    var CameraController = require("CameraController");
    var StageConfig = require("StageConfig");
    var BlockConfig = require("BoxConfig1");
    var CycleConfig = require("CycleConfig");
    var ToolConfig = require("ToolConfig");
    var AttributeConfig = require("AttributeConfig");
    var AcceleratorConfig = require("AcceleratorConfig");
    var EfficiencyConfig = require("EfficiencyConfig");
    var BoxConfig = require("BoxConfig");
    var RewardConfig = require("RewardConfig");
    var GameType = require("GameType");
    var GameUtils = require("GameUtils");
    var GameState = require("GameState");
    var BlockBigFactory = require("BlockBigFactory");
    var BlockSmallFactory = require("BlockSmallFactory");
    var RewardItemFactory = require("RewardItemFactory");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var ParticleSystemCenter = require("ParticleSystemCenter");
    var SkeletonDataCenter = require("SkeletonDataCenter");
    var Global = require("Global");
    var GameHeight = 514;
    var GameCenterY = 0;
    var BaseGame = GameHeight / 2;
    cc.Class({
      extends: cc.Component,
      properties: {
        gameNode: cc.Node,
        camera: cc.Camera,
        BlockBig: cc.Prefab,
        BlockSmall: cc.Prefab,
        MarginsBig: cc.Prefab,
        MarginsSmall: cc.Prefab,
        RewardItem: cc.Prefab,
        UIBottom: cc.Prefab,
        Sky: cc.Node,
        Bgbz: cc.Node,
        Underground: cc.Node,
        motionStreak: cc.MotionStreak,
        boxSpine: sp.Skeleton,
        btnbox: cc.Button,
        GameMenu: cc.Node,
        treasure: cc.Button,
        upgradView: cc.Node,
        openbox: cc.Node,
        language: {
          visible: false,
          default: "English"
        },
        type: {
          visible: false,
          default: 0
        },
        rowNum: {
          visible: false,
          default: 5
        },
        blockWidth: 100,
        blockBlank: {
          visible: false,
          default: 0
        },
        moveNum: {
          visible: false,
          default: 0
        },
        margins: {
          visible: false,
          default: 0
        },
        curMaxLine: {
          visible: false,
          default: 0
        },
        canTouch: {
          visible: false,
          default: true
        },
        previousPt: {
          visible: false,
          default: null
        },
        Hatting: {
          visible: false,
          default: false
        },
        HattingPos: {
          visible: false,
          default: null
        },
        accelerHammer: {
          visible: false,
          default: 1
        },
        accelerGold: {
          visible: false,
          default: 1
        },
        efficeGold: 0,
        gameState: GameState.init
      },
      onLoad: function onLoad() {
        var _this = this;
        this.winsize = cc.winSize;
        this.BaseHeight = this.winsize.height / 2;
        this.BaseWidth = this.winsize.width / 2;
        this.hammerStart = 1;
        this.hammerEnd = 10;
        SpriteFrameCenter.preLoadAtlas("png/box", this.initdata.bind(this));
        this.GameMenuController = cc.find("Canvas/GameMenu").getComponent("GameMenuController");
        Global.initInfo();
        this.blocks = [];
        this.marginlist = [];
        this.hammers = {};
        this.rewardItem = [];
        this.accelerHammer = 1;
        this.accelerGold = 1;
        this.startPos = -GameHeight / 2;
        this.boxSpine.setCompleteListener(function(trackEntry) {
          var animationName1 = trackEntry.animation ? trackEntry.animation.name : "";
          cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName1);
          _this.addItems();
        });
        this.firstOpen = true;
      },
      playBoxSpine: function playBoxSpine() {
        this.boxSpine.node.active = true;
        this.boxSpine.setAnimation(0, "newAnimation", false);
      },
      stopBoxSpine: function stopBoxSpine() {
        this.boxSpine.node.active = false;
      },
      playHammerSpine: function playHammerSpine(hammerpos) {
        this.hammers[hammerpos].node.active = true;
        this.hammers[hammerpos].setAnimation(0, "newAnimation", true);
      },
      playHammers: function playHammers() {
        for (var i = this.hammerStart; i <= this.hammerEnd; i++) void 0 != this.hammers[i] && this.setSmPosition(i);
      },
      stopHammerSpine: function stopHammerSpine(hammerpos) {
        this.hammers[hammerpos].node.active = false;
      },
      addHammer: function addHammer(id) {
        var _this2 = this;
        var node = new cc.Node();
        var hammer = node.addComponent(sp.Skeleton);
        var info = ToolConfig[id];
        var animation = info.animation;
        var conf = AttributeConfig[info.attribute];
        SkeletonDataCenter.addSkeletonData(animation, hammer);
        this.GameMenu.addChild(node);
        this.hammers[id] = hammer;
        hammer.node.active = false;
        hammer.setCompleteListener(function(trackEntry) {
          var animationName = trackEntry.animation ? trackEntry.animation.name : "";
          cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
          hammer.node.active = false;
          _this2.checkCanHammer(id) && _this2.smCallback(id);
        });
        var timescale = .17 * conf.att / parseFloat(conf.time) * this.accelerHammer;
        hammer.timeScale = timescale;
      },
      changeHammerSpine: function changeHammerSpine(data) {
        this.hammer.skeletonData = data;
      },
      start: function start() {
        var _this3 = this;
        this.GameMenuController.initInfo();
        this.hammers = {};
        var timescale = 1;
        var hammer = Global.hammer;
        for (var eff in Global.efficiency) "coin" in Global.efficiency[eff] && (this.efficeGold += Global.efficiency[eff].coin - 1);
        var _loop = function _loop() {
          if (void 0 == hammer[i]) return "continue";
          var node = new cc.Node();
          var nodehammer = node.addComponent(sp.Skeleton);
          var info = ToolConfig[i];
          var animation = info.animation;
          SkeletonDataCenter.addSkeletonData(animation, nodehammer);
          _this3.GameMenu.addChild(node);
          _this3.hammers[hammer[i].id] = nodehammer;
          nodehammer.node.active = false;
          var j = i;
          nodehammer.setCompleteListener(function(trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
            nodehammer.node.active = false;
            _this3.checkCanHammer(j) && _this3.smCallback(j);
          });
          var attribute = Global.hammer[i].attribute;
          var conf1 = AttributeConfig[attribute];
          nodehammer.timeScale = .17 * conf1.att / parseFloat(conf1.time) * _this3.accelerHammer;
        };
        for (var i = this.hammerStart; i <= this.hammerEnd; i++) {
          var _ret = _loop();
          if ("continue" === _ret) continue;
        }
      },
      restart: function restart() {
        Global.hard < 10 && Global.hard++;
        this.boxSpine.node.active = false;
        for (var i = 1; i < 4; i++) this.rewardItem[i].destroy();
        this.rewardItem = [];
        this.initdata();
        this.gameState = GameState.hatting;
      },
      initdata: function initdata() {
        var floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < BlockConfig.length; i++) if (BlockConfig[i].blockwidth == StageConfig[Global.hard].size) {
          this.type = BlockConfig[i].type;
          break;
        }
        this.rowNum = BlockConfig[this.type].count;
        this.blockWidth = BlockConfig[this.type].blockwidth;
        this.blockBlank = BlockConfig[this.type].blank;
        this.margins = BlockConfig[this.type].margins;
        this.addBlocks();
        this.cameraStartPosY();
        this.btnbox.node.active = true;
        this.playHammers();
        this.initTreasure();
        if (this.firstOpen) {
          this.GameMenuController.addUIBottom();
          this.firstOpen = false;
        }
      },
      checkCanHammer: function checkCanHammer(id) {
        var hammer = Global.hammer;
        if (void 0 != hammer[id] && -1 != hammer[id].attribute) return true;
        return false;
      },
      resetMarginList: function resetMarginList() {
        if (this.marginlist.length > 0) for (var i = 0; i < this.marginlist.length; i++) {
          var node = this.marginlist[i];
          cc.isValid(node) && node.destroy();
        }
        this.marginlist = [];
      },
      resetBlockList: function resetBlockList() {
        if (this.blocks.length > 0) for (var i = 0; i < this.blocks.length; i++) for (var _j = 0; _j < this.blocks[i].length; _j++) {
          var node = this.blocks[i][_j];
          cc.isValid(node) && node.destroy();
        }
        this.blocks = [];
      },
      addBlocks: function addBlocks() {
        this.resetBlockList();
        this.resetMarginList();
        var floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < floorNum - 1; i++) {
          var lineinfo = this.addLines(this.getPngName(StageConfig[Global.hard].cycleID, i), i);
          this.blocks.push(lineinfo);
          lineinfo = [];
        }
        var topline = this.addLines(StageConfig[Global.hard].top, i);
        this.blocks.push(topline);
      },
      addLines: function addLines(pngname, thisNum) {
        var conf = BlockConfig[this.type];
        var count = conf.count;
        var factory = 0 == this.type ? BlockBigFactory : BlockSmallFactory;
        var curX = conf.margins + conf.blank - this.BaseWidth;
        var curY = thisNum * (this.blockWidth + conf.blank) + this.startPos;
        var lineArray = [];
        var left = factory.createMargins(pngname);
        left.position = cc.p(conf.margins / 2 - this.BaseWidth, curY + this.blockWidth / 2);
        this.gameNode.addChild(left);
        this.marginlist.push(left);
        var right = factory.createMargins(pngname);
        var endpos = this.BaseWidth - conf.margins / 2;
        right.position = cc.p(endpos, curY + this.blockWidth / 2);
        this.gameNode.addChild(right);
        this.marginlist.push(right);
        for (var i = 0; i < count; i++) {
          var node = factory.create(pngname);
          node.position = cc.p(curX + this.blockWidth / 2, curY + this.blockWidth / 2);
          curX += this.blockWidth + conf.blank;
          this.gameNode.addChild(node);
          lineArray.push(node);
        }
        return lineArray;
      },
      getPngName: function getPngName(cycleID, thisNum) {
        var thisID = void 0;
        if (-1 != cycleID.indexOf(";")) {
          var cycleArry = cycleID.split(";");
          var getnum = GameUtils.randomInt(0, cycleArry.length - 1);
          thisID = cycleArry[getnum];
        } else thisID = parseInt(cycleID);
        var neednumber = 0;
        for (var i = 1; i <= 10; i++) {
          if (0 == CycleConfig[thisID]["num" + i]) {
            i = 0;
            continue;
          }
          neednumber += CycleConfig[thisID]["num" + i];
          if (neednumber >= thisNum) return CycleConfig[thisID]["block" + i];
          10 == i && (i = 0);
        }
      },
      destroyBlock: function destroyBlock(line, row) {
        if (!this.blocks[line]) return;
        var node = this.blocks[line][row];
        if (cc.isValid(node)) {
          var location = this.hammerpos(line, row);
          var texiao = this.getEffByBlock(line, row);
          console.log("destroylog:", line, ":", row, location);
          ParticleSystemCenter.addParticleForNode(texiao + ".plist", this.GameMenuController.node, location);
          node.removeFromParent(true);
          this.blocks[line][row] = null;
          this.destroyUpdate();
          this.cameraCentPosY();
        }
      },
      checkCanDestroy: function checkCanDestroy(line, row) {
        if (!this.blocks[line] || !this.blocks[line][row]) return false;
        var floorNum = StageConfig[Global.hard].layer;
        if (line >= floorNum - 1) return true;
        var node = void 0;
        node = this.blocks[line + 1][row];
        if (!cc.isValid(node)) return true;
        if (line > 0) {
          node = this.blocks[line - 1][row];
          if (!cc.isValid(node)) return true;
        }
        if (row > 0 && row < this.rowNum - 1) {
          node = this.blocks[line][row - 1];
          if (!cc.isValid(node)) return true;
          node = this.blocks[line][row + 1];
          if (!cc.isValid(node)) return true;
        } else if (0 == row) {
          node = this.blocks[line][row + 1];
          if (!cc.isValid(node)) return true;
        } else if (row == this.rowNum - 1) {
          node = this.blocks[line][row - 1];
          if (!cc.isValid(node)) return true;
        }
        return false;
      },
      destroyUpdate: function destroyUpdate() {
        var myinfo = {};
        myinfo.exp = Global.exp + 1;
        myinfo.gold = Global.gold + 1 * this.accelerGold + this.efficeGold;
        this.GameMenuController.updateDate(myinfo);
        Global.saveExp(myinfo.exp);
        Global.saveGold(myinfo.gold);
      },
      maxLineNum: function maxLineNum() {
        var max = 0;
        var floorNum = StageConfig[Global.hard].layer;
        for (var i = 0; i < floorNum; i++) for (var j = 0; j < this.rowNum; j++) if (this.blocks && this.blocks[i] && this.blocks[i][j]) {
          var node = this.blocks[i][j];
          if (!cc.isValid(node)) continue;
          i > max && (max = i);
          break;
        }
        return max;
      },
      totoalRowNum: function totoalRowNum(line) {
        var max = 0;
        for (var j = 0; j < this.rowNum; j++) {
          var node = this.blocks[line][j];
          if (!cc.isValid(node)) continue;
          max++;
        }
        return max;
      },
      cameraCentPosY: function cameraCentPosY() {
        var maxline = this.maxLineNum();
        if (this.curMaxLine <= maxline) return;
        var move = this.curMaxLine - maxline;
        this.curMaxLine = maxline;
        var oldY = this.camera.node.getPositionY();
        if (oldY <= 0) return;
        var newY = oldY - this.blockWidth * move;
        var moveY = 0;
        moveY = newY >= 0 ? newY : 0;
        var location = cc.p(0, moveY);
        var action1 = cc.moveTo(.1, location);
        this.camera.node.runAction(action1);
        var ralmovelength = oldY - newY;
        for (var i = this.hammerStart; i < this.hammerEnd; i++) if (void 0 != this.hammers[i]) {
          var _location = this.hammers[i].node.position;
          var action2 = cc.moveTo(.1, {
            x: _location.x,
            y: _location.y + ralmovelength
          });
          this.hammers[i].node.runAction(action2);
        }
      },
      cameraStartPosY: function cameraStartPosY() {
        var floorNum = StageConfig[Global.hard].layer;
        var height = floorNum * (this.blockWidth + this.blockBlank);
        this.Underground.height = height;
        var posbottom = (height - GameHeight) / 2;
        this.Underground.y = posbottom;
        var totoal = this.Bgbz.height + height - 50;
        var skyposy = void 0;
        var bzYbottom = void 0;
        var other = GameHeight - totoal;
        bzYbottom = (totoal + height - GameHeight) / 2 - 25;
        this.Bgbz.y = bzYbottom;
        if (other > 0) {
          this.Sky.active = true;
          this.Sky.height = other + 10;
          skyposy = (GameHeight - other) / 2;
          this.Sky.y = skyposy;
          this.camera.node.setPositionY(0);
        } else {
          this.Sky.active = false;
          this.camera.node.setPositionY(-other);
        }
        this.curMaxLine = floorNum - 1;
      },
      setSmPosition: function setSmPosition(hammerpos) {
        var realwidth = this.blockWidth + this.blockBlank;
        var maxline = this.curMaxLine;
        var maxrow = this.totoalRowNum(0);
        if (0 == maxline && 0 == maxrow) {
          this.HattingPos = null;
          this.hammers[hammerpos].node.active = false;
          return;
        }
        this.hammers[hammerpos].node.active = true;
        var range = this.geScreenRange();
        var line = this.curMaxLine;
        var find = false;
        var canclick = [];
        var curline = line;
        for (;curline >= 0; curline--) {
          for (var i = 0; i < this.rowNum; i++) if (this.blocks[curline] && this.checkCanDestroy(curline, i)) {
            var _find = false;
            for (var j = this.hammerStart; j <= this.hammerEnd; j++) if (this.HattingPos && this.HattingPos[j] && this.HattingPos[j].x == curline && i == this.HattingPos[j].y) {
              _find = true;
              break;
            }
            _find || canclick.push(i);
          }
          if (canclick.length > 0) break;
        }
        if (0 == canclick.length) {
          this.HattingPos[hammerpos] = null;
          return;
        }
        var num = GameUtils.randomInt(0, canclick.length - 1);
        var row = canclick[num];
        var location = this.hammerpos(line, row);
        null == this.HattingPos && (this.HattingPos = {});
        this.HattingPos[hammerpos] = {
          x: line,
          y: row
        };
        this.hammers[hammerpos].node.position = location;
        this.playHammerSpine(hammerpos);
      },
      getEffByBlock: function getEffByBlock(line, row) {
        var type = 0 == this.type ? "BlockBig" : "BlockSmall";
        var node = this.blocks[line][row].getComponent(type);
        return node.getPngId();
      },
      geScreenRange: function geScreenRange() {
        var max = this.curMaxLine;
        var cameraPosY = this.camera.node.getPositionY();
        var min = 0;
        var realwidth = this.blockWidth + this.blockBlank;
        if (cameraPosY <= this.BaseHeight) min = 0; else {
          var maxPosY = max * realwidth;
          var canshowy = (maxPosY - cameraPosY + this.BaseHeight) / realwidth;
          min = Math.floor(max - canshowy);
        }
        return {
          max: max,
          min: min
        };
      },
      hammerpos: function hammerpos(line, row) {
        var cameraY = this.camera.node.getPositionY();
        var gameY = this.gameNode.y;
        var realwidth = this.blockWidth + this.blockBlank;
        var realx = row * realwidth + this.margins + this.blockBlank;
        var realy = line * realwidth - cameraY;
        var hamX = realx - this.BaseWidth - 42 + this.blockWidth;
        var hamY = realy - 42;
        return cc.p(hamX, hamY);
      },
      smCallback: function smCallback(hammerpos) {
        if (null != this.HattingPos && null != this.HattingPos[hammerpos]) {
          var y = this.HattingPos[hammerpos].y;
          var x = this.HattingPos[hammerpos].x;
          console.log("hammer:", x, y);
          cc.isValid(this.blocks[x][y]) && this.destroyBlock(x, y);
          this.setSmPosition(hammerpos);
        }
      },
      updateTouch: function updateTouch(point) {
        var cameraY = this.camera.node.getPositionY();
        var gameY = this.gameNode.y;
        var realwidth = this.blockWidth + this.blockBlank;
        var line = Math.floor((point.y + cameraY - 205) / realwidth);
        var row = Math.floor((point.x - this.margins - this.blockBlank) / realwidth);
        var find = false;
        if (this.checkCanDestroy(line, row)) {
          for (var i = this.hammerStart; i <= this.hammerEnd; i++) if (null != this.HattingPos && null != this.HattingPos[i] && void 0 != this.HattingPos[i] && this.HattingPos[i].x == line && this.HattingPos[i].y == row) {
            this.hammers[i].node.active = false;
            this.destroyBlock(line, row);
            this.setSmPosition(i);
            find = true;
            break;
          }
          find || this.destroyBlock(line, row);
        }
      },
      touchStartCallBack: function touchStartCallBack(location) {
        if (!this.canTouch) return;
        if (this.gameState == GameState.end) {
          this.openbox.active = false;
          this.restart();
        }
        if (location.x < this.margins || location.x > 2 * this.BaseWidth - this.margins) return;
        console.log("touchStartCallBack");
        this.previousPt = location;
        this.motionStreak.node.setPositionX(location.x - this.BaseWidth);
        this.motionStreak.node.setPositionY(location.y - this.BaseHeight);
        this.motionStreak.reset();
      },
      touchCancelCallBack: function touchCancelCallBack(location) {
        this.updateTouch(location);
        this.isTouching = false;
        this.motionStreak.reset();
      },
      touchEndCallBack: function touchEndCallBack(location) {
        this.updateTouch(location);
        this.isTouching = false;
        console.log("touchEndCallBack");
        this.motionStreak.reset();
      },
      touchMoveCallBack: function touchMoveCallBack(location) {
        if (!this.canTouch) return;
        if (location.x < this.margins || location.x > (2 * this.BaseWidth - this.margins || location.y < 216)) {
          this.motionStreak.reset();
          return;
        }
        this.updateTouch(location);
        this.previousPt = location;
        this.motionStreak.node.setPositionX(location.x - this.BaseWidth);
        this.motionStreak.node.setPositionY(location.y - this.BaseHeight);
      },
      onClickTreasure: function onClickTreasure(event) {
        var maxlinenum = this.maxLineNum();
        var totoalRowNum = this.totoalRowNum(0);
        if (0 != maxlinenum || 0 != totoalRowNum) {
          this.touchEndPoint = event.getLocation();
          this.updateTouch(this.touchEndPoint);
          return;
        }
        this.btnbox.node.active = false;
        this.gameState = GameState.end;
        this.canTouch = false;
        this.openbox.active = true;
        this.playBoxSpine();
      },
      update: function update() {},
      eventcallback: function eventcallback(type, id) {
        var string = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        switch (type) {
         case 0:
          null == string ? this.accleleratorChange(id) : "finish" == string && this.accleleratorrRecover(id);
          break;

         case 1:
          this.toolChange(id);
          break;

         case 2:
          this.efficiencyAdd(id);
        }
      },
      accleleratorChange: function accleleratorChange(id) {
        var conf = AcceleratorConfig[id];
        Global["bar" + id] = conf.time;
        this.changeHammerSpeed();
        this.GameMenuController.updateButtom();
      },
      accleleratorrRecover: function accleleratorrRecover(id) {
        this.changeHammerSpeed();
        this.GameMenuController.updateButtom();
      },
      changeHammerSpeed: function changeHammerSpeed() {
        var speedHammer = 0;
        var speedGold = 0;
        for (var _i = 1; _i <= 2; _i++) if (Global["bar" + _i] > 0) {
          speedHammer += AcceleratorConfig[_i].speed;
          speedGold += AcceleratorConfig[_i].coin;
        }
        0 == speedHammer && (speedHammer = 1);
        0 == speedGold && (speedGold = 1);
        this.accelerHammer = speedHammer;
        this.accelerGold = speedGold;
        for (var i = this.hammerStart; i <= this.hammerEnd; i++) if (void 0 != this.hammers[i]) {
          var conf1 = AttributeConfig[Global.hammer[i].attribute];
          this.hammers[i].timeScale = conf1.att / parseFloat(conf1.time) * .17 * this.accelerHammer;
        }
      },
      changeGoldSpeed: function changeGoldSpeed() {},
      toolChange: function toolChange(id) {
        var info = ToolConfig[id];
        if (void 0 == Global.hammer[id]) {
          var bool = this.checkCanAdd(id);
          if (bool) {
            Global.hammer[id] = {
              id: id,
              attribute: info.attribute
            };
            Global.saveHammer(Global.hammer);
            this.addHammer(id);
            this.setSmPosition(id);
          } else this.addAdTime(id);
          this.GameMenuController.updateButtom();
        } else {
          var conf = AttributeConfig[Global.hammer[id].attribute];
          var mess = {};
          if (conf.costtype = 1001) {
            Global.gold -= conf.cost;
            mess["gold"] = Global.gold;
          } else if (conf.costtype = 1002) {
            Global.gem -= conf.cost;
            mess["gem"] = Global.gem;
          }
          if (-1 != conf.next) {
            Global.hammer[id].attribute = conf.next;
            var conf1 = AttributeConfig[conf.next];
            Global.saveHammer(Global.hammer);
            this.hammers[id].timeScale = conf1.att / parseFloat(conf1.time) * .17 * this.accelerHammer;
          }
          this.GameMenuController.updateDate(mess);
        }
      },
      checkCanAdd: function checkCanAdd(id) {
        var conf = ToolConfig[id];
        var thisID = void 0;
        var confArry = void 0;
        if ("unlock" in conf) {
          if (-1 != conf.unlock.indexOf(";")) {
            confArry = conf.unlock.split(";");
            thisID = confArry[0];
          } else thisID = parseInt(conf.unlock);
          if (-1 == thisID) return true;
          if (0 == thisID) return true;
          if (1 == thisID) return Global.openAdTimes > 0;
          if (2 == thisID) {
            var needlvl = confArry[1];
            return !(Global.level < needlvl);
          }
          if (3 == thisID) return !(Global.inviteFriends < confArry[1]);
        }
        return true;
      },
      addAdTime: function addAdTime(id) {
        var conf = ToolConfig[id];
        var thisID = void 0;
        var confArry = void 0;
        if ("unlock" in conf) {
          if (-1 != conf.unlock.indexOf(";")) {
            confArry = conf.unlock.split(";");
            thisID = confArry[0];
          } else thisID = parseInt(conf.unlock);
          if (1 == thisID) return Global.openAdTimes++;
          3 == thisID && Global.inviteFriends++;
        }
      },
      addItems: function addItems() {
        var hard = Global.hard;
        var boxID = StageConfig[hard].box;
        var rewardID = BoxConfig[boxID].reward;
        var conf = RewardConfig[rewardID];
        var num = conf.num;
        var itemdata = {};
        var totoal = 0;
        var reward = {};
        var max = 0;
        for (var i = 1; i < 7; i++) if (0 != conf["rate" + i]) {
          totoal = conf["rate" + i];
          if (1 == i) {
            itemdata[i] = totoal;
            max = itemdata[i];
          } else {
            itemdata[i] = itemdata[i - 1] + totoal;
            max = itemdata[i];
          }
        }
        for (var _j2 = 1; _j2 <= num; _j2++) {
          var random = GameUtils.random(max);
          for (var z = 1; void 0 != itemdata[z]; z++) {
            if (itemdata[z] < random) continue;
            reward[_j2] = conf["item" + z];
            break;
          }
        }
        var gold = 0;
        var gem = 0;
        var str = "";
        for (var _i2 = 1; _i2 <= num; _i2++) {
          if (void 0 != reward[_i2]) {
            str += reward[_i2] + "--";
            if (-1 != reward[_i2].indexOf(";")) {
              var rewardarry = reward[_i2].split(";");
              1001 == rewardarry[0] ? gold += parseInt(rewardarry[1]) : 1002 == rewardarry[0] && (gem += parseInt(rewardarry[1]));
            }
          }
          this.createRewardItem(reward[_i2], _i2);
          this.openbox.active = true;
        }
        if (gold > 0 || gem > 0) {
          var golds = Global.gold + gold;
          var gems = Global.gem + gem;
          this.GameMenuController.updateDate({
            gold: golds,
            gem: gems
          });
          Global.saveGold(golds);
          Global.saveGem(gems);
        }
      },
      initTreasure: function initTreasure() {
        var BoxID = StageConfig[Global.hard].box;
        var BoxConf = BoxConfig[BoxID];
        this.treasure.normalSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.pressedSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.hoverSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        this.treasure.disabledSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", BoxConf.icon + ".png");
        var animation = BoxConf.animation;
        SkeletonDataCenter.addSkeletonDataWait(animation, this.boxSpine);
        this.treasure.node.y = -GameHeight / 2 + this.blockWidth + 35 - 20;
        this.boxSpine.node.y = -GameHeight / 2 + this.blockWidth + 35 - 20;
      },
      createRewardItem: function createRewardItem(reward, i) {
        var _this4 = this;
        if (this.rewardItem[i]) {
          this.rewardItem[i].destroy();
          this.rewardItem[i] = null;
        }
        var start = 200 * i - 400;
        var node = RewardItemFactory.create(reward);
        var location = this.treasure.node.position;
        this.rewardItem[i] = node;
        node.position = location;
        var action = cc.moveTo(.5, cc.p(start, 10));
        var action2 = cc.callFunc(function() {
          node.getComponent("RewardItem").setFinish();
          _this4.canTouch = true;
        }, this);
        this.openbox.addChild(node);
        node.runAction(cc.sequence(action, action2));
      },
      efficiencyAdd: function efficiencyAdd(id) {
        var conf = EfficiencyConfig[id];
        var gem = 0;
        if (1002 == conf.costtype && Global.gem >= conf.cost) {
          gem = Global.gem - conf.cost;
          if (conf.coin > 0) {
            Global.efficiency[id] = {
              id: id,
              coin: conf.coin
            };
            this.efficeGold += conf.coin - 1;
          }
          conf.jumptime > 0;
        }
        this.GameMenuController.updateDate({
          gem: gem
        });
        Global.saveGem(gem);
        Global.saveEfficiency(Global.efficiency);
        this.GameMenuController.updateButtom();
      },
      onClickBtnaddGem: function onClickBtnaddGem() {
        var gem = Global.gem + 10;
        this.GameMenuController.updateDate({
          gem: gem
        });
        Global.saveGem(gem);
        this.GameMenuController.updateButtom();
      },
      onClickBtnaddGold: function onClickBtnaddGold() {
        var gold = Global.gold + 10;
        this.GameMenuController.updateDate({
          gold: gold
        });
        Global.saveGold(gold);
        this.GameMenuController.updateButtom();
      },
      onClickBtnsubGem: function onClickBtnsubGem() {
        var gem = Global.gem - 10 > 0 ? Global.gem - 10 : 0;
        this.GameMenuController.updateDate({
          gem: gem
        });
        Global.saveGem(gem);
        this.GameMenuController.updateButtom();
      },
      onClickBtnsubGold: function onClickBtnsubGold() {
        var gold = Global.gold - 10 > 0 ? Global.gold - 10 : 0;
        this.GameMenuController.updateDate({
          gold: gold
        });
        Global.saveGold(gold);
        this.GameMenuController.updateButtom();
      }
    });
    cc._RF.pop();
  }, {
    AcceleratorConfig: "AcceleratorConfig",
    AttributeConfig: "AttributeConfig",
    BlockBigFactory: "BlockBigFactory",
    BlockSmallFactory: "BlockSmallFactory",
    BoxConfig: "BoxConfig",
    BoxConfig1: "BoxConfig1",
    CameraController: "CameraController",
    CycleConfig: "CycleConfig",
    EfficiencyConfig: "EfficiencyConfig",
    GameState: "GameState",
    GameType: "GameType",
    GameUtils: "GameUtils",
    Global: "Global",
    ParticleSystemCenter: "ParticleSystemCenter",
    RewardConfig: "RewardConfig",
    RewardItemFactory: "RewardItemFactory",
    SkeletonDataCenter: "SkeletonDataCenter",
    SpriteFrameCenter: "SpriteFrameCenter",
    StageConfig: "StageConfig",
    ToolConfig: "ToolConfig"
  } ],
  BoxTouchView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ddac9hkV9AOYdTysYQNeqW", "BoxTouchView");
    "use strict";
    var TouchView = require("TouchView");
    cc.Class({
      extends: TouchView,
      properties: {
        controller: require("BoxController")
      },
      onLoad: function onLoad() {
        if (this.controller) {
          this.controller.touchStartCallBack && (this.touchStartCallBack = this.controller.touchStartCallBack.bind(this.controller));
          this.controller.touchEndCallBack && (this.touchEndCallBack = this.controller.touchEndCallBack.bind(this.controller));
          this.controller.touchMoveCallBack && (this.touchMoveCallBack = this.controller.touchMoveCallBack.bind(this.controller));
          this.controller.touchMoveCallBack && (this.touchCancelCallBack = this.controller.touchCancelCallBack.bind(this.controller));
        }
        this._super();
      }
    });
    cc._RF.pop();
  }, {
    BoxController: "BoxController",
    TouchView: "TouchView"
  } ],
  CameraController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "093f8//Ck1E6rTLYhnjG5UD", "CameraController");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        target: {
          default: null,
          type: cc.Node
        },
        camera: cc.Camera
      },
      onLoad: function onLoad() {
        this.startFollow = false;
        var canvas = cc.find("Canvas").getComponent(cc.Canvas);
        this.visibleSize = cc.view.getVisibleSize();
        this.initZoomRatio = this.camera.zoomRatio;
        this.centerAtStart && (this.node.position = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO));
        this.previousPos = this.node.position;
        if (this.pointerPan) {
          this.overview = false;
          this.speedZoom = false;
          canvas.node.on("mousemove", this.onMouseMove, this);
          canvas.node.on("touchmove", this.onTouchMove, this);
          this.pointerPos = null;
        }
        if (this.overview) {
          this.jumpZoom = false;
          this.speedZoom = false;
        }
        this.speedZoom && (this.jumpZoom = false);
      },
      onEnable: function onEnable() {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
      },
      onDisable: function onDisable() {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
      },
      SetCameraMidPos: function SetCameraMidPos(posy) {
        var midX = this.target.position.x;
        var midY = posy;
        var midPoint = cc.p(midX, midY);
        this.node.position = this.node.parent.convertToNodeSpaceAR(midPoint);
        this.previousPos = midPoint;
      },
      getOverviewTargetsMidpoint: function getOverviewTargetsMidpoint() {
        var midPoint = cc.p(0, 0);
        var minX = 99999, minY = 99999, maxX = -99999, maxY = -99999;
        for (var i = 0; i < this.overviewTargets.length; ++i) {
          var target = this.overviewTargets[i];
          maxX = target.x > maxX ? target.x : maxX;
          minX = target.x < minX ? target.x : minX;
          maxY = target.y > maxY ? target.y : maxY;
          minY = target.y < minY ? target.y : minY;
        }
        maxX += this.overviewMargin;
        minX -= this.overviewMargin;
        maxY += this.overviewMargin;
        minY -= this.overviewMargin;
        var distX = Math.abs(maxX - minX);
        var distY = Math.abs(maxY - minY);
        midPoint = cc.p(minX + distX / 2, minY + distY / 2);
        var ratio = Math.max(distX / this.visibleSize.width, distY / this.visibleSize.height);
        this.camera.zoomRatio = 1 / ratio;
        return midPoint;
      },
      shakeCamera: function shakeCamera() {
        if (!this.canShake) return;
        this.scheduleOnce(this.stopShake.bind(this), this.shakeDuration);
      },
      stopShake: function stopShake() {
        this.anim.stop();
        this.camera.node.position = cc.p(0, 0);
      },
      onMouseMove: function onMouseMove(event) {
        this.pointerPos = event.getLocation();
      },
      onTouchMove: function onTouchMove(event) {
        this.pointerPos = event.getLocation();
      }
    });
    cc._RF.pop();
  }, {} ],
  CycleConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e769cipDIBID5RgS8EO72yu", "CycleConfig");
    "use strict";
    module.exports = {
      11: {
        num4: 1,
        num5: 1,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 1,
        block1: 3,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 6,
        id: "11",
        size: 40,
        num2: 2,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 4,
        block6: 0,
        num10: 0
      },
      10: {
        num4: 1,
        num5: 1,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 1,
        block1: 3,
        num3: 1,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 6,
        id: "10",
        size: 40,
        num2: 1,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 4,
        block6: 0,
        num10: 0
      },
      13: {
        num4: 1,
        num5: 1,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 1,
        block1: 3,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 7,
        id: "13",
        size: 40,
        num2: 2,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 4,
        block6: 0,
        num10: 0
      },
      12: {
        num4: 1,
        num5: 1,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 2,
        block1: 3,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 6,
        id: "12",
        size: 40,
        num2: 2,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 4,
        block6: 0,
        num10: 0
      },
      15: {
        num4: 1,
        num5: 1,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 2,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 7,
        id: "15",
        size: 40,
        num2: 3,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 0,
        num10: 0
      },
      14: {
        num4: 1,
        num5: 1,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 2,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 6,
        id: "14",
        size: 40,
        num2: 3,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 0,
        num10: 0
      },
      17: {
        num4: 1,
        num5: 2,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 1,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 2,
        block9: 0,
        block8: 0,
        block4: 7,
        id: "17",
        size: 40,
        num2: 3,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 10,
        num10: 0
      },
      16: {
        num4: 1,
        num5: 1,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 1,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 6,
        id: "16",
        size: 40,
        num2: 3,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 0,
        num10: 0
      },
      19: {
        num4: 1,
        num5: 2,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 1,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 2,
        block9: 0,
        block8: 0,
        block4: 7,
        id: "19",
        size: 40,
        num2: 4,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 11,
        num10: 0
      },
      18: {
        num4: 1,
        num5: 2,
        block5: 9,
        num7: 0,
        block3: 5,
        num1: 2,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 2,
        block9: 0,
        block8: 0,
        block4: 6,
        id: "18",
        size: 40,
        num2: 4,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 10,
        num10: 0
      },
      20: {
        num4: 1,
        num5: 2,
        block5: 9,
        num7: 2,
        block3: 5,
        num1: 1,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 2,
        block9: 0,
        block8: 0,
        block4: 7,
        id: "20",
        size: 40,
        num2: 4,
        block10: 0,
        num9: 0,
        block7: 11,
        block2: 3,
        block6: 10,
        num10: 0
      },
      1: {
        num4: 1,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 15,
        num1: 1,
        block1: 13,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 17,
        id: "1",
        size: 100,
        num2: 1,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 14,
        block6: 0,
        num10: 0
      },
      3: {
        num4: 1,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 15,
        num1: 2,
        block1: 13,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 17,
        id: "3",
        size: 100,
        num2: 2,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 14,
        block6: 0,
        num10: 0
      },
      2: {
        num4: 1,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 15,
        num1: 2,
        block1: 13,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 17,
        id: "2",
        size: 100,
        num2: 2,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 14,
        block6: 0,
        num10: 0
      },
      5: {
        num4: 1,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 16,
        num1: 1,
        block1: 14,
        num3: 1,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 18,
        id: "5",
        size: 100,
        num2: 1,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 15,
        block6: 0,
        num10: 0
      },
      4: {
        num4: 1,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 17,
        num1: 1,
        block1: 13,
        num3: 1,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 16,
        id: "4",
        size: 100,
        num2: 1,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 14,
        block6: 0,
        num10: 0
      },
      7: {
        num4: 0,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 4,
        num1: 1,
        block1: 2,
        num3: 1,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 0,
        id: "7",
        size: 40,
        num2: 1,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 0,
        num10: 0
      },
      6: {
        num4: 1,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 16,
        num1: 2,
        block1: 14,
        num3: 1,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 18,
        id: "6",
        size: 100,
        num2: 2,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 15,
        block6: 0,
        num10: 0
      },
      9: {
        num4: 0,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 4,
        num1: 2,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 0,
        id: "9",
        size: 40,
        num2: 2,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 0,
        num10: 0
      },
      8: {
        num4: 0,
        num5: 0,
        block5: 0,
        num7: 0,
        block3: 4,
        num1: 2,
        block1: 2,
        num3: 2,
        num8: 0,
        num6: 0,
        block9: 0,
        block8: 0,
        block4: 0,
        id: "8",
        size: 40,
        num2: 2,
        block10: 0,
        num9: 0,
        block7: 0,
        block2: 3,
        block6: 0,
        num10: 0
      }
    };
    cc._RF.pop();
  }, {} ],
  EfficiencyConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c635fRlwJLmYFlEqk8R9O0", "EfficiencyConfig");
    "use strict";
    module.exports = {
      1: {
        name: "金币2倍",
        title: 10016,
        time: 1800,
        costtype: 1002,
        cost: 30,
        jumptime: 0,
        checkdes: "last s%min",
        coin: 2,
        type: 1,
        id: "1",
        desc: 10018
      },
      3: {
        name: "金币4倍",
        title: 10016,
        time: 1200,
        costtype: 1002,
        cost: 100,
        jumptime: 0,
        checkdes: "last s%min",
        coin: 4,
        type: 1,
        id: "3",
        desc: 10018
      },
      2: {
        name: "金币3倍",
        title: 10016,
        time: 1800,
        costtype: 1002,
        cost: 300,
        jumptime: 0,
        checkdes: "last s%min",
        coin: 3,
        type: 1,
        id: "2",
        desc: 10018
      },
      5: {
        name: "跳过时间",
        title: 10017,
        time: 0,
        costtype: 1002,
        cost: 300,
        jumptime: 14400,
        checkdes: "skip s%min",
        coin: 0,
        type: 2,
        id: "5",
        desc: 10019
      },
      4: {
        name: "金币5倍",
        title: 10016,
        time: 1200,
        costtype: 1002,
        cost: 100,
        jumptime: 0,
        checkdes: "last s%min",
        coin: 5,
        type: 1,
        id: "4",
        desc: 10018
      }
    };
    cc._RF.pop();
  }, {} ],
  FBPlugin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75c587Fo41PHbXljhPIbwGc", "FBPlugin");
    "use strict";
    module.exports = function() {
      var sharePng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXwAAADICAIAAABkqc1KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjJBRjAwMkE1MUE1MTFFOEFCMzZBRUJENkEzMUQ3OUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjJBRjAwMkI1MUE1MTFFOEFCMzZBRUJENkEzMUQ3OUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMkFGMDAyODUxQTUxMUU4QUIzNkFFQkQ2QTMxRDc5RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMkFGMDAyOTUxQTUxMUU4QUIzNkFFQkQ2QTMxRDc5RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoyVaiMAAJQaSURBVHja7H0HgF1F1f/Mra9vr9lNJaQXIIUmTcRQpIMKin5+tg8VUbAryKci6qdiJ/4VRUQRVHooCoRgIHVTd9M22U0228vr777bZv5n7n379r3N9pbdcA+bx3u3zcy9M7/7O2fOnINLS1Cm5PrRlJBQtN9dThMmvgkSKvIOdjBGiMM9P2n2Xkp7b7FPwSjrFDqKUqj1L+sKmAZph9ORJlgE5IgjoxYXJgWjvATuYxvBKEE5klGKRMeyFMpAx3l6Dug4MgWlnJqLsYmHwESGhQ9hyu1DYtKCCvhXQc0KZJKxK8JA9LDz8BzQcWQqioiQB3gDcJMxBZ2kdc20SFYp5piCjvPsTgLoTJjWl6l5jr7Qk6KsOk3otwmxlMFlbAcxPeEnGdMiqNORTkYTHKbjyNgLswrDPzwamoM5jDjri30ZDmMu+5KW7XlUEEQcpuOoV46cGiJLnCDiEY9oQBaeQzGVtqioRU1EVJ3jkMALhW6hVMASTWlYsowFnh9NPXUHdBzQcWQKs5vuqSEgIJWVnjmneYk5kiENxIYQtLdZfakmvKNLMQXe5XYblHZGY6EEbfO7z3AJRYhwPJ45yze90j0a3Eia5KltEefZTSLQCUVxPzok7e+YzF2j0Twrcwfa2xAais45lpUfVhMmZ+WH2IQRVx5nwI8gIL9PIGQkiAMEadsxZe2OzgZdOP/dl1526btPn3e6aZq7d+567oUXdu7a2aYZl/hcMwTqcXEBv0hHATqCQSby5g/6FCZzzxm0CUOvvMN0HBkH1kOBrdARgA6H0fGQ8WhVV4PG3/HZ2z9/xx2BQKC1tZXnuCvXXH7TzTfff//9f3viySpFKxJlRFgpowEdON15WBMvnHMLHBknGa4dGWiOaaKN9fE9Hdq1115z5513JhKJr3zly1dfffX7rrnmO/d/b3plxb333LP67NVH4slG0N0wdm7yqaZeOeLIqPjO8EEqljRrWhRPbt5NN1wf8PsfeOD7a9f+FhNiIlRbW7tw/oJbb731vZe9Z9vWLa068xLEyDEFO6AzBPVyxGrkRIpT+ZMiSRMpBgUSs3X79oaG4y//61+Ykpn5OdFksi2RPFJfD8eUlZSKgqRNVtXI6TlDAp0BShpuzUYjmYaoodjMRlYZp/LjUfmKEWhTfUnAxZ0xzXO4JrL2V78mCEdjrIzWSCxmmLn5eYsWLQRmU3/sqKYlZVnmxnmYOT1nnCrvqFeOjI1kdupuv74hqWCZ014eCV85zzcrV6ztVA93aVuSOGoKvqLCedOm3XTjTRdfcOGGDRvWvfiiREiZxPOI9lkKHTIAOhbNU029cuSdI10I1yOBs1dCYJroMJtq4ra/MO4HC/r7aX+WeiSTcDtbEsuWLLvvvvuWLllSWVlZU1Pzfz/+ya6qHXmSGKPc5ha9NplAGdNXQywiLZozezXJQee1f79d+tZflL//BmMDcd0vCUIQlTwfukuYd3boi1fzfpzexVbKtJu+O77NV86OPfglEm/FAt/9VqTUIPLZl7s/9v3I588j8Th28Wy5YMiUVl7g+e9vJh75gbblVeznbTvhj1rJSxFKnMdlybve9e4H7vy896Evmo2HsNx9S+H2GSZXVKHd+8JHPn1bTc3uCQUdzB9Ij2iMDnRS1KnaaJCeYjrxZ7+7EOYxjqhqh6LPdbtj0eje6mpFUYqLit5/882NTY1V27ZXxbWGVgG3Qik065oZpItmT3Bl/bRKBHx0utNJAJ2hK3ulJWWyIBC2KiabmFIE2wVJlrEVPwn3EG44GHbxoqhzOHVi9ykUI4nnZNklYUq6F9gArIgcJ4mSwXM9q25AdByOIXNy9JA+79gAgZTGXOCmlRYXazw24SbxWdoCx3P5JeWiKE1w5WE4G1m6ljWas4vCls6VfoYkc5lExpG89Qt6gsBxosBv2br1E5+5HZnktDmzv33vt2+99VaPx/PZz32uvbkp4HYJvJC1Dh1bQbwyfpqo71Ls7xSN++zXaXNXw2ftoc2ToedMkm4/DKbT2dlRbj/VbGTp+d+Ju3p97/XUMU4t6MMZ3Br3cbxKTtptnYSi61pnV6cvqVMFZUV6MBBNKh2dnYZpTHCV/IiUDTiE4c6qQF4yInLlI+JCWZ59NkkJE9ykqHFVNQjleS6AqTsRMyjdsb3qe/ffv2DBggsvunDlyhXPPP2MZBplAiY0C1UUzEW6cQjQJ5/F/erXfxBYenDceg7H8S6Xb9q0Svje1Lg/mYxZU/9TA00mkU2HxINmm87erlz37WOvEpXEQ1RTzBZEFYp4M92BSCuiiQRVE6QjSCIIy2aK5sCfgUi4AxlJsy1O4gi72S7SCb0ghHSVBCNmK8JJM0WDk5g6RDjruQmcP0ByXNglpjQH6NAEY38u5k6CebSEmsssrjMA6LRSvgaJptU1oAfNQkZJdkQuO2rXBsVoVjSX2wNYoSrKEp90jgy7uH9H1eqamj27d7/v6qtmzJghcLgUkWVII9lUpoHyUSSRFOjQWUgvQv26RuuI1ozbPcnJLamsXHTTTe+H78FguKGhOtjV5PTc4YGO6M71Xfdp34KVCGeEGCDWw120ChWeVvLQH5BAkKnCGDB1pMOuuCGtvoTLyfV9/bdIj1NTpbEwn1ckSRa3njYTTV9S+H+PITVpdQDC/DRg45JVOZ+5F113BEmp8eP+f4/hNzYh4lh1UtoMV1Tpv+dRqitMZcUYE0KSCU52U8mlSp6Jr1BaqRkAdPo7JUM7RAqlQHMWLFh09113Bbu67v/BD46GOpdLbg+mOqWgqUuiiKw1FrRbXzuhFDxwKb1KHD8pLJw+e/bs/Px8+A5fFCXqgM6wQWftr39WWFJGMeo9JwH/dr6IOBHJLmTqhq56efzeSu/cgKjlSHr1BoZMvIAw4ctniwtWx9569o/7g2HN5HbvQOt2I5eHvaVNLRV2bv8e9MpOZo3ufmOLorS7U3WITo8WVVsV+8mnEvk5tpGMGgZfUOb57/sTv/+G2dkYj8ZI85GJr9UI/IPpCYHToZe4MOYwXr1yZUFh4foNbzz71NMvhQBWUV1Cu/iS85YuXx7sCh6qreUo9THL0eAMeIDQYuPaqaAdPOiHVjeGLxg7E/TDB53frP0tZb2iL8cIBkNszoHFbsLIRVFgDjd3Bo5qADWEdQyeozEknXu2WDE3+Jtv3bteUewOA38cn1IQeq5GrOGUem/BFWUhyfMOzem+QeEuY+cGTez+qSNh2jT6gS/rm9cZjY063LH4RGvp9pOkAzIdtp/rd8BDxzEpZrYhUThYW/vPp5+6+667v3DnF8Kh0OZt2xDF51+w+t577pleWfnII49s2bq1WBSLOEun7F3KQASGZoftImhsfBr7uScpSX93uu4IbDoqaNmov4BwNA3wrP9FdQoKE/tL7wWVHzQvU+eMKKZKT2cxB3sHQW/lnSeVrRUIHBIzxo4o2pzQ2sihCZ8JzvHxFXniAKADVTbiFId7pqyyJhUwys+X3R6evWoSQNRCv35o7bRpFTfdeOMfHv7j7j27OI5fvmxZWWnpU0899f0f/tAId102J2+Bj+s1oQmnxyIU9zOlIvA4p1CW5J6SmZ9OU8LpUJMXdFyuIVt/EJouo3AsI80QdLYkohpbMSPqJOBBjtfNyF+hJqIKoUYP06EK85GDTwr/x4RNR0+sVJa6zlzopVzf2o49D0ka1U17FKql3GpoBksC5WPmDG/FdOgWdJFOhIDw+6rjX/7q16qqdrzn0ksrKypBPanZt++nD/7sscf/Fm1puGVJ0Y3LcjwyNjMmzO2MV9HDCleTNEhvRg63R3YJp8/1FRZJaZdABY5r6nR61MkEnV5ruoY7l5Y+Pcfr9Vz/AXnhIhe8c3UVEYJlGemEL5vJFU6TPvVd3zfvD3cGx7YlY1X5gWWc5heHVXm+Yo7nlut8JaWptHKEYl8Ozi32fOJ+GgklQ505jzyS29Q0kZUXOMo8q/oHHWRFID1xYw9JwYy9gS7ukbnL5/tFgX+quvOhX/4ClKm8/HyB54PBYCTYVeETPrCibM3p3oCbA+zIzKtn+2BgPJDGBHUQMippcOPYcziOToAFaSp2+3FaBoGJ7OW8uVRRpdWXYZ/f2LmR6gkSD6qv/hW7vMgxqo1C+NLZ8ntu45oP0FgQdAaLRRD1lT9h2c2VVMjn34SffhE1TehECbWNcgPadXvton1dAf5AY3ID7szzzSuSthxL1AWTMaUZds/xC7NnFKyo8MwuFGUBjyz9Fe02JPZZpTEeA1gA8XjYZCJ84ThnydG4go4SU/768+jTiLQg37e+L8yeFb3/cyTSgS1H2SQ89bATfmlUQtqOxn7yJbOhDmfqvAbiSvLpj/49JZqAB4QGQUDzi6XTCiTFoKrGAEaWsEfkAGMJnSy+6QNLNHykptp87DH2vaZ6W3vbMaffDg46I4+gASzXg7EPY4VgiUe8jP0io70iZ7EgNAGWzskfu2TElfe6KScI2CdiP8KuDM5oEOxzjeN8zHCIzygrwSgPYhObPh77rPVlNNXE0VZsUIVnrHqOEg/H40eP1LXAd0lQE0rkpPecyQI641JLuCSbvaJI636l6SabycLWjKWJAl6UkE9BOJjAYU1QUqWqDeEp4sBMy6oygOlgwiqPhz/++9WGxrNieDzvCUEFLnegOCcHvkfCYRhrHjmKkNPtx0m9EkR+7kJxRjkJB/mK07iCCnHVe4jSDkouc1ZOKrhjEzKSY1YaRgGOeS8TKwUk589BvECjIXpCBlosu7E3lwZb0k4THGaO9BGCjOHcVUEQc3JypWTMVJQTvUK4vBKaiNCk0iuwAuY4HMhHpkEiofRZPEZhEynDTPuGAwXiOZfxHfVYlC2bDqXJOHzH+cW6d6CEDy6X+/R5S7xeH7WnDwnJsL6yL4l4bPeuzSMYzJx1Gdr/UO81ncRlr7Tjeq0WHhGgYNy7FNxXKelKcuNKCsnRZBzBnyMTATrYE3DdeLfsRiTcbrbVma1HhKWr7IRGnC8grr4abzkLJY6OVXFFAvpQPjdLYp5ANERc193Al5QrT/yaKF1Y4NIvTWpScelZritvj//kv0hSxYBSlAFWnYb+3EWa9WGUWFpa8fGPfLb87X8qVRuxn8uc/gXxf/7e5OuP69s34HRwO8wWqHFen/uDd5odjcknfoO9qfEBaudTIfpajA4d9WgiRDqOu67+ePfafIpFiSuZSVqPUl2NHqtBar++JyX5Bfd/5gszyq1Qf5Ry0+bScDuJha01BRJsa2xpWvOxa4b7CKDymkEtT86+D4DhTcwsSDEsDy2SIgVs0YxqUDI6aw2bQctmR4SmSmEMm1DNpKre46anmY7D3qkCOuxhh9vjjz5oHjqGvXacAmvgaYivyHcvv3hspw28HD7DjWdI1hLTGPLNns1PnxPzsVV/WOyJ0QLDWi4t9px1btjLvJuxK/XKy+XRU9zwPPh9vsCKFecV165XRcR5Ml6dVkaUvOUrE/tfVV0Iu3tCzFAY1F7Rt2ip2eiJ2Wd1v5S3JdCwsmGatTtjP/pkxC3bV6A6Ecqn+e/7R+zHHzcaj8cM3WwO9/tcOptjD94elSx7LKU5P/m38o+fquvXsbvBHPZxLKmP4BFsaTG64tEBsvzCDQ4rFGCF645hUo+EFsSnGAhBR+o0d7MxSrdduHhXnJgkRWEA5Y4g8bi9VAcjUcMHDyYlSU0XYjpewqcS6DDfHF5mboKuTD8weBmJVNfG1mfBIDSumnYAF8A1lm8J3pi6QbWMyA/WunZqsMWoRFPZLi61hD2uDts8qRt6PBpBVhHw9swAHXvmmFJDZ0XwZg/osCN1a5WZfRZJv/eTwwxEQXWddHUSPv0TEShIVUjrMdLSRjiLRfT3WDTT6AwSiY1IVlVTJ9Eu0t6J3d2VGQnmoKY4DUUGaQbG2IqSlBLQMDND/jV1kRPV4RHhDk47BFEW0jCjFBMd68hOlIUpCjggcMqADrw2RYmBjiikFoWyRVhAPSQ05g4LUJYkIKxZvl+E+bcKPA8ah8jZ82W24kMw5QXB3mUISebhwmxAJhJ5xMK8DA94MM8jQWL3T0g30ISaWEvQoBzREDlO7FGviGGwKvECEUTMzuJTTMc0kCBSNJyxTiwI43pAh2oKQzpNYctUhIEgPcLzpmJSs9unhoDKkWRxedJUb2QDH3gSj4dQ8f4vwNmxmk4wFWWZxYb0kMyhl4KR6WDAKQM6fMl0791raazVCi1FsWEQJYpdPuzLNf2Fo3cOzAxZFvdI8ke+5Z9eifQkxZyw8DzeH8j5xq+QofSEVWURZygqmYEKK3O/87SaiHNEZwYAQqSaPfFf/hTe8cOrgcvv/th90pUfxvAqJQYmmMSC2OUBBMEVc9233uW++AYkZM5nG0h0oWWr+QVnccUVbC0AnMUYkBb7zW+MzreHgbGFxfL5Z3vKprG1+8xWhbi8PFwy03XDnaSjI97RhF/ZgLpSDt8VFbNWrrqQUOsNT2muQIqLcz0iM6iy8J0VpwfW3IoqFyIZnhn8w0qwE/3q4eE+hXJkzrTm0caQwbKIXAi3Il634BmuXITMXDSWYY0BvTdndKRhZb6ePBKaak0YF9Chalx7/a/mmavZmDeSNJnky2bJl9yqvvIIaTyU2PIyjXaNitkgtNKPL8vFCqG6SSsrcks76/gLroAxr771HP/K77cE9X+04LiJuR6HIBYegWgbif7wWbOmf2yuR1WTJBEVl7575kXXferfz7TW1ohsKSBzfHkyRBq0ARsYbEk++6A+bzEWXRQaqKmcKMvX3K5vewUf21e/9ls/O2IQXso0cUDxMPATv39xeUnubUun+bGaVDWkxlw3fOmKd+2pbNxpGgrGXJ1GX4wMMqz4GQs9t31D0qJUjWF7jT7C+o7XxPkrkSR5cyq5nR9Mg86ymTO+ft37GORJHm7GfBQPCaFmLjWoKdr/9mbV31J2Ngu8IHmhkm2ofgRPpBCRucgYc9AJIq6TgU7K8acYkZmj9dTJVswBdBzicYowHTWpvfaPxNv/sBGCRJB45hJh/irlz98lja1JUGtGt7IXiPxZXnRLMU6NHKXFfOR3evE0ftqc+NpvuXXl7Ub0m3pknGCetYn1Xgl97BykGEjvRO7rj+Zf/ZGrfLzhRTgnNQ/1Vhw3aAMNHxLp0l76i/Jat+qkIt6NxNVrks89xL/1Wm0MPVTd9/wxVGCPjC5firxuZkuiUSTOP2elly7yGJhn7GNTHA0KOix0kZZI/O4Bs7kOW0CJAM80FfMyV1SMvvSHTCJJ923Rf3oHihOuvNT9pV8pT6+Nb3oDu+0QJdRrJh/Ywe20hjW1DMkc0kbgQZXWTscWdHrhC80oaIyYjiOnDOhAf5Ewku0Y/whLlikHRJItGj8GyWANmhGe2cVhNzPlMJOKJBGkuH24pNCyI9MTDY0oIDHzNtUxdlHQgLAgAkHITNREhttAxKKlMzYDpVtNLM9HOu7b+uQTkOxBmmCdpVkUSHYzCxE2YNMQbco0mTBbDpkNR9MG4NSL2wjCLpzhrKJHEySYoCGE3BSZJo22m8frsSfVWICvxjYUQz06qADVyxkLtjsW8EPx+JbizF1NJdAZRI0kiEQpSaZ0IRpGzB3ONEgoQroQEeloXzEUyYSSDjPdccwQjEOVWVJD0a4oKhOpIGdZVDJluowirWy6FCpDY0mqJ0koStoR7p6HotrgtkrWwHgKgJj51qOyaalYSOtEHoBBH5b6GRCmgTwxFDfsiyA2yxYPk86kNbVnmtoQbwGz3KJeaTk4Kw0DBaKp9GwsqyCh41YCD87yAaSpfAvWiQpFs0tQWO0ZfsNyl0s/ehzrA15Rdm6ZQTPS9DqSOfLRgepjuwJmpbKx/g0l6Y39EyqZO+rgrifdpDL6Qie4CQOBzshyhiLrtS9dcJFnyRmWTUdFis5XzuRKZ3o+eBfpasPRIP7b0ygaG4V+xXvPWln47gvYmxr6kamiRBJdcDnKyS+8/ZsoHnUdb/I//veoYfbZBPfs+cK11wqmRuNJ6YwL+Ip5rjUfJKtaccBrh2Hmnvwnqh/Id5EL5LguucAzex7jbtBAzUCygEtnS2s+xs89RzheL/zjOc3om7XMXrzAvOJyr8gzkEqqwtzlWODct2jYLcPtkg8eRk8/O/hTEEQuv5CqXVgSgb8wlgf3wTBxfhkv8Hn5Rd7WRkEQE4mYv7CElyMssFdBCZJcXKBIKPbzbjfqHt45wRCna6PvSWnqCdcsKpJLiuVR0hAgxMdj5r5m0BxPDI7DILS4WC7Il0ZThEboi41Dchke+ViYNDJ5mjA+Hskur3zph+T5i2giiIhmRZ3Cxt7/CHPPwJILl8/D694YDegYhD57uGuXUa9Tkyk3JrNJkNd/xKbJWNRyUY+3mP1zZxoolFZfjvQEVIwaOmlvcV/3cbPlGKgeiLdC7728HqGBQAfnlbluuFMuKaHhVub/wyqAzZq3+IIyoahcNmQWXKIf0HHlFKCzLpEAYnSV6VN1u/kZizyzlpiNh6E+AvUi9Oxg49vkckv89/wZymX2aSidga8dDkugOSU//fnfNE3FVDE11SsIeSJHCWU4FSj0fPTb+JYvZxp9xK9/Dr356pio1Gn4yc+XTp/nG2WcNmbjatfF9jhV6YkxcuF1Vlrqmj3LMxpoY0G8Gh1159Sw6SBMwu3RB24ndbU4QC2XEMuNxeC58kL5gZdHa/+j5GDt4U3b63me9uj9DNrY+qZLrr7hjnefm6PtM5SgLPcwb9VLxGXvkq//Av9/H4vcfQOWGXcnnURaebbn019L/Onn+qbXsJ+Zf82jgy0Ihi5PTeXh76mv/4vLs1UygD2D7eA48j8/HujtWrMl/r8fEWxvGg6ZLUbgnv/DMhd78D6E4kpscNJhHNgavf+DXq8HVDM+kO/98sPKw9/S66qxyFursw2Z4yQlyRXOdN96l7Fve/iF33J5eaBPYmr4Jf6O3dob7TpO+atwmjIOIRe6AyaPhuukHuxAAXoopaMy6zgOyVMJdAZX/EBP0UJU7WDuLzSlglONIt2DiR6J9aiRI9AhoTd6ZFPIM/t6AZqFfnz+yhXa+kc0GGaZa69A7csLeOYuCCOFJNXUZsbD4qCYIC0I2gqSUoHhBx/5OqFqGBrIlnp3N5AFemHpfQf09CMaVTtTwUaxlXoH1ENdoMlOAB06BCdBmoiah6sNkdmSSF4AqQmjbpdRvcsOV2TrOTSB+PIkSkZIa4Ox6xBXbC2FZfZvtG8nOmJlAAcqBsf6fSy28hR1UZkMMspbNxm8bCa4CQOBzmgVv14OpKnXyti8XIApCP3U/bTKkmQ0RlQdmxlJAamdF9DoXQV79QS2Xqx0+OhHs4P9DvG20BN+4n5tuH0/Ba7bGJzyfuR6Zt/SOYLS1+w+2F73GMhD5T72PRLLsrOOPd05hZBlitpxJmcTxm0ZhCByhWVU6WRhpexxRU34jyussHJgjWVRPC8EArmiyPLHJlUlNzef9/ppUTnWXGwRRmrEUWoQIbeEE0WhZIahxFh0MdglxbjcfCS5cH4hV5qP/V6mo3W2I2UwB2XQo/IKufICLseXokaE6Xcsz5EoD2jw8nAlhdZSEIsWcRHs8WJJ5EqmIRTjQipq6RgE6iSZy8/lXBJTr3ILkCDBreZKWi31ygq1wwtUUbniUuTy4kCeUJ7PF3htDEhgNDvUVdMS78GrSS10qNg91SSQO9Prm9bRtguhGHqHyfiADiVcIM9379+Y25weZ9MrHM/cYXQN+IRq6mPqy45mVM781pe/e+aK81RVIbouu10S5tD9f0/HJ9RMEjbZyi+FE8LE5f7h+jxsEi2OiIE4AUsuqJ7n4/eh//qWTQ2EL34cbXtrQBWJLd10f+pH7k/czwzSpoYwhwUZmTrLl3Ps6ACsR1h0vv/eBwMeF4soxBxjJE5yUdMI/OApgEb3hlfRNz43yDObt8r/9e/nFBSwpa0soLnk+Z+fImKmOJvbRzkZbjUiSQ7YYNFM5YLrkzTlu8NhrD/wDdTy7BTpn3igPVM55i3mXDQji5ADOqPGnERE+cO3oi/9zKL6hMaSwvzlvo9/N/rrL5D240nD8OmtY6m+tjegX95BP32vq7Ai8cj3krGg6pIt7Yv1Sh+Pnm00/vdgkvmosAXo5PxS79rlUlw3jVBMvuRm+YL3KX/6kVFfjVlmHMteU1c7iMGq9VjyV5+N2jk2gb9pOna5At/8i/LPnxu7/hONxKjRrz3YOLAl9v1beIFjrnrxmP+rD6tHdijP/hELjCYpbeHB2yu6gN7Ffv1Vs7kWyxKbBeNFyzvB4Ior/Hc9HF/7JWNfFXILOVjbH8VfPWAcjJo2scOYN9XGMbcg8FYoNduHGN4rMo9lAY8gC3RmnFOeLePFXEYgLt4KP2QriTxGEsdKGakxmOqazl6HJ0Pc3oozz7rwrLNW/v1JeG671GRwSoPIcDvSUEFniLYi2xfAh02p9ajRedSeoKFhBMyfxKPGwR2kqdXgEdJH287M+hBB1evbaFc7dXuMQ9U0GscZ8TRMAbUeRw2NSNNTL8i8JtZu3UBmJxJPO4ziXWbdIaP6AM5JnVXY3ZD+1GCqqebRw0Zzt2FHRdjNoNY8WmNU7zLJgGpBJGTs28mSnxC2QISEO0lHo3lgD7M5cYgog7c6riAzmTAO7oU69A7MHmonybh5aKexYw/KY82MhNGBvaid755QIqggH7ldY9Pb0k+hldL9VkQJaoFOpNNoOhDrEw6yAksMwGOsEH9NMdJpmnFM7bCGjQgn7VAV8IPgSLtxxBiRbkIolt1zFiz2eeXQS8eGO3iGNRb6tKfkF8xasmTZ8uXLa2pqYtHQKEFnBKbo0TdhUtp0cK9PaveUcSHGqasRy0NVpygrq7ZKkMeNSgqt5H/2I3d1L8uy5scR5ik2h10l3HuQoD5iMwx+EZaPm502/FcuZz09IZsn8Ja7scADc8cCSlgZ4UtnyKKh4+5MzSyE4linOmzGYcXb8/MAQGfd2HT3ohKU7O7urdZfWmrCYRQeRaUPHT5Z1CAvv6SwsFAUxfLycren0FGvxgIEQHmonCWWVVr+LAaNEmH+6Ti3UFx6ESlpMZQI6tiHDG2sitMwj5ecwVfOx0WlwhnvJcE2USaS220NM/ZmndHSyW/cm7ablkwrTi5dIiJm6RHnrsC5RcKc5VjKxbmS/SLmdu9GweCAplwXP3OmWFzCQuoQnerw5uRwbrFw+gqUpEJHG+rY39/EO5dbJC5fKEocC58ZJ7hoOhdsEhadB6oC6A98cwfqrB7Cc5Owr5jzh1ILPuHdbZqsDr5CLIjYm8cFCrCfUwwiu7iKQCDW1GTdDWbnTiYV03SWOp5MIYSYoFxTqut6T6pWB3RGBToen/uWr/iWnU+NOGgCzAuGF0mk3X3TndDrBdnHfXANahm5KygL4i+gYhEbLB4OmpmXk3fb7fycxdTQvR+9G/tzYyZ3oK3NMIntAnesahPauDd9umvh2a7PfBsbCvMk5iXEuz23/y+NdCI9abvq8g98EQW3DkQyiiu8n/6hb/Z8yqzRSebxgjGJdEoX3CCff423LYirbkSa2rf5Y9Yizye/4/UwWy+GDgekZMXl4rJLaDwEOCW//Sba8vXBWU6gyPvJe5nDN8+8DFlcIFXhJBl5AtiXBzefXtnGrFqGPgNxn4zRtlhUZGtusSCIf/vrQ1XbNzojf9IIdkBnVAqhrfjlIj6ZJIk/PmA21mKPFR+YGDSZQLyHLykSvvhba6iMwmyJ0bty8G0lGBiGYdIcj1L4z1/GnnchUzXjOO+TX1wf9f74xz+PhoOYCWeoWeF79JotiV980Qr0h0lnTFy43P2hz6svPaHv2oi9Iigpzftr7Yb0q9PyQDTyky/8Sd/6OvZb8YaBIyksHwMniPTaOwcwV5h1exMPfZ0xHWvuiTR3eW//NvLKyiO/QCihtg4eachsPJR85hfmjNk24iCDcrn58rs/or32KKnbp+9+k/MFWNhGtvST+oqmXXTu+frOjZZpmUHqZjNaNTk636AdaVwtC04TTlYTxi0weyyob3/VPNyQts7aBldS4eejQTQ6mwIM6HIZn+6xBjZwE0Oh1VU6YdMbRhNCVxw41iJV7/gP0VXbdOp2odyMcA2ko0Xf1GKbRcwuBHoNDbYa1Zv0TZtwwPJIHoqlQAkbezeqb27kCzKqZVoZTi6+daA7E+zQt72pp2JvIbMNudsbUAjrW/7FfJmGYGI3G+uVv/4qlo6RrCFxuldcuDLxy//Rj8U5udtYCzUJIXHJTP/XfqW+/rjy9+fsqsbDyJGTLtRexJEyxTlMZ0yE4zGMdQ9C7oy7CuNkjBKZJ0EXznTfc6WGGedDeixWXDI/z2+m1/70Tm8E1fCkjsduxGadOQG5ZFZVu7ZDysXIY5eMfdalMgKzW2byARtol851V8DD4iVjgUceF6LKkLg2u43MTpwSEaodQJiHT+yNMxNyN+iwWULYBc9C8uLu1mmdzpA/2QoVxrIsu91uQRAw5h3QGSvQ4Zibr4tjsRdYxiPOmgUlWHaxgFWjFx7GPJ/Sh6mVqo6zgm67VT2p+Yp9Ho+gqX2b6KACWBYttgX1MZhzIC+wTHUwkmWZ+W5gc/D3DyCZJGOZ+QdbDcSsjcRaDz2w8sgijQnY8tNhESdknblNQueT3WzNKstqMQjbwRzGIm8lFLazp0IrPNYVPNAuACOet3ZhSg2Nd7kRi1LmAnSDcmnCkItLcHObpXhi26hJnYWPEyuEmpFIpLOzM5GIY/yOM+oLodFlOu3jdOjLIiZFM/z3/Y0qQab7xMLI7WVDyzSxy6P5CiIJPhRjPT7XR4d3cfvVLgjyFTcEPv4JJLrhNU6jHSzIg9sH45mqSb7sNLptt0F8oWjfSxnEFe8NfPMeqoRRMo55ERewOKeeT3/PfcvnMSeQRCR5z32hXbtZBfrxAokmsCnnem7/qeuWL4F2RyJdDHoAvCgDHZ56BmiCtvR839fvDfhcUG0WmALzwpzlUPPAD05DyBA3vhW6995B8HbWEu/nPhOYMZMRNLZ8n2CXF1rh++qfiBLltCRfUMbsXnqCZRn2FqDy0z0fKpUvuxFpGua4T2D/VeEkTgU7Rw8++L1D+94awVMY2WHD6kipXUPwxRlZRzpZTdhRtf5wbS1z1DSVYFe9SfCUa8JonsL4eCQrUfWZX6lLF1NV5QrL3Vd/KvnyI+T4frYoiZBENEQjHaMrgJgNB7QNTyIsUi0urrxcmLM0+fzv4bKg8mhqMlldC3Xo9z3TWqeu+x0/c6n8rvdpbzxt/PsxNtHDIAN0FtH9wa9wuSWDvKk6jyuP3pucM8eKt256PvAVvfotreopzHMwqpXjx2n/C81Jx3F9wxNJGvNccwfVFG39P7XX/sI0IKAkCBv76wYnkbkl4ryV+ttPkWAjFsWUp/Uzv0KySygojV1z93d++PMjB/eJAk7o5oVF4hfmcMSkpHim6+pP6ZtfmrHnbzNIWgFDheHjhxzuMbHilotk2cULoprEbldpLNHgqFejFl3Tt72WPPgaDSN+wRz5vPdprz+u79qBrYWQGihDyuimCQkxDu5MhneyHCIxUDdEzuVRn/sdaQuyhKIUGQA4ar9nG/X7kn/dJ517sXj6EvW1v2tvbeTyLShTEWhY8sXvR4NlfaOxiL7pJXW3dYqA5Iver299Kfn0n+A7i2yuDhRm2Ww6knxmrRRF0uILqRJJ/vMhCgSkexWOFhnaDQi2qOseZdGOM32LdUQrS8Nnf+Bvf/p9R3ODHZ1T8aHbz2KLCvWKMunsNdpbT6uvrGP2nW67k9aMHRSYYAmGa4PvYHP+eHokc8zkmcqRwnPM/Nk9ZTMGrgn2UhyrCGQnjuSEdBFmhK1vQfG+I1GaCkIFzNRtrfPmeypmX2rorUv/YSvcLp9RpYHPtSuPLDMQq7bWc8pQjewckkQW/UfKuJUcpUB8iFGQK2hxbIMOJyKPF0c0giWJnQVKLkC/nOE8zSNkODjgyOQGnV6T+bZ1po8xaSdHSc0h4R6swQOem00pBhm9mQmL7UgRUGIScQVe0trv8OWnlZNYk7UAwlrDk1kxPIRyM7EjHbbGyh1p/4HuEo5hlfZ/KS6jLC6jAmjIcEx0Gk2SMMJWKM+UIVhHhjvqEkVZ7Ak2NP30iujRBtVAYiCGDI0kkiSIsEaxnW4HqKKKQ8oonsIoZPCONHRjRMxpwpRpwjh5JAc8n/xW7pprrSSWFBdP933tUaTEGB0gNB7q4P7ro6i1ddi3I22lEUTvlR/K/+xnkWDNV3u8yBUI/Ow1bKiIF0g8uoZyy5CbeST3flQmNWhebl4+6EGSyOUX+b/+MAl3UFPjZDfTlDjMlc9Bg81iciUzvF/8Ru6K81nQPS3Olc50l850Xf0ZOx+Db+8u9D+fRprWZxPEM96d878/zHULfFE56InMFznJGsZmrzD2vrEeffmuwXlOQaXno1+mkXbEY6rE2OwVLyBory+gufyBQI9XkrewJOf2j+foBsrNR7PnB679mLpgBRVl0OwwLyFJMtY+hg7UjuQpTB1xmjCpmjA+6hUvAu4kn/qN2XoYSxyL7cKztA3UNLm8EuGj37WCM4xcDMN8fN1rb+5tgi/wzp4umXfNdy0rkKMmpuGQ+7rP+QrLKp94ECntbOljN8hSk4gLVsqXfTz+u68kdA1zhOVjSGjCwrPl935I/ddfjANvs7zApm4c3jkIqspevvx0beNzevUGlsUB8AXwFPQ1SthE9Lv+ewBXHbNhv/LX78qyYAVmxyQWd3/wK1jklSd/jZCi1rUMznK6mvXd67myclRUgkVJWHKBcXA7jQXthCz65hew0mMwOJwQ/mJOZ26Qnab52D8DLuniGYtzBIqXXkzaj5Pm+rs/9l8fbmuFW4EFF9S9qaPtW3941FEBHJl6Nh0SD2tvvmAcOYD9PcSQ6ogvL5NvuXeUXJFScuzo0X37jtlrOOsE9MEmtKwEJYFbtAGVWCNQQ3vrVRJpxlIPs7MW1hHp4lvU9U/SuGmbYEknkhVNOmeNvmOT9p+XbY9kMgQvb6qr+vY3kq+t4/KynAOZR/IZ1w90Z9ob1TeeVrvNW6QdyRd+AMtIfe0FRKP6EBKiGHXVsV/cHZE5BIpkvjv3oc3xtXcb1fugsVCRmE5pS48hfMuWLevXb7erDKCUS9E/l3FLRSqufVV95Y/Jf/51tmTOyngcTZrjs+PIxILOCAI7nTg5n+Oloojh2likWMxUcSgWBA7jgJcOPKU/KMPsYhk9qZ1ujYc/FzZ4ZjSlUCJm5mEsEixZpXcDFTO8CGx6iRMFIhr2LjiGnc/i/tF0bX0emjtgTfweyijUiQ20nANZCjcfVUXaZxO8XithTDfowBUsD2IBS4S5+ah40KcA1eNFE3MmFaDyXnYWJyAB6KTlmUhZ9XK7GZ6mUSs4cio1nRcjQ0CUZ9PscCeQoGKeZGYENckg3haZdRuA5I9JR5oAVcVpwsQ3YbyYDs9zAgd03YO5njFJAR1YR+dHP33FcT0hfiWeK/TIcZMTYXhhwgsuQYTSPcQuPc10GDxxHA9Vg1qkdhFMRU7m4XjeTbpri1kKi0FmzbHVQBO7WVDkDHs288QWBwpDyWEoTRbsimFWYUGQsAD/sdl+gTlDDxKeGdohcBJcgbKbwGFRFHj47rFVOoFjCz3Tk/aShAoyEtL5OJwjy8SASkjsGWEvgFd3ljwrVCtonUhx3saOTDHQYauXqKCu+QDpakJyRpc3gUXkauEEGdN4LsXFBZHz1hiVpQSIRjwWmjmP5hTiqz+MktGs1MIm1SrmRRWKr/ksMzNZ5h6sKHrlwqgQwOdchiqmIdnFku8+/iSqqx+gRNM0Q/Fk4pzLaFkpdbkzFT+MOcU9UDJwWjZLv3KN5nKlkt4m4l0lM4E44ev/GyPVOHAEHX5qkNtbNE17z6V6IEAMA3m8ShLh825E8xrZAguE1IRC/vE0am3r89z8vFz13Vcl/Z6E4MHzz0PXu7tn6zES2US62dWO1v7eGRiOjJ/g0pLR8rG+aIhQUr4kMG2ByWISZ8anRBSAIdx+7Ogmw0iOpohMSuny+GcuONefW2LoKlAZnIyweRyvD2Euy3aEmSEGKVHkK+jhXxxHoSbxGPb4mMM0oyrC8f3/TkQGMuiKkqe0dLGneKYJalJmKGA2+c0n2upbGjYT0jdX8uaUl8w6W5Dchm6kKmCt+2Y5ITgx2HbsSPV/Bn4Kbn9x6cxVouwlhAUUQrEgcudga5KcxfEwtMaDb2hKqJ+ae8vnvkvy5JJQu7V2zN1TdU6E09VE8Fj1uhE8hdET+5MiThNOEdCBYdgVQgkFnbi0k2WhxqikCI1y1WfmjQbaFI+zQFq2yiKOIsa+nTGyuADJA2WRYWV1hpCq9t1AUUClxbi/VZRJFXUFWZ1PDAoOZ4A25PUO8hRUDXUGreWiXF+3l0NFBXbqnb5qbqKOTivoGNcHQaVsXRt7Os6IHVYTJMlfUHKWkmgNde6f+FAVUw905p82LtfVdNQrGUA00cMGCnLHMscbjDR9TLPaSGLfOaHSTxdK9Lr6LZGtP5cGQmSgOP2t6+a5wUFz4CvAjZXEfm9vMMLQilpxmf2eYVd+ssHEZBhUgDiFxfPWXHHz7t3b9u56XdcipqlOrSZM8FMYL0OydMLISWpZA2MsgXPCx8loSgQ4k0dX29FcAWqedlZ2yY55YQzEG5i+aMk573nPezweT8OxhkS8ORqud27LQB3YuQWOODIa8fnLZsyYwfN8MUhJhcdX7twTB3QccWQchRCDJXWwEjyAEKI792Tk6lUo2rcWlOun/R2TueuEs4ZRrcoBnfOGEhd6bCs/rCZMzsoPsQmTufJDacLE17+cZh0/lORn/TVh8t/8AZow9Mo7TMcRRxxx1CtHHHHEAR1HHHHEkTERYfwu3Z96OWI1ciLFqbxT+aG+t1lc7JRgjAnBQzGsvJNvvjBwScOt2WhkZCkEncq/wyt/0ut/8MDmSLjj+eefN/RkIn60Kxhxes5JYzqOOPJOEFHIUTVEqEJMU9e8goB0vd25LQ7oTFLx+/N9vjy2LDZjUQPH8aoWD3a1OPdnSgjPS6JI3W5s6EjXBE53xpQDOpMZdAIFN9xw2/z5Cwgx7QWiPM93dnY+/tc/OqAzVSQSPcohGutWLuJxJ6XPYKAzfpr2cDXMqRJregwr7/bTsrKyWbNmud1ui+NwiUTC4/Ei7Nz5YRgm3oE9Z0pXXpiYbjGl+/Q4MnOOA16zd+9ev9+PMQaaEwqFFEXBmHPuvFP/U7Xyjnp1cs0B/P79+/ft269pGktQTClskWUZOwzdkVNYvXJuwUkUTdeXLFmybNlyaokdIL29vf3Qod3OzXHEAR1HxkV8Pp/L5QL1yiY+kUgkkUhgh+o44oCOI+MhHMc1NDSoqiZZMcEAa0DPSiTiyMk95YgDOpNyxPJutxf+z4KTp7OoWAI/CSWpqJzWdmRtTSQi/YUuPjlCaXV19YEDB3U9ZdMRBBE+NV1zuqYjDuhMOpFl99Jl75o/f5EdP8lST9jil/r6o/C9srLSHsY2g4AdtYcPvv3WOtM0Jk8TCKWLFy+eN2++YRh2VQVB6OzsePLJOqdrOvKOAJ1ea7qGO5c2xCVhYzVFB0hSUTHjtts+6na70+AC6slDDz0kiuItt9ySk5Njb4dPVVX/+MeH337rxUlS+TTTmTt37urVq71eL1TS9tMBheupp/46me/8wKWPU7eZ6vV3Kn8qMB0QXVNhiAI7gEELPxVFAdAB1iBJUn19fX5+vmBFIQfEicVimqaiSWYs4QWhrq6uqytoG5IBdCKRiGHoHOeEHHHEUa8mnwCvCUci69atA0yxwcWGGyWRgC+vvPKKPQdkRRsgFiTFJ9usEIBLY2Njc3MLVNhmZDwPQCRQx5DsyDsTdCZ5+A/L7CrMnz8fMEXXddsgArJjxw74vnDhQhuG7O0wmKu2bw74KDEnUaNMw5gzZ87ixUugCbYmCDDU2dFx8MDWyR97ZYp2m1O7/lOi8sLE13KsSpRdJOD3rlixwuVyAcGBQQvQA+pVTU0NbFm2bBmoV7yVghOgB9Sr2tr9o9euxvZ2ibxeVMgkN5cFJoHadnV12bGgnOHkwMGpWvkpPWXOiZIUDoej0SigDLJsN0AZRCtFZnNzcyKRsEEHwAi+G8CGcJZ2ZkVrHeXdxNYcFM2+7JAgg830Y1xbW9sVDIndaT2hqsmkghz9ypF3pno1ycXQjZrqvZ0dIdM0aPeAhyEfiUQDgVygDCQjsTHsiMVCmWCQk1dZOWOZKIjpw+Bc0zQVRXG73RyXlaWcENNa/+2xDC4pkAHUAw7VcHRXsOto+siikvll5adnUhX4ClACgAinAwiSnmzEhOPk1ta2cCRq18G26cA1zV4pmR2ZylJQvFQQfZ2tOwxDce7G1AYdJZnYuvVtTWNpdtNT5jYWXH/DB6655hr4adt07Pi1zz7zj0z+IImea6/9wLnnngual730ye/3V1VVPfHEE9dff/3SpUsBgOz1UAA0oLLBdrjmOeecA8TKvgIcv2XLll//sjZL6ZP9H77tE3PmzLHNTPbpmzdvfumll97//vcvX7488/QXXnhBlmXQEKF6Nu7AwUePHv3ZwW1O1zwVhEUOkLzeHJ+/MNzlJkQnxHDuylQFnVAU2Ac1iYY55HZlaTuGiTweV15eHozqtHoFyOLz+3spRpqmtbS0wLC3tZumpibNmggzDQO+FxcX21gGxyQVBY4xDB20NpuwAJy1trYmk0kOoxMv29jYWFpaauV7JB0dHZqmQinAoeBSQKPs0+FSsBe+t7W1wcGAO/C9vb0daivwwlR5Chlq/1TtSOPXBEny5xYsuujiy88444yf/DgUDjdEgrXj14RZKOd0ngxgMoCu2o64esIbKGUFOA0bBZiMrTIPl22h/FHKU6smEqKnYTMX97D3Kcx0AAXyC4qAx8iimbndCh/J/F9sdLA9BkG7MfTe+V7hGEABgIa0NgSHwWUPHDx4pK4uvZGtS9A0uNShQ7UNDcdt+mP78gHo9DK/8By3Z89ujBmCpG098XgcDj5w4ACUmD7d0vhi8Hn8+HH7YHt2H1Q5Z73nqSH+nNllZZULFizIzc1dtvysnTvpeIBOT3EIlxCWb3QA0IGh0sx0A0ytwZ9HUYm1jGhsQUdhWMOZ1ncAnVxkFBN6KoCOLLvPPffSyy+/CmAC2IE9gw6fb765IRqNvfzyy+m1BXZ8LBjXvcZyIpEAlLGXUKAMjx4bI9KQkV5OAdttW7W93daJ6AmPGErP/AmH2dUDiLFsOj2nM/ONaQKiZVNy7NiRTw3hOFEQREmS4Fm7XC74Oa7FEQtu6ICgY+/K/CTW39iCDs0ognR/ngqgA6Ndll2zZ88BzQXgxrbgwAD+z382BgI51113HTxmG1BsdHj8r49mPgzYsnLlyvPOOy8dSgKO3759+2OPPXbOOecsW7YsE3Fqamr+/Oc/X3nllbDLiuzHjgdFafPmzVs2PZ9ZK6jDpZdeOmfOnDSywOmb3n77ueefv+iii5YvX555+vPPP+/1es866yx7yt8u69ixY7t3bnBG7CkgFNnWQmr3twlwiId3IB6wGIqyJld7HTlWbzuKx8Gmc9KVeSjU5camqYPOAmMVhi58AnzAowWVB9hsKBQqKCiwQ0YAPYlEIoKY9Z7RdL6jo2Pnzp1pm044HG5vb3O5ZDh3165dtk0HLtve3h4MBj0ed1dX544dO+zQolAQwEdrayufvWSB2WXa2qA426YDWzo7O7uCXV6vp62tbffu3VBVm+MAbwLuA9eBsuBg+1w4RkkkeEGYKk9hqluFTqUm4BjirQlcasEH+2J92mhiG3F4OhAk8TxOQ0/6xPT3NDD1/LSu1lOE9QU0N35A9Bqoc48sk9YECo5GIuvXrweUsXUWuN/AVpJJBXDk+PHjgCk2pzAtiWfH6TeJWVtba1l5NRtcJEkEzSiZVKv37g3kBHQ9NdEgCHw8Fk8klIMHDwHKqKpmXxYQjS2VMrMsSlCTPXv3AosBOLMPE0UhGAzFYvGamurjx1n0nG71UOro6AQAysnJ2bt3L+r2sYbm6Bnmp0n/FAYXpwkTIzNK5dUzZNQ/0+Ew2ttu7KvXdbNHFcpQBvGc2d6iIpmMzrIMwCU2a/uOGic6rAEWgZY5hdUr0zBycgI33nQzm2+yjMG2erJu3brGxkYbSjJtOqFgKLv91KYw1rnINgxLknzgwN5/vfIcQAnuvmWA5gLPV06fBQSqs7MjbevhOJ5Nq2c/IQAdKN2yLpHut4fA/KSrd6174R8Ic+nLmqYxfcbsM89cBchlB9yw6sCuSbKBzJGprWTRHiVrfClPQCgvd2MO2V2PdptXcBpfMGowVXzMoAZN0ZNs/pKbK02b5raXCvU6Pa2Onfgz8xNbxGefgrgG0zDRCVMiVBSnCOi4Pfmi5Ol5bExXJoLodntA1/ED4wCCA8hicwQY9uXl5bfeeqvP57MVHNgF23//+7W7d2aiPr7qqqvOP/98UMrsngH05ODBgxv/8yqoaJkT4czpmOi6plx33XVLliwBrSpVK8um8/MHt/aq7Yc+9KG5c+emDcaWn86mtza+JvAmoT1oIoksqNjla9acd/751qRViqwdPXr0hw983Rmrp4DwnAhvO3hX5efnWx6n4zvcgKEYgCZc36YZ3H3MiRt7XWE0TAennGxp/xA8UpvOKHXX4arBxaXzLnvvjfDk0jNN8CyPHTsGVGXPnj0wqm2jjD1JBGpUUVFRc3MzHG9vt206ts9OWjxuDo6EEQ7b4TA4EVQnID4BP1dc0Buh4U7B9mg0WldXBwBnO9q0tbXBFlXLsulwPA+XhcMKCgps/hUOhxUl4fVQiUeZnsYch3gRqVry8OHDoGHZdAwqEAqF+KH56UzwU5iEJpVJ3gQl0dzUSF555RV4NVZX7wwH6yZnEyZYBurck0d3JaaxYsWK2bNny7Js218AX7Zu3fqjH/1g48Y3OMyBQmINY6a8GKZx7rnv2rZtGwsYaFl5bSc95hSTfdkjR46AKmSfiKyJJzjM63WH+rorPq+7urp63759tu8PVCO9uj375cbt3bsH3hV2VW0oNA094Pd2aSgb9wDIvEeO1DU0NNrgCJcFfAS8wxlEa4oaQSZnR5rgJkQjzfFY7IknnrAsHSoibQ77Q1NlypyzRnJNTU1hYaEdBQIQpKurq7WlsaX5WCYZtC32ixctLS4uSRuY7SA1vQDCdvmzXQdtdICRb0c+BbDq5TAFWwyT2IF7QB3rNjxLNrdC2VpuIsHcl4GzpO3N8XjM7fGgzhPVRi80JCcnF4iYrfbbnIsSx1Hn1LDmFPFCIDcnB15F8VhcScA75/DElT6Elcd0HK55ioAOZu68B+1JqJRBhM2FU7cb5eT0vnOEcvkFuddee63P50vji6Iof/rTw7103TPPPPPss88G4MDdsnfv3k1vPddfNVatWnXGGWcAIeqelhKBT73+2rOZx5iGcckll0yfPt2erYei4fjt27du2/LSiRdMJhW44KpVq4EW2VvsJRQ7qtY7I/aUQJ3jWhJ1Jk/SqJms1zw5oDNc3RWwZuHCBQUFhTZzsSPOHDt2VBZNv7cvZoRJQ0NDbm5u2qYDhKLXPYOLwEbbpmMHHgRgikaj/S1B4KxVC/X19QAQtrchoFU4HPa4cSSYdVnYCJdNW6CAxbBFnn0Z96AsRUkcO3Ysh2Ensm06cDo/IeFKTwELgtOE7C4K2j2y/XT6xguM+OzuzVl/NoWxTxc4NJo4d8yQzLHr9NpobyDWl6GCzhDNXePlzkDp7NlzSktLAUdsdQZGMot5zPtjipjj5zOPFCVPW1vHq6++2p2OxnYGRa2tTZEYspadsyaAHlVVVbVv37702ivbVOQTzYrcFHvKbIJJzC1btuzcuTNz8VTmKooUzyLkzTfftO0+6Y2ALIQCXRPTScrh8uEo8RvSrl27Dx6szVT6gBnphj4Zn8JI6+M0YWKa0OQn1S1aSmnKSL+UntCG/x8LGmaG5SDCJrs4e9WCSPDhkBEWVEpPUKV6zZ/3OZ2egX0tYTNtn6CsFM52IyQUxbUpol653G6gA21tbR5PauIcWEl7e/vsWQtnz57vdokZoS1oNBoHDcte0JTebgNKNo4xBmQ7B6NuXx7Y0p8/BWxOJpPpcBnImgtn9qBs+wucDoeBbpXGMihC0/RZs5cJpy+1Z69gM+NZ8aSqGqqqAdPKjKdjzfo7Nh1Hhi3b242jnYmBu45BqG4ie6IC+txRLB5L8xFC99Yb+NgY+IgZJvMN6S4F1yERdzsLYZ1ODdCpO1L7//7fbwSet91/LZDFMDLPP/+CD3/4w1bQCcNWT2CoP/LIIzCkb7zxRp/PlwYUGMmPPvrHLDzB6IILLli9enWm382ePXse+91bfXNXDl9yySVnnXWW7ddjHw9c6eD+/2RrTPjKK6+cNWtWWhOEKsFlu7q6rrjiCsAj1O0TdODAgccff/ycc86BOqTpmJ3z8xc/2+UMIUeGK4qOuwYzDeNuLEhZFbN3Uh2duEwCn+AQOOgrsVcpRtbpeGqADmhG4UNNmdYWGKGCKK5atTqlE1k2Y3vVOHwBQgTD2+/326lpbD8dWXZlgwiLPgFUxV4viroXl/cfnxgDukERlpcXs+nYZfVKFwNKlD3DVVhYaJOdjo4OONHeCAzINjMB0sEV7EjysD0vLw9lxEjmeSfdsyPDVwgwKRjlJfrq+wSjBOVIRinS6Ij4SDr3ADptpu46hjqt14NEIeuOJJKg3XDBYNczzzwTi8XSKWhgSNspaNatW5dGEHs22prD7mlCIA/t3r3bXvRkHwZnsdUSCmoNpcy+PU3ASMMIeM2WLVvSfjop3/Ze8XR4fuPGjYCD9uQ3sqzgdnQL0BDTth7bEmTHJNy/f7+NXDaAwkaOw5PwKUykPcVpwgiknJqLsYnHdDE7XC1MuX1ITKYs0aiCmhXIJBMMOicBwmX2l4W+bCWE4fW4gTsEAoG0bgJDvauzE4Y0bMzUWVhql872XsYXOBcoUqafDiMv/dt04ABgT2nbEFAkIEck26OHWpHhgWGlDcw2l4Ga5Ofn2/6HaXuQHTkQqpq2E8GJhuHYdE4dOW3u0u9+/w+qEn3ox589Xr93XMsCCu2xokqQMQWdZHakCskqxTzlQadPYWHSReGyyy6zU0GktEfDePjhhwFNLr30UjsGBeo27v75zy2ZeAIbFyxYsHLlStucbK/w3rdv34b1/+ivxMWLFy9duhRAx47FBaUA99mw/u+ZxwDWwDUrKyttpmOTl+rq6vb29jVr1tgRCG0nwIOWnHbaaatWrbLDj9lW6ubm5k1vv+IM11NDQFX2+3N4xrnH3Q2CDhbEa8SX7fVzlJGBpnQKGgYoXV1dMGJtmw7wDtvTD2Cora3NTvjJrGXJZDQaFbKD1EBvUBSlqalJtMT2ck4H9OqjOGuCHI5PBzkGBElnuelRrwTBvmxRUVE6no4dbxA2SpZAWXCinTnHjsectunAwScuE3Nk6gowX4OJPtZBQYdQtBVDbDT+fPaCHM76grtHAZd9ScvAMDwIEjKV0lHqtN01TVUpFBv89FwfHd7FMzUsQtva2l9//fX0Em3biAPjNhgM2kpQev4bhvHx48cz7xZ0hN27d9fV1dmLIWz1imFBTA/FMLUYZboJcEB5ubl9+/b9+/fbuGazFcCpXjPxhq5vevtt2QpamJ4yh8MAd6Bi6YOtuDlKLBbdtXvX0WPHMqfMLYhMDuu5nMSnMNzD3mlNiCmWudBER9rxgeN4vJuQKbLECSIeMSdhEb84FFNpi4pa1ERE1TkOCbxQ6BZKBQxvTjNlZMDCMN+RU5jpxOOxV155Yd26F3D2hJ7NgEivJVEU7hf2ePT0wUePHtm//7cs9EhWVDTsdpuSRE54aZC6usM1Nb/BuNcz5ArzDI+753dNza4tW/ek6aeZcszBmQiYfo3Ae6R3pBUrEJssEVl2WMIklcrKmaIkA0VlrxD2DDG8YDo6WnVdGzYuyK7S0mn2wkCfm9guqnDh1paGEatCuLvDV1Z65pzmHVkebeiw8B7c26y+VBPe0aWYAu9yuw1KO6OxUIK2+d1nuIQiRDgez5zlm17pHha0TempWWqaOiG9w1CQfmxcvQJjsZWdhomzE3YABFksGPdFVk1gyieGvOhl86XUQBnxHAfOmodJXw+LjG5uwJFxlm9880fFxaXBrmBrW6vNeYG0PvLHnx89OuxMD7NmnfaNb/zQ5XIDNyemYb2IcDjUef93PjViepKGH0FAfp8wgryNLM4BotuOKWt3dDbowvnvvvSyS999+rzTYcTs3rnruRde2LlrZ5tmXOJzzRCox8UF/CJ9h4AOkD2/b9h3M+MlgyyDz0DHZL+U4Pg+9nndWfc7x48Cvp6HH446g/RUk+LisqKiEo4TNd20J0YBdEZmhuM4vrCwxO32wNXSC4n5MYr1xd6IhI4AdEBVOB4yHq3qatD4Oz57++fvuCMQCNjhwK9cc/lNN998//33/+2JJ6sUrUiU4R1JCB130OnljxCKjdxUNdi5dOggMgFN6LO4cBwPeMp4TX5PnqfwTmvCCy88n5OTb4fWLyoquuKKK+LxSEGe1OXvoxrpZX29ElXb0tXVBVfzeHx2jBT74Egk2FdzRtiE4brtWHH/0Mb6+J4O7dqbbrrzzjvjsdj3vvfd9evf4Hj+mmuv+cqXvnTvPffUHzu2feN/Gr3SyuEPwknNdHp3yinIGpwmnHpN2L9/v9vtS6cwy8/PlyRe6CeBB5AgOMyaTOijVFVVrbgFbjtHmw06iUR0DJtAhw9SsaRZ06J4cvNuuuH6gN//wAPfX7v2t5gwu0Vtbe3C+QtuvfXW9172nm1bt7TqzBIwXFxz3O0dcWR4UllZGQjk2TmI8vLyNE1Lx3JzudyzZs0VBBGwBraYpllZOctKysYBTgUCLCeSlb/IDIe7DEMHMHK73S6Xx15bY18/GnWf3AYmTaQY1KRo6/btDQ3HX/7XvzAlM/NzoslkWyJ5pL4ejikrKRUFSRuRG6sDOo44Mjy56sqryqdVBoPB48eP5+bm2rZk26e8qKjkS1/6TnFxaXNzkx2xQJJkt9sDe88444JQKAjgAsxAUeJvvfViNBq0I1UiK54cXMq+SHt762OPncwGBlzcGdM8h2sia3/1a4JwNBYFLtMaicUMMzc/b9GihcBs6o8d1bQkiy01etAZQUihgf0LxokkD0AvnSY4TRjXJgQCPr/fDwQHEARGHQMdQoCteDy+yvL8stKyvPwi06R2IJRuDzLml6zrpsvlsryxcGGeS+bFQECwVZMAcKe8PBt0DEMZ9Fb014SsPFYpv74hqWCZ014eCV85zzcrV6ztVA93aVuSOGoKvqLCedOm3XTjTRdfcOGGDRvWvfiiREiZxPOI9lnKAIFNHabjiCPDk+eff97nzwOVKpFIlJSUzJs3L5CT9+nbv9nV1Z6TU5BfUCSKqUi1dmqA5uZmQJMVK1bAKenZLmImg8EOjycgSWwRT319fUdHh41QoWD7yCrWhXA9i/xnrYTANNFhNtXEU0k4+8GC/n7an6UeySTczpbEsiXL7rvvvqVLloBqWVNT838//smuqh15khij3OYWvTaZyFyxOGgRDug44sjw5MiRI5LstcOb2DPlgiAuWrwyNeFtra1D3bENsBXlFn4CPNkH2ElcS8tmc7zPDn0Lh+3evTttSFYSkRGCDuYPpAc4Rgc6KepUe+UFPvFnv7sQ5jGOqGqHos91u2PR6N7qakVRiouK3n/zzY1NjVXbtlfFtYZWAbeqVuUzrplBurLSEI8m75UjjrxjJS8/z+PJsbOJeL3ezMV69kZ7ukoUxUwYSq+AsaNr2xEO7IhOyAoIZ9uG2EWINrKKwejODJeV8tfIVnKwpXOlaQnJXCaRcSRv55gEiISGCPyWrVs/8ZnbkUlOmzP72/d++9ZbbwVl8rOf+1x7c1PA7RJ4IWsdOu4Jimz/NFFWKQ7oOOLI8OS6a68rLWOG5MbGxkAgkGY0gCCgcAEPMk1zxowZLpcrnbU1Go22t7en06vBkatXrwZUApVq48aNcNjZZ5+dtul0dra8vO7XI6iYH5Gy7vjIfQpggQrkJSMiVz4iLtQroCb7Fya4SVHjqmoQyvNcAFN3ImZQumN71ffuv3/BggUXXnThypUrnnn6Gck0ygScueoIrqBgLtKNQ9DmfBb3q+cIYcLi6Y9tJsOTkgbAaYLTBBDZJQMxAXyxA0L22msnSrKtOenURnCkHfAgHTjJ3pJKc2YtHoaftrIm9ekpP4QmlMbMZVZo0AFAp5XyNUg0LWyBwmYhoyR71Y0dtWuDYjQrmsvNQpKrirLEJ50jwy7u31G1uqZmz+7d77v6KgBWgcOliCxDGskmTA2Uj6LUCkYO0VlIL8pYETRBTKesvPLumz4lPfNTI9yJOE4Su3fohCuZ4Vpzq/b2S/reKuzjUpXHbBeWBPdHvqNteNI4WMVs8XYmPXjo7/0gNc3k03/CAS4zBTxWqHzFLX/YtvNwbU1m6bfd9tk5HQf1ja8gT8bxcKsJKrj8Q6+GyfPP/cV5gTsyRHlx3Yv+APNItg3JixcvTmtGqDsLgP0FjlEUxY58cPjwYeA+xcXFthEnLbZtqKqqyo6pBCfGYsGRVQxn5JPp74D+TkkL/FQoBZqzYMGiu++6K9jVdf8PfnA01Llccnsw1VnYKR7AEllrLGi3vnZCKXiAUiYIdPLyCq573/XclrWE60RChg6cREJpvu+SNUpLdfJQFdC4NOhQFXFuPue91ySOb1KbqrBggQ7zRRJ9q8+muhF98U89x1ugAzt9Z5z1UmNnL9A5712XrTjIK1Wv4IzjqcECRnsXLuxQfA7oODJ0AQVKdrXZYGEjSJ+H2TFqW1paAHTq6urefPPNwsLCK664IhOhUPc6idbWVtJNBZLKyD2mR+Af3CvolzW7hF3W6vnVK1cWFBau3/DGs089/VKI1bQuoV18yXlLly8PdgUP1dZC433McjT40qvMUiYIdJjxzNBla/kqyrY59czRZe5K/cQp2xfudQDOOjcbY3slorI4rY76LRqbpuEMJEeGLsBWvL5c6Gaapvn9/jRw9MEsupUsvlv6Q6icnJy0R3I8PsIQblbUroEiB1p4RDNZR++ogJSaFDPbkCgcrK3959NP3X3X3V+48wvhUGjztm2I4vMvWH3vPfdMr6x85JFHtmzdWiyKRRyL60B6l3ICgxoi0wlFcT86JO3vmMxdvRsMbCwYJl1Qpom6wYQkEI2oyFRJVCGdUFGzh+kkEXUnkWmQSAechQXCmsEap1AtjjTEjhfMDEM8IiG21sWOY5ZZMU0lNB5jFyFmFtPRgU/FkqpkHzxA5Yel/2dG4T5RhhKXe2zv/LCaMJkrP5QmTED9r7766pLSimAw2NTUBGBhewD2hzu2jTktJx5gG4BWrVqV9kgOB1t2v/HzEVQ+x8dX5IoDgA4MICNOcbiH72e9hTHKz5fdHpaeEydI85HQrx9aO21axU033viHh/+4e88ujuOXL1tWVlr61FNPff+HPzTCXZfNyVvg43pF7IHTYxGK+6FrAj9xKWg4nJPv+dQDNBZGbEYQkMGkSgzxLq54Ble5IHDDxwLLViCPnGVzEXlUXBm4+S509vsQgxliTfrL6MyLYG/xN7+GPK4snFcT6Pyr8Muvn1C4IF90E59Tjlx86kjNWoYnuoVV70WvbXLe3o4MXXw+H2ANAITL5ZJPCLZGrEAPdoIjQRDsAN79LQdNAxMc5vV67Wl1TRnh2qvKUvnMBT6WTZP2TXPYLHijumkPvLZTbjUZxgnE83jmDG/FdA/8WKQTISD8vur4l7/6taqqHe+59NLKikpoUc2+fT998GePPf63aEvDLUuKblyW45GxmTFhbme8ih5WuJqkcUKsK2ip7BImCHRorEvfso4rm2lZiBPAX7DLKyw4xzhUxYfb4tte+0+H3oxniWqKk6UyLicpfeJxLAcQPwsZCiKGXXHzlc0IFEnhNJTt0MALmLy5s7m5qVfp+t71xH82P38xuyeE3V1+5kLMi8b/Z+874OQq7vtn5tXte7vXq3TqFSQkUQWixFSDwcEGHMCJKcbdyR+TGDt2iAt2EoO7HQfbdBybQEACF7CEZIoaRRW1U7mma7u39e2+Nv/fvNnd2ztd3ZNk4dwg9rO3+3bevHkz3/er39/u12nXYfPg21MbaaqNv615YY3fHwbQSSQS1dXVc+bMKS5JxD1QqVQK3sfj8SMOF21vb++xhDtc1eLlGLdu3VowJGupEg3JAq9lPjLoIDRMlfHBogGLaIaHu1shl8/1SaLwzM6+n/zg+6BMlYVCoiCAfBePRuq94g3Lai6b7fG7COyn4oJJ3CiC8Wj5FyfLptPVmvyPzygizoUqmgjX1Aa+9XzyJ/eo27a3E/Qvu+guHdE8ZCpisdY5dPhZMx87SYcaq+ClImQpg32O2m9+kPj9j3KcoQbCstvzyS9htSx+78exH2X7pnj6ptoE2q5duxTFyw00XK7htQC4B33GjBkAIocPH4ZX2KLr1q3LZDLwFY8JLHQCn8BPnBpnzOjT2tpaIPEy9RINyZRHFY9q16XDbJmhPcA/0JhcgDtzvHMq5E1H0gejmaTWCV/P8InNTeFl9e7mcgm2c2kUlycQdIp144QLUcEcUObgPglO3BTBVDRMEVOFuooQOjiqgNmvjTah5BgLFpyLmYRy+AeSjggfObKSgSUW7D1+xX6iBog/S/uzDL4zWcafGYqfqEFyrBMlXTQoqWzQVymEXF6yYnmwzC9aFpPz9+9Pv/5yFKTbgcItFHnKiRwgo1d12juEu9ZG/jLhzBVBr0ugNppL0M4dqa2vxJhFjz2QaY13wmJFXW2d2xPgJV65ARhwJxKJ8FqPvOCay+UCiIFXOICDCxxfbHUGUQjAiAtEyCHlKVh8spp85GQtFTyqWRoUobmV8sywrJk0q7N5V2TslogosG1klbqUxNHX6ETX9MhXgKkl5vAAdjsrnCM6ogrWdNkrUZ/PXFy0H0a3mYWU0QaTOgaSCBUJJYWpBIQj2GYFgG2ZMN3WHlxtuSR1uqQSjidj5k/W4GFCAXRgY8tlgm+BQMkwj1FalOCTsylQzqppV4Zdt9zeNKPRrRtUkvHqF7o2vxbX0xbJ7ws4zFUluGYKx5ZyGSizSof2bFp2XYP7o7dPq61UTZuKIn708fYtG+KmjVh+tD2BKS0cednlV9TUMENyZ2cnYAoADeDLs88+u3v37tmzZ99www1ut7uuro4XWVTzdUEK+Z/ceLxlyxbAKfgtD1BeunQpdMUdr5G+rueeLWUl0Co8RGyZ5HJhIg8r1oS8AvYqQkEyMienG5wk9YqUlavXXe8qr2bTYGWZTccXIv6weuXfWksPxlOJxt/+rrXn0Ak6u+fCDwQWzsr9ARKhqOC5ZyJRLrvz40j1uja8iZ753ZTWMGkV2jH0W84/e/hCk1z4d+ryDEi1jJ3eZr5Ny6bM+WqxV0O3tbSlpSxBJCyHiTA440XehqkfxRZVYak5PeN8UTib/dAyHbZgi1oY6U7PIEPJEpIVUsK+DIfDVVVVgBQgp3i9XuxUg+jqOtrR0V5eHgbpBiQaRVG4ApVMJgvFiGynBha33aRSyWg0AvBECKs0HQwGoVvuvQIR6kRLMSOpVyNBz/EVj08S6OBwnetD90rRIzSbQmaaCWe2ob+xmgQqxIZ5SrgRvdmCThjovITqOskCm5eJEFhxDbr2bZhH4j1TVZQ3aNsUYky+qWVEcBidlBChaCjiwJTPnua9+KwKmVEvoG174+u39ILoccbc4HnLwkyn0M01a7t0w+aiSiJqXXx5GFskrZstLelUzGTFXrz4WCADqFo8O3DBsjAvPbRlR/SNd6KALysWlZ27NAzfahnrN7/vMEybMMEaxXrMS6+rFCmOxo3tm+IoM+Erff755wEiuCG5srJy3rx5pqkf2Pt6d+fe7bRn8+aVFRVVvAws6F89PT0F0MmZewUhFou8teW3kcjRQLBy1uyz4JP29vZYLMYlnWi0u2SUycXtj4xBQ9xJZHCoHKPgwWhy9fkGhM1BHxad5WS5zKlN412Je1bZnRkkDYzFTiOxscK+9xcn9OQ//d6DWX14WnVmqHdht3sKNCbbgs2iUivweo/HcljC5+GAvGpF2OcRAYCypr1+ax+8aapzv+/cclHAbV2ZNet69rUmJRFbJr1wefk/f32Ozysd7c187+GWHXvjosjSFO1jbKQgyFSXK5ecUy6JzLYSTxpvbIvCUdPqXZefX2FatKUt/dwfjx7uTAtOz1deUPmPn5nl9Qjv7Ip//qPb9aMTvtL9+/a73Ed5RDIXcwDv4rHOZKLbsrLPPPOMqubW00jBO9lMqrPjQCoVNXRtzpyzYNigbRUilTWtRGoLk1LdZJLkSIZkABTbGgQppiMj2jlRFRk289LY1qQkG+ZBGywd2TR3Fuo8JMQTZCYYDgMxDlTgTCsSB3yHRLFwoAwUnpSGt7eeqJE48vnw8M2yKqTjYKZ9r9CVn7jBsxg57MDNCCsWIMZ0FjQAQQGVGOcDfGizV168loXQEcfqZ/OcHTZgywkXHalnhy2UCmRQ3UI4BchNcC7DoDifEsX750G7BCFa0uYKBANebwA5tOrcYAwij88fcB6jWNezoDHZTngHHm7REUHMZLOJNIknsCBLpgWKPnN+FRDKsvTSduWmo2Y0nRilyi+ATkwDxKfcyQ1zfAiJR5GQk0Bs1HJQd3WalE4KdKDzSMq27JwrHVCuBUltPP0dI0k/3sGBo00WPKTiETsGu9zCeTCmGiKBODrBiQiKgpRJDv69iSYntVE0SgQ+7CiAlf6EAWoOwEE6YzorMGflgU8UiSyd76+vUgUBZAc6u9kDzwnLtHM1lUaN7dcNCroSCDLQXVozCxhHHQOQ2yWcsTA4rd6d67nR65RpLKUgFG/XXntddXVtNBo9evSoJEk7duxIJuNdPRrcglgy0b/+OVYAPL9va2sbP/q3n8xo2hNPPHSU1+1k9KY0k0nl3iNmYD7zzDODwSBPv+rr6/nNr39SwsA6UjSWMMd8NghFD+B+RIop/zoidr5c8ORsuM5ZCusiUnwW66SpV3AfAhXy+/6O9vcjpNvxCHZ7sSgjneLyOlJed0JP7vP5FUUd3qYliolEPJUarVw2qNyzZs6tk+zsgd1YxoOfsEictQjBA/XIXia5kiK6NIpJdaNY2Zh6a8N+A/UaI/ePkV9AhYWKXT5ECAvdxkN3NXZ74EFJ2dOsOGMQ9ZvIOrX9+DDIA22pHz15iDgm3khc54Ry3NqLbQpq141X1OXIYDCrDQ0613ieuALBO/fHv/doC7cf90VzAaOF6tLhgPQ3V9flunLibgmZFECrquL1ejOZDOf903XdNE1uMaTUHlJARpblVav+KplM/OY3D6dSiZGMLdCV2+3mhmRporJ30SQTYexLs0fbpsNIZ0NyxClC44Fr689uSEaZpHXwbfXSj7J8J0MnVdPsaCdNxVmMDCZm+wG71CjM8bTbrvvgotmzczPoC2JJsXvakCBxQHlxw/qn1qweVVBSb73ljmvkWOx7Xyblg8g07Dj1f+oOmkmmfv6vVE9haQDeqUFc11ymXHLz4dvP/bcIfmlkV3SdjD5egwOig1QGVq++CftC6V98g3jJIMU4Zbve/wESqsr8709tLcnOlXc/f6uVHsme6qATTxrb40bBq+2oOrk8XMoq0MM8C1wE5nmJ45Tx4Sd9Mb0nomPnZ2zbOJhC7RwVCrwqsoDyJ0LDmZwm1N58c2NHR2t/NNoXiUDnkiintVQ6nRpBvmceK04neOy3hp7t7mpVXe7t27f4fX5mHhKESF+JHMlhak3DNjqupQUZIxfCXUhwcqZZzxXICqJJTeFJAh2rqzX13c8kA2VsWSiy76tPZZ77T2PrFuyBnWOn+xPWwaMn7uxLdv1+eecGTouhXnuLOG1J4pGvYq/kLHl6sC05pkTq9fpcKG2BPCIW56sgW0Bel4tiC4vMNVsU/cgWvUuF55cH0EQe9fHjF9GlIaw6eEUz2Hv6Yhyujf83ImWDiTsw8i6eK1Q3JzdIdoKxDxS+/UknRac26BQE+2LTMi0oTZj/STHXttCILpgRexYG9ZwLTkc53OH/4fy3k1RE7//mPx2vOYnHoxs2sAfeH35/HHorR/asUUm8SgOdKCJ9DHRygT+VyJ42uUidkyXpGFnrSIspONZBD6GJiHV4p7nrHexjl2JZiJ5Ik0S0o81KIM7USuN9NJs2Dx4m/pzUmIqg0Z2EjDxNzyCapVFEJWvgblAnr13XkZ6msZStI+J8y3UECs82LeFYBZE+KumtaaF41OKZH1SDDjPUMOyok3NfJNRa/QBJWWpodixF4wi5BjLyLfO9YY0iZCBkjWGBxZQgScQcgHJAk8cLyxqvPZPw/ws9wypz/oSebYcEuIhsnPkrLXtSplInsiaPbgNm8hJNIcPmZNklGZzsvOJzfEHHPsZ2Z49Pw/pzg44Nm9ApkAODlWzHaaHDJ8hJOLdiyPR6UCR1os5uMkqwHD20qbPlDBgiI262H1c0MhFJVbO4ZD4pk3l0GowfrkLQLFJRSzN+ccFylsjqBKFgy3KJhJqC3DgLlYUDi+fKu7tQakT9ShdlMqNR9KjMrJgRcEW9XF4bXLYQgwhE8zyQ8JrUpLomVFnrmr9MT8awEyEKeEMBcno6UDZ1KsMN7M/GatfZp4dkOWep4aJNY41794FExqAD1jBH4vF7hNoKVRiH8cW26awm7/KFZYXNy5GrsUrdviee0VkEesFOAXcu5JOqyhU8CZS+7fbPBoOhZDIZ6+9HTpBxNptZ+8c1PT0TltZraxv++q9vURQlkY8hZNUjEvHHH//p8Zr249AJPs5nOVnBgcGQevVlLn+A7SKRkKomZdWHiL+BhAIgHrh7Yt63W1DkLVV1FeHpSNc66CvOz2YYo8kS0ukr1HkzsawiWxSXXCzUznb/zUewS2FPwExS3Lobvbp9jEnNJsVl7/fPXQbYiQ0WT0aJM3VmhpRVg+Lm/cIPHTDiDlmcNdlj2nR5ieI17n6Ifus+1D5IgJYwI1CEKzEo8voC3s/+0FsZZmn0FBN/yJT9+n3/jTHIUJkibcTK+sI2EdXPPahimrdYCFR29f3VSieB6dRtAA01FerVF1V5PaKVN3oDprR3aw8+crCjSxPFnA2TOpLIioXBj17XoCjCOHpGTbWu6/6qmsk1+dUvCri1U/v3hw70xnRBGKjKAqe+cEX4pqvqJwM6H/zg34RC5b29ve3t7eyZ4ZQV3rrl1RJAp7y88voP3coZ2qET7jVPJGLHC3R43lFxbZkxK9IMOZKFC46qkGI8YDsrBv1RTjEIdIZkA07UCztKMmGgOqhefJ1S2cAeNoZmHdouLTpXueRGu7sdZRINyP6Xi/r+PpkUCAHJEosKDlfTRBSl+5m5l6hOnLvBKHhgk4VrbC0FClpOj8do7caN//bQQ6MMXn3/x91nnkGjXRSWORFpvFv9wK2OsZHisjrZ/TSAziiDdwma/dx3kjt+jRUXi9I3TFYF8Wam2Kcf+xbV01jEDNGcWyOatHP+BTc8+Sc9mQCpisX4y67+nv1D+vx4DV4ZcCJQUpb/tIaKabO0h75AezphI0qm9lSb/eARwdHf7EG318jA/HxsVuCumZIBE9lvq1d9WFq66u9nBiNHI/Bb2F8Ji66J077hxLcT5FbnU+fYY/CxWMOvAHY7QAnzSTnCC1OdHBUHwDkS07siulTkdoEP00lLEogsE1FkziY8HIrxnk0nrEQQmbfLstlvHeZh9nkkZhztzUp5elzqHJxMmfCJLLGeeb8TXfYbN75RUVGdSqWi0ajX6503b14i0e/3DL/+vS7Kt+6wLRaLbdz4us8XKM6WiER6Stt0ODnwQIY5qahQqiqVSQo7cFvaktbuTpvqx5LjMO24slIJhybGJH/SDMltqe/+g4vT3FMWmi7UNfj++bH0o98wt+/GflxhmuWMVBTRJBLqq7x3/yDz6pP6Ky8hF3Yywp0nILtKr//LP9D3rE8/9SgJ5YyNdb3aGHKWpyz76urMkz/Hfr5IbSwp1GAhnO7b/h9WvWNIj6Cvd7YaiVZ+S6kTxalecoA95TatBx2tONoJG6iPKtteXYcHjKTI48FD3KDNKlrgdnqzkCTbQiZuvPOK3dENXYkC2nsA7ekYRmrlxCC7e5HZz5RCvQdJCxcIDTMu09ppiEWwwwF9Ft6YsvvMU8KFXl2uVpTJTkonDQflnfsSIHcAvtRXu3xeAVBDEsm8Zm95QBaKQAcODgSlHfvjAA39CZOF3hyzaWvL1fIgqzcAB7sV4a2dMbh4AKmmWrdLIdAzvF8wy1tTqQzp2e0S394dVxRy8FDaKmmW1q1d53J7OQ9OQ0PDVVddlUrGOFnXcIKYxZ5tTvjyMIbkRPyVV15RFBfKcwwyI2Oq9GDN4urAoZA8e46X2pMFHdJjSD0pmqXHYj9IUtXVavN094Sg7WTZdMys3XPIEvITAztGpRQElr426+gBrBV5MRKImXjhsZiOWP0dODuoJCoWXBRWipawIx2FomGZ5BiWYAZzsd5BJ8oTs9N4BIYy5p3EEmHeooLhl1UhYyiCXU7MbCHGGiPTtnxV9VVV7oymFcsoQ+04xTcJusIEK26sMsXAFJDqpf4RJC94ZnoCMA04a8PZWTQrIoKgKkwSdM4iYnQq4A0HmnOWhK67pNoEGQfjrbtiP3rqUDpjhv3yHdc3nTbfD/gf8ssf+2Cjbec8TRzWQR7dsr0fDs7qLM8gq1vFwMEl+VVnll9+fiVITHDw6+9Ef/D4wXTWqilXPnXT9BlNHvg8HJTu+HCTXWAqx7m0oPVbIt9/4iAMyey300lbKWEfiowSsJA4bkJjGqNT2A5EXlktlDCnfMdj5GSHpp2Swrmlwni72d0kigJ4pYJuVQAdQSDH7R5QhCaXrpkz6IxG0EMpRccNdI4n9wqzXuQDhjjoGCwVg6kqeXNy7isdUR2OAy3GcQMLqNhbBAK6o/Rbg35ljjF4SXRixbhIMoT5nhBFHutKHVcUTaFiSYcZpBkjojOF4oAjCWQQCdaaZZJRVw7NOh06kh1Np5jWpqXZJ6IFFz1dRaHAiL9tdFN4Ftr87HqW6Sopg2XPO3Z620L0lGEl87iFcJlsGDaghizheMpIpGBmcNbMhSODiuz3SoXwHD6HoCiBnBJPMRkHdqBAhslhcrmE8qBkmBR6VljPZiJteF2CmTcYwVlYz6ioPIIjC4IKGk+aumnh9PDwPOayv+jCVeFypl719vaGw2H+UONDrKisvf7DH/f7gr19PYAjAD1+fwhgRdeNRYvPrKmdDvgCuJPNajt3bE6l4k6sALtbixcv9ng8HKpAvVr9PPoLbuLJoaTC3oC08mwlEHZccLBDLFJWSXwh+dwrcXUzUbAsMAo1h4/dIOU1Qqjas+x8lyIgRUWCo5Q5v6KCS6ysFxatkK7txN4coXLZgSPBtRvHGIDqxkE/9ksD6wwEFgAvZosZY49iWVGvvtl/2XUsVtjQkJlhxrAZpzFb1feaaTbFxu5y5aQt0zZlb/mTv85oo9m2g7f+Q+C8VY4XzMaBMlI3w/elJxjHMwjteoY8/wz678dH+q1y9qW+v/s8sk2qm6R+hhCq8f/7/zC3PdM+K/XIUeFr96BDLSf2KZIzfwy8DguSpmmDtMIyvC0Mk61KxJIF1WGBGlC9LVqwXA4EB1J2MLWZCciix3i4qeOBZD1TQCi4k7JI3Iooi6S4hLadd43zblm6I2GvqgzCIQbhm5+2kHo2TuL9ZcuX1ddP7+npOXjwoM/nc3I+Tc0JDlRV13krLw8Gw93d3ZlMhos8HHSqq5tk2cfLfhpGpqP1Tbg+t6xTykw5TU1NBWqL3h7vhO5UYfz1w0n8p2Ck+sni06lq8n76Jy5sgZ6FjJTDvGJbnS3yOVerF3/ECNe2HG6N9vXBWqA8NWVXC65Yhi5Zzgw6sofFmeppwB22iPZ3IrmBXvb3jKgAs3DhA8LzaHTQoZZy3nVC0yLu0i4SPqnYNA/97oWxRi+Ks5Zht1//03PYJfFMMePttQ7HkeG+6tbf7o288KvniZn1SAKgRjIeMfQxYvXM1j3G9ry2SS19/a+ZKRoTamLpvKsWn77i5jWPSyoeJG1lqXTmhYbiWUwy+taXsMDENrrzFSbjYEmcuUhacWXm6e+ZyTjNnAKeLKZT4I3v9Hf26nzzB/3S317XCHoJSC4NNS7TGqR7Fvzo2PExzWz03H59E0grIBn9dkP34U5tQHJ0JJdXt0YOtadtJwgz5Jduu74RugX5qCqscONJoXzRoO1n04Wz/HfdMI2I+PCh9EM7DpfAXbNl85aWllaQdCKRSCgUmj59usvted9l17e2ttTWNrlcbk7DXqgDEY1Gs9lsc3NzVVUV18s0LdXbvSge6/X6QoITGa/BR6kUp7bQNO0UQwk62jf0VAUdtrPS/YmvXGl3tRcV26M0g7zzlrbf/u07vvCvW199ZfyaIa9txZnogn5UHhr97Djz0iPa4w/igFRk0wEEtDx33o/IOFJdbNPc8sfUd79NKgdNt92P3AtOX7tu3y8f+pnFFS6H5LG2Co3ulNU3rE5vXT3o5vG9p4neoH9u7ewaNyKhwSkXMeq9+GKhdlri659Ov/ESdg2sB6oh5dIrxOalqZ/dp8GoIqcC5rB2oDW151ASOw6pc5eEbrqyLuAVTZMnmtMhnteCpANf1FWr0+qZ46e9O/v6W074ppOcltPCMNp7OLm7hT3iDYet4qKzGmQRO7eU5YgOa0fjJ2yoUqfVuhSFbA8kHpFKyR5Zv3696vJxa05dXd2FF17o8fg+fONdtuOekyR5SC09kIngkwULFnAzEOAOYFA6rcHnPEYEPty4cWMhSjCV6j/FQAeP9g0+ZUGnsLJw8XLAjDaOpfyalpF0qRMwR2X1gZUkS+OAahBPdIoMo0i9oo6ZCdBLGte0SyL2IlxcmJjamNmVbBFlw2XUNAZImscMA8Eyxq7hDsIUC1KOH9u2i1MuqM11BoQVikD4U4tGgm3mzocTu50ZJX+GhQk7HdtDU7ed1CScv/NYN5i2xayuOG/eLSoGxRUi7GR7dnRl39ka2/Nuf8uexM4d8YyJvGFZqZGIG3G2FzhMLPKFQ7eMfpAOBIzgPE6hXKmG/OPKoSh0ctPt0tzJpsVsx5xPh1PqODVnADQwJyTlZSGK3VWFchEoH3BsWfyfxcWiWCxWKJ5VMp+O4LgReAwxBSVAwAqLyS5FsCksTYGA6opJERGX4ESZcXIcASOZsLOcDO9VKUXseRSygQbsnJjVZsjG4x5RdJFERfgEqnfOrc4HJfPROLRCsM6z+rh7MEE+KuLjpcyorHd11VeHXYpJJxKswDg9i/21+b1CTXYigrFMRJYMXZznRdgCFWTYa5KAxWLjKgMqARNJlOFBy5adeXJ0+eJbL6vE5ZNGSgYAwcbnzfugcCGVHHV2Zw60pWzn6ptr3fXVKiL43XeT//nAvvUvdmLT5fcA0nsy8Xjfzh53pav+7LJQk+y4oQdMQm5VKIi9hVlp68rsb02xwCzoucFTU6EUuH6Kd8h4V29Ru+TiS0LhqnQ63dvbC+oVRxOcC03Odnd3A5T4/f5gMMhRxtGntHg8niv24ADW4sWL4TBQqXbv3g2HLVmyxO12c5zq7+959ZVHSrgLvQn6rvPAoQ7oxPvMjj3J8cBB8TFDSf8w6kjavaaVwg4tEcLtCGc4VQWTGXC8x2wxk8dN0imNr3ukTYsVt9C4ALuqkGDnymToWQo7tWY6FaTGhsb21r3HfVfwS3DBDl5wjvqBKLPI8PkF+HPKDogzT0ebxnFeeI7NOkO9/ibiZvGBTg9ZB4ayuPk0NbFPUV0ZLT3+gUmnr1RnN+d2IDx5jaxj08GAwqT5NHisk0s/QNwyj1Hm64Jk4pnqGchfgc+7Et4jURpYKoZtzF6uE1G45EM4raEX1qJsFJ3cdtHK8mUrQ4ZBBz0oi96XByRFZmVbcF5gFwjZsS/xi2eO2A5a3HR5bXNj7b4W7Ttf273xhcgVl195zbXXzJo5E9Z9y4EDa1544X+feb7vrdhfXzt/3jyPaeZOBD+tLJMBXAqIQ52sq007+h9/vk2WWMDkR65uqK+uoqz4W55BuaSFxBsoSrV1TYA4R44c8Xq9xeIMoAYvCxEOM7JkLrzkkhuSSX4AR6ja2lpFUQChdu3aBR82NDQUGZI9pd2ClC+2u+jPPRpCB8e1nceWIVRU4Ibpcv4V2q5YDMVOTfXK1O10wvO5n2BbZz4akBDgMSd7KLzHOJHK8NyCE3XyfZvImRe5rruL2xIRFoTaGUgQzYPvINOw2t8dS3OwrEPb8KKF7o/ci8w0GzPCYsNceDXb9iAtaR7ZjqyJ5ftJp61SV73PMSJbxBMkjXOtg9tQVmOqRVZ7Zeubv0pME1LMUC0WollxnfnkHxjkufwIBwtRILkvX2lBL32TBJuyWqLDFNFJb4317rMWBxnojCCp2/aAO6kg2BkmzWQtrufAjsvo9OnHWzf+vu+OO27/yle+rOv61i1bQRe58KKLrvnAB5qavvEf//6dt1/qveZ9VcGgaJu0kDvqBCLnNXgH1WAkrGebBfIUEi8KrDqTidPduXNn59HegqQzZ86cQY8nR9Eq1N7jccaGYWQyGV7OnMs78LkT35OLQgb86uvrK0g66C+6nbRie4dT3/+0O1TFpD/LZC7zcJXnzm+mH/umuXd3Khs3D+05cWfXnrg//pv78wjE+C08n/gGdvnj995GAijbN5bwqWcyz/4w/vIP8xZopqb57vkRvE986xNwRQyFjAkO6ZH7Yv9zHw+GFJcs8f/jo4kvX2t3tmERVHH0h93oiZ6cTKYW3aLM4Igko+hPScxtKgDzyjAqlQeq9GaZVDcoj/GlTp0higeMkHxgosCTT5hsV5DeuRbJ+Lol3NaWWf9Cx5wZcz/z2U+D6nH33V94ee1L1LbPP3/Vgw888LnPfXbdKxteWbNp2y31558XzoXkMA4dpnByKaaQm44J65n/Q3gAAXNRO5NICHnp5ZdU1ccjkrkhuUBvPAR9QNvq6uritfQ2b95cVlZ29tlnA+4Um3t4P9u2bZu8TecvHHQmqgnTdMrY+nq2oNKDoFMbcl3/WWPji/rmfYYP0RM6z0VkZ9Ry6rexpAqbm3iU8ezPfP2TnJnOcjpCOfLeUvL8c5R5TrFTtgWd6i3OoOBjtw8FjZwBoqJI1u4ZnytcEMZ1WCmGuVFWkoRVhZgCoyvmpmKU9zTxaONk2uqLMve5JJLykOxipSNY5RndYAIQcYp09PRlIlHjfecsmj5t2sMPP/LCb1efdWXI7RZf/s3vn376f+6++/+dfdaKzZte72zVB/a4Qw8WiRnUpqJEKspkVeG1pVjPbGAEc38WzW1yLIhYUYgkk9LSPp2AZDFvPyaFSOJjvCZMmeLROgCgoEmNQqgBSETyQQECEU4yCkzy7k90IY0GOq3H0XOHHUq3AuhgXlcT5wKFhUmXBRv1EjRhQJxmfBo0www6bFU6hBvjoLZgdl89BxMMbVjUr0OdY5RILsJs0rrTGwzAyDJaTT3DT5EFoJGQJ59vny5aqJ5TuGrFvn2pP22MgKRTVanU1agk75bimhToOHsOpZ54vi2dscr80i3X1C+c5QMsKAtIp88OwOVbGFWWK9wEKisy7EHm0wSJmDEoE9BEYPcip3ImyrMCcpkF9JXdBxJPvdCh6VZlSPm76xqbG9ywvatCytLZAVkkVEBO/lcuBPFod7atQwPcOXRAM3U6oYXE203nnx8KVxXidFBR2tSxuMP1KQApRVFkeRhfA5d65s+fX4hIBvVq3csnai/8H1KvsOoS5s6RQhUMe2wTmTaprCJlVdLiC5BUJRj9eMchlD1R0o587mXuRYuxy+PIFxYSVHnZpUhWvH//T7DppTc2obUbRhu8KMorznOfeS72hZCZpUYGVpm05GKGAp/5Ck0npNdfR69tRuYE6OWViz/oOW0xA51sVqiZQepnum/9Ko33wR4yU/HQ22+jF19G76n29M87n328G5Sb93+k8q47p6kysfK+bS4hahmrvVtLpM2UJqc1m1cjWbogsGCmDzm6mNcjgnoVrlC2bdt+8OChVatWgVa1YfUGSq3lZ6y45pqrYZNv3LjJWybW1Muczp3vdC1rt3dnUhqIWIz+jImPLO2r7Iz5AU4MBnINHwwgwGuvR/7zO4dNnXEWaDHL553wlR4bkVwswvD3hOdZCbksLWFk4ZMD1qxZsyoqKnix857ujin16jg0Utno+eyDHl+AZTOYaWZ2FSU71a9efrPyPtOTzAj/cR+KvH6Czq5cdrsya7p55F1Q/bnD1jy4DdBHnLVQmLFURrWjgw4SFfmCG5VVl5oH3sQi5llX5r43WWnkuunCrOUSqkKb35kQ6JDyWqFpbk7wsy193a9IqAqFa6hpK9PnE9+89xzopBOWEbEBdJIJ9rgGSYeSIsMN8yizPS8K2KFGd4oeYuRWBLcqFEwudXXKmRdXPPHAO/d+6Uv33nvvD7//g1dffQ3EnHPOORsEgS/e+8U/bVh/1hWV8xb4QNhx0mYcwhfHWiTke+a2ZOjW4xa4TmU5AUTEEbczGRrpMkyNxXAKJekxWzZvOXiwrZB7NX369GIEcWJwckZixvOk6yxWJM+VM6w0BEfu37+/o6ODRyRPGZKPl7DhEqqnZ375FTvSx1g4ndA3mo4jwSPUNAsfuG1MfolJSlrZl59MP/ZjHMgH1LHySzaixHPnV8cVS0dtff3/JL/7RRKWCz2wJZY0vZ++r4QBZZ7/r8T6hwtL1ZG/GCBSjbg+djciVae+Jn+M3ZTZShDDAvawtwusxI4UUywMcFCwUZ5DPO9RIgILL04lTMvUWw4e7Ovru3DVqrr6epgfQJy33357+46d8J2lo6zhxNxQFjoiMMPQQOyU8x47YtRAzwUu1JyuJ2AqIjJQm3tibd0r61Q1F5FcX19/4YUXkjxzBcg11dXVgB2ARyCXRaPRTZs2Ae7AJ9ylVYw1HIYIowvC27dvf+8akie6kMYLOuO0FY0cC2DTeER/7Wn7aGJQhU944DTW2quuPrG2K5CksymaSrJTD6a2YF5q5Bn7EqiFoIdkhroygwL2UqAfaYhOmCCB6hpNa8NZ3BlH8khkG5O+C8e5DarS5xhZBIJ37U5877GDgsNUX/xtJKKzjF2BsDq/f+h4aVNv4QCQjwIu8frLa/fsSq59ruPc8y746U9/GCoru++++/74xz/alK664II777zz4V/84q67PvHyH/7wr/fJM5b5eGgyyC9HezKmSUWRxJLm42va/T6x4B0CGaeyTL72opqyoGTbw1DglWBNN3RLFHMRyZaV89Xz4uWyLLvdbvhw586d2Ww2Ho93dnZmMhluzTGLZGGAJ/iwYJDmwc25MU8w/KKES/jzLqSTGNDBiir4sC9RfE542vBaTif21Cx02GBVqzNFzzbOpwPPTTS+WCxYMWlWj2NQt9AhI0aRJzwkPc/agQc/bjN8SO/N5jjyulr1V7f0UTJUjOA1GwCasrq9bU/czmeTOxzsdl2569KVla++3KXHpE/cdeeC+Qvuueeeb3/72/y3G9av7+js+PGPfvyFL9y98fWNG9d0tmYyhUdIvmek6dabu/q5j5EXgQAwmtnouWpllSiwG04wwpN2WVyw6oICc2AoFAKsAbxYt25de3s7iDnnnnsuoAm84QGBvCoWRxb4nMsycPyOHTs0TTOdBkLQ/PnzCxHJsf7eCUUkT6lXo2koNJNi1Q6kQvAG27QggyD7BBPAEFGYNl86cwX2CsgpbYsVlRo2sk2hbhZq6R1HDxJpmCWdt5wEFRCOmPFPZq4WMZkm9bNRy4Qr3gvNs6S6cqag6VksySjvLqUZzIbU/95bSTwIgZlaMCMDHQ50nMAZx5NuO+EB/EMBY8smqiqk0lbr/mRFOLxw4YIjR478/veMVVrx+eDuadHYmjVrtu/Yvnjx4hmzZuzYt12yCPGgPEkWk7ByHGZCrqwVd5nB3VYlYjCRxInfxOz+G4Zt6sgWMQtumjgGnXXWWU1NzV1dXYcPHwa9DyADhJo333wTFEAY3sqVK1VVraioAIgBWOEmmwLWGIYB0g18AhcIPQDQcN9Wc3Mz4Fc+IrlzyqZzfPY9DlT7H3id8dHoKTvWg11+DDInI1nxZVyhE7sfEt3yWZfJp13gJCAqzHqiJXiZbKy46a4nx+yApqLiJVf4FpyNbRZsREE0y9FHUCS70I5HJxriql7+Ue9FlyFBRDCAbBpbphM+5KSmShJ96Xej/ZYw9cuvKAB8VEsyyB6gHmelPsnkKoSU1twhQtwEpkEJ5QvBFGvXNp09zXvJ2RWARwAK77wb+9PWPtOmS+cFzj8jDPdFN+y1b/Tu2B0vk72gqqTTqXQq5QmKiy4K93YbLVvhr3QylYL97PV5i1NhoedFs/yrVpSzTAiENm/vf30bM2iftbjsvDPCADHZrLV6XbfJWXsw6uvSL7g6JGCSjJs7XouXUC/srbfeamvrTKfT3d3dgBRz5841DP1o5750sq27y5NMxmGQvLoeKFaAOwXQGUjFSqc62/f29HT4fKFwRSNsQ4AtfiRySqRPgc4EFMJixa9YIbR7jqR/9nlPqJIbDF033J3946+slh1YlWHVpKNR6/COE3eR6Z/fG3/ejwEpbFn94O3i9NPi990Oz0kmbVtmpq1/9EtQiEae+XZ8w88wlqhlu6//pNA0P/Fvd7EFBI90y9BaowNlG8ZpSH7m+/Hf/UKYOdP76e+lH/lX8923CwWLLdPUjo5mSvxoFb5WoOplVyqXfDj54OdprINIA/pp1KJfO2q36ifbvhOYJsq1jPbYHg6A4aOQX165LOzziAATWcP+05sRkEmm1XouOaeCFW/oyqx+uSuRsAQrAXrKihXL5y9c2PbSfplkbUO3NX3e4iUzpjcf7Tra1tomOBmvOYYcG9VUqhedVS6JzIIdTxhvbIvAN9Pq3e87twKw5lB7+tmXjx7qSAsSYDu9bGXl5z8+w+cVduyK3717Z3biRR7Xrl3rdvt4GRIekQwj2bnrrVjf/lSy4+GHf+H1BvN0pZTzkA5RM9Op+LZ3/hiP9QSCVWWhWjiYU1vwI1PJkyrolrCdJ7mQTpKkQ+PR7Mu/0QTHaeFW1cs/pr/+vL5hA/Yxp0LWoHbfCXw22/29ttHrhBSLNNJFK/qtQ/tpvtgeHZMGm63liJ2NODYgZEe6SLgONAEHdJzvkxN2g9iRo1YPwi7M+J6PHrSO7Md5Y7Q91pACIq4VqMvvUauq4qrINFaxWA5itBl/BsY4AHDMypCOdGZmLmVUwnQgA8upNe6Uc3CCmAWklCtHt/esWb36/JXnf+Yzn+7p6Xn7d9vh2zOWLfviF78IO/z+b91/5PCRstle4hoobQsdOiZqSvPpaLzwg2HaJotLpgP1PR1FTBWJIhAJNLHSqC1ME6CEpy/woGT4xOvxxvqYcaq3t6+/P1nAl+FN0UamkITG3ViRyAAH0lQaxPFakRQL8M923jgfsHIkFis0mw+WP7GG5FzcsJBjDLQHCDbGtfJydDa8+B3sFDv38+LXiVpA2DhyGUO0KKyZjjUkC9QSi2WKMgg0eKj0gL/DtI5PibXS5nkUrLNsmkiZ/I3Gssic3CzKoQcpMlm+KFgbUDa5uh5+9PHaurpbb7310Uce2blrJ2AKqDA11VW//OUvvv/dHxAFBWe6WBBQfsYAVuJJkxmSKE2nLZQj08nNs8dNzjytbPZ0nyBgQL050z0M41jkTonTdP7553NDMiCFz+draWmJx/u5OcbQ0wf3bxJFmRWBKEKc4EA9NxrPCqapZx31nFWJcHBn0aJFbrebI9GUIfn4oQ4V8hExgrPT4JYUHu5WLpXpBNmTaqeJ1WVO0oGEKxqwLyQtmok9fma+tS3hUDeKtI86dkKq6sSaKlbbyTSFikbiC0vzT2deEklCtklaulD8qBMZMt6m1De7gi6xaS5xeZTmBSzgUFbyk2GSjjjqbRnRCD1jkSgnhboZ2B0Q5swn8ZDoUJc60XJEyeg4toexu55KjQj4wJH09x91XOmU9vUbPGSG/wMIALXrhitqQeHddEb5/fds/9KXvrpp05bLr7issaGBCMKWzVv+uHbtM08/HU1E684slytJ4ZkBHe7YG3/g4QPcQ9QdyaVlcViHnkGtu/nqhlw5c6d6PeOBmQQuL1mypKamvlBsr6OjQ9NSulM6GkSYI4e3FR88e+6Sf//OU1o68b1vfOxIyzvH6CY56r2mpqby8nKOXJFI8C9c0ulPTOr3w/w8D/D9Rcw+C5qbvV/6ZqC2mUWEWVkcrvPe+S37xn7MOMho6mi7+OMH0ba3xu58nGMY3ORbvu5feT6zuXK9g9r+b6zmz2XiDuInHuvf/IVRLsHtdmmfvDvwoY/ajHw7ywr4Uuz756d4LBrxBtUnf45+8A1kaeMfW9+Fd/RfdhUL9OjXlKvvrvRIAxQ0nqD78YesTV9WkT1IALRRpd+XsWlg8bmBj3/OUcNs32cehMuIZk3DxsTlxUhKdXXEdtzc3/HusXdhpBb00slM73gERriOaFLvjeUqeDgBykzKswtsgSxcGP7DZ51ZdvfXFj3+swMvvvzMiy+u8fuDACb90f6Ullb9Yv055d5mubiqCvQcies9/TnjK08rL+anzCWy5xJPnYmkA5JZCVf62muvVFfXwJD6In2AYpIop7VkOp0adi8kGXcLgefRgW76btsxxQhJtqurVVXdb7+9MVTmZzGERIhGe0q+CydnO09yIZ0sScflF2afqb/0c5roc5JeElh2IdDCdZ2EGoRzr8G+8hN4dkHJPPef2pMPYp9UKHoKMgsybc9tXy8qczPylsFS9oWfJX90DykP5CQaFuJq27GY91MPIEGdaPjHF7/81Xvu/TqjTrTpDA9+ZoVcITM+VZrBnk987fLZTUurbVIpDChuoNHFbc+n7sbhWvsn9/Tf8TiWJcbs5Wywa9/QW7IikRSazTBRiaROrLpamrDDwmkGFGleLAnnDB+cx5NFCYIwvHJl2ey5i97a3L9/X6ytNfP2m1HVT8rKytQqWQwQekwlJ8AqEQ8qjGXziui4QOuVp+7KxyhPZnru/+Y/TkDjZDYsqxBDOKTF49ENGxhV9h/+MMaOnVKvStL30/2Zp79rd/YPidMRmprpovNOuHKXSbFSI/SYYnsgtqBxxRPTjEajJhX7BvEW9zsRyROfRpDDs3qGp0r320iHflRHI8gIKKOJviqf6sTuFFHw2QR5VZcQDCUZIXwCufIZBggd6kMRuxAphzwepnScgqsNOzw7xaBDWWwudlggBqUINNSqNe+vsuyqzp7MDx89tKslIUpOxN9wehEuBpS8ZQkwB3q27MHxQk6pkUJtrKn2Fw46jMDC60a+/kHnhPcecRyyxqQhjyVboWLu4BzojDcu0aF7sZxfFYOOhUqLbHS5kCtvXPQ4iYuc151yOzCrYgowZA06l+ZERVsGNTLsvGYOdASCVA/yDyMRn0INJm9anfus00KqQHL4wiodotoa17sHklrKzMX24RxkhMqk2kpVlrBLFkQR0cE0iUN6njvdt2JhEBdlYEHPDXWut3bG9YzF067yXjUaCsk1lcpkrmXp0rNcLreu65wrhydhHTy4J52ecOUfr9c3f/5pkiRns1m3YnPAzWa1d3e/OQU6gzW3wc78/uS41jhRFZciU0UtKkHDlhJR3JqqpjJkuH7ocYI7US2vwvWzcNHW5ASASlm5mk6PuU2JKKnhGqF57uCyMMiOW1JVnR7tjSWxpg3bydiXEPKogcZGr1PcgGYFsaIKlZUH4VyBYc6FwhWBpgU0kWBljrmkgNHsrgNbu0tPnhjrDh6HuwBAWhVWrlpV5fOIhep6RMAd3ZnvPnygrTMrFhUOtmz77MVlt1zXKElCzr9OR4Ez1FDtuvqSakkgFs1VwYXeDnekv/Pzlp6IPqiWuUUvPDt80/vrJ4PL//TF+2tq6np7ezvaO1iggGVpWuqxh+8/cnjPOPdCoU2bNvOrX33A7fb09fUBinEI6+vr+cQnPnSC9sLx2s6TWUgnSdKxLCMSj0nn3ohSkUGZVoaOQvXRrKkPV51u6HSUaiRLxGPxFdfgpqVMKihMC0v+oWbljNTep8YavLVnz+7Xlp9hXXkLL2E+MIeWLui+Awc2jpSkN55LMPzhjctvLPP72PayMI3LNBEhl30UFdfBdM5FUwptTZKzb4T32Kl47eRvI3Pfg6i7/SQtyoncBcuJoHHmkL0BLJAEzPlunFK8rExVX8zojmbFAUs6qwuaTFqySBRZkEQyLMEf69DmzMrsjUhAmULEZnkPDvU584j2xfSuop7ZFBo0qbGeZYlIIi4NelKpVDKZyoB+7OQ0+Hz+YlyboJatO4TtQpZ1lqO/GDYi+XjthT9jK1zCSQKd1tbWL33xn+VwLcVkEFUfKy3dqf3vv727e9eJO/tPf/qTZ1+cY8tKwW9BcI5hQbSMtn1jlCSGRfCTH//4xw+VIdU1tE44I2jRsNEHQnHJwzvU2XPbA48w9ZNbVrU0U9s8gUGKG488YUkPFnJ52byRfIFujLz2qcjAAldTXaaUBSTTMd+UBeS9h1KShAEgaioUt0uAuQTxZE6T1+sWh8gjfq/47qGEogj9cUPLWgQPNeLUhBW/T2ITBFOlCDv2JWAlAULVVigulWVayAqZ3ewNlcmFnqmT/+dWyM4DCVUVDhxJWWYp1/XCCy94vQHbtmFhVFdX33jjjclkzKUOzwzgOM7QSDxekUh09erVquou1LFhz8jEezD17hS06cTj8TUvvjCsV5VTdnu9WDxhY3lj42v6hteKH2sFGnPY1wE/B6FRNg/N6ulsIkXI8OK9ouARltz47B2mnuo6SIe4VGIjJ5E6XynygMDqCSJ0ivmreOW8C88uv+6vanSDws7ftD36wMMHkhmzzCd94obpS+b7QSopD8qfvGl6oVo5zpWmwRvfiX7n4QMZ3aEBNCkRBjmn4FovOa8SlDXL+epPWyLffmi/plvVIeUzNzfPnuYxnJ4/f8sMO1ffLt+zgNe+0fPtn+8HUcuMUQ3kqYlfWnt7u8sV41kLbreblZqxdEKGZ2VKp1MAT3BwLDYMlJim2d/fryhZEHMKfDrpdOL/FuiUQOw0Hlef6UT/DQM6TjwuKAp+Dx2zgEHx2EYRL4+9BFgOGWn4TenUSEIe9xiXoKvMhjusNO70QMdZfWHYS4BuVWVQPSafewJ723mcnjyH6zjvQg7cJeL3SIZhATQAlCTTZiJtygIxjJzxxalGn9ef8jPAaQBTaUvL5H547MwrMvQsAB7BkbKE0xkLeg44iV2FWQWRZ9BacwgMAX+SKcuwbKKNEUo+0l5YuHC+389qVCUSCZB0WFYEWxzsq7pq3+mnn60ormQqySp42lZVdaOiKHo201BX55JB/lJZ2I5l9PUcMYxswEtUBT5T6+rqQFPj0JtMRMe8myXvheOynd8bko4ojFVu/EQ2v2+Qc6eEJkvjKV5cqp0bD60Y41LRX0aD5zcAjcEkHZY8wvhDMUC8IEqIDhTbZC5EXsWcz4bluLLgMMINQOYxGQuUFQUGVDItVtYK5BpQ1pBDfspzzXG+HA1Cg3qmjCYVe1yCSbFl0NLqL195xZW1dU19fX2HDx/2+/25qg9OqcVgIPy3t/1jZWVtZ2cH822xkxJVdRmGOWvOWeUVEZX5LHE2k0zEegF0LNPg1sBFixYVqC36eo/+6okp9WqqTbWJIykheNO2/q4eVnbGZjYd6dZrGgAURIk0VrusosJ7hVcu0cDxMxo8t13XSDGOp8zfre8+cjRN8iowP+bVrZHWds0x06Bwmfyx6xoBdFSJVISUQkJpcVByXhemC2d7b3c3iiI+ckj7r3cO2xMv8phMJmOxGIg5ACsgxTgmQlJbP13Xs41NM71ev8xkFzcPhwQ84nSlgUAZY2FyKASzsuj1hSiiHm+QD04FZHK5ODE773MKdKbaVCsFd1raUvuPsPBoy6Rnn152wxW1fq/I/U22PQgOirVF5l+vkGuqwiLBPVH9jbcidgcaYjPJ9exYfC5bWXneGXWyiC1HuuFy0zCqqPN/baWrodoly2SHP/FL6UgJgQbPPfccgAXgCKAJqFeLFy8OBMs++amvplIJt9tbXl4pOi7OQoHzjo4OgJ7ly5dzq40gCBoTi+xItM+lemTZBUfu3LkTcIeDZTzWNwU6U22qjd1gq/MNP3Sf4wHjHWhDZt7VXSwQcWtOnoImhztMOcr/xMyH9ozQMzuAkSPZA+XMBQHn2As4LYCd42bnYhe2So9L7u7uVuJpzpHs8XicqyA1tU3c8sRNM5z22PkK8xjCQrEaSZJAlvF4y9KaKSsK92rt3bu3kCeR0f7SDcnHtyTAKO341pM8acOeuoRxXoLqETwh0R4xbhgF/RLBuewHlMsvx21HtUPtaY4NjTWuxlp3XiLJsV6AfBPwSpVheaRYGIv516VCseCCZb21UzvYluZBPtPq3bWVqk0HTDx4EpPQ3Nzs8zP7SzqdrqioKFi5OTNpPB4HuAE1ipd5yA/S4mnoKF+mJhwOA/TA+/5+5tUCiWnAkJyM/mUvpClJZ6odn3bRyvJzLyln1llUVDI8L5bAf363qMhCwSbMYqkJ2rE38djzrZxC6K8vrW1uYN7uQg1gONjjFj90eW0643CbF8s5BYcXQmUMzhy2ClooSkE27eh/ak27JBKQJG66qr6hxmWbtIBKk/HQXH7F5bW1zJDc2toK8kshxAZQRtO0lpYWgJgZM2YwV3pe2EkkEl1dXdytzsqWErJ06VIAHRCa1q1bB5/An6FQiBuVe3s7n/7VlHo11abaWK2u1rVolt8y7EEaUBE4cHabnIm3wDKBUDpjOURWTtwlzwu3c9+ycAQJNze4iyEMH9M540jNIxWvA4GZ44ymNMbsxd1bA0mhAxQXJbZshvEZZ7MsuMYcXGHxWN8+l3dAhwKtimdpFRmwaOGVl+Xj3xZkoinQmWpTbXSbDrUsRg9KizClEJXHN6TEQm44+tg5JQtRbtPBRVhSAIViz3d+ow50mCuhx+K8sCgSDkwWQzBEC8Un+D88gFg0jzslt2eefcbtDrBCHrpeU1Nz+umnF1cWLlTR49oWaE/wBsSc3bt3ezye6dOn86jCQoM/OUdyAbDSqdj/XdDpT+ARdEg60jHFX01G82wYlTttPLzQx3fwE7qEU3Pw47yEkgcviazyDMFOPj+jPR7qQkqkzEicsZQDPoSDkksVeEFOw+Tkr9hyAIv/EMCJ5UzlRJecDZgncOUJkQpYhmJJMxrX4XMB44oymUUbOiBomDYrJUqwZecggRuYRRErMpEkMqzAM+bkRyPRVErnhmS/309HoC/j3Mm9vb2AJkeOHNm8eXNFRUVzc/OQ2ue8JZPJQrE9Ixsf9i78eVfOmAtp/CtnStKZasen7W9Jrd/cBwhSW6E2VKss9pcOyCOw1fccSj62ui2btQJeFrCzcLYfwCZcJsMby6GeriqXOV0OHN8T0Q+2pYwipxX001Dlqq9RMR1EI81qiu5PPPVie8awKsvkv7uucUaDB0CmMiQvmOWXJcZGWB6UOZEXJqizO8sqQwj4yKG0oZey3wA4vL4yUIjS6XR5eXmxdDOkccWKiXiS5HK5Ck7x4sY/qaqqgmP4ey0VbXlrSr2aalNtrPar/+r89WNdIFNcc2PVXXdOc8nEcvLIC7ssk7WP9mSSKSsVtLSMzXPNl8zzz5vBytgD2rgUwo0+IIm8sy32H99sySQskq+ip2ftmz9ef8ftTdQclE4Frxnd6uzOJDUTOUIWcrLbz1kaXrogyAfgVgXudAcEeP2NyI8fOGxmKbGRFgUEnPCVXnXVVTW1jX19fSC/FCKSx/wVV6aGU0tZ8M7y5cvD4TAPDuzv63z1hSnQmWpTbaymxSyzD1QrmkxY3HpSAIXcY58wqUQQUD6XyikBLhOXIuSjaQY4RkFiSvSY6T6rkOoJoJNJmgxE8CD1ip9CcNK1SFHirkvGblXKecEoLfDAZzQa6zDMDEvNISUtf1CFEolEKpXSNI27vYu/tZwGuhXIOKIo8vBicdRsZughk8mA3MRBR8to/3dtOpNsI6mXJauRJ7NNDX7CK0lgufomq9VsJ+OGKecohjgDMiuqmjSoYWMTIcPWUkY8pjOyxBxqDGRpwoNfklAmbQoEMYocoSARIEO3Ev26XUQ3zOEmk7KQbhMT2U7PqbjO5ZqCpbmAejBEPWNK0K3Eey5lNlavWe31loGEAqBTU1OzePFibqaxnfwLUKO4/RhwJBaL7d692zRNeCOKg/h7CoZkXj9ry5Yt8IZfWFbr/8teOf9fgAEAVg5T08CUFxEAAAAASUVORK5CYII=";
      var newrecordPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAv4AAAGRCAIAAACSTSD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGRDVBMkFFNzlBNTJFODExQkJGMzg1MkFFNDc4NDQ2QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRkRFMzc3QTU0MTcxMUU4OEIwOUFGQTFFQ0FCMzJFNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRkRFMzc3OTU0MTcxMUU4OEIwOUFGQTFFQ0FCMzJFNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZGNUEyQUU3OUE1MkU4MTFCQkYzODUyQUU0Nzg0NDZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZENUEyQUU3OUE1MkU4MTFCQkYzODUyQUU0Nzg0NDZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OwDWWgAAQGRJREFUeNrs3WuQXNV99/u1L909V901IwmMuFkyIBSDjCKbBzs2VpxAUQ7ESXihhII3CQXmhalQUIBfGLlMUYWrHi7Bz5MUFGXVMa5yFHMcdB4f4gPHPHYwGOIDA0ZG6AKSQBpppJGmp6977/Pfe2mapvfununbzO7u76fE0NPTs3v17j29fnuttdcyRkZGFAAAQG8w2QUAAIDoAwAAQPQBAAAg+gAAABB9AAAAiD4AAABEHwAAAKIPAAAA0QcAAIDoAwAAQPQBAAAg+gAAAKIPAAAA0QcAAIDoAwAAQPQBAAAg+gAAABB9AAAAiD4AAABEHwAAAKIPAAAA0QcAAIDoAwAAiD4AAABEHwAAAKIPAAAA0QcAAIDoAwAAQPQBAAAg+gAAABB9AAAAiD4AAABEHwAAAKIPAAAg+gAAABB9AAAAiD4AAABEHwAAAKIPAAAA0QcAAIDoAwAAQPQBAAAg+gAAABB9AAAAiD4AAIDoAwAAQPQBAAAg+gAAABB9AAAAiD4AAABEHwAAAKIPAAAA0QcAAIDoAwAAQPQBAACoxmYXAEDLrV279rbbbpMbX/ziF88777yKn46Pj+/atUtu/OQnP3nllVcWpGDr16/fsmVL+AFPP/20fH3//fcfe+wx3kd0JWNkZIS90Cl27NixdevW8OfUXXfd1b6nkM/oDRs21P6thx566KabbpqfnTA2Nnb11VeXf46Ha459+/ZFfqbP3d69ewcHB8P3P/DAA83UB5E76uabb9a14MJq+ZuYTqelXte3mzlEF/DoasDmzZu/EYg8fmrsqMcff/zAgQPtTjzXXHPNypUr5/5bL7/88quvvrp9+/ZuPboiP1TrJR84v/zlL+XGqVOnmt9XmAe0+nQ8+UCZ/xPH+JDaQj6dK4KOnGTLB33DFcm2bduq1VuXXHJJM6WV8+xqZ//dR/ZhqbaTG7p6aGFMjxs5bCTFznqeUG1HiZ07dz744IMtD0ASd/7+7/++sZOBLYFbbrlFPmRi9d7F6ug6L6Bvf/Ob35QA/cILL5CB4oyxPt3gkUce6eWXv3v37tZmlCuvvLLaj6666qpminrppZdW3PPSSy/1yNskdYNUUVIrSETospe2efPmZ5999uGHH24g95S74YYbpMq8/fbbW1i2J5544qmnnmqyEVTnjDi/d7E6uuQwkAC0d+/e++67j+qJ6IM2/tk/9NBDPfvyX3zxxfCdf/Inf9LwBi+77LJqP1q5cqWcQzd88h1uTHrrrbd66s2SHSgRoZuqBEkqP/vZz5rMFuUh4/7775e80vym5HiTKCBxqrXv3Y4dOzi65vhWSgB6+eWXJRlTSRF90BZyxtOzf2C7du1Kp9MVd4a7luZo7dq14UGpLQlVkb8otWYPvmVSJbS2bWOhSEaRpNLyzUpeaTJhbNu27amnnqprWM8cbd26Vapz+TPh6JrjeekzzzzTfS2dRB/ERS93e7355psV94S7lubob//2b2s/oOFQFf7Fffv2tXVka5x961vf6vSwLumkdpvK2NjY008//eijj46GPB2onTAabvu57777Hn744dqP2blzpxTguuuuqyjYnXfeKfdLuKldnT/33HNxfvtidXQNDg7K20H6iRWGOXcP3e0Vn6GI8qk6b4Ovd+/eXdHjIB8311xzTQMjiK+44oryb9Pp9PT0dPnZszxRY2Oow2lMXxUSZw2/iXLafc4550Re1116g773ve81fDnVfB5dkSSX1LgySNJD7Su29N+pfJWYcuONN0Y2z0iueuutt+q9olCq2G9+85vVfippWxJbjW2WtzbVuCxLCvzkk09ee+21zWT32B5dEgHn/mD5nNENurWvnpP0MzEx0a3XNHQcWn26inxONTwSpaO1cLhPRUB58803wyOR5SO73s1GDvSJLHZ3kMpV6nWJiTfffPPY2FjkYzZs2NChp8KSCaq19+ixHfLa55gJtm/fLvvh+eefb0nrhRxm3/nOdyJ/JCH+gQcekHdk7llKXoWEgGplk2r+xz/+MUeXpJm7AvKM8slQo8FMDps4dxQSfdDBvv3tb/fgq27VcJ9wQNm9e3d4JHIDl4+Fc5gUuBdOAeU1ysl3terzr/7qrzruFUkWqdYWItni61//egMNIVJJR/Z/ydF477331pXJIudlkHzw5S9/ubEpqaRsd955Z/jvS8XgAou4HV2vvPKKHAByGETuLgmLPX41LtEH7dKzV3v9+te/rrinrlbragHlxRdfDI9ErnEJWDXhHBYen9TFpPqMPBu+9NJLO+48+Hvf+17k/ZIPmpnu8q677tq5c2f4/i1btsyx9eKJJ56I7HCR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";
      var plugin = cc.Class({
        extends: cc.Object,
        shareFb: function shareFb() {
          var intent = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "REQUEST";
          var callback = arguments[1];
          FBInstant.shareAsync({
            intent: intent,
            image: sharePng,
            text: "It's a amazing game, play with me!",
            data: {
              myReplayData: "..."
            }
          }).then(function() {
            callback && callback();
          });
        },
        shareNewRecord: function shareNewRecord(score, callback) {
          FBInstant.shareAsync({
            intent: "REQUEST",
            image: newrecordPng,
            text: "I got new record " + score.toString(),
            data: {
              myReplayData: "..."
            }
          }).then(function() {
            callback && callback();
          });
        },
        playerName: function playerName() {
          var playerName = FBInstant.player.getName();
          return playerName;
        },
        chooseAsync: function chooseAsync(callback) {
          FBInstant.context.chooseAsync().then(function() {
            console.log(FBInstant.context.getID());
            callback && callback(FBInstant.context.getID());
          });
        },
        updateAsync: function updateAsync(text, callback) {
          FBInstant.updateAsync({
            action: "CUSTOM",
            cta: "Play",
            image: sharePng,
            text: {
              default: FBInstant.player.getName() + text
            },
            template: "play_turn",
            data: {
              myReplayData: "..."
            },
            strategy: "IMMEDIATE",
            notification: "NO_PUSH"
          }).then(function() {
            console.log("Message was sent successfully");
            callback && callback();
          });
        },
        updateHighAsync: function updateHighAsync(text, callback) {
          FBInstant.updateAsync({
            action: "CUSTOM",
            cta: "Play",
            image: newrecordPng,
            text: {
              default: FBInstant.player.getName() + text
            },
            template: "play_turn",
            data: {
              myReplayData: "..."
            },
            strategy: "IMMEDIATE",
            notification: "NO_PUSH"
          }).then(function() {
            console.log("Message was sent successfully");
            callback && callback();
          });
        },
        createShortCut: function createShortCut() {
          FBInstant.canCreateShortcutAsync().then(function(canCreateShortcut) {
            canCreateShortcut && FBInstant.createShortcutAsync().then(function() {}).catch(function() {});
          });
        },
        InterstitialAdAsync: function InterstitialAdAsync(callback) {
          var GameConfig = require("GameConfig");
          var ad = null;
          FBInstant.getInterstitialAdAsync(GameConfig.InterstitialAdId).then(function(interstitial) {
            console.log("ad loadAsync:");
            ad = interstitial;
            return interstitial.loadAsync();
          }).then(function() {
            console.log("Ad loaded");
            return ad.showAsync();
          }).then(function() {
            console.log("I don't know what happened");
            callback && callback();
          });
        },
        RewardedVideoAsync: function RewardedVideoAsync(callback) {
          var GameConfig = require("GameConfig");
          var ad = null;
          FBInstant.getRewardedVideoAsync(GameConfig.RewardedVideoId).then(function(rewardedVideo) {
            ad = rewardedVideo;
            return ad.loadAsync();
          }).then(function() {
            console.log("Ad loaded");
            return ad.showAsync();
          }).then(function() {
            console.log("I don't know what happened");
            callback && callback();
          });
        }
      });
      var p = new plugin();
      return p;
    }();
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  GameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfb54dYY6tCS6lGZs5QIS7C", "GameConfig");
    "use strict";
    module.exports = function() {
      var Config = cc.Class({
        extends: cc.Object,
        properties: {
          DebugVersion: true,
          InnerVersion: "0.0.2",
          Platform: "fbi111ntantgame",
          TankHeight: 70,
          TankWidth: 70,
          ItemWidth: 50,
          InterstitialAdId: "488883394847366_506509883084717",
          RewardedVideoId: "488883394847366_506509619751410"
        },
        ctor: function ctor() {},
        isFBInstantGame: function isFBInstantGame() {
          return "fbintantgame" == this.Platform;
        }
      });
      return new Config();
    }();
    cc._RF.pop();
  }, {} ],
  GameMenuController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1fc47DQ14RMSbRbdbHJzBGp", "GameMenuController");
    "use strict";
    var GameMenuView = require("GameMenuView");
    var UIBottomFactory = require("UIBottomFactory");
    var AcceleratorConfig = require("AcceleratorConfig");
    var ToolConfig = require("ToolConfig");
    var EfficiencyConfig = require("EfficiencyConfig");
    var LevelConfig = require("LevelConfig");
    var ParticleSystemCenter = require("ParticleSystemCenter");
    var SkeletonDataCenter = require("SkeletonDataCenter");
    var Global = require("Global");
    cc.Class({
      extends: cc.Component,
      properties: {
        bottomlist: cc.Node,
        scrollView: cc.ScrollView,
        level: cc.Label,
        gold: cc.Label,
        gem: cc.Label,
        TopProgressBar: cc.ProgressBar,
        radioButton: {
          default: [],
          type: cc.Toggle
        },
        levelupBtn: cc.Button,
        thisCheck: {
          visible: false,
          default: 0
        },
        radiotext: {
          default: [],
          type: cc.Label
        },
        BoxController: require("BoxController")
      },
      onLoad: function onLoad() {
        this.config = [ AcceleratorConfig, ToolConfig, EfficiencyConfig ];
        this.itemList = [];
        this.btnColor = [ "#ffa30f", "#f9f9f9" ];
      },
      addUIBottom: function addUIBottom() {
        void 0 == this.config && (this.config = [ AcceleratorConfig, ToolConfig, EfficiencyConfig ]);
        this.itemList = [];
        var startpos = -this.bottomlist.width / 2;
        for (var i = 0; i < this.config.length; i++) for (var j = 1; void 0 != this.config[i][j]; j++) {
          var node = UIBottomFactory.create(i, this.config[i][j], this.eventcallback.bind(this));
          node.position = cc.p(startpos + 75, 0);
          this.bottomlist.addChild(node);
          this.itemList.push(node);
          startpos += 156;
        }
      },
      initInfo: function initInfo() {
        this.setGoldNum(Global.gold);
        this.setLevel(Global.level);
        this.setGem(Global.gem);
        var hard = Global.hard;
        var exp = LevelConfig[Global.level].exp;
        this.setProgress(Global.exp / exp);
      },
      setGoldNum: function setGoldNum(num) {
        this.gold.string = num;
      },
      setLevel: function setLevel(level) {
        this.level.string = "level:" + level;
      },
      setGem: function setGem(value) {
        this.gem.string = value;
      },
      setProgress: function setProgress(value) {
        var pro = this.TopProgressBar.progress;
        if (1 == pro && 1 == value) return;
        this.levelupBtn.interactable = value >= 1;
        this.TopProgressBar.progress = value;
      },
      changeHammerSpine: function changeHammerSpine(data) {
        this.BoxController.changeHammerSpine(data);
      },
      updateDate: function updateDate(data) {
        for (var name in data) {
          if ("exp" == name) {
            var exp = LevelConfig[Global.level].exp;
            var pro = data.exp / exp;
            pro > 1 && (pro = 1);
            this.setProgress(pro);
          }
          "level" == name && this.setLevel(data.level);
          "gold" == name && this.setGoldNum(data.gold);
          "gem" == name && this.setGem(data.gem);
        }
        "level" != name && "gold" != name || this.updateButtom();
      },
      scrollEvent: function scrollEvent(sender, event) {
        var thispos = sender.getScrollOffset();
        var movex = -thispos.x;
        var num1 = 310;
        var num2 = 1240;
        movex < num1 ? this.setCheckToggle(0) : movex < num2 ? this.setCheckToggle(1) : this.setCheckToggle(2);
      },
      radioButtonClicked: function radioButtonClicked(toggle) {
        var index = this.radioButton.indexOf(toggle);
        switch (index) {
         case 0:
          this.scrollView.scrollToOffset(cc.p(0, 0), .2);
          break;

         case 1:
          var num1 = 312;
          this.scrollView.scrollToOffset(cc.p(num1, 0), .2);
          break;

         case 2:
          var num2 = 1248;
          this.scrollView.scrollToOffset(cc.p(num2, 0), .2);
        }
        this.setCheckToggle(index);
      },
      setCheckToggle: function setCheckToggle(num) {
        if (this.thisCheck == num) return;
        this.thisCheck = num;
        for (var i = 0; i < this.radioButton.length; i++) this.radiotext[i].node.color = i == num ? new cc.color(this.btnColor[0]) : new cc.color(this.btnColor[1]);
      },
      onClickLevel: function onClickLevel() {
        this.TopProgressBar.progress >= 1 && (this.BoxController.upgradView.active = true);
      },
      addlevel: function addlevel() {
        var myinfo = {};
        var level = Global.level + 1;
        var needexp = LevelConfig[level].exp;
        var needgold = LevelConfig[level].rewardcoin;
        myinfo.level = level;
        Global.saveLevel(level);
        myinfo.exp = Global.exp - needexp;
        Global.saveExp(myinfo.exp);
        myinfo.gold = Global.gold + needgold;
        Global.saveGold(myinfo.gold);
        this.updateDate(myinfo);
      },
      eventcallback: function eventcallback(type, id) {
        var string = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        this.BoxController.eventcallback(type, id, string);
      },
      updateButtom: function updateButtom() {
        for (var i = 0; i < this.itemList.length; i++) {
          var node = this.itemList[i].getComponent("UIBottom");
          node.setBtnState();
        }
      }
    });
    cc._RF.pop();
  }, {
    AcceleratorConfig: "AcceleratorConfig",
    BoxController: "BoxController",
    EfficiencyConfig: "EfficiencyConfig",
    GameMenuView: "GameMenuView",
    Global: "Global",
    LevelConfig: "LevelConfig",
    ParticleSystemCenter: "ParticleSystemCenter",
    SkeletonDataCenter: "SkeletonDataCenter",
    ToolConfig: "ToolConfig",
    UIBottomFactory: "UIBottomFactory"
  } ],
  GameMenuView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8a654TrH0xLVZOmV8SpsIXn", "GameMenuView");
    "use strict";
    var GameConfig = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  GameState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5cc3MwdINHdrcle6fBalK0", "GameState");
    "use strict";
    module.exports = cc.Enum({
      init: 0,
      hatting: 1,
      end: 2
    });
    cc._RF.pop();
  }, {} ],
  GameType: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f82eH+hhhKIoMkB8u+Rd/V", "GameType");
    "use strict";
    module.exports = {
      profabType: cc.Enum({
        BlockBig: 0,
        BlockSmall: 1,
        UIBottom: 2,
        MarginsBig: 3,
        MarginsSmall: 4,
        RewardItem: 5
      }),
      bottomRadio: cc.Enum({
        Accelerator: 0,
        Tool: 1,
        Efficiency: 2
      })
    };
    cc._RF.pop();
  }, {} ],
  GameUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e82d1v8gBFO97NpiOTqbHmv", "GameUtils");
    "use strict";
    module.exports = {
      randomInt: function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      random: function random(number) {
        return this.randomInt(0, number);
      },
      formatNum: function formatNum(num) {
        var str = void 0;
        str = num > 1e3 ? parseInt(num / 1e3) + "k" : "" + num;
        return str;
      },
      formatTime: function formatTime(num) {
        var str = "";
        if (num >= 3600) {
          str += Math.floor(num / 3600) + "h";
          num %= 3600;
        }
        if (num >= 60) {
          str += Math.floor(num / 60) + "min";
          num %= 60;
        }
        num > 0 && (str += Math.floor(num) + "s");
        return str;
      }
    };
    cc._RF.pop();
  }, {} ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d84cHfepJMm5hdOQQhmuG8", "Global");
    "use strict";
    cc._RF.push(module, "4d84cHfepJMm5hdOQQhmuG8", "Global");
    "use strict";
    var GameConfig = require("GameConfig");
    module.exports = function() {
      var lc = require("LocalStorage");
      var high = "high";
      var cls = cc.Class({
        properties: {
          hard: 1,
          level: 1,
          gold: 1,
          gem: 1,
          exp: 1,
          openAdTimes: 0,
          inviteFriends: 0,
          hammer: {
            default: {}
          },
          efficiency: {
            default: {}
          },
          addgold: 0,
          addgem: 0,
          freindsInfo: [],
          bar1: 0,
          bar2: 0
        },
        initInfo: function initInfo() {
          this.hard = 1;
          lc.get("level", 1, function(v) {
            this.level = "string" == typeof v ? parseInt(v) : "number" == typeof v ? v : 0;
          }.bind(this));
          lc.get("gold", 1, function(v) {
            this.gold = "string" == typeof v ? parseInt(v) : "number" == typeof v ? v : 0;
          }.bind(this));
          lc.get("hammer", null, function(v) {
            this.hammer = null != v ? JSON.parse(v) : {};
          }.bind(this));
          lc.get("exp", 0, function(v) {
            this.exp = "string" == typeof v ? parseInt(v) : "number" == typeof v ? v : 0;
          }.bind(this));
          lc.get("gem", 0, function(v) {
            this.gem = "string" == typeof v ? parseInt(v) : "number" == typeof v ? v : 0;
          }.bind(this));
          lc.get("openAdTimes", 0, function(v) {
            this.openAdTimes = "string" == typeof v ? parseInt(v) : "number" == typeof v ? v : 0;
          }.bind(this));
          lc.get("inviteFriends", [], function(v) {
            this.inviteFriends = "array" == typeof v ? v : [];
          }.bind(this));
          lc.get("efficiency", null, function(v) {
            this.efficiency = null != v ? JSON.parse(v) : {};
          }.bind(this));
        },
        saveLevel: function saveLevel(h) {
          lc.set("level", h);
          this.level = h;
        },
        saveExp: function saveExp(h) {
          lc.set("exp", h);
          this.exp = h;
        },
        saveHammer: function saveHammer(hammer) {
          lc.set("hammer", JSON.stringify(hammer));
          this.hammer = hammer;
        },
        saveGold: function saveGold(gold) {
          lc.set("gold", gold);
          this.gold = gold;
        },
        saveGem: function saveGem(gem) {
          lc.set("gem", gem);
          this.gem = gem;
        },
        saveOpenAdTimes: function saveInviteFriends(openAdTimes) {
          lc.set("openAdTimes", openAdTimes);
          this.openAdTimes = openAdTimes;
        },
        saveInviteFriends: function saveInviteFriends(inviteFriends) {
          lc.set("inviteFriends", inviteFriends);
          this.inviteFriends = inviteFriends;
        },
        saveEfficiency: function saveEfficiency(efficiency) {
          lc.set("efficiency", JSON.stringify(efficiency));
          this.efficiency = efficiency;
        }
      });
      var instance = new cls();
      return instance;
    }();
    cc._RF.pop();
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig",
    LocalStorage: "LocalStorage"
  } ],
  ItemConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2dd09YGtDRBVIkO7vxa6R8Q", "ItemConfig");
    "use strict";
    module.exports = {
      1002: {
        icon: "icon_baoshi",
        id: "1002",
        name: "钻石"
      },
      1001: {
        icon: "icon_jinbi",
        id: "1001",
        name: "金币"
      }
    };
    cc._RF.pop();
  }, {} ],
  JSExtends: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ded9ewZcoVJL5UzQw94X8Mu", "JSExtends");
    "use strict";
    var BingLog = require("BingLog");
    module.exports = function() {
      Array.prototype.contains = function(obj) {
        var i = Object.keys(this).length;
        while (i--) if (this[i] === obj) return true;
        return false;
      };
      Array.prototype.remove = function(obj) {
        var i = this.length;
        while (i--) this[i] === obj && this.splice(i, 1);
      };
      Date.prototype.AddDays = function(number) {
        var adjustDate = new Date(this.getTime() + 864e5 * number);
        return adjustDate;
      };
      Date.prototype.AddHours = function(number) {
        var adjustDate = new Date(this.getTime() + 36e5 * number);
        return adjustDate;
      };
      Date.prototype.AddMinutes = function(number) {
        var adjustDate = new Date(this.getTime() + 6e4 * number);
        return adjustDate;
      };
      Date.prototype.AddSeconds = function(number) {
        var adjustDate = new Date(this.getTime() + 1e3 * number);
        return adjustDate;
      };
      Date.prototype.DayOfYear = function() {
        var start = new Date(this.getFullYear(), 0, 0);
        var diff = this - start;
        var oneDay = 864e5;
        var day = Math.floor(diff / oneDay);
        return day;
      };
      cc.loader.getRes = function(url, type) {
        var item = this._cache[url];
        if (!item) {
          var uuid = this._getResUuid(url, type, true);
          if (!uuid) return null;
          var ref = this._getReferenceKey(uuid);
          item = this._cache[ref];
        }
        item && item.alias && (item = this._cache[item.alias]);
        return item && item.complete ? item.content : null;
      };
      cc.dumpNodes = function() {
        var onlyroot = arguments[0];
        var rootNode = arguments[1];
        var path = arguments[2];
        rootNode || (rootNode = cc.director.getScene());
        path || (path = "");
        var cNodes = rootNode.getChildren();
        for (var i = 0; i < cNodes.length; ++i) {
          var node = cNodes[i];
          var currentPath = path + "/" + node._name;
          BingLog.log(currentPath);
          onlyroot && node.getChildrenCount() > 0 && cc.dumpNodes(onlyroot, node, currentPath);
        }
      };
      cc.mypt = function(name) {
        console.log(name, cc.find(name).getPosition());
      };
      cc.cachedTextureInfo = function() {
        BingLog.log("native:", cc.sys.isNative);
        if (cc.sys.isNative) {
          var ret = cc.textureCache.getCachedTextureInfo();
          BingLog.log("dump:\n", ret);
        } else {
          var AllTextures = cc.textureCache.getAllTextures();
          for (var i = 0; i < AllTextures.length; ++i) {
            var texture = AllTextures[i];
            BingLog.log(texture.name, texture.getPixelWidth(), texture.getPixelHeight(), texture.pixelFormat);
          }
        }
      };
    }();
    cc._RF.pop();
  }, {
    BingLog: "BingLog"
  } ],
  LanguageConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ccebatJ5LlE9ZDnHrdIBXAH", "LanguageConfig");
    "use strict";
    module.exports = {
      10004: {
        Japanese: "",
        id: "10004",
        Chinese: "金币",
        English: "coin xs%"
      },
      10005: {
        Japanese: "",
        id: "10005",
        Chinese: "铲子",
        English: "shovel"
      },
      10006: {
        Japanese: "",
        id: "10006",
        Chinese: "长铲",
        English: "long shovel"
      },
      10007: {
        Japanese: "",
        id: "10007",
        Chinese: "宽铲",
        English: "wide shovel"
      },
      10001: {
        Japanese: "",
        id: "10001",
        Chinese: "高级加成",
        English: "big addition"
      },
      10002: {
        Japanese: "",
        id: "10002",
        Chinese: "加成",
        English: "addition"
      },
      10003: {
        Japanese: "",
        id: "10003",
        Chinese: "速度金币",
        English: "speed xs%, coin xs%"
      },
      10008: {
        Japanese: "",
        id: "10008",
        Chinese: "尖凿",
        English: "sharp chisel"
      },
      10009: {
        Japanese: "",
        id: "10009",
        Chinese: "凿子",
        English: "chisel"
      },
      10024: {
        Japanese: "",
        id: "10024",
        Chinese: "",
        English: ""
      },
      10025: {
        Japanese: "",
        id: "10025",
        Chinese: "",
        English: ""
      },
      10022: {
        Japanese: "",
        id: "10022",
        Chinese: "",
        English: ""
      },
      10023: {
        Japanese: "",
        id: "10023",
        Chinese: "",
        English: ""
      },
      10020: {
        Japanese: "",
        id: "10020",
        Chinese: "",
        English: ""
      },
      10021: {
        Japanese: "",
        id: "10021",
        Chinese: "",
        English: ""
      },
      10019: {
        Japanese: "",
        id: "10019",
        Chinese: "跳过时间",
        English: "skip s%min"
      },
      10018: {
        Japanese: "",
        id: "10018",
        Chinese: "持续时间",
        English: "last s%min"
      },
      10013: {
        Japanese: "",
        id: "10013",
        Chinese: "电钻",
        English: "drill"
      },
      10012: {
        Japanese: "",
        id: "10012",
        Chinese: "宽锄",
        English: "wide hoe"
      },
      10011: {
        Japanese: "",
        id: "10011",
        Chinese: "锄头",
        English: "hoe"
      },
      10010: {
        Japanese: "",
        id: "10010",
        Chinese: "尖锄",
        English: "sharp hoe"
      },
      10017: {
        Japanese: "",
        id: "10017",
        Chinese: "跳过时间",
        English: "time skip"
      },
      10016: {
        Japanese: "",
        id: "10016",
        Chinese: "金币倍数",
        English: "coin xs%"
      },
      10015: {
        Japanese: "",
        id: "10015",
        Chinese: "伤害",
        English: "s% per s%s"
      },
      10014: {
        Japanese: "",
        id: "10014",
        Chinese: "强力钻",
        English: "power drill"
      }
    };
    cc._RF.pop();
  }, {} ],
  LevelConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fba9aiEmgFDJJvda7PP9wPV", "LevelConfig");
    "use strict";
    module.exports = {
      165: {
        rewardcoin: 544500,
        id: "165",
        exp: 44921250
      },
      133: {
        rewardcoin: 353780,
        id: "133",
        exp: 23526370
      },
      132: {
        rewardcoin: 348480,
        id: "132",
        exp: 22999680
      },
      131: {
        rewardcoin: 343220,
        id: "131",
        exp: 22480910
      },
      130: {
        rewardcoin: 338e3,
        id: "130",
        exp: 2197e4
      },
      137: {
        rewardcoin: 375380,
        id: "137",
        exp: 25713530
      },
      136: {
        rewardcoin: 369920,
        id: "136",
        exp: 25154560
      },
      135: {
        rewardcoin: 364500,
        id: "135",
        exp: 24603750
      },
      134: {
        rewardcoin: 359120,
        id: "134",
        exp: 24061040
      },
      139: {
        rewardcoin: 386420,
        id: "139",
        exp: 26856190
      },
      138: {
        rewardcoin: 380880,
        id: "138",
        exp: 26280720
      },
      166: {
        rewardcoin: 551120,
        id: "166",
        exp: 45742960
      },
      24: {
        rewardcoin: 11520,
        id: "24",
        exp: 138240
      },
      25: {
        rewardcoin: 12500,
        id: "25",
        exp: 156250
      },
      26: {
        rewardcoin: 13520,
        id: "26",
        exp: 175760
      },
      27: {
        rewardcoin: 14580,
        id: "27",
        exp: 196830
      },
      20: {
        rewardcoin: 8e3,
        id: "20",
        exp: 8e4
      },
      21: {
        rewardcoin: 8820,
        id: "21",
        exp: 92610
      },
      22: {
        rewardcoin: 9680,
        id: "22",
        exp: 106480
      },
      23: {
        rewardcoin: 10580,
        id: "23",
        exp: 121670
      },
      160: {
        rewardcoin: 512e3,
        id: "160",
        exp: 4096e4
      },
      28: {
        rewardcoin: 15680,
        id: "28",
        exp: 219520
      },
      29: {
        rewardcoin: 16820,
        id: "29",
        exp: 243890
      },
      161: {
        rewardcoin: 518420,
        id: "161",
        exp: 41732810
      },
      4: {
        rewardcoin: 320,
        id: "4",
        exp: 640
      },
      8: {
        rewardcoin: 1280,
        id: "8",
        exp: 5120
      },
      163: {
        rewardcoin: 531380,
        id: "163",
        exp: 43307470
      },
      119: {
        rewardcoin: 283220,
        id: "119",
        exp: 16851590
      },
      120: {
        rewardcoin: 288e3,
        id: "120",
        exp: 1728e4
      },
      121: {
        rewardcoin: 292820,
        id: "121",
        exp: 17715610
      },
      122: {
        rewardcoin: 297680,
        id: "122",
        exp: 18158480
      },
      123: {
        rewardcoin: 302580,
        id: "123",
        exp: 18608670
      },
      124: {
        rewardcoin: 307520,
        id: "124",
        exp: 19066240
      },
      125: {
        rewardcoin: 312500,
        id: "125",
        exp: 19531250
      },
      126: {
        rewardcoin: 317520,
        id: "126",
        exp: 20003760
      },
      127: {
        rewardcoin: 322580,
        id: "127",
        exp: 20483830
      },
      128: {
        rewardcoin: 327680,
        id: "128",
        exp: 20971520
      },
      129: {
        rewardcoin: 332820,
        id: "129",
        exp: 21466890
      },
      167: {
        rewardcoin: 557780,
        id: "167",
        exp: 46574630
      },
      118: {
        rewardcoin: 278480,
        id: "118",
        exp: 16430320
      },
      59: {
        rewardcoin: 69620,
        id: "59",
        exp: 2053790
      },
      58: {
        rewardcoin: 67280,
        id: "58",
        exp: 1951120
      },
      55: {
        rewardcoin: 60500,
        id: "55",
        exp: 1663750
      },
      54: {
        rewardcoin: 58320,
        id: "54",
        exp: 1574640
      },
      57: {
        rewardcoin: 64980,
        id: "57",
        exp: 1851930
      },
      56: {
        rewardcoin: 62720,
        id: "56",
        exp: 1756160
      },
      51: {
        rewardcoin: 52020,
        id: "51",
        exp: 1326510
      },
      50: {
        rewardcoin: 5e4,
        id: "50",
        exp: 125e4
      },
      53: {
        rewardcoin: 56180,
        id: "53",
        exp: 1488770
      },
      52: {
        rewardcoin: 54080,
        id: "52",
        exp: 1406080
      },
      164: {
        rewardcoin: 537920,
        id: "164",
        exp: 44109440
      },
      199: {
        rewardcoin: 792020,
        id: "199",
        exp: 78805990
      },
      179: {
        rewardcoin: 640820,
        id: "179",
        exp: 57353390
      },
      200: {
        rewardcoin: -1,
        id: "200",
        exp: -1
      },
      195: {
        rewardcoin: 760500,
        id: "195",
        exp: 74148750
      },
      194: {
        rewardcoin: 752720,
        id: "194",
        exp: 73013840
      },
      197: {
        rewardcoin: 776180,
        id: "197",
        exp: 76453730
      },
      178: {
        rewardcoin: 633680,
        id: "178",
        exp: 56397520
      },
      191: {
        rewardcoin: 729620,
        id: "191",
        exp: 69678710
      },
      190: {
        rewardcoin: 722e3,
        id: "190",
        exp: 6859e4
      },
      193: {
        rewardcoin: 744980,
        id: "193",
        exp: 71890570
      },
      192: {
        rewardcoin: 737280,
        id: "192",
        exp: 70778880
      },
      115: {
        rewardcoin: 264500,
        id: "115",
        exp: 15208750
      },
      114: {
        rewardcoin: 259920,
        id: "114",
        exp: 14815440
      },
      88: {
        rewardcoin: 154880,
        id: "88",
        exp: 6814720
      },
      89: {
        rewardcoin: 158420,
        id: "89",
        exp: 7049690
      },
      111: {
        rewardcoin: 246420,
        id: "111",
        exp: 13676310
      },
      110: {
        rewardcoin: 242e3,
        id: "110",
        exp: 1331e4
      },
      113: {
        rewardcoin: 255380,
        id: "113",
        exp: 14428970
      },
      112: {
        rewardcoin: 250880,
        id: "112",
        exp: 14049280
      },
      82: {
        rewardcoin: 134480,
        id: "82",
        exp: 5513680
      },
      83: {
        rewardcoin: 137780,
        id: "83",
        exp: 5717870
      },
      80: {
        rewardcoin: 128e3,
        id: "80",
        exp: 512e4
      },
      81: {
        rewardcoin: 131220,
        id: "81",
        exp: 5314410
      },
      86: {
        rewardcoin: 147920,
        id: "86",
        exp: 6360560
      },
      87: {
        rewardcoin: 151380,
        id: "87",
        exp: 6585030
      },
      84: {
        rewardcoin: 141120,
        id: "84",
        exp: 5927040
      },
      85: {
        rewardcoin: 144500,
        id: "85",
        exp: 6141250
      },
      198: {
        rewardcoin: 784080,
        id: "198",
        exp: 77623920
      },
      3: {
        rewardcoin: 180,
        id: "3",
        exp: 270
      },
      177: {
        rewardcoin: 626580,
        id: "177",
        exp: 55452330
      },
      7: {
        rewardcoin: 980,
        id: "7",
        exp: 3430
      },
      108: {
        rewardcoin: 233280,
        id: "108",
        exp: 12597120
      },
      109: {
        rewardcoin: 237620,
        id: "109",
        exp: 12950290
      },
      102: {
        rewardcoin: 208080,
        id: "102",
        exp: 10612080
      },
      103: {
        rewardcoin: 212180,
        id: "103",
        exp: 10927270
      },
      100: {
        rewardcoin: 2e5,
        id: "100",
        exp: 1e7
      },
      101: {
        rewardcoin: 204020,
        id: "101",
        exp: 10303010
      },
      106: {
        rewardcoin: 224720,
        id: "106",
        exp: 11910160
      },
      107: {
        rewardcoin: 228980,
        id: "107",
        exp: 12250430
      },
      104: {
        rewardcoin: 216320,
        id: "104",
        exp: 11248640
      },
      105: {
        rewardcoin: 220500,
        id: "105",
        exp: 11576250
      },
      39: {
        rewardcoin: 30420,
        id: "39",
        exp: 593190
      },
      38: {
        rewardcoin: 28880,
        id: "38",
        exp: 548720
      },
      33: {
        rewardcoin: 21780,
        id: "33",
        exp: 359370
      },
      32: {
        rewardcoin: 20480,
        id: "32",
        exp: 327680
      },
      31: {
        rewardcoin: 19220,
        id: "31",
        exp: 297910
      },
      30: {
        rewardcoin: 18e3,
        id: "30",
        exp: 27e4
      },
      37: {
        rewardcoin: 27380,
        id: "37",
        exp: 506530
      },
      36: {
        rewardcoin: 25920,
        id: "36",
        exp: 466560
      },
      35: {
        rewardcoin: 24500,
        id: "35",
        exp: 428750
      },
      34: {
        rewardcoin: 23120,
        id: "34",
        exp: 393040
      },
      176: {
        rewardcoin: 619520,
        id: "176",
        exp: 54517760
      },
      60: {
        rewardcoin: 72e3,
        id: "60",
        exp: 216e4
      },
      61: {
        rewardcoin: 74420,
        id: "61",
        exp: 2269810
      },
      62: {
        rewardcoin: 76880,
        id: "62",
        exp: 2383280
      },
      63: {
        rewardcoin: 79380,
        id: "63",
        exp: 2500470
      },
      64: {
        rewardcoin: 81920,
        id: "64",
        exp: 2621440
      },
      65: {
        rewardcoin: 84500,
        id: "65",
        exp: 2746250
      },
      66: {
        rewardcoin: 87120,
        id: "66",
        exp: 2874960
      },
      67: {
        rewardcoin: 89780,
        id: "67",
        exp: 3007630
      },
      68: {
        rewardcoin: 92480,
        id: "68",
        exp: 3144320
      },
      69: {
        rewardcoin: 95220,
        id: "69",
        exp: 3285090
      },
      175: {
        rewardcoin: 612500,
        id: "175",
        exp: 53593750
      },
      174: {
        rewardcoin: 605520,
        id: "174",
        exp: 52680240
      },
      173: {
        rewardcoin: 598580,
        id: "173",
        exp: 51777170
      },
      172: {
        rewardcoin: 591680,
        id: "172",
        exp: 50884480
      },
      171: {
        rewardcoin: 584820,
        id: "171",
        exp: 50002110
      },
      170: {
        rewardcoin: 578e3,
        id: "170",
        exp: 4913e4
      },
      181: {
        rewardcoin: 655220,
        id: "181",
        exp: 59297410
      },
      182: {
        rewardcoin: 662480,
        id: "182",
        exp: 60285680
      },
      183: {
        rewardcoin: 669780,
        id: "183",
        exp: 61284870
      },
      180: {
        rewardcoin: 648e3,
        id: "180",
        exp: 5832e4
      },
      2: {
        rewardcoin: 80,
        id: "2",
        exp: 80
      },
      162: {
        rewardcoin: 524880,
        id: "162",
        exp: 42515280
      },
      187: {
        rewardcoin: 699380,
        id: "187",
        exp: 65392030
      },
      184: {
        rewardcoin: 677120,
        id: "184",
        exp: 62295040
      },
      6: {
        rewardcoin: 720,
        id: "6",
        exp: 2160
      },
      186: {
        rewardcoin: 691920,
        id: "186",
        exp: 64348560
      },
      188: {
        rewardcoin: 706880,
        id: "188",
        exp: 66446720
      },
      189: {
        rewardcoin: 714420,
        id: "189",
        exp: 67512690
      },
      196: {
        rewardcoin: 768320,
        id: "196",
        exp: 75295360
      },
      185: {
        rewardcoin: 684500,
        id: "185",
        exp: 63316250
      },
      99: {
        rewardcoin: 196020,
        id: "99",
        exp: 9702990
      },
      98: {
        rewardcoin: 192080,
        id: "98",
        exp: 9411920
      },
      168: {
        rewardcoin: 564480,
        id: "168",
        exp: 47416320
      },
      169: {
        rewardcoin: 571220,
        id: "169",
        exp: 48268090
      },
      91: {
        rewardcoin: 165620,
        id: "91",
        exp: 7535710
      },
      90: {
        rewardcoin: 162e3,
        id: "90",
        exp: 729e4
      },
      93: {
        rewardcoin: 172980,
        id: "93",
        exp: 8043570
      },
      92: {
        rewardcoin: 169280,
        id: "92",
        exp: 7786880
      },
      95: {
        rewardcoin: 180500,
        id: "95",
        exp: 8573750
      },
      94: {
        rewardcoin: 176720,
        id: "94",
        exp: 8305840
      },
      97: {
        rewardcoin: 188180,
        id: "97",
        exp: 9126730
      },
      96: {
        rewardcoin: 184320,
        id: "96",
        exp: 8847360
      },
      11: {
        rewardcoin: 2420,
        id: "11",
        exp: 13310
      },
      10: {
        rewardcoin: 2e3,
        id: "10",
        exp: 1e4
      },
      13: {
        rewardcoin: 3380,
        id: "13",
        exp: 21970
      },
      12: {
        rewardcoin: 2880,
        id: "12",
        exp: 17280
      },
      15: {
        rewardcoin: 4500,
        id: "15",
        exp: 33750
      },
      14: {
        rewardcoin: 3920,
        id: "14",
        exp: 27440
      },
      17: {
        rewardcoin: 5780,
        id: "17",
        exp: 49130
      },
      16: {
        rewardcoin: 5120,
        id: "16",
        exp: 40960
      },
      19: {
        rewardcoin: 7220,
        id: "19",
        exp: 68590
      },
      18: {
        rewardcoin: 6480,
        id: "18",
        exp: 58320
      },
      117: {
        rewardcoin: 273780,
        id: "117",
        exp: 16016130
      },
      116: {
        rewardcoin: 269120,
        id: "116",
        exp: 15608960
      },
      151: {
        rewardcoin: 456020,
        id: "151",
        exp: 34429510
      },
      150: {
        rewardcoin: 45e4,
        id: "150",
        exp: 3375e4
      },
      153: {
        rewardcoin: 468180,
        id: "153",
        exp: 35815770
      },
      152: {
        rewardcoin: 462080,
        id: "152",
        exp: 35118080
      },
      155: {
        rewardcoin: 480500,
        id: "155",
        exp: 37238750
      },
      154: {
        rewardcoin: 474320,
        id: "154",
        exp: 36522640
      },
      157: {
        rewardcoin: 492980,
        id: "157",
        exp: 38698930
      },
      156: {
        rewardcoin: 486720,
        id: "156",
        exp: 37964160
      },
      159: {
        rewardcoin: 505620,
        id: "159",
        exp: 40196790
      },
      158: {
        rewardcoin: 499280,
        id: "158",
        exp: 39443120
      },
      48: {
        rewardcoin: 46080,
        id: "48",
        exp: 1105920
      },
      49: {
        rewardcoin: 48020,
        id: "49",
        exp: 1176490
      },
      46: {
        rewardcoin: 42320,
        id: "46",
        exp: 973360
      },
      47: {
        rewardcoin: 44180,
        id: "47",
        exp: 1038230
      },
      44: {
        rewardcoin: 38720,
        id: "44",
        exp: 851840
      },
      45: {
        rewardcoin: 40500,
        id: "45",
        exp: 911250
      },
      42: {
        rewardcoin: 35280,
        id: "42",
        exp: 740880
      },
      43: {
        rewardcoin: 36980,
        id: "43",
        exp: 795070
      },
      40: {
        rewardcoin: 32e3,
        id: "40",
        exp: 64e4
      },
      41: {
        rewardcoin: 33620,
        id: "41",
        exp: 689210
      },
      1: {
        rewardcoin: 20,
        id: "1",
        exp: 10
      },
      5: {
        rewardcoin: 500,
        id: "5",
        exp: 1250
      },
      9: {
        rewardcoin: 1620,
        id: "9",
        exp: 7290
      },
      146: {
        rewardcoin: 426320,
        id: "146",
        exp: 31121360
      },
      147: {
        rewardcoin: 432180,
        id: "147",
        exp: 31765230
      },
      144: {
        rewardcoin: 414720,
        id: "144",
        exp: 29859840
      },
      145: {
        rewardcoin: 420500,
        id: "145",
        exp: 30486250
      },
      142: {
        rewardcoin: 403280,
        id: "142",
        exp: 28632880
      },
      143: {
        rewardcoin: 408980,
        id: "143",
        exp: 29242070
      },
      140: {
        rewardcoin: 392e3,
        id: "140",
        exp: 2744e4
      },
      141: {
        rewardcoin: 397620,
        id: "141",
        exp: 28032210
      },
      148: {
        rewardcoin: 438080,
        id: "148",
        exp: 32417920
      },
      149: {
        rewardcoin: 444020,
        id: "149",
        exp: 33079490
      },
      77: {
        rewardcoin: 118580,
        id: "77",
        exp: 4565330
      },
      76: {
        rewardcoin: 115520,
        id: "76",
        exp: 4389760
      },
      75: {
        rewardcoin: 112500,
        id: "75",
        exp: 4218750
      },
      74: {
        rewardcoin: 109520,
        id: "74",
        exp: 4052240
      },
      73: {
        rewardcoin: 106580,
        id: "73",
        exp: 3890170
      },
      72: {
        rewardcoin: 103680,
        id: "72",
        exp: 3732480
      },
      71: {
        rewardcoin: 100820,
        id: "71",
        exp: 3579110
      },
      70: {
        rewardcoin: 98e3,
        id: "70",
        exp: 343e4
      },
      79: {
        rewardcoin: 124820,
        id: "79",
        exp: 4930390
      },
      78: {
        rewardcoin: 121680,
        id: "78",
        exp: 4745520
      }
    };
    cc._RF.pop();
  }, {} ],
  LocalStorage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "07735IQkn5JeYJII2d/Al2D", "LocalStorage");
    "use strict";
    var GameConfig = require("GameConfig");
    module.exports = function() {
      var LC = cc.Class({
        extends: cc.Object,
        get: function get(k) {
          var defaultv = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          var callback = arguments[2];
          if (GameConfig.isFBInstantGame()) FBInstant.player.getDataAsync([ k ]).then(function(data) {
            "undefined" !== typeof data[k] && callback(data[k]);
          }); else {
            var v = cc.sys.localStorage.getItem(k);
            v || (v = defaultv);
            callback(v);
          }
        },
        set: function set(k, v) {
          GameConfig.isFBInstantGame() ? FBInstant.player.setDataAsync({
            k: v
          }) : cc.sys.localStorage.setItem(k, v);
        },
        delete: function _delete(k) {
          cc.sys.localStorage.removeItem(k);
        }
      });
      var instance = new LC();
      return instance;
    }();
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig"
  } ],
  MarginsBig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d795ZMVLpEF5KTPgLM7Nm9", "MarginsBig");
    "use strict";
    var GameType = require("GameType");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var BlockConfig = require("BlockConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        sp: cc.Sprite,
        lineNum: 0,
        columnNum: 0,
        type: {
          default: GameType.profabType.BlockBig,
          override: true,
          visible: false
        },
        pngID: {
          default: 1,
          visible: false
        }
      },
      init: function init() {
        BingLog.log("Block" + status + " init:");
      },
      onLoad: function onLoad() {},
      showBlockBig: function showBlockBig(show) {},
      setBlockPng: function setBlockPng(pngname) {
        this.pngID = pngname;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", BlockConfig[this.pngID].resources + ".png");
      },
      setPosNum: function setPosNum(x, y) {
        this.lineNum = x;
        this.columnNum = y;
        this.text.getComponent(cc.Label).string = x + "," + y;
      }
    });
    cc._RF.pop();
  }, {
    BlockConfig: "BlockConfig",
    GameType: "GameType",
    SpriteFrameCenter: "SpriteFrameCenter"
  } ],
  MarginsSmall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0559bOse+FLKLiKQnw4uZRG", "MarginsSmall");
    "use strict";
    var GameType = require("GameType");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var BlockConfig = require("BlockConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        sp: cc.Sprite,
        lineNum: 0,
        columnNum: 0,
        type: {
          default: GameType.profabType.BlockBig,
          override: true,
          visible: false
        },
        pngID: {
          default: 1,
          visible: false
        }
      },
      init: function init() {
        BingLog.log("Block" + status + " init:");
      },
      onLoad: function onLoad() {},
      showBlockBig: function showBlockBig(show) {},
      setBlockPng: function setBlockPng(pngname) {
        this.pngID = pngname;
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", BlockConfig[this.pngID].resources + ".png");
      },
      setPosNum: function setPosNum(x, y) {
        this.lineNum = x;
        this.columnNum = y;
        this.text.getComponent(cc.Label).string = x + "," + y;
      }
    });
    cc._RF.pop();
  }, {
    BlockConfig: "BlockConfig",
    GameType: "GameType",
    SpriteFrameCenter: "SpriteFrameCenter"
  } ],
  ParticleSystemCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4593dwEYhdAzbtPA2sfa92H", "ParticleSystemCenter");
    "use strict";
    var SC = cc.Class({
      extends: cc.Object,
      properties: {
        index: 0
      },
      ctor: function ctor() {
        this.Dic = {};
      },
      addParticleForNode: function addParticleForNode(fileName, parentNode, nodePt) {
        var node = new cc.Node();
        node.setPosition(nodePt.x, nodePt.y);
        parentNode.addChild(node);
        node.name = this.index.toString();
        this.index++;
        fileName = fileName.replace(/\s+/g, "");
        var particleSystem = node.addComponent(cc.ParticleSystem);
        particleSystem.file = cc.url.raw("resources/particle/" + fileName);
        particleSystem.autoRemoveOnFinish = true;
      }
    });
    var Center = new SC();
    module.exports = Center;
    cc._RF.pop();
  }, {} ],
  RewardConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9abbbAl845Je59WrJtuksiG", "RewardConfig");
    "use strict";
    module.exports = {
      108: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "108"
      },
      109: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "109"
      },
      111: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "111"
      },
      110: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "110"
      },
      102: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "1001;25",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 300,
        id: "102"
      },
      103: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "103"
      },
      101: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "1001;25",
        item5: "1001;30",
        rate6: 0,
        rate5: 150,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 300,
        id: "101"
      },
      106: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "106"
      },
      107: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "107"
      },
      104: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "104"
      },
      105: {
        name: "",
        item2: "1001;40",
        item3: "1002;2",
        item1: "1001;20",
        item6: "",
        item4: "",
        item5: "",
        rate6: 0,
        rate5: 0,
        num: 3,
        rate3: 25,
        rate2: 200,
        rate1: 500,
        rate4: 0,
        id: "105"
      }
    };
    cc._RF.pop();
  }, {} ],
  RewardItemFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "307bbqNSopHArD1/+feSj9L", "RewardItemFactory");
    "use strict";
    var GameType = require("GameType");
    var FC = cc.Class({
      ctor: function ctor() {
        this.pool = new cc.NodePool();
      },
      init: function init(pngname) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/rewardItem");
          newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("RewardItem");
        com.setIconPng(pngname);
        return newNode;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.profabType.RewardItem) debugger;
        this.pool.put(node);
      },
      create: function create(pngname) {
        var obj = Factory.init(pngname);
        return obj;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    GameType: "GameType"
  } ],
  RewardItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "09777QBctNLYJN8Xk7DnA+r", "RewardItem");
    "use strict";
    var GameType = require("GameType");
    var ItemConfig = require("ItemConfig");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    cc.Class({
      extends: cc.Component,
      properties: {
        type: {
          default: GameType.profabType.RewardItem,
          override: true,
          visible: false
        },
        icon: cc.Sprite,
        text: cc.Label,
        pngID: {
          visible: false,
          default: 0
        }
      },
      onLoad: function onLoad() {},
      setIconPng: function setIconPng(reward) {
        if (-1 != reward.indexOf(";")) {
          var rewardarry = reward.split(";");
          this.pngID = rewardarry[0];
          this.text.string = rewardarry[1];
          this.text.node.active = false;
        }
        this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", ItemConfig[this.pngID].icon + ".png");
      },
      setFinish: function setFinish() {
        this.text.node.active = true;
      }
    });
    cc._RF.pop();
  }, {
    GameType: "GameType",
    ItemConfig: "ItemConfig",
    SpriteFrameCenter: "SpriteFrameCenter"
  } ],
  SkeletonDataCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08ee1dfvs9GP6ytIs1eghY2", "SkeletonDataCenter");
    "use strict";
    var SC = cc.Class({
      extends: cc.Object,
      properties: {
        index: 0
      },
      ctor: function ctor() {
        this.Dic = {};
      },
      addSkeletonData: function addSkeletonData(fileName, hammer, eventcallback) {
        cc.loader.loadRes("effect/" + fileName, sp.SkeletonData, function(err, data) {
          hammer.skeletonData = data;
          hammer.setAnimation(0, "newAnimation", true);
          eventcallback && eventcallback();
        });
      },
      addSkeletonDataForNode: function addSkeletonDataForNode(fileName, hammer) {
        var node = hammer.addComponent(sp.Skeleton);
        this.addSkeletonData(fileName, node);
      },
      addSkeletonDataWait: function addSkeletonDataWait(fileName, node) {
        cc.loader.loadRes("effect/" + fileName, sp.SkeletonData, function(err, data) {
          node.skeletonData = data;
        });
      }
    });
    var Center = new SC();
    module.exports = Center;
    cc._RF.pop();
  }, {} ],
  SpriteFrameCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "188aaBWJ7xJYK2luAOSUyWj", "SpriteFrameCenter");
    "use strict";
    var SC = cc.Class({
      extends: cc.Object,
      properties: {},
      ctor: function ctor() {
        this.spDic = {};
        this.atlas = {};
      },
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
        cc.loader.loadRes(fileName, cc.SpriteAtlas, function(err, atlas) {
          if (err) console.log("preLoadAtlas fail when load " + fileName); else {
            console.log("preLoadAtlas OK -> " + fileName);
            self.atlas[fileName] = atlas;
            callBack && callBack();
          }
        });
      },
      getFrameFromAtlas: function getFrameFromAtlas(fileName, frameNameIn) {
        if (!frameNameIn) {
          console.log("your input file is wrong", frameNameIn);
          return null;
        }
        var frameName = frameNameIn.split(".")[0];
        var atlas = this.atlas[fileName];
        var frame = null;
        atlas ? frame = atlas.getSpriteFrame(frameName) : this.preLoadAtlas(fileName, this.getFrameFromAtlas.bind(this, fileName, frameName));
        return frame;
      }
    });
    var Center = new SC();
    module.exports = Center;
    cc._RF.pop();
  }, {} ],
  StageConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "758c4u7wP9LRZ2+StQCQ+Rj", "StageConfig");
    "use strict";
    module.exports = {
      10: {
        box: 110,
        layer: 5,
        top: 1,
        cycleID: "12;13;14",
        id: "10",
        size: 40
      },
      1: {
        box: 101,
        layer: 3,
        top: 12,
        cycleID: "1.0",
        id: "1",
        size: 100
      },
      3: {
        box: 103,
        layer: 4,
        top: 12,
        cycleID: "3.0",
        id: "3",
        size: 100
      },
      2: {
        box: 102,
        layer: 4,
        top: 12,
        cycleID: "2.0",
        id: "2",
        size: 100
      },
      5: {
        box: 105,
        layer: 5,
        top: 12,
        cycleID: "3;4",
        id: "5",
        size: 100
      },
      4: {
        box: 104,
        layer: 4,
        top: 12,
        cycleID: "4.0",
        id: "4",
        size: 100
      },
      7: {
        box: 107,
        layer: 4,
        top: 1,
        cycleID: "10.0",
        id: "7",
        size: 40
      },
      6: {
        box: 106,
        layer: 5,
        top: 12,
        cycleID: "2;3;4",
        id: "6",
        size: 100
      },
      9: {
        box: 109,
        layer: 5,
        top: 1,
        cycleID: "11;12",
        id: "9",
        size: 40
      },
      8: {
        box: 108,
        layer: 4,
        top: 1,
        cycleID: "11.0",
        id: "8",
        size: 40
      }
    };
    cc._RF.pop();
  }, {} ],
  ToolConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfd52MuQghCm6Yx2DdiYEkc", "ToolConfig");
    "use strict";
    module.exports = {
      10: {
        name: "强力钻",
        title: 10014,
        attribute: 401,
        unlock: "2;30",
        animation: "dianzuan_2",
        id: "10",
        icon: "dianzuan_2"
      },
      1: {
        name: "铲子",
        title: 10005,
        attribute: 101,
        unlock: "0",
        animation: "chanzi_1",
        id: "1",
        icon: "chanzi_1"
      },
      3: {
        name: "宽铲",
        title: 10007,
        attribute: 301,
        unlock: "1.0",
        animation: "chanzi_3",
        id: "3",
        icon: "chanzi_3"
      },
      2: {
        name: "长铲",
        title: 10006,
        attribute: 201,
        unlock: "3;1",
        animation: "chanzi_2",
        id: "2",
        icon: "chanzi_2"
      },
      5: {
        name: "凿子",
        title: 10009,
        attribute: 101,
        unlock: "3;3",
        animation: "chuizi_1",
        id: "5",
        icon: "chuizi_1"
      },
      4: {
        name: "尖凿",
        title: 10008,
        attribute: 401,
        unlock: "2;5",
        animation: "chuizi_2",
        id: "4",
        icon: "chuizi_2"
      },
      7: {
        name: "锄头",
        title: 10011,
        attribute: 301,
        unlock: "3;5",
        animation: "chutou_2",
        id: "7",
        icon: "chutou_2"
      },
      6: {
        name: "尖锄",
        title: 10010,
        attribute: 201,
        unlock: "2;10",
        animation: "chutou_1",
        id: "6",
        icon: "chutou_1"
      },
      9: {
        name: "电钻",
        title: 10013,
        attribute: 301,
        unlock: "3;5",
        animation: "dianzuan_1",
        id: "9",
        icon: "dianzuan_1"
      },
      8: {
        name: "宽锄",
        title: 10012,
        attribute: 401,
        unlock: "2;20",
        animation: "chutou_3",
        id: "8",
        icon: "chutou_3"
      }
    };
    cc._RF.pop();
  }, {} ],
  TouchView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9adddbB9N9LN7L4ldfP0UfJ", "TouchView");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        touchStartCallBack: {
          default: null,
          visible: false
        },
        touchEndCallBack: {
          default: null,
          visible: false
        },
        touchCancelCallBack: {
          default: null,
          visible: false
        },
        touchMoveCallBack: {
          default: null,
          visible: false
        }
      },
      onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEvent, this);
        this.touchRect = cc.rect(0, 0, this.node.width, this.node.height);
        this.eventMap = {};
        this.eventMap[cc.Node.EventType.TOUCH_START] = this.touchStartCallBack;
        this.eventMap[cc.Node.EventType.TOUCH_END] = this.touchEndCallBack;
        this.eventMap[cc.Node.EventType.TOUCH_MOVE] = this.touchMoveCallBack;
        this.eventMap[cc.Node.EventType.TOUCH_CANCEL] = this.touchCancelCallBack;
      },
      touchEvent: function touchEvent(event) {
        var location = event.getLocation();
        var locationInNode = event.currentTarget.convertToNodeSpace(event.getLocation());
        if (cc.rectContainsPoint(this.touchRect, locationInNode)) {
          var callback = this.eventMap[event.type];
          callback && callback(locationInNode);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  UIBottomFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "442f7sLwxpNsoqdNo9jbJQ7", "UIBottomFactory");
    "use strict";
    var GameType = require("GameType");
    var FC = cc.Class({
      ctor: function ctor() {
        this.pool = new cc.NodePool();
      },
      init: function init(type, info, eventcallback) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/ui_bottom");
          newNode = cc.instantiate(prefab);
        }
        var com = newNode.getComponent("UIBottom");
        com.setConfigInfo(type, info, eventcallback);
        return newNode;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.profabType.UIBottom) debugger;
        this.pool.put(node);
      },
      create: function create(type, info, eventcallback) {
        var obj = Factory.init(type, info, eventcallback);
        return obj;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    GameType: "GameType"
  } ],
  UIBottom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6dad3pwFptLA5hhznBCnVmV", "UIBottom");
    "use strict";
    var AcceleratorConfig = require("AcceleratorConfig");
    var ToolConfig = require("ToolConfig");
    var AttributeConfig = require("AttributeConfig");
    var EfficiencyConfig = require("EfficiencyConfig");
    var GameType = require("GameType");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var LanguageConfig = require("LanguageConfig");
    var config = [ AcceleratorConfig, ToolConfig, EfficiencyConfig ];
    var Global = require("Global");
    var GameUtils = require("GameUtils");
    cc.Class({
      extends: cc.Component,
      properties: {
        title: cc.Label,
        icon: cc.Sprite,
        desc_1: cc.Label,
        desc_2: cc.Label,
        btn: cc.Button,
        progressBar: cc.ProgressBar,
        btntext: cc.Label,
        type: {
          visible: false,
          default: 2
        },
        language: {
          visible: false,
          default: "English"
        },
        ID: {
          visible: false,
          default: 1
        },
        eventcallback: {
          visible: false,
          default: null
        },
        checkisrun: {
          visible: false,
          default: false
        }
      },
      onLoad: function onLoad() {},
      init: function init() {},
      setIcon: function setIcon() {
        var pngname = void 0;
        if (GameType.bottomRadio.Efficiency == this.type) pngname = config[this.type][this.ID].coin; else {
          pngname = config[this.type][this.ID].icon;
          this.icon.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/box", pngname + ".png");
        }
      },
      setBtnIcon: function setBtnIcon(num) {
        this.btnname = [ "btn_heise", "btn_juhuang", "btn_lanse" ];
        this.btn.normalSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", this.btnname[num] + ".png");
        this.btn.pressedSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", this.btnname[num] + ".png");
        this.btn.hoverSprite = SpriteFrameCenter.getFrameFromAtlas("png/box", this.btnname[num] + ".png");
      },
      setDesc_1: function setDesc_1() {
        var desc = config[this.type][this.ID].desc;
        this.desc_1.string = desc;
      },
      setTitle: function setTitle() {
        var title = config[this.type][this.ID].title;
        null == title || void 0 == title ? title = "unknow" : LanguageConfig[title] && LanguageConfig[title][this.language] && (title = LanguageConfig[title][this.language]);
        this.title.string = title;
      },
      setDesc: function setDesc() {
        var desc = config[this.type][this.ID].desc;
        null == desc || void 0 == title ? desc = "unknow" : LanguageConfig[desc] && LanguageConfig[desc][this.language] && (desc = LanguageConfig[desc][this.language]);
        this.desc_1.string = desc;
      },
      setBtnDesc: function setBtnDesc(str) {
        this.btntext.string = str;
      },
      setBtnVisible: function setBtnVisible(bool) {
        this.btn.node.active = bool;
      },
      setConfigInfo: function setConfigInfo(type, info, callback) {
        this.type = type;
        this.ID = info.id;
        this.setTitle();
        this.setIcon();
        this.setDesc_1();
        this.setBtnDesc();
        this.setBtnVisible(true);
        this.eventcallback = callback;
        this.setBtnState();
        1 == this.type ? this.setBtnIcon(2) : 1 == this.type && this.setBtnIcon(1);
      },
      setBtnState: function setBtnState() {
        switch (this.type) {
         case 0:
          this.setType0BtnState();
          break;

         case 1:
          this.setType1BtnState();
          break;

         case 2:
          this.setType2BtnState();
        }
      },
      setType0BtnState: function setType0BtnState() {
        if (this.checkisrun) return;
        var btntextColor = [ "#000000", "#ffffff" ];
        var conf = AcceleratorConfig[this.ID];
        var bool = Global["bar" + this.ID] <= 0;
        if (bool) {
          this.btntext.string = GameUtils.formatTime(conf.time);
          this.btntext.node.color = new cc.Color(btntextColor[1]);
        } else {
          this.btntext.string = GameUtils.formatTime(Global["bar" + this.ID]);
          this.btntext.node.color = new cc.Color(btntextColor[0]);
        }
        this.btn.node.active = bool;
        this.progressBar.node.active = !bool;
        this.progressBar.progress = Global["bar" + this.ID] / conf.time;
        var self = this;
        this.callback = function() {
          Global["bar" + self.ID]--;
          self.btntext.string = GameUtils.formatTime(Global["bar" + self.ID]);
          self.progressBar.progress = Global["bar" + this.ID] / conf.time;
          if (Global["bar" + self.ID] <= 0) {
            this.unschedule(this.callback);
            this.checkisrun = false;
            self.eventcallback(this.type, self.ID, "finish");
          }
        };
        if (!bool) {
          this.checkisrun = true;
          this.schedule(this.callback, 1);
        }
      },
      setType1BtnState: function setType1BtnState() {
        var level = Global.level;
        var conf = ToolConfig[this.ID];
        var thisID = void 0;
        var confArry = void 0;
        if ("unlock" in conf) {
          if (-1 != conf.unlock.indexOf(";")) {
            confArry = conf.unlock.split(";");
            thisID = confArry[0];
          } else thisID = parseInt(conf.unlock);
          if (-1 == thisID) return;
          var active = false;
          if (null == Global.hammer[this.ID] || void 0 == Global.hammer[this.ID]) if (0 == thisID) {
            this.ButtonState(1);
            this.btntext.string = "touch active";
          } else if (1 == thisID) this.btntext.string = "n:" + thisID + "c:" + Global.openAdTimes; else if (2 == thisID) {
            var needlvl = confArry[1];
            if (level < needlvl) {
              this.ButtonState(0);
              this.btntext.string = needlvl + "级解锁";
            } else {
              this.ButtonState(1);
              this.btntext.string = "touchactive";
            }
          } else 3 == thisID && (this.btntext.string = "n:" + confArry[1] + "c:" + Global.inviteFriends); else if (-1 == AttributeConfig[Global.hammer[this.ID].attribute].next) {
            this.ButtonState(0);
            this.btntext.string = "max";
          } else {
            var conf1 = AttributeConfig[Global.hammer[this.ID].attribute];
            if (conf1.costtype = 1001) {
              Global.gold > conf1.cost ? this.ButtonState(1) : this.ButtonState(0);
              this.btntext.string = GameUtils.formatNum(conf1.cost);
            }
          }
        }
      },
      setType2BtnState: function setType2BtnState() {
        var find = false;
        if (Global.efficiency[this.ID]) {
          this.ButtonState(0);
          this.btntext.string = "max";
        } else {
          var conf = EfficiencyConfig[this.ID];
          if (1002 == conf.costtype) {
            Global.gem >= conf.cost ? this.ButtonState(1) : this.ButtonState(0);
            this.btntext.string = GameUtils.formatNum(conf.cost) + "^";
          }
        }
      },
      ButtonState: function ButtonState(v) {
        this.btn.interactable = 1 == v;
      },
      onClickButton: function onClickButton() {
        this.eventcallback(this.type, this.ID);
      }
    });
    cc._RF.pop();
  }, {
    AcceleratorConfig: "AcceleratorConfig",
    AttributeConfig: "AttributeConfig",
    EfficiencyConfig: "EfficiencyConfig",
    GameType: "GameType",
    GameUtils: "GameUtils",
    Global: "Global",
    LanguageConfig: "LanguageConfig",
    SpriteFrameCenter: "SpriteFrameCenter",
    ToolConfig: "ToolConfig"
  } ],
  UpgradView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e7b4Hd6glFQpdpqj6f0HgJ", "UpgradView");
    "use strict";
    var Global = require("Global");
    var StageConfig = require("StageConfig");
    var BoxConfig = require("BoxConfig");
    var RewardConfig = require("RewardConfig");
    var GameUtils = require("GameUtils");
    var LevelConfig = require("LevelConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        RewardLable: cc.Label,
        TitleLable: cc.Label,
        DescLable: cc.Label,
        BoxController: require("BoxController")
      },
      onLoad: function onLoad() {},
      onEnable: function onEnable() {
        this.addlevel();
      },
      addlevel: function addlevel() {
        var myinfo = {};
        var level = Global.level;
        var needexp = LevelConfig[level].exp;
        var needgold = LevelConfig[level].rewardcoin;
        Global.addgold = needgold;
        myinfo.exp = Global.exp - needexp;
        myinfo.level = Global.level + 1;
        Global.saveLevel(myinfo.level);
        Global.saveExp(myinfo.exp);
        this.RewardLable.string = "x" + needgold;
        Global.addgold = needgold;
        this.BoxController.GameMenuController.updateDate(myinfo);
      },
      onVedioSureBtn: function onVedioSureBtn() {
        var golds = Global.gold + 3 * Global.addgold;
        if (Global.addgold > 0) {
          this.BoxController.GameMenuController.updateDate({
            gold: golds
          });
          Global.saveGold(golds);
        }
        Global.addgold = 0;
        this.node.active = false;
      },
      onNextBtn: function onNextBtn() {
        var golds = Global.gold + Global.addgold;
        this.BoxController.GameMenuController.updateDate({
          gold: golds
        });
        Global.saveGold(golds);
        if (Global.addgold > 0) {
          this.node.active = false;
          Global.saveGold(golds);
        }
        Global.addgold = 0;
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {
    BoxConfig: "BoxConfig",
    BoxController: "BoxController",
    GameUtils: "GameUtils",
    Global: "Global",
    LevelConfig: "LevelConfig",
    RewardConfig: "RewardConfig",
    StageConfig: "StageConfig"
  } ],
  smController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d680ek+kU9OzrPIP1Nri7q3", "smController");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onAnimCompleted: function onAnimCompleted(num, string) {
        console.log("onAnimCompleted: param1[%s], param2[%s]", num, string);
      }
    });
    cc._RF.pop();
  }, {} ],
  "state-machine": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8b7a/QNqFKJ5YKdd5tGCeH", "state-machine");
    "use strict";
    (function() {
      var StateMachine = {
        VERSION: "2.4.0",
        Result: {
          SUCCEEDED: 1,
          NOTRANSITION: 2,
          CANCELLED: 3,
          PENDING: 4
        },
        Error: {
          INVALID_TRANSITION: 100,
          PENDING_TRANSITION: 200,
          INVALID_CALLBACK: 300
        },
        WILDCARD: "*",
        ASYNC: "async",
        create: function create(cfg, target) {
          var initial = "string" == typeof cfg.initial ? {
            state: cfg.initial
          } : cfg.initial;
          var terminal = cfg.terminal || cfg["final"];
          var fsm = target || cfg.target || {};
          var events = cfg.events || [];
          var callbacks = cfg.callbacks || {};
          var map = {};
          var transitions = {};
          var add = function add(e) {
            var from = Array.isArray(e.from) ? e.from : e.from ? [ e.from ] : [ StateMachine.WILDCARD ];
            map[e.name] = map[e.name] || {};
            for (var n = 0; n < from.length; n++) {
              transitions[from[n]] = transitions[from[n]] || [];
              transitions[from[n]].push(e.name);
              map[e.name][from[n]] = e.to || from[n];
            }
            e.to && (transitions[e.to] = transitions[e.to] || []);
          };
          if (initial) {
            initial.event = initial.event || "startup";
            add({
              name: initial.event,
              from: "none",
              to: initial.state
            });
          }
          for (var n = 0; n < events.length; n++) add(events[n]);
          for (var name in map) map.hasOwnProperty(name) && (fsm[name] = StateMachine.buildEvent(name, map[name]));
          for (var name in callbacks) callbacks.hasOwnProperty(name) && (fsm[name] = callbacks[name]);
          fsm.current = "none";
          fsm.is = function(state) {
            return Array.isArray(state) ? state.indexOf(this.current) >= 0 : this.current === state;
          };
          fsm.can = function(event) {
            return !this.transition && void 0 !== map[event] && (map[event].hasOwnProperty(this.current) || map[event].hasOwnProperty(StateMachine.WILDCARD));
          };
          fsm.cannot = function(event) {
            return !this.can(event);
          };
          fsm.transitions = function() {
            return (transitions[this.current] || []).concat(transitions[StateMachine.WILDCARD] || []);
          };
          fsm.isFinished = function() {
            return this.is(terminal);
          };
          fsm.error = cfg.error || function(name, from, to, args, error, msg, e) {
            throw e || msg;
          };
          fsm.states = function() {
            return Object.keys(transitions).sort();
          };
          initial && !initial.defer && fsm[initial.event]();
          return fsm;
        },
        doCallback: function doCallback(fsm, func, name, from, to, args) {
          if (func) try {
            return func.apply(fsm, [ name, from, to ].concat(args));
          } catch (e) {
            return fsm.error(name, from, to, args, StateMachine.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
          }
        },
        beforeAnyEvent: function beforeAnyEvent(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onbeforeevent"], name, from, to, args);
        },
        afterAnyEvent: function afterAnyEvent(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onafterevent"] || fsm["onevent"], name, from, to, args);
        },
        leaveAnyState: function leaveAnyState(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onleavestate"], name, from, to, args);
        },
        enterAnyState: function enterAnyState(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onenterstate"] || fsm["onstate"], name, from, to, args);
        },
        changeState: function changeState(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onchangestate"], name, from, to, args);
        },
        beforeThisEvent: function beforeThisEvent(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onbefore" + name], name, from, to, args);
        },
        afterThisEvent: function afterThisEvent(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onafter" + name] || fsm["on" + name], name, from, to, args);
        },
        leaveThisState: function leaveThisState(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onleave" + from], name, from, to, args);
        },
        enterThisState: function enterThisState(fsm, name, from, to, args) {
          return StateMachine.doCallback(fsm, fsm["onenter" + to] || fsm["on" + to], name, from, to, args);
        },
        beforeEvent: function beforeEvent(fsm, name, from, to, args) {
          if (false === StateMachine.beforeThisEvent(fsm, name, from, to, args) || false === StateMachine.beforeAnyEvent(fsm, name, from, to, args)) return false;
        },
        afterEvent: function afterEvent(fsm, name, from, to, args) {
          StateMachine.afterThisEvent(fsm, name, from, to, args);
          StateMachine.afterAnyEvent(fsm, name, from, to, args);
        },
        leaveState: function leaveState(fsm, name, from, to, args) {
          var specific = StateMachine.leaveThisState(fsm, name, from, to, args), general = StateMachine.leaveAnyState(fsm, name, from, to, args);
          if (false === specific || false === general) return false;
          if (StateMachine.ASYNC === specific || StateMachine.ASYNC === general) return StateMachine.ASYNC;
        },
        enterState: function enterState(fsm, name, from, to, args) {
          StateMachine.enterThisState(fsm, name, from, to, args);
          StateMachine.enterAnyState(fsm, name, from, to, args);
        },
        buildEvent: function buildEvent(name, map) {
          return function() {
            var from = this.current;
            var to = map[from] || (map[StateMachine.WILDCARD] != StateMachine.WILDCARD ? map[StateMachine.WILDCARD] : from) || from;
            var args = Array.prototype.slice.call(arguments);
            if (this.transition) return this.error(name, from, to, args, StateMachine.Error.PENDING_TRANSITION, "event " + name + " inappropriate because previous transition did not complete");
            if (this.cannot(name)) return this.error(name, from, to, args, StateMachine.Error.INVALID_TRANSITION, "event " + name + " inappropriate in current state " + this.current);
            if (false === StateMachine.beforeEvent(this, name, from, to, args)) return StateMachine.Result.CANCELLED;
            if (from === to) {
              StateMachine.afterEvent(this, name, from, to, args);
              return StateMachine.Result.NOTRANSITION;
            }
            var fsm = this;
            this.transition = function() {
              fsm.transition = null;
              fsm.current = to;
              StateMachine.enterState(fsm, name, from, to, args);
              StateMachine.changeState(fsm, name, from, to, args);
              StateMachine.afterEvent(fsm, name, from, to, args);
              return StateMachine.Result.SUCCEEDED;
            };
            this.transition.cancel = function() {
              fsm.transition = null;
              StateMachine.afterEvent(fsm, name, from, to, args);
            };
            var leave = StateMachine.leaveState(this, name, from, to, args);
            if (false === leave) {
              this.transition = null;
              return StateMachine.Result.CANCELLED;
            }
            if (StateMachine.ASYNC === leave) return StateMachine.Result.PENDING;
            if (this.transition) return this.transition();
          };
        }
      };
      if ("undefined" !== typeof exports) {
        "undefined" !== typeof module && module.exports && (exports = module.exports = StateMachine);
        exports.StateMachine = StateMachine;
      } else "function" === typeof define && define.amd ? define(function(require) {
        return StateMachine;
      }) : "undefined" !== typeof window ? window.StateMachine = StateMachine : "undefined" !== typeof self && (self.StateMachine = StateMachine);
    })();
    cc._RF.pop();
  }, {} ],
  testsc: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a84605gUCFKqJjD7ofWD+7g", "testsc");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scName: ""
      },
      onClick: function onClick(event, custom) {
        cc.director.loadScene(custom);
      },
      onLoad: function onLoad() {
        console.log("onLoad  " + this.scName);
      },
      onDestroy: function onDestroy() {
        console.log("onDestroy  " + this.scName);
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "BoxController", "CameraController", "GameMenuController", "ParticleSystemCenter", "SkeletonDataCenter", "SpriteFrameCenter", "smController", "FBPlugin", "AcceleratorConfig", "AttributeConfig", "BlockBig", "BlockBigFactory", "BlockConfig", "BlockSmall", "BlockSmallFactory", "BoxConfig", "BoxConfig1", "CycleConfig", "EfficiencyConfig", "GameConfig", "GameState", "GameType", "Global", "ItemConfig", "LanguageConfig", "LevelConfig", "MarginsBig", "MarginsSmall", "RewardConfig", "RewardItem", "RewardItemFactory", "StageConfig", "ToolConfig", "UIBottom", "UIBottomFactory", "testsc", "BingLog", "GameUtils", "JSExtends", "LocalStorage", "state-machine", "BoxTouchView", "GameMenuView", "TouchView", "UpgradView" ]);