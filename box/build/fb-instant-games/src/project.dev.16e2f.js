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
  BarFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5902E32DBLXbqDKZYmqhOB", "BarFactory");
    "use strict";
    var GameType = require("GameType");
    var FC = cc.Class({
      ctor: function ctor() {
        this.pool = new cc.NodePool();
      },
      init: function init() {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/bar");
          newNode = cc.instantiate(prefab);
        }
        newNode.getComponent("Bar").type = GameType.Bar;
        return newNode;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.Bar) debugger;
        this.pool.put(node);
      },
      create: function create() {
        var obj = Factory.init();
        return obj;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    GameType: "GameType"
  } ],
  Bar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a998dotIOpJmZFwvtJU//xi", "Bar");
    "use strict";
    var GU = require("GameUtils");
    var BingLog = require("BingLog");
    var GameComponent = require("GameComponent");
    var GameType = require("GameType");
    cc.Class({
      extends: GameComponent,
      properties: {
        sp: cc.Sprite,
        type: {
          default: GameType.Bar,
          override: true,
          visible: false
        }
      },
      init: function init() {
        BingLog.log("Bar init:");
      },
      onLoad: function onLoad() {},
      updateNode: function updateNode() {}
    });
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    GameComponent: "GameComponent",
    GameType: "GameType",
    GameUtils: "GameUtils"
  } ],
  BingLog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "09fa0MIG9FHZIg/L7dANwnL", "BingLog");
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
  BlockConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b91f71oMwNA1b46Jx7jNSYW", "BlockConfig");
    "use strict";
    module.exports = {
      blocks: [ {
        max: 5,
        texiao: "zk_lz.plist",
        icon: "b_101.png",
        id: 1,
        min: 1
      }, {
        max: 15,
        texiao: "s_lz.plist",
        icon: "b_102.png",
        id: 2,
        min: 6
      }, {
        max: 30,
        texiao: "tk_lz.plist",
        icon: "b_103.png",
        id: 3,
        min: 16
      }, {
        max: 50,
        texiao: "tk_lz.plist",
        icon: "b_104.png",
        id: 4,
        min: 31
      }, {
        max: 999999,
        texiao: "jk_lz.plist",
        icon: "b_105.png",
        id: 5,
        min: 51
      } ]
    };
    cc._RF.pop();
  }, {} ],
  BlockFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18bdaNV/hFC9oTqRfQ2T3A9", "BlockFactory");
    "use strict";
    var Config = require("BlockConfig");
    var GameType = require("GameType");
    var FC = cc.Class({
      extends: cc.Object,
      ctor: function ctor() {
        this.pool = new cc.NodePool();
        console.log("Factory should be call once!!");
      },
      init: function init(count) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/block");
          newNode = cc.instantiate(prefab);
        }
        var script = newNode.getComponent("Block");
        script.init(count);
        script.updateNode();
        newNode.getComponent("Block").type = GameType.Block;
        return newNode;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.Block) debugger;
        this.pool.put(node);
      },
      create: function create(count) {
        var obj = Factory.init(count);
        return obj;
      },
      getConfig: function getConfig(id) {
        var config = Config[id];
        return config || null;
      },
      preCreat: function preCreat() {
        var countLimited = [ 5, 12, 25, 40, 50 ];
        var ret = [];
        for (var i = 0; i < countLimited.length; i++) {
          var newNode = this.create(countLimited[i]);
          this.put(newNode);
        }
        return ret;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    BlockConfig: "BlockConfig",
    GameType: "GameType"
  } ],
  BlockMoveController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d424lthKVA06IAwtsRaTXu", "BlockMoveController");
    "use strict";
    var GameState = require("GameState");
    var LineController = require("LineController");
    var LineInitCount = 10;
    var FirstDist = 800;
    var BlockFactory = require("BlockFactory");
    var LineFactory = require("LineFactory");
    var ItemFactory = require("ItemFactory");
    var ParticleSystemCenter = require("ParticleSystemCenter");
    cc.Class({
      extends: cc.Component,
      properties: {
        gamecontroller: require("gamecontroller"),
        gameNodes: cc.Node,
        dist: 0,
        totaltime: 0,
        lineIndex: 0,
        first: true
      },
      onLoad: function onLoad() {
        this.init();
      },
      init: function init() {
        this.lineNodeInfo = {};
        var initLines = 10;
        this.addLines(initLines, true);
        this.addLines(0);
      },
      addLines: function addLines(count) {
        var init = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var ret = null;
        ret = init ? LineController.initFirstLines(count) : LineController.addLines(count);
        for (var line = 0; line < count; line++) {
          var data = ret[line];
          var node = data["linenode"];
          node.name = this.lineIndex.toString();
          this.lineNodeInfo[this.lineIndex] = data;
          node.setPositionY(0 + 140 * this.lineIndex + 70);
          this.lineIndex++;
          this.gameNodes.addChild(node);
        }
      },
      updateBlocksNode: function updateBlocksNode() {
        console.log("updateBlocksNode");
        var len = this.gameNodes.childrenCount;
        if (len < 1) return;
        var mostBelowPtY = this.gameNodes.children[0].getPositionY();
        var deleteNode = null;
        for (var i = 0; i < len; ++i) {
          var node = this.gameNodes.children[i];
          if ("head" != node.name && "body" != node.name) {
            var pty = node.getPositionY();
            if (mostBelowPtY >= pty) {
              mostBelowPtY = pty;
              deleteNode = node;
            }
          }
        }
        if (deleteNode) {
          var pt = deleteNode.getPosition();
          LineFactory.put(deleteNode);
          delete this.lineNodeInfo[deleteNode.name];
          this.addLines(1);
        }
      },
      deletItemNodeAt: function deletItemNodeAt(item, lineIndex, collumn) {
        var lineInfo = this.lineNodeInfo[lineIndex];
        var childs = lineInfo["child"];
        childs.length > 0 && (childs[collumn][2] = null);
        ItemFactory.put(item.node);
      },
      collisionBlock: function collisionBlock(blockInfo, subCount) {
        var removeall = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        var blockNode = this.lineNodeInfo[blockInfo.lineIndex]["child"][blockInfo.collumn][0];
        var removalbe = blockNode.getComponent("Block").updateCount(subCount, removeall);
        var ptX = blockNode.getPositionX();
        var ptY = this.lineNodeInfo[blockInfo.lineIndex]["linenode"].getPositionY();
        var block = blockNode.getComponent("Block");
        var file = block.particleFile;
        if (removalbe) {
          BlockFactory.put(blockNode);
          this.lineNodeInfo[blockInfo.lineIndex]["child"][blockInfo.collumn][0] = null;
          ParticleSystemCenter.addParticleForNode(file, this.gamecontroller.particleNode, cc.p(ptX, ptY));
        } else block.collisionAnimate();
        this.gamecontroller.updateScore();
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    BlockFactory: "BlockFactory",
    GameState: "GameState",
    ItemFactory: "ItemFactory",
    LineController: "LineController",
    LineFactory: "LineFactory",
    ParticleSystemCenter: "ParticleSystemCenter",
    gamecontroller: "gamecontroller"
  } ],
  Block: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d189bRBtfJPq5rmxTZ6MLjM", "Block");
    "use strict";
    var Global = require("Global");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var BlockColors = [ cc.hexToColor("#3376BA"), cc.hexToColor("#A24C38"), cc.hexToColor("#C79246"), cc.hexToColor("#83619A"), cc.hexToColor("#BE618F"), cc.hexToColor("#4DABC8") ];
    var BlockConfig = require("BlockConfig");
    var BingLog = require("BingLog");
    var GameComponent = require("GameComponent");
    var GameType = require("GameType");
    var cls = cc.Class({
      extends: GameComponent,
      statics: {
        colorIndex: 0
      },
      properties: {
        type: {
          default: GameType.Block,
          override: true,
          visible: false
        },
        sp: cc.Sprite,
        numLable: cc.Label,
        count: 0,
        color: cc.hexToColor("#3376BA"),
        particleFile: ""
      },
      init: function init(count) {
        this.count = count;
        var len = BlockColors.length;
        cls.colorIndex++;
        cls.colorIndex = cls.colorIndex % len;
        if (count > 0) {
          var blockConfig = this.getConfigByCount(count);
          var spName = blockConfig[0];
          this.particleFile = blockConfig[1];
          this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", spName);
        }
        this.numLable.node.visible = count > 0;
      },
      getConfigByCount: function getConfigByCount(count) {
        var blocks = BlockConfig["blocks"];
        var len = blocks.length;
        for (var i = 0; i < len; ++i) {
          var config = blocks[i];
          if (config["min"] <= count && config["max"] >= count) return [ config["icon"], config["texiao"] ];
        }
        console.error("you need config the block for ", count);
        return [ "b_101.png", "zk_lz.plist" ];
      },
      onLoad: function onLoad() {},
      update: function update(dt) {},
      updateNode: function updateNode() {
        if (this.count <= 0) this.numLable.node.visible = false; else {
          this.numLable.node.visible = true;
          this.numLable.string = this.count.toString();
        }
      },
      updateCount: function updateCount(subcount) {
        var removeall = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var addScore = subcount;
        removeall && (addScore = this.count);
        Global.score += addScore;
        this.count -= addScore;
        this.numLable.string = this.count.toString();
        return this.count <= 0;
      },
      collisionAnimate: function collisionAnimate() {
        var s1 = cc.scaleTo(.1, 1.2, 1.2);
        var s2 = cc.scaleTo(.05, 1, 1);
        var seq = cc.sequence(s1, s2);
        this.node.runAction(seq);
      }
    });
    module.exports = cls;
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    BlockConfig: "BlockConfig",
    GameComponent: "GameComponent",
    GameType: "GameType",
    Global: "Global",
    SpriteFrameCenter: "SpriteFrameCenter"
  } ],
  BulletController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72f237q9VJAs7/W73g6nPHK", "BulletController");
    "use strict";
    var BingLog = require("BingLog");
    var BulletFactory = require("BulletFactory");
    var GameState = require("GameState");
    var Global = require("Global");
    var ItemType = require("ItemType");
    cc.Class({
      extends: cc.Component,
      properties: {
        bullets: [ cc.Node ],
        gamecontroller: require("gamecontroller"),
        bulletsNodes: cc.Node
      },
      onLoad: function onLoad() {
        this.bullets = [];
        this.tankController = this.node.getComponent("TankController");
        this.init();
      },
      init: function init() {},
      addBullets: function addBullets(spName, pt, speed, relativespeed) {
        var bulletNode = BulletFactory.create(spName, speed, relativespeed);
        bulletNode.setPosition(pt);
        this.bullets.push(bulletNode);
        this.bulletsNodes.addChild(bulletNode);
      },
      update: function update(dt) {
        var MaxDist = 500;
        var removes = [];
        var tankPtY = this.tankController.head.getPositionY();
        var tmpPtY = 0;
        var i = 0;
        for (;i < this.bullets.length; ++i) {
          var bullet = this.bullets[i];
          var Bullet = bullet.getComponent("Bullet");
          Bullet.updateNode(dt);
          tmpPtY = bullet.getPositionY();
          if (tmpPtY - tankPtY > MaxDist) removes.push(i); else {
            var ret = this.gamecontroller.tryBulletAtPt(bullet.getPosition());
            ret && removes.push(i);
          }
        }
        i = removes.length - 1;
        for (;i > -1; --i) {
          this.bullets[removes[i]].removeFromParent(true);
          this.bullets.splice(removes[i], 1);
        }
      }
    });
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    BulletFactory: "BulletFactory",
    GameState: "GameState",
    Global: "Global",
    ItemType: "ItemType",
    gamecontroller: "gamecontroller"
  } ],
  BulletFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "50946gMUgRCUq93oHerc6lC", "BulletFactory");
    "use strict";
    var GameType = require("GameType");
    var FC = cc.Class({
      extends: cc.Object,
      ctor: function ctor() {
        this.pool = new cc.NodePool();
      },
      init: function init(spName, speed, relativespeed) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/bullet");
          newNode = cc.instantiate(prefab);
        }
        var Bullet = newNode.getComponent("Bullet");
        Bullet.init(spName, speed, relativespeed);
        return newNode;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.Bullet) debugger;
        this.pool.put(node);
      },
      create: function create(spName, speed, relativespeed) {
        var obj = Factory.init(spName, speed, relativespeed);
        return obj;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    GameType: "GameType"
  } ],
  Bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1d9fcc2RJ9Ffo5QtuHrDBH3", "Bullet");
    "use strict";
    var BingLog = require("BingLog");
    var GameComponent = require("GameComponent");
    var GameType = require("GameType");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var Bullet = cc.Class({
      extends: GameComponent,
      statics: {
        MaxDist: .5 * cc.winSize.height - 20,
        Index: 0
      },
      properties: {
        sp: cc.Sprite,
        type: {
          default: GameType.Bullet,
          override: true,
          visible: false
        },
        totalDist: 0,
        speed: 300,
        relativespeed: 100
      },
      init: function init(spName, speed, relativespeed) {
        this.type = GameType.Bullet;
        this.speed = speed;
        this.relativespeed = relativespeed;
        this.spName = spName;
        BingLog.log("Bullet init:");
        this.node.name = "bullet" + Bullet.Index.toString();
        Bullet.Index++;
      },
      onLoad: function onLoad() {
        this.type = GameType.Bullet;
        this.spName && (this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/tanks", this.spName));
      },
      updateNode: function updateNode(dt) {
        var y = this.node.getPositionY() + this.speed;
        this.node.setPositionY(y);
      }
    });
    module.exports = Bullet;
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    GameComponent: "GameComponent",
    GameType: "GameType",
    SpriteFrameCenter: "SpriteFrameCenter"
  } ],
  CameraControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c2e9bYnxwhEfJQIohaYaI/e", "CameraControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      onEnable: function onEnable() {},
      onDisable: function onDisable() {},
      lateUpdate: function lateUpdate(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  FBPlugin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75c587Fo41PHbXljhPIbwGc", "FBPlugin");
    "use strict";
    module.exports = function() {
      var sharePng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXwAAADICAIAAABkqc1KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjJBRjAwMkE1MUE1MTFFOEFCMzZBRUJENkEzMUQ3OUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjJBRjAwMkI1MUE1MTFFOEFCMzZBRUJENkEzMUQ3OUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMkFGMDAyODUxQTUxMUU4QUIzNkFFQkQ2QTMxRDc5RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMkFGMDAyOTUxQTUxMUU4QUIzNkFFQkQ2QTMxRDc5RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoyVaiMAAJQaSURBVHja7H0HgF1F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";
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
            callback && callback();
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
        }
      });
      var p = new plugin();
      return p;
    }();
    cc._RF.pop();
  }, {} ],
  GameComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfb95UbSUhASpq/ixb23eGZ", "GameComponent");
    "use strict";
    var GameType = require("GameType");
    cc.Class({
      extends: cc.Component,
      properties: {
        type: GameType.Block
      }
    });
    cc._RF.pop();
  }, {
    GameType: "GameType"
  } ],
  GameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dd3d40PPohBLJgdJdtRUCjL", "GameConfig");
    "use strict";
    module.exports = function() {
      var Config = cc.Class({
        extends: cc.Object,
        properties: {
          DebugVersion: true,
          InnerVersion: "0.0.1",
          Platform: "fbintantgame",
          TankHeight: 70,
          TankWidth: 70,
          ItemWidth: 50
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
  GameOver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f3a8ZxuLVEHoAzMQOP757a", "GameOver");
    "use strict";
    var Global = require("Global");
    var GameState = require("GameState");
    var GameConfig = require("GameConfig");
    cc.Class({
      extends: cc.Component,
      properties: {
        ScoreLable: cc.Label,
        HighLable: cc.Label,
        TimeLable: cc.Label,
        clockTime: 5,
        clockNode: cc.Node,
        NormalNode: cc.Node,
        NewHighNode: cc.Node,
        gamecontroller: require("gamecontroller"),
        newHightScoreLb: cc.Label,
        newHightHistoryLb: cc.Label,
        closeBtn: cc.Node
      },
      onLoad: function onLoad() {},
      onEnable: function onEnable() {
        var score = Global.score;
        this.newRecord = score;
        var highScore = Global.highScore;
        this.ScoreLable.string = score.toString();
        this.HighLable.string = highScore.toString();
        this.TimeLable.string = this.clockTime.toString();
        Global.newHistory(score);
        this.gamecontroller.gameOver();
        this.clockNode.active = false;
        if (score > highScore) {
          this.NewHighNode.active = true;
          this.NormalNode.active = false;
          this.newHightScoreLb.string = score.toString();
          this.newHightHistoryLb.string = highScore.toString();
          this.closeBtn.active = false;
          this.scheduleOnce(this.closeBtnShow, .2);
        } else {
          this.NewHighNode.active = false;
          this.NormalNode.active = true;
          this.showAdBtn(true);
        }
        this.schedule(this.clockAnimate, .8);
        if (score > Global.thisscore) {
          Global.thisscore = score;
          if (Global.shareIndex < Global.shareCount) {
            var FBP = require("FBPlugin");
            var str = " get a score of " + Global.thisscore.toString() + " in Tank and Fire！";
            GameConfig.isFBInstantGame() && FBP.updateAsync(str);
            Global.shareIndex++;
          }
        }
      },
      showAdBtn: function showAdBtn(show) {
        if (0 == Global.showAdTimes) {
          this.clockNode.active = show;
          this.schedule(this.eventClock, 1);
          Global.showAdTimes++;
        }
      },
      eventClock: function eventClock() {
        this.clockTime--;
        if (this.clockTime <= 0) {
          this.clockNode.active = false;
          this.gamecontroller.updateState(GameState.over);
        }
        this.TimeLable.string = this.clockTime.toString();
      },
      closeBtnShow: function closeBtnShow() {
        this.closeBtn.active = true;
      },
      clockAnimate: function clockAnimate() {
        var sc1 = cc.scaleTo(.15, 1.25, 1.25);
        var sc2 = cc.scaleTo(.3, .95, .95);
        var seq = cc.sequence(sc1, sc2);
        this.clockNode.runAction(seq);
      },
      onClock: function onClock() {
        this.unschedule(this.eventClock);
        this.gamecontroller.updateState(GameState.playing);
        this.gamecontroller.tankController.resetTanks();
        this.gamecontroller.moreLife();
        this.node.active = false;
      },
      onContinue: function onContinue() {
        var LineController = require("LineController");
        LineController.reset();
        Global.initHistory();
        cc.director.loadScene("start");
      },
      onShare: function onShare(event, intent) {
        var FBP = require("FBPlugin");
        FBP.chooseAsync();
      },
      onHightShare: function onHightShare(event) {
        var FBP = require("FBPlugin");
        var self = this;
        FBP.chooseAsync(function() {
          var FBP2 = require("FBPlugin");
          var str = " get a new RECORD of " + self.newRecord.toString() + "！Can you get more?";
          FBP2.updateHighAsync(str, self.onCloseHigh.bind(self));
        });
      },
      onCloseHigh: function onCloseHigh() {
        this.NewHighNode.active = false;
        this.NormalNode.active = true;
        0 == Global.showAdTimes && this.showAdBtn(true);
      }
    });
    cc._RF.pop();
  }, {
    FBPlugin: "FBPlugin",
    GameConfig: "GameConfig",
    GameState: "GameState",
    Global: "Global",
    LineController: "LineController",
    gamecontroller: "gamecontroller"
  } ],
  GameState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4a0c3n2j15COo57Vk0IXHUj", "GameState");
    "use strict";
    module.exports = cc.Enum({
      init: 0,
      playing: 1,
      collision: 2,
      overWaiting: 3,
      over: 4
    });
    cc._RF.pop();
  }, {} ],
  GameType: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f82eH+hhhKIoMkB8u+Rd/V", "GameType");
    "use strict";
    module.exports = cc.Enum({
      Empty: 0,
      Tank: 1,
      Item: 2,
      Bar: 10,
      Block: 20,
      Bullet: 30
    });
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
      }
    };
    cc._RF.pop();
  }, {} ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9662loAU9LDZmqpwJ2t2Ag", "Global");
    "use strict";
    var GameConfig = require("GameConfig");
    module.exports = function() {
      var lc = require("LocalStorage");
      var high = "high";
      var cls = cc.Class({
        properties: {
          tankid: "1",
          score: 0,
          thisscore: 0,
          shareCount: 5,
          shareIndex: 0,
          highScore: 0,
          showAdTimes: 0,
          showRecord: false,
          loadCount: 0
        },
        initHistory: function initHistory() {
          this.score = 0;
          this.showRecord = false;
          this.showAdTimes = 0;
          lc.get(high, 0, function(v) {
            this.highScore = "string" == typeof v ? parseInt(v) : "number" == typeof v ? v : 1e4;
          }.bind(this));
        },
        newHistory: function newHistory(h) {
          if (h > this.highScore) {
            lc.set(high, h);
            this.highScore = h;
          }
        }
      });
      var instance = new cls();
      return instance;
    }();
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig",
    LocalStorage: "LocalStorage"
  } ],
  HeroControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b8379x3vJtEbIfhSLW4ZbxR", "HeroControl");
    "use strict";
    var CameraControl = require("CameraControl");
    cc.Class({
      extends: cc.Component,
      properties: {
        maxSpeed: 500,
        camera: cc.Camera
      },
      onLoad: function onLoad() {
        this.speed = 300;
      },
      update: function update(dt) {
        this.node.setPositionY(this.node.getPositionY() + dt * this.speed);
        this.camera && this.camera.node.setPositionY(this.node.getPositionY() + dt * this.speed);
      }
    });
    cc._RF.pop();
  }, {
    CameraControl: "CameraControl"
  } ],
  InitialScript: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "41bd8YJFAVLFbQTPokV45BP", "InitialScript");
    "use strict";
    require("JSExtends");
    var GameConfig = require("GameConfig");
    var BingLog = require("BingLog");
    var Global = require("Global");
    var GameUtils = require("GameUtils");
    cc.Class({
      extends: cc.Component,
      properties: {
        progress: cc.Label
      },
      onLoad: function onLoad() {
        cc.log("InitialScript onLoad ");
        this.printBaseInfo();
        BingLog.log("Init Script----------\n\n");
        BingLog.log("InitialScript sc name: ", cc.director.getScene().name);
        var randoms = [ 1, 3, 6, 9 ];
        var index = GameUtils.randomInt(0, 3);
        Global.initHistory();
        Global.tankid = randoms[index].toString();
      },
      start: function start() {
        cc.log("InitialScript start ");
        BingLog.log("scene name:", cc.director.getScene().name);
        var preloadFiles = [];
        preloadFiles.push({
          name: "fonts",
          type: "dir"
        });
        preloadFiles.push({
          name: "particle",
          type: "dir"
        });
        preloadFiles.push({
          name: "png/share",
          type: "dir"
        });
        var files = [ "prefab/bar", "prefab/block", "prefab/bullet", "prefab/item", "prefab/msg", "prefab/tank", "prefab/tankhead", "png/game", "png/tanks" ];
        for (var i = 0; i < files.length; ++i) preloadFiles.push({
          name: files[i],
          type: "file"
        });
        var self = this;
        this.preloadCount = preloadFiles.length;
        this.loadedCount = 0;
        BingLog.log("preload:", this.loadedCount, this.preloadCount);
        this.loadRes = false;
        this.inited = false;
        for (var _i = 0; _i < preloadFiles.length; ++_i) {
          var preloadFile = preloadFiles[_i];
          BingLog.log("will load file:", preloadFile.name);
          "file" === preloadFile.type ? cc.loader.loadRes(preloadFile.name, function(err, result) {
            err && BingLog.warn("load file err:", err.message);
            self.loadedCount++;
            BingLog.log("loading:", self.loadedCount, 100 * self.loadedCount / self.preloadCount);
            self.loadedCount == self.preloadCount && (self.loadRes = true);
            self.updateProgress();
          }) : "dir" === preloadFile.type && cc.loader.loadResDir(preloadFile.name, function(errs, assets) {
            errs && BingLog.warn("load file err:", errs.message);
            self.loadedCount++;
            BingLog.log("assets:", assets);
            BingLog.log("loading:", self.loadedCount, 100 * self.loadedCount / self.preloadCount);
            self.loadedCount == self.preloadCount && (self.loadRes = true);
            self.updateProgress();
          });
        }
      },
      updateProgress: function updateProgress() {
        var progress = 100 * this.loadedCount / this.preloadCount;
        progress > 100 && (progress = 100);
        this.progress.string = progress.toFixed(0).toString() + "%";
      },
      goMenu: function goMenu() {
        cc.Stage = 0;
        cc.director.loadScene("gamemenu");
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
        cc.sys.isNative && BingLog.log("windowPixelResolution: ", jsb.fileUtils.getWritablePath());
        BingLog.log("******** end info ********");
      }
    });
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    GameConfig: "GameConfig",
    GameUtils: "GameUtils",
    Global: "Global",
    JSExtends: "JSExtends"
  } ],
  ItemConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3781bkXMfJL8qArVm1Fuz+/", "ItemConfig");
    "use strict";
    module.exports = {
      10000: {
        time: 5,
        type: 1,
        name: "无敌",
        icon: "i_10000.png"
      },
      10001: {
        time: 0,
        type: 2,
        name: "身体",
        icon: ""
      },
      10002: {
        time: 0,
        type: 3,
        name: "单排子弹",
        icon: "i_10002.png"
      },
      10003: {
        time: 0,
        type: 4,
        name: "双排子弹",
        icon: "i_10003.png"
      },
      10004: {
        time: 0,
        type: 5,
        name: "子弹频率双倍",
        icon: "i_10004.png"
      }
    };
    cc._RF.pop();
  }, {} ],
  ItemFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0bc44rC6UdBNKnJiHx33gFd", "ItemFactory");
    "use strict";
    var GameType = require("GameType");
    var FC = cc.Class({
      ctor: function ctor() {
        this.pool = new cc.NodePool();
      },
      init: function init(id, count) {
        var newNode = this.pool.get();
        if (!newNode) {
          var prefab = cc.loader.getRes("prefab/item");
          newNode = cc.instantiate(prefab);
        }
        var item = newNode.getComponent("Item");
        item.updateItem(id, count);
        return newNode;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.Item) debugger;
        this.pool.put(node);
      },
      create: function create(id, count) {
        var obj = Factory.init(id, count);
        return obj;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    GameType: "GameType"
  } ],
  ItemType: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96205JWqTFHCbXH6roFRADv", "ItemType");
    "use strict";
    module.exports = cc.Enum({
      Invincible: 1,
      TankBody: 2,
      One: 3,
      Two: 4,
      Double: 5
    });
    cc._RF.pop();
  }, {} ],
  Item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e89aJnntROebySmYBE0MWC", "Item");
    "use strict";
    var BingLog = require("BingLog");
    var GameComponent = require("GameComponent");
    var GameType = require("GameType");
    var ItemType = require("ItemType");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var Global = require("Global");
    cc.Class({
      extends: GameComponent,
      properties: {
        sp: cc.Sprite,
        label: cc.Label,
        type: {
          default: GameType.Item,
          override: true,
          visible: false
        },
        count: 0,
        time: 0,
        subType: {
          default: ItemType.Tank,
          override: true,
          visible: false
        }
      },
      init: function init() {
        BingLog.log("Item init:");
      },
      onLoad: function onLoad() {},
      updateItem: function updateItem(id, count) {
        var ItemConfig = require("ItemConfig");
        var config = ItemConfig[id];
        this.type = GameType.Item;
        this.subType = config.type;
        this.count = count;
        this.time = config.time;
        if (this.subType == ItemType.TankBody) {
          var TankConfig = require("TankConfig");
          var tc = TankConfig[Global.tankid];
          this.updateNode(tc.itemIcon);
          this.label.string = this.count.toString();
        } else {
          this.updateNode(config.icon);
          this.label.string = "";
        }
      },
      updateNode: function updateNode(pngname) {
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/game", pngname);
      }
    });
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    GameComponent: "GameComponent",
    GameType: "GameType",
    Global: "Global",
    ItemConfig: "ItemConfig",
    ItemType: "ItemType",
    SpriteFrameCenter: "SpriteFrameCenter",
    TankConfig: "TankConfig"
  } ],
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
  LineConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b571FlSpVNw5Jl/Edfc30u", "LineConfig");
    "use strict";
    module.exports = {
      new: {
        1: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "1D2", "1D2", "0", "0", "1D2" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D3", "0", "0", "10001;1D3", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "4D15", "0", "4D6" ],
          type: 1
        }, {
          i: [ "10001;1D5", "10001;1D5", "0", "0", "10001;1D3" ],
          bar: [ 1, 0, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D4", "0", "4D5", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "10002;1D1", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "4D4" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "40D1", "0", "20D2", "4D5" ],
          type: 1
        } ],
        3: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "1D2", "0", "1D2", "1D2" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10001;1D3", "0", "10001;1D3", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D3", "0", "0", "0", "3D8" ],
          type: 1
        }, {
          i: [ "10001;1D4", "0", "10001;1D4", "0", "10001;1D3" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "4D6", "0" ],
          type: 1
        }, {
          i: [ "10002;1D1", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "4D8" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D6", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "25D2", "0", "4D6", "0", "4D5" ],
          type: 1
        } ],
        2: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "1D2", "0", "1D2", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D3", "0", "0", "10001;1D3", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D12", "0", "5D4", "0", "5D2" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "10001;1D5", "0", "10001;1D3" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "8D2", "0", "4D5", "5D5" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "10000;1D1" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D2", "1D12", "3D2", "0", "1D10" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10001;1D3", "0", "10001;1D2", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D3", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D12", "0", "5D4", "0", "5D2" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;1D2", "0", "0" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "8D2", "0", "4D5", "5D5" ],
          type: 1
        }, {
          i: [ "10001;1D3", "0", "0", "0", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D6", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D5", "0", "40D2", "4D1", "0" ],
          type: 1
        } ],
        5: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "3D2", "0", "4D2" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D3", "0", "0", "10001;1D3", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;1D3", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "3D8", "0", "4D4", "0", "4D10" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;1D4", "0", "10001;1D3" ],
          bar: [ 1, 0, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D4", "0", "4D8", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;1D3", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "4D6" ],
          type: 1
        }, {
          i: [ "10001;1D3", "0", "0", "0", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "30D1", "4D6", "0", "4D5", "4D6" ],
          type: 1
        } ],
        4: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D8", "0", "8D2", "0" ],
          type: 1
        }, {
          i: [ "0", "10004;1D1", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D3", "0", "0", "0", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;1D3", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D6", "0", "8D3", "0", "4D10" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;1D4", "0", "10001;1D3" ],
          bar: [ 0, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "8D8", "0", "4D8", "0" ],
          type: 1
        }, {
          i: [ "0", "10000;1D1", "0", "10003;1D1", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "4D6" ],
          type: 1
        }, {
          i: [ "10001;1D3", "0", "0", "0", "10001;1D4" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D8", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "3D18", "0", "2D14", "0", "4D10" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;1D2", "0", "10001;1D2" ],
          bar: [ 1, 0, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10002;1D1", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "10001;1D3", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D3", "0", "4D6", "0", "4D6" ],
          type: 1
        }, {
          i: [ "10001;1D3", "0", "0", "0", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "5D4", "0", "4D8", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;2D2", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "4D6" ],
          type: 1
        }, {
          i: [ "10001;1D3", "0", "0", "0", "10001;1D2" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "10001;1D3", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D5", "0", "4D6", "4D8", "0" ],
          type: 1
        } ],
        6: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "1D2", "0", "0", "1D2", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;1D3", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D3", "0", "4D4", "0", "4D6" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "10001;1D5", "0", "10001;1D3" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "10004;1D1" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "10003;1D1", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "4D8" ],
          type: 1
        }, {
          i: [ "10001;1D3", "0", "0", "0", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D8", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D8", "0", "4D6", "4D8", "15D1" ],
          type: 1
        } ]
      },
      init: {
        1: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "10001;1D3", "10001;1D3", "10001;1D3", "10001;1D3", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "1D5", "1D2", "1D2", "1D2", "6D2" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "35D1", "0", "0", "0", "17D2" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "10001;1D3", "0", "10001;1D3", "0", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        } ]
      },
      hard: {
        1: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D10", "2D12", "0", "6D12", "4D10" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D5", "0", "0", "10001;1D5", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;1D5", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D16", "8D4", "4D24", "0", "6D6" ],
          type: 1
        }, {
          i: [ "0", "10001;1D5", "0", "0", "10001;1D5" ],
          bar: [ 0, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D4", "0", "6D10", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;1D2", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "6D10" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "0", "0", "10001;1D5" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "6D10", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D15", "4D10", "5D12", "4D18", "5D8" ],
          type: 1
        } ],
        3: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D12", "0", "8D8", "8D6", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D5", "0", "0", "10001;1D5", "0" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10001;1D5", "0", "10001;1D5", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D16", "0", "6D10", "0", "6D10" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;1D5", "0", "10001;1D5" ],
          bar: [ 0, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "6D10", "4D18", "4D15", "6D10", "4D20" ],
          type: 1
        }, {
          i: [ "10002;1D1", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "60D1" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "10001;1D5" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "6D10", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D10", "5D15", "4D10", "5D15", "4D10" ],
          type: 1
        } ],
        2: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "1D45", "8D5", "8D4", "8D3", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D5", "0", "0", "10001;1D5", "0" ],
          bar: [ 0, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10004;1D1", "0", "10001;1D5", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D3", "0", "6D6", "0", "6D10" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "10001;1D5", "0", "10001;1D5" ],
          bar: [ 1, 0, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "6D10", "6D2", "0", "6D10", "0" ],
          type: 1
        }, {
          i: [ "10000;1D1", "0", "0", "0", "10003;1D1" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "6D10", "6D1", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10001;1D3", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "60D1" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "10001;1D3" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "6D10", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "10001;2D2", "0", "0", "10001;2D2", "0" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10001;1D3", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D8", "0", "6D2", "6D6", "2D5" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D16", "0", "6D10", "0", "6D10" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;2D2", "0", "10001;2D2" ],
          bar: [ 0, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10001;1D4", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "3D14", "3D6", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D10", "6D16", "0", "8D12", "5D30" ],
          type: 1
        } ],
        5: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D6", "0", "8D12", "0", "4D12" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D5", "0", "0", "10001;1D5", "0" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;1D2", "10001;1D5" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D16", "0", "4D4", "0", "6D10" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "10001;1D5", "0", "0" ],
          bar: [ 0, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D4", "0", "6D10", "0" ],
          type: 1
        }, {
          i: [ "0", "10001;1D5", "0", "10002;1D1", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "6D10" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "6D10", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D2", "5D10", "8D8", "4D10", "5D15" ],
          type: 1
        } ],
        4: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D6", "10D5", "0", "8D4", "8D3" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D5", "0", "0", "10001;1D5", "0" ],
          bar: [ 1, 0, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;1D5", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D16", "0", "6D10", "0", "6D10" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "10001;1D5", "0", "10001;1D5" ],
          bar: [ 0, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D4", "0", "6D15", "0" ],
          type: 1
        }, {
          i: [ "10003;1D1", "0", "0", "10000;1D1", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "6D10" ],
          type: 1
        }, {
          i: [ "0", "10001;1D4", "0", "0", "10001;2D2" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "6D10", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D10", "0", "8D6", "5D10", "5D15" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "2D12", "8D10", "5D8", "8D6", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "10001;1D2" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D3", "0", "0", "0", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;1D3", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D4", "5D6", "0", "0", "2D10" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D16", "0", "4D45", "0", "6D10" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;2D2", "0", "0" ],
          bar: [ 0, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        } ],
        6: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "2D12", "8D10", "5D8", "8D6", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "10004;1D1" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10001;1D5", "0", "10001;1D5", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;1D5", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D16", "0", "4D45", "0", "6D10" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "10001;1D5", "0", "0" ],
          bar: [ 0, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "6D10", "0", "6D10", "0" ],
          type: 1
        }, {
          i: [ "0", "10001;1D3", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "6D10" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "6D5", "6D5", "6D6", "2D10", "4D15" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "5D10", "5D8", "5D12", "5D8" ],
          type: 1
        } ]
      },
      middle: {
        1: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D6", "0", "8D3", "0", "2D10" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;2D2", "0", "0", "10001;2D2", "0" ],
          bar: [ 1, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;2D2", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D18", "0", "8D14", "0", "10D5" ],
          type: 1
        }, {
          i: [ "10001;1D4", "0", "10001;1D4", "0", "10001;2D2" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D18", "8D8", "4D18", "10D5", "4D15" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "10002;1D1", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "8D5" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "0", "0", "10001;2D2" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "10D5", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "5D5", "0", "5D5", "5D5" ],
          type: 1
        } ],
        3: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "4D14", "8D6", "8D6", "6D6" ],
          type: 1
        }, {
          i: [ "0", "10004;1D1", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;2D2", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;2D2", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D8", "0", "8D10", "0", "10D5" ],
          type: 1
        }, {
          i: [ "10001;1D4", "0", "10001;1D4", "0", "10001;2D2" ],
          bar: [ 0, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "1D61", "0", "10D5", "0" ],
          type: 1
        }, {
          i: [ "0", "10002;1D1", "0", "10000;1D1", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "10D5" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D2", "0", "0", "10001;2D2", "0" ],
          bar: [ 1, 0, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 1, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 1, 0 ],
          b: [ "4D8", "0", "6D15", "0", "10D6" ],
          type: 1
        }, {
          i: [ "10001;1D3", "0", "10001;2D2", "0", "10001;2D2" ],
          bar: [ 0, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "8D12", "0", "10D5", "0" ],
          type: 1
        }, {
          i: [ "0", "10001;1D2", "0", "0", "10001;1D2" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "10D5", "0", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D5", "5D15", "5D6", "5D5", "5D5" ],
          type: 1
        } ],
        2: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D10", "0", "8D3", "8D6", "8D6" ],
          type: 1
        }, {
          i: [ "0", "10001;1D4", "0", "0", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;2D2", "0", "0", "10001;2D2", "0" ],
          bar: [ 1, 0, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;2D2", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D8", "0", "6D15", "0", "10D6" ],
          type: 1
        }, {
          i: [ "10001;1D1", "10001;1D4", "10001;1D2", "0", "10001;2D2" ],
          bar: [ 0, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "8D12", "0", "10D5", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "10003;1D1", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "10D5" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "0", "0", "10001;2D2" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "10D5", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "2D25", "5D15", "5D12", "4D10", "5D16" ],
          type: 1
        } ],
        5: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D6", "0", "2D14", "1D14", "8D8" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;1D2", "10001;2D2", "0", "10001;2D2", "0" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;2D2", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D8", "0", "8D14", "0", "5D20" ],
          type: 1
        }, {
          i: [ "10001;1D4", "0", "0", "0", "0" ],
          bar: [ 0, 1, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "8D14", "0", "10D5", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "10001;2D2", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "10D5" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "10D5", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "2D30", "2D12", "5D20", "5D8", "5D12" ],
          type: 1
        } ],
        4: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D10", "4D10", "5D5", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "10001;2D2", "0", "0", "10001;2D2", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;2D2", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D20", "0", "8D14", "0", "10D5" ],
          type: 1
        }, {
          i: [ "0", "10001;2D2", "10001;1D4", "0", "10001;1D5" ],
          bar: [ 1, 0, 1, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "10004;1D1" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "8D14", "0", "10D5", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "10D5" ],
          type: 1
        }, {
          i: [ "10001;1D5", "0", "0", "0", "10001;1D4" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "10D5", "10D5", "10D5", "10D5", "10D10" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D15", "5D5", "5D16", "2D20", "1D20" ],
          type: 1
        } ],
        6: [ {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D14", "0", "8D8", "0", "8D8" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "10001;2D2", "0", "10001;2D2", "0" ],
          bar: [ 1, 0, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;2D2", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D15", "8D5", "8D6", "10D6", "8D5" ],
          type: 1
        }, {
          i: [ "10000;1D1", "0", "10001;1D4", "0", "0" ],
          bar: [ 1, 1, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "10001;2D2", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 0
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D6", "0", "8D14", "0", "10D5" ],
          type: 1
        }, {
          i: [ "10001;1D3", "0", "10001;1D3", "0", "10001;1D2" ],
          bar: [ 1, 0, 1, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "4D4", "8D2", "0", "0", "4D4" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "3D5" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "8D14", "0", "8D8", "0", "6D6" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 1, 1, 0, 1, 0 ],
          b: [ "0", "0", "0", "0", "0" ],
          type: 2
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "6D20", "0", "10D5", "0" ],
          type: 1
        }, {
          i: [ "0", "10002;1D1", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "0", "0", "0", "10D5" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "10001;1D4" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "0", "10D5", "0", "0", "0" ],
          type: 1
        }, {
          i: [ "0", "0", "0", "0", "0" ],
          bar: [ 0, 0, 0, 0, 0 ],
          b: [ "5D10", "4D25", "2D20", "2D28", "4D15" ],
          type: 1
        } ]
      }
    };
    cc._RF.pop();
  }, {} ],
  LineController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "208dbrq8atO7bYaqxF2RNbA", "LineController");
    "use strict";
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    var LineFactory = require("LineFactory");
    var GU = require("GameUtils");
    var PositionConfig = require("PositionConfig");
    var SpeedConfig = require("SpeedConfig");
    var LineConfig = require("LineConfig");
    module.exports = function() {
      var ArraySize = 12;
      var MaxGroup = 6;
      var plugin = cc.Class({
        extends: cc.Object,
        properties: {
          hard: "new",
          groupid: 1,
          lineid: 0,
          lineArray: [],
          lineCount: 0
        },
        ctro: function ctro() {},
        reset: function reset() {
          this.hard = "new";
          this.updateGroup();
          this.lineid = 0;
          this.lineCount = 0;
          this.groupid = "1";
        },
        initFirstLines: function initFirstLines() {
          var count = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6;
          this.hard = "init";
          this.lineid = 0;
          this.groupid = "1";
          var ret = this.createLines(this.lineid, this.lineid + count);
          this.hard = "new";
          return ret;
        },
        getSpeedByConfig: function getSpeedByConfig() {
          var linecount = this.lineCount - 5;
          var lines = SpeedConfig.dist;
          for (var i = lines.length - 1; i > -1; --i) {
            var line = lines[i];
            if (linecount >= line) return SpeedConfig["speed"][i];
          }
          return SpeedConfig["speed"][0];
        },
        getLindeCount: function getLindeCount() {
          var lines = LineConfig[this.hard][this.groupid];
          return lines.length;
        },
        addLines: function addLines(count) {
          var MaxLine = this.getLindeCount();
          this.lineCount += count;
          console.log("add line:", this.hard, this.groupid, this.lineid, count);
          if (this.lineid >= MaxLine) {
            this.lineid = this.lineid % MaxLine;
            this.updateGroup();
            this.lineid = 0;
          }
          if (this.lineid + count <= MaxLine) {
            var ret = this.createLines(this.lineid, this.lineid + count);
            this.lineid += count;
            return ret;
          }
          var _ret = this.createLines(this.lineid, MaxLine);
          this.updateGroup();
          this.lineid = 0;
          var left = this.lineid + count - MaxLine;
          var ret2 = this.createLines(this.lineid, left);
          _ret.push.apply(_ret, _toConsumableArray(ret2));
          return _ret;
        },
        updateHard: function updateHard() {
          var keys = PositionConfig.keys;
          for (var i = 0; i < keys.length; ++i) {
            var config = PositionConfig[key];
            if (config["min"] <= this.lineCount && config["max"] >= this.lineCount) {
              this.hard = key;
              break;
            }
          }
          this.lineid = 0;
          this.updateGroup();
        },
        updateGroup: function updateGroup() {
          var random = GU.randomInt(1, MaxGroup);
          parseInt(this.groupid) == random ? this.updateGroup() : this.groupid = random.toString();
        },
        createLines: function createLines(lineFrom, lineTo) {
          if (lineFrom == lineTo) return [];
          var ret = [];
          for (var line = lineFrom; line < lineTo; line++) {
            var objs = LineFactory.create(this.hard, this.groupid, line);
            var node = new cc.Node();
            var lineNodeData = {
              linenode: node,
              child: [ [], [], [], [], [] ]
            };
            ret.push(lineNodeData);
            if (objs["b"].length > 0) for (var i = 0; i < objs["b"].length; i++) {
              var block = objs["b"][i];
              if (block) {
                node.addChild(block);
                lineNodeData.child[i].push(block);
              } else lineNodeData.child[i].push(null);
            } else for (var _i = 0; _i < 5; ++_i) lineNodeData.child[_i].push(null);
            if (objs["bar"].length > 0) for (var _i2 = 0; _i2 < objs["bar"].length; _i2++) {
              var bar = objs["bar"][_i2];
              if (bar) {
                node.addChild(bar);
                lineNodeData.child[_i2].push(bar);
              } else lineNodeData.child[_i2].push(null);
            } else for (var _i3 = 0; _i3 < 5; ++_i3) lineNodeData.child[_i3].push(null);
            if (objs["i"].length > 0) for (var _i4 = 0; _i4 < objs["i"].length; _i4++) {
              var _bar = objs["i"][_i4];
              if (_bar) {
                node.addChild(_bar);
                lineNodeData.child[_i4].push(_bar);
              } else lineNodeData.child[_i4].push(null);
            } else for (var _i5 = 0; _i5 < 5; ++_i5) lineNodeData.child[_i5].push(null);
          }
          for (var _i6 = 0; _i6 < ret[0].child.length; ++_i6) if (3 != ret[0].child[_i6].length) {
            console.error("child  in at line:", lineFrom, lineTo);
            debugger;
          }
          return ret;
        },
        init: function init() {
          this.addLines(ArraySize);
        }
      });
      var p = new plugin();
      return p;
    }();
    cc._RF.pop();
  }, {
    GameUtils: "GameUtils",
    LineConfig: "LineConfig",
    LineFactory: "LineFactory",
    PositionConfig: "PositionConfig",
    SpeedConfig: "SpeedConfig"
  } ],
  LineFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1408384I3dFuYffa4rcQlwa", "LineFactory");
    "use strict";
    var Config = require("LineConfig");
    var TankConfig = require("TankConfig");
    var BingLog = require("BingLog");
    var GU = require("GameUtils");
    var GameType = require("GameType");
    var ItemFactory = require("ItemFactory");
    var BlockFactory = require("BlockFactory");
    var BarFactory = require("BarFactory");
    var Factory = cc.Class({
      extends: cc.Object,
      statics: {
        create: function create(hard, groupid, lineid) {
          var obj = Factory.parseLine(hard, groupid, lineid);
          var ret = {
            b: [],
            bar: [],
            i: [],
            type: obj.type
          };
          if (obj) {
            BingLog.log("create ", obj);
            BingLog.log("create type ", obj.type, obj["type"]);
            ret["i"] = Factory.createItems(obj["i"]);
            switch (obj.type) {
             case 0:
              break;

             case 1:
              ret["b"] = Factory.createBlocks(obj["b"]);
              break;

             case 2:
              ret["bar"] = Factory.createBars(obj["bar"]);
            }
          }
          return ret;
        },
        put: function put(node) {
          var childrens = node.getChildren();
          var count = childrens.length;
          for (var i = count - 1; i > -1; --i) {
            var sonNode = childrens[i];
            if (sonNode) {
              var type = sonNode.getComponent("GameComponent").type;
              type == GameType.Block ? BlockFactory.put(sonNode) : type == GameType.Bar ? BarFactory.put(sonNode) : type == GameType.Item && ItemFactory.put(sonNode);
            }
          }
          node.removeFromParent(true);
        },
        createItems: function createItems(items) {
          var ret = [];
          for (var i = 0; i < items.length; i++) {
            var itemConfig = items[i];
            if (itemConfig.item) {
              var value = itemConfig.value;
              var block = ItemFactory.create(value.itemid, value.count);
              block.position = cc.p(140 * i - 350 + 70, 0);
              ret.push(block);
            } else ret.push(null);
          }
          return ret;
        },
        createBlocks: function createBlocks(blocks) {
          var ret = [];
          for (var i = 0; i < blocks.length; i++) {
            var blockCount = blocks[i];
            if (blockCount > 0) {
              var block = BlockFactory.create(blockCount);
              block.position = cc.p(140 * i - 350 + 70, 0);
              ret.push(block);
            } else ret.push(null);
          }
          return ret;
        },
        createBars: function createBars(bars) {
          var ret = [];
          for (var i = 0; i < bars.length; i++) if (1 == bars[i]) {
            var bar = BarFactory.create();
            bar.position = cc.p(140 * i - 350 + 70, 0);
            ret.push(bar);
          } else ret.push(null);
          return ret;
        },
        getConfig: function getConfig(id) {
          var config = Config[id];
          return config || null;
        },
        parseLine: function parseLine(hard, groupid, lineid) {
          var group = Config[hard][groupid];
          if (!group) {
            BingLog.warn("the groupid can't be found:", groupid);
            return {};
          }
          var line = group[lineid];
          if (!line) {
            BingLog.warn("the line can't be found:", lineid);
            return {};
          }
          var ret = {};
          var type = line["type"];
          ret["type"] = type;
          ret["bar"] = [];
          ret["b"] = [];
          ret["i"] = Factory.parseItem(line["i"]);
          switch (type) {
           case 0:
            break;

           case 1:
            ret["b"] = Factory.parseBlock(line["b"]);
            break;

           case 2:
            ret["bar"] = line["bar"];
          }
          return ret;
        },
        parseBar: function parseBar(barConfig) {},
        parseItem: function parseItem(config) {
          var len = config.length;
          var ret = [];
          for (var i = 0; i < len; ++i) {
            var blockItem = config[i];
            if ("0" == blockItem) ret.push({
              item: false,
              value: 0
            }); else {
              var icons = blockItem.split(";");
              var itemid = icons[0];
              var randomV = Factory.parseValue(icons[1]);
              ret.push({
                item: true,
                value: {
                  itemid: itemid,
                  count: randomV
                }
              });
            }
          }
          return ret;
        },
        parseValue: function parseValue(itemStr) {
          var randoms = itemStr.split("D");
          var count = Number.parseInt(randoms[0]);
          var max = Number.parseInt(randoms[1]);
          var start = count;
          var end = count * max;
          var randomV = GU.randomInt(start, end);
          return randomV;
        },
        parseBlock: function parseBlock(blockConfig) {
          var len = blockConfig.length;
          var ret = [];
          for (var i = 0; i < len; ++i) {
            var blockItem = blockConfig[i];
            if ("0" == blockItem) ret.push(0); else {
              var randomV = Factory.parseValue(blockItem);
              ret.push(randomV);
            }
          }
          return ret;
        }
      }
    });
    module.exports = Factory;
    cc._RF.pop();
  }, {
    BarFactory: "BarFactory",
    BingLog: "BingLog",
    BlockFactory: "BlockFactory",
    GameType: "GameType",
    GameUtils: "GameUtils",
    ItemFactory: "ItemFactory",
    LineConfig: "LineConfig",
    TankConfig: "TankConfig"
  } ],
  LocalStorage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e684c33q9BG/aRmwj4psmxF", "LocalStorage");
    "use strict";
    var GameConfig = require("GameConfig");
    module.exports = function() {
      var LC = cc.Class({
        extends: cc.Object,
        get: function get(k) {
          var defaultv = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          var callback = arguments[2];
          if (!GameConfig.isFBInstantGame()) {
            var v = cc.sys.localStorage.getItem(k);
            v || (v = defaultv);
            return v;
          }
          FBInstant.player.getDataAsync([ k ]).then(function(data) {
            "undefined" !== typeof data[k] && callback(data[k]);
          });
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
  MsgController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b1f7epx1flC8oBWx7mCE6DA", "MsgController");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        view: require("MsgView")
      },
      onLoad: function onLoad() {},
      onTest: function onTest() {
        FBInstant.canCreateShortcutAsync().then(function(canCreateShortcut) {
          if (canCreateShortcut) {
            view.showMsg("can create");
            FBInstant.createShortcutAsync().then(function() {}).catch(function() {});
          } else view.showMsg("can create");
        });
      }
    });
    cc._RF.pop();
  }, {
    MsgView: "MsgView"
  } ],
  MsgView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48a4ePEFmJNybHWv+noOMNf", "MsgView");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        msgLb: cc.Label
      },
      showMsg: function showMsg(msg) {
        this.msgLb.string = msg;
      },
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  ObjectPool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8b903vyoohArKRceRCO8KRo", "ObjectPool");
    "use strict";
    var BingLog = require("BingLog");
    module.exports = function() {
      var LocalObjectPool = cc.Class({
        extends: cc.Object,
        ctor: function ctor() {
          this.pools = {};
        },
        getItemByName: function getItemByName(name) {
          var pool = this.pools[name];
          pool || (this.pools[name] = new cc.NodePool());
          return pool.get();
        },
        putItemByName: function putItemByName(name, node) {
          var pool = this.pools[name];
          pool || (this.pools[name] = new cc.NodePool());
          return pool.put(node);
        }
      });
      var _instance = new LocalObjectPool();
      return _instance;
    }();
    cc._RF.pop();
  }, {
    BingLog: "BingLog"
  } ],
  ParticleSystemCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94b35rO3bVBYZOpbzRM1w0k", "ParticleSystemCenter");
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
        var particleSystem = node.addComponent(cc.ParticleSystem);
        particleSystem.file = cc.url.raw("resources/particle/" + fileName);
        particleSystem.autoRemoveOnFinish = true;
        particleSystem.resetSystem();
      }
    });
    var Center = new SC();
    module.exports = Center;
    cc._RF.pop();
  }, {} ],
  PositionConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a5461htkedDZ77yb9lFqIF4", "PositionConfig");
    "use strict";
    module.exports = {
      new: {
        max: 59,
        min: 1
      },
      hard: {
        max: 999999,
        min: 140
      },
      middle: {
        max: 139,
        min: 60
      }
    };
    cc._RF.pop();
  }, {} ],
  SpeedConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "239b27liGFBmouv3LUXBSYk", "SpeedConfig");
    "use strict";
    module.exports = {
      speed: [ 5.3, 5.7, 6.1, 6.6, 7.2, 7.8, 8.7, 9.7, 10.8, 12.2, 13 ],
      dist: [ 1, 20, 50, 80, 100, 150, 200, 300, 400, 500, 1e3 ]
    };
    cc._RF.pop();
  }, {} ],
  SpriteFrameCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea65abPs0BHrp6TnvAsgKhF", "SpriteFrameCenter");
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
  TankConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec766Lh779N95Z7M5ijmX+Z", "TankConfig");
    "use strict";
    module.exports = {
      1: {
        body: [ "t_1001.png", "t_1001.png" ],
        bulletsp: "bu_1001.png",
        head: "t_1001.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1001.png",
        wudi: "g_1001.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz.plist",
        id: 1
      },
      3: {
        body: [ "t_1003.png" ],
        bulletsp: "bu_1004.png",
        head: "t_1003.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1003.png",
        wudi: "g_1003.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz2.plist",
        id: 3
      },
      2: {
        body: [ "t_1002.png" ],
        bulletsp: "bu_1002.png",
        head: "t_1002.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1002.png",
        wudi: "g_1002.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz1.plist",
        id: 2
      },
      5: {
        body: [ "t_1005.png" ],
        bulletsp: "bu_1003.png",
        head: "t_1005.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1005.png",
        wudi: "g_1005.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz3.plist",
        id: 5
      },
      4: {
        body: [ "t_1004.png" ],
        bulletsp: "bu_1003.png",
        head: "t_1004.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1004.png",
        wudi: "g_1004.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz3.plist",
        id: 4
      },
      7: {
        body: [ "t_1007.png" ],
        bulletsp: "bu_1004.png",
        head: "t_1007.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1007.png",
        wudi: "g_1007.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz2.plist",
        id: 7
      },
      6: {
        body: [ "t_1006.png" ],
        bulletsp: "bu_1003.png",
        head: "t_1006.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1006.png",
        wudi: "g_1006.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz3.plist",
        id: 6
      },
      9: {
        body: [ "t_1009.png" ],
        bulletsp: "bu_1004.png",
        head: "t_1009.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1009.png",
        wudi: "g_1009.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz5.plist",
        id: 9
      },
      8: {
        body: [ "t_1008.png" ],
        bulletsp: "bu_1004.png",
        head: "t_1008.png",
        bulletF: .8,
        onepos: [ 5 ],
        itemIcon: "i_1008.png",
        wudi: "g_1008.png",
        bulletspeed: 6,
        twopos: [ 3, 7 ],
        texiao: "tanke_lz4.plist",
        id: 8
      }
    };
    cc._RF.pop();
  }, {} ],
  TankController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3638LjSR9C7Y34DW+oresW", "TankController");
    "use strict";
    var Config = require("TankConfig");
    var BingLog = require("BingLog");
    var TankFactory = require("TankFactory");
    var GameState = require("GameState");
    var Global = require("Global");
    var ItemType = require("ItemType");
    var ParticleSystemCenter = require("ParticleSystemCenter");
    var LineController = require("LineController");
    var GameConfig = require("GameConfig");
    var TankHeight = GameConfig.TankHeight;
    var TankWidth = GameConfig.TankWidth;
    var HalfTankWidth = .5 * TankWidth;
    var HalfTankHeight = .5 * TankHeight;
    var MaxSpeed = 30;
    var BulletHeight = 4;
    var HalfBulletHeight = .5 * BulletHeight;
    var InitTankCount = 5;
    var FirstDist = 800;
    var Colors = [ cc.hexToColor("#df231a"), cc.hexToColor("#df231a"), cc.hexToColor("#df641a"), cc.hexToColor("#dfa01a"), cc.hexToColor("#b6e21c"), cc.hexToColor("#56c11b") ];
    var winsize = cc.winSize;
    cc.Class({
      extends: cc.Component,
      properties: {
        head: {
          type: cc.Node,
          default: null,
          visible: false
        },
        tankCount: 0,
        tanks: [ cc.Node ],
        tankid: "1",
        gamecontroller: require("gamecontroller"),
        basePt: cc.p(0, -.1 * winsize.height),
        camera: cc.Camera,
        deltTime: 0,
        deltIndex: 0,
        canTouch: false,
        isTouching: false,
        itemTypes: {
          type: cc.Object,
          default: null,
          visible: false
        },
        speed: 300,
        collisionCount: 8,
        collisionIndex: 1,
        invincibleLabel: cc.Label,
        dist: 0,
        first: true
      },
      onLoad: function onLoad() {
        this.tankid = Global.tankid;
        this.itemTypes = {
          one: false,
          two: false,
          double: false,
          invincible: false,
          time: 0
        };
        this.bulletController = this.node.getComponent("BulletController");
        this.initTank();
        this.scheduleOnce(this.firstMove.bind(this), .1);
        this.invincibleLabel.node.active = false;
      },
      firstMove: function firstMove() {
        console.log(" tank move to the center !!!!");
        this.canTouch = true;
        this.schedule(this.tankFireBullets.bind(this), this.headTank.config.bulletF);
        this.schedule(this.tankFireDoubleBullets.bind(this), .5 * this.headTank.config.bulletF);
        this.speed = this.headTank.config.bulletspeed;
        this.gamecontroller.updateState(GameState.playing);
      },
      initTank: function initTank() {
        this.tanks.length = [];
        this.testIndex = 0;
        this.head = TankFactory.createTankHead(this.tankid);
        this.head.setPosition(0, -.5 * TankHeight);
        this.gamecontroller.tanksNode.addChild(this.head);
        this.tanks.push(this.head);
        this.head.getComponent("Tank").points.unshift(cc.p(0, -.5 * TankHeight));
        this.gamecontroller.tankNode = this.head;
        this.head.setLocalZOrder(100);
        this.headTank = this.head.getComponent("Tank");
        this.printPT(this.head);
        this.addBody(InitTankCount);
      },
      addBody: function addBody() {
        var tankCount = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : InitTankCount;
        var basept = this.head.getPosition();
        var dist = this.getTankSpeed();
        var count = 1 * TankHeight / dist;
        this.collisionCount = Math.floor(count);
        this.collisionIndex = 1;
        for (var i = 0; i < tankCount; ++i) {
          var body = TankFactory.createTankBody(this.tankid);
          body.setPosition(0, -.5 * TankHeight - TankHeight * (i + 1));
          this.gamecontroller.tanksNode.addChild(body);
          this.tanks.push(body);
          var tank = body.getComponent("Tank");
          for (var j = 1; j < count; ++j) tank.points.unshift(cc.p(basept.x, basept.y - TankHeight * (i + 1) + j * dist));
          this.printPT(body);
        }
        this.tankCount = this.tanks.length;
        this.updateNumber();
      },
      resetTanks: function resetTanks() {
        this.itemTypes = {
          one: false,
          two: false,
          double: false,
          invincible: false,
          time: 0
        };
        this.addBody(5);
        this.fireInvincible(5);
      },
      getTankSpeed: function getTankSpeed() {
        this.speed = LineController.getSpeedByConfig();
        if (this.itemTypes.invincible) return 1.5 * this.speed;
        return this.speed;
      },
      printPT: function printPT(node, arg) {
        arg ? console.log(arg, node.name, node.getPosition()) : console.log(node.name, node.getPosition());
      },
      fireTankBody: function fireTankBody(count) {
        var lastBodyPt = this.tanks[this.tanks.length - 1].getPosition();
        var headerPt = this.tanks[0].getPosition();
        console.log("headerPt:", headerPt);
        console.log("lastBodyPt:", lastBodyPt);
        console.log("fire Body at:", lastBodyPt);
        for (var i = 0; i < count; ++i) {
          var body = TankFactory.createTankBody(this.tankid);
          body.setPosition(lastBodyPt.x, lastBodyPt.y);
          this.gamecontroller.tanksNode.addChild(body);
          this.tanks.push(body);
          var dist = this.getTankSpeed();
          var pointscount = 1 * TankHeight / dist;
          var tank = body.getComponent("Tank");
          for (var j = 1; j < pointscount; ++j) tank.points.unshift(lastBodyPt);
        }
        this.tankCount += count;
        this.updateNumber();
      },
      resetBuff: function resetBuff() {
        this.itemTypes.two = false;
        this.itemTypes.one = false;
        this.itemTypes.double = false;
        this.itemTypes.invincible = true;
        this.tankCount = 5;
      },
      fireOneBullet: function fireOneBullet() {
        this.itemTypes.two = false;
        this.itemTypes.one = true;
      },
      fireTwoBullet: function fireTwoBullet() {
        this.itemTypes.two = true;
        this.itemTypes.one = false;
      },
      fireDobuleBullet: function fireDobuleBullet() {
        this.itemTypes.one || this.itemTypes.two ? this.itemTypes.double = true : this.itemTypes.double = false;
      },
      fireInvincible: function fireInvincible() {
        var times = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10;
        this.itemTypes.invincible = true;
        this.itemTypes.time = times;
        this.headTank.openInvincible(true);
        this.timeScaleAction();
        this.schedule(this.updateInvincibleTime, 1);
      },
      timeScaleAction: function timeScaleAction() {
        var index = Math.ceil(this.itemTypes.time);
        this.invincibleLabel.string = index.toString();
        this.invincibleLabel.node.active = true;
        this.invincibleLabel.node.setScale(1, 1);
        this.invincibleLabel.node.setColor(Colors[index]);
        var action = cc.scaleTo(.9, 3, 3);
        this.invincibleLabel.node.runAction(action);
      },
      updateInvincibleTime: function updateInvincibleTime() {
        if (this.itemTypes.invincible) this.timeScaleAction(); else {
          this.unschedule(this.updateInvincibleTime);
          this.invincibleLabel.node.active = false;
          this.invincibleLabel.node.stopAllActions();
          this.invincibleLabel.node.setScale(1, 1);
        }
      },
      fireBullets: function fireBullets() {
        this.sendBullet();
      },
      prepareBullet: function prepareBullet() {},
      canSend: function canSend() {
        if (this.gamecontroller.gameState == GameState.over || this.gamecontroller.gameState == GameState.overWaiting) return false;
        return true;
      },
      sendBullet: function sendBullet(itemType) {
        if (!this.canSend()) return;
        console.log("biu biu biu ....", itemType);
        if (this.itemTypes.one || this.itemTypes.two) {
          var spName = this.headTank.config.bulletsp;
          var bulletspeed = this.headTank.config.bulletspeed;
          var headPt = this.head.getPosition();
          var pts = [];
          if (this.itemTypes.one) {
            var ptscale = this.headTank.config.onepos[0];
            var pt = cc.p(headPt.x + TankWidth * (.1 * ptscale - .5), headPt.y + HalfTankHeight + HalfBulletHeight);
            pts.push(pt);
          } else if (this.itemTypes.two) for (var i = 0; i < this.headTank.config.twopos.length; ++i) {
            var _pt = cc.p(headPt.x + TankWidth * (.1 * this.headTank.config.twopos[i] - .5), headPt.y + HalfTankWidth + HalfBulletHeight);
            pts.push(_pt);
          }
          for (var _i = 0; _i < pts.length; ++_i) this.bulletController.addBullets(spName, pts[_i], this.getTankSpeed() + bulletspeed, bulletspeed);
        }
      },
      tankFireBullets: function tankFireBullets() {
        if (this.itemTypes.double) return;
        this.fireBullets();
      },
      tankFireDoubleBullets: function tankFireDoubleBullets() {
        this.itemTypes.double && this.fireBullets();
      },
      moveLimited: function moveLimited(range, x) {
        if (x < range[0]) return range[0];
        if (x > range[1]) return range[1];
        return x;
      },
      tankDist: function tankDist(dist) {
        this.dist += dist;
        console.log("tankDist:", dist, this.dist);
        if (this.first) {
          if (this.dist > FirstDist + 140) {
            this.dist -= FirstDist;
            this.gamecontroller.blockController.updateBlocksNode();
            this.first = false;
          }
        } else if (this.dist > 140) {
          this.dist -= 140;
          this.gamecontroller.blockController.updateBlocksNode();
        }
      },
      update: function update(dtt) {
        if (this.itemTypes.invincible) {
          this.itemTypes.time -= dtt;
          if (this.itemTypes.time <= 0) {
            this.itemTypes.invincible = false;
            this.itemTypes.time = 0;
            this.headTank.openInvincible(false);
          }
        }
        var addDist = 0;
        if (this.gamecontroller.gameState == GameState.playing || this.gamecontroller.gameState == GameState.collision) {
          this.deltTime += dtt;
          this.deltIndex++;
          var dist = this.getTankSpeed();
          var headpt = this.head.getPosition();
          addDist = dist;
          if (this.gamecontroller.gameState == GameState.playing) {
            headpt.y += dist;
            this.collisionIndex = 0;
            var collisionNodeInfo = this.gamecontroller.checkGameState(headpt);
            collisionNodeInfo.mayState == GameState.collision && (headpt.x += collisionNodeInfo.dist);
            this.gamecontroller.updateState(collisionNodeInfo.state);
            if (this.gamecontroller.gameState == GameState.collision) {
              var collision = collisionNodeInfo.collision;
              var onecollision = collision[0];
              var calY = 140 * onecollision["lineIndex"];
              addDist = calY - this.head.getPositionY() - .5 * TankHeight;
              headpt.y = calY - .5 * TankHeight;
            }
            this.headTank.isCollision() && this.headTank.openCollision(false);
          } else {
            var _collisionNodeInfo = this.gamecontroller.checkGameState(headpt);
            _collisionNodeInfo.mayState == GameState.collision && (headpt.x += _collisionNodeInfo.dist);
            this.gamecontroller.updateState(_collisionNodeInfo.state);
            addDist = 0;
            if (this.itemTypes.invincible) {
              headpt.y += dist;
              addDist = dist;
              this.collisionIndex = 0;
              this.gamecontroller.updateCollisionBlockI();
            } else if (this.gamecontroller.gameState == GameState.collision) {
              this.headTank.isCollision() || this.headTank.openCollision(true, this.itemTypes.invincible);
              this.collisionTank() && this.gamecontroller.updateCollisionBlock();
              this.collisionIndex++;
            }
          }
          this.headTank.points.unshift(headpt);
          this.gamecontroller.updateCamera(this.head.getPosition());
          this.tankDist(addDist);
          this.updateTanks();
          this.gamecontroller.updateUI();
        }
      },
      updateTanks: function updateTanks() {
        var len = this.tanks.length;
        var nextPt = null;
        var tank = null;
        for (var i = 0; i < len; ++i) {
          tank = this.tanks[i].getComponent("Tank");
          nextPt = tank.moveNext();
          i + 1 < len && this.tanks[i + 1].getComponent("Tank").addNextPt(nextPt);
        }
      },
      caculateDelX: function caculateDelX(fromPt, endPt, deltY) {
        return 1 * (fromPt.x - endPt.x) / (fromPt.y - endPt.y) * deltY;
      },
      touchStartCallBack: function touchStartCallBack(location) {
        if (!this.canTouch) return;
        console.log("touchEndCallBack");
        this.previousPt = location;
        this.isTouching = true;
      },
      touchCancelCallBack: function touchCancelCallBack(location) {
        this.isTouching = false;
      },
      touchEndCallBack: function touchEndCallBack(location) {
        this.touchPosition(location);
        this.isTouching = false;
      },
      touchPosition: function touchPosition(location) {
        if (!this.canTouch) return;
        var delX = location.x - this.previousPt.x;
        var speed = delX;
        delX > 0 ? speed = MaxSpeed > delX ? delX : MaxSpeed : delX < 0 && (speed = MaxSpeed > Math.abs(delX) ? delX : -1 * MaxSpeed);
        var nowspeed = this.head.getPositionX();
        nowspeed += speed;
        var range = this.gamecontroller.getDistRangeByPt2(this.head.getPosition());
        range[0] -= 350;
        range[1] -= 350;
        nowspeed = this.moveLimited(range, nowspeed);
        this.head.setPositionX(nowspeed);
      },
      touchMoveCallBack: function touchMoveCallBack(location) {
        this.touchPosition(location);
        this.previousPt = location;
      },
      updateNumber: function updateNumber() {
        this.headTank.label.string = this.tankCount.toString();
      },
      collisionTank: function collisionTank() {
        if (this.tanks.length <= 1) {
          this.gamecontroller.updateState(GameState.overWaiting);
          this.tankCount = 0;
          this.updateNumber();
          return true;
        }
        var tank = this.tanks[1].getComponent("Tank");
        var lastpt = tank.points[tank.points.length - 1];
        var headptY = this.head.getPositionY();
        if (Math.abs(lastpt.y - headptY) < 1e-6) {
          var remove = this.tanks.splice(1, 1);
          var removeNode = remove[0];
          var pt = removeNode.getPosition();
          ParticleSystemCenter.addParticleForNode(this.headTank.particleFile, this.gamecontroller.particleNode, cc.p(pt.x, pt.y - 20));
          TankFactory.put(remove[0]);
          this.tankCount = this.tanks.length;
          this.updateNumber();
          return true;
        }
        return false;
      },
      tankCanMove: function tankCanMove() {
        var ret = false;
        this.gamecontroller.gameState == GameState.playing ? ret = true : this.gamecontroller.gameState == GameState.collision && this.itemTypes.invincible && (ret = true);
        return ret;
      }
    });
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    GameConfig: "GameConfig",
    GameState: "GameState",
    Global: "Global",
    ItemType: "ItemType",
    LineController: "LineController",
    ParticleSystemCenter: "ParticleSystemCenter",
    TankConfig: "TankConfig",
    TankFactory: "TankFactory",
    gamecontroller: "gamecontroller"
  } ],
  TankFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "014aaxtYO9EBIBpUnKVZxJN", "TankFactory");
    "use strict";
    var Config = require("TankConfig");
    var Tank = require("Tank");
    var BingLog = require("BingLog");
    var GameType = require("GameType");
    var FC = cc.Class({
      ctor: function ctor() {
        this.pool = new cc.NodePool();
      },
      initTank: function initTank(id) {
        var head = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var config = Factory.getConfig(id);
        if (!config) {
          config = Factory.getConfig("1");
          BingLog.warn("this id can't be found ", id);
        }
        var prefabName = "prefab/tankhead";
        var tankPrefab = cc.loader.getRes(prefabName);
        var tank = cc.instantiate(tankPrefab);
        var tankScript = tank.getComponent("Tank");
        tankScript.initTank(config);
        tank.getComponent("Tank").type = GameType.Tank;
        return tank;
      },
      initTankBody: function initTankBody(id) {
        var head = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var config = Factory.getConfig(id);
        if (!config) {
          config = Factory.getConfig("1");
          BingLog.warn("this id can't be found ", id);
        }
        var tank = this.pool.get();
        if (!tank) {
          var prefab = cc.loader.getRes("prefab/tank");
          tank = cc.instantiate(prefab);
        }
        var tankScript = tank.getComponent("Tank");
        tankScript.initTank(config);
        tank.getComponent("Tank").type = GameType.Tank;
        return tank;
      },
      createTankHead: function createTankHead(id) {
        var tank = Factory.initTank(id, true);
        if (tank) {
          var tankScript = tank.getComponent("Tank");
          tankScript.updateHead();
          tank.name = "head";
          tankScript.index = 0;
        }
        return tank;
      },
      createTankBody: function createTankBody(id) {
        var tank = Factory.initTankBody(id);
        if (tank) {
          var tankScript = tank.getComponent("Tank");
          tankScript.updateBody();
          tankScript.index = 1;
        }
        return tank;
      },
      put: function put(node) {
        var putnode = node.getComponent("GameComponent");
        if (putnode.type != GameType.Tank) debugger;
        this.pool.put(node);
      },
      getConfig: function getConfig(id) {
        var config = Config[id];
        return config || null;
      }
    });
    var Factory = new FC();
    module.exports = Factory;
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    GameType: "GameType",
    Tank: "Tank",
    TankConfig: "TankConfig"
  } ],
  TankLink: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "590a6xX3GpGqb9v0yhg0OgQ", "TankLink");
    "use strict";
    var Config = require("TankConfig");
    var BingLog = require("BingLog");
    var TankFactory = require("TankFactory");
    var Factory = cc.Class({});
    module.exports = Factory;
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    TankConfig: "TankConfig",
    TankFactory: "TankFactory"
  } ],
  TankView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5615rhlrNCbba6DekiHvKF", "TankView");
    "use strict";
    var TouchView = require("TouchView");
    cc.Class({
      extends: TouchView,
      properties: {
        controller: require("TankController")
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
    TankController: "TankController",
    TouchView: "TouchView"
  } ],
  Tank: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cda5feLYV9O4rqaNhVvMJGO", "Tank");
    "use strict";
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    var BingLog = require("BingLog");
    var GameComponent = require("GameComponent");
    var GameType = require("GameType");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var Tank = cc.Class({
      extends: GameComponent,
      statics: {
        Index: 0
      },
      properties: {
        type: {
          default: GameType.Tank,
          override: true,
          visible: false
        },
        sp: cc.Sprite,
        wudisp: cc.Sprite,
        label: cc.Label,
        typeid: 1,
        config: {
          type: Object,
          default: null,
          visible: false
        },
        index: 0,
        points: [],
        twopos: [],
        onepos: [],
        particleFile: ""
      },
      initTank: function initTank(config) {
        var _twopos, _onepos;
        this.config = config;
        this.points.length = 0;
        this.type = GameType.Tank;
        (_twopos = this.twopos).push.apply(_twopos, _toConsumableArray(config.twopos));
        (_onepos = this.onepos).push.apply(_onepos, _toConsumableArray(config.onepos));
        this.particleFile = this.config.texiao;
        BingLog.log("tanke initTank:", this.config);
      },
      onLoad: function onLoad() {
        BingLog.log("tanke onLoad");
      },
      updateHead: function updateHead() {
        if (!this.config) {
          BingLog.warn("the tank update head need init its config before.");
          return;
        }
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/tanks", this.config.head);
        this.wudisp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/tanks", this.config.wudi);
      },
      updateBody: function updateBody() {
        if (!this.config) {
          BingLog.warn("the tank update boby need init its config before.");
          return;
        }
        this.node.name = "body" + Tank.Index.toString();
        Tank.Index++;
        var len = this.config.body.length;
        var GU = require("GameUtils");
        var index = GU.random(len - 1);
        this.sp.spriteFrame = SpriteFrameCenter.getFrameFromAtlas("png/tanks", this.config.body[index]);
      },
      moveNext: function moveNext() {
        var pt = null;
        if (this.points.length > 0) {
          pt = this.points.pop();
          this.node.setPosition(this.points[this.points.length - 1]);
        } else {
          this.points.push(this.node.getPosition());
          pt = this.node.getPosition();
        }
        return pt;
      },
      addNextPt: function addNextPt(pt) {
        this.points.unshift(pt);
      },
      updatePoints: function updatePoints(count) {
        var _points;
        var max = this.points[0];
        var min = this.points[this.points.length - 1];
        var distx = (max.x - min.x) / count;
        var disty = (max.y - min.y) / count;
        var tmp = [];
        for (var i = 0; i < count; ++i) tmp.push(cc.p(min.x + distx * i, min.y + disty * i));
        this.points.length = 0;
        this.points = [];
        (_points = this.points).push.apply(_points, tmp);
      },
      moveAction: function moveAction(dt, pt, topPt) {
        var mv = cc.moveTo(dt, pt);
        this.node.runAction(mv);
      },
      openInvincible: function openInvincible() {
        var open = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (open) {
          this.schedule(this.runInvincible, .5);
          this.wudisp.node.active = true;
        } else {
          this.unschedule(this.runInvincible, .5);
          this.wudisp.node.active = false;
        }
      },
      runInvincible: function runInvincible() {
        this.wudisp.node.active = !this.wudisp.node.active;
      },
      isCollision: function isCollision() {
        return this.collision;
      },
      openCollision: function openCollision() {
        var open = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var invincible = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.collision = open;
        if (open) {
          var time = .133;
          invincible && (time /= 1.5);
          this.schedule(this.runCollision, time);
          this.sp.node.active = false;
        } else {
          this.unschedule(this.runCollision);
          this.sp.node.active = true;
        }
      },
      runCollision: function runCollision() {
        this.sp.node.active = !this.sp.node.active;
      }
    });
    module.exports = Tank;
    cc._RF.pop();
  }, {
    BingLog: "BingLog",
    GameComponent: "GameComponent",
    GameType: "GameType",
    GameUtils: "GameUtils",
    SpriteFrameCenter: "SpriteFrameCenter"
  } ],
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
  gamecontroller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b1b55LQDS5DjI+Xt+fcB5Qx", "gamecontroller");
    "use strict";
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    var GU = require("GameUtils");
    var GameState = require("GameState");
    var GameType = require("GameType");
    var ItemType = require("ItemType");
    var Global = require("Global");
    var GameConfig = require("GameConfig");
    var TankHeight = GameConfig.TankHeight;
    var TankWidth = GameConfig.TankWidth;
    var HalfTankWidth = .5 * TankWidth;
    var HalfTankHeight = .5 * TankHeight;
    var ItemWidth = GameConfig.ItemWidth;
    var BarTankDist = .5 * (TankWidth + 8);
    var ItemTankDist = Math.pow(.5 * (GameConfig.TankWidth + GameConfig.ItemWidth), 2);
    cc.Class({
      extends: cc.Component,
      properties: {
        hard: "new",
        gameNodes: cc.Node,
        bulletsNodes: cc.Node,
        tanksNode: cc.Node,
        tankNode: {
          type: cc.Node,
          default: null,
          visible: false
        },
        stLabel: cc.Label,
        scoreLabel: cc.Label,
        camera: cc.Camera,
        gameState: GameState.init,
        collisionNodeInfo: {
          type: cc.Object,
          default: null,
          visible: false
        },
        gameoverNode: cc.Node,
        particleNode: cc.Node,
        recordSpine: sp.Skeleton
      },
      onLoad: function onLoad() {
        var _this = this;
        this.tankController = this.node.getComponent("TankController");
        this.blockController = this.node.getComponent("BlockMoveController");
        this.bulletController = this.node.getComponent("BulletController");
        this.gameoverNode.active = false;
        this.updateScore();
        this.recordSpine.node.active = false;
        this.recordSpine.setEndListener(function(trackEntry) {
          var animationName = trackEntry.animation ? trackEntry.animation.name : "";
          cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
          _this.recordSpine.node.active = false;
        });
      },
      playNewRecord: function playNewRecord() {
        this.recordSpine.node.active = true;
        this.recordSpine.setAnimation(0, "newAnimation", false);
      },
      getTankSpeed: function getTankSpeed() {
        return this.tankController.getTankSpeed();
      },
      getLineIndexByPtY: function getLineIndexByPtY(y) {
        var ret = Math.floor(y / 140);
        return ret;
      },
      getCollumnIndexByPtX: function getCollumnIndexByPtX(ptx) {
        var x = ptx;
        ptx < 20 ? x = 20 : ptx > 680 && (x = 680);
        var ret = Math.floor(x / 140);
        return ret;
      },
      getMoveBlockState: function getMoveBlockState(pt) {
        var lineIndex = this.getLineIndexByPtY(pt.y);
        var collumn = this.getCollumnIndexByPtX(pt.x + 350);
        var ret = {
          type: GameType.Empty,
          collumn: collumn,
          lineIndex: lineIndex
        };
        console.log("getMoveBlockState:", pt.y, lineIndex, collumn, this.blockController.lineNodeInfo.length);
        if (lineIndex < 0) {
          ret.lineIndex = 0;
          return ret;
        }
        var lineInfo = this.blockController.lineNodeInfo[lineIndex];
        var childs = lineInfo["child"];
        if (childs.length > 0) {
          var childNodes = childs[collumn];
          if (childNodes) {
            var type = GameType.Empty;
            for (var i = 0; i < childNodes.length; ++i) if (childNodes[i]) {
              var com = childNodes[i].getComponent("GameComponent");
              type < com.type && (type = com.type);
            }
            ret.type = type;
          }
        }
        return ret;
      },
      getMoveBlockStateByRC: function getMoveBlockStateByRC(lineIndex, collumn) {
        var ret = {
          type: GameType.Empty,
          collumn: collumn,
          lineIndex: lineIndex
        };
        if (lineIndex < 0) return ret;
        var lineInfo = this.blockController.lineNodeInfo[lineIndex];
        var childs = lineInfo["child"];
        if (childs.length > 0) {
          var childNodes = childs[collumn];
          if (childNodes) {
            var type = GameType.Empty;
            for (var i = 0; i < childNodes.length; ++i) if (childNodes[i]) {
              var com = childNodes[i].getComponent("GameComponent");
              type < com.type && (type = com.type);
            }
            ret.type = type;
          }
        }
        return ret;
      },
      getDistRange: function getDistRange(info) {
        var right = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        var ret = [];
        var collumn = info.collumn;
        var infotype = info.type;
        ret = infotype == GameType.Empty || infotype == GameType.Item ? [ 140 * collumn, 140 * (collumn + 1) ] : infotype == GameType.Block ? right ? [ 140 * collumn, 140 * collumn ] : [ 140 * (collumn + 1), 140 * (collumn + 1) ] : infotype == GameType.Bar ? right ? [ 140 * collumn, 140 * (collumn + 1) - 10 ] : [ 140 * (collumn + 1), 140 * (collumn + 1) ] : [ 140 * collumn, 140 * (collumn + 1) ];
        return ret;
      },
      autoChangeTankInBar: function autoChangeTankInBar(pt) {
        var lineIndex = this.getLineIndexByPtY(pt.y);
        if (lineIndex < 0) return [ false, null ];
        var collumn = this.getCollumnIndexByPtX(pt.x + 350);
        var currentInfo = this.getMoveBlockState(pt);
        if (currentInfo.type == GameType.Bar) {
          var tmp = pt.x + 350;
          var x = 140 * (collumn + 1);
          var dist = Math.abs(x - tmp);
          return dist < 24 ? [ true, cc.p(x - 350 - 24, pt.y) ] : dist > 116 ? this.checkLeftBarForTank(pt, lineIndex, collumn - 1) : [ false, null ];
        }
        return this.checkLeftBarForTank(pt, lineIndex, collumn - 1);
      },
      checkLeftBarForTank: function checkLeftBarForTank(pt, lineIndex, collumn) {
        if (collumn < 0) return [ false, null ];
        var currentInfo = this.getMoveBlockStateByRC(lineIndex, collumn);
        if (currentInfo.type == GameType.Bar) {
          var tmp = pt.x + 350;
          var x = 140 * (collumn + 1);
          var dist = Math.abs(x - tmp);
          return dist < 24 ? [ true, cc.p(x - 350 - 24, pt.y) ] : [ false, null ];
        }
        return [ false, null ];
      },
      getRangeAtRC: function getRangeAtRC(lineIndex, collumn) {
        var range = [];
        var currentInfo = this.getMoveBlockStateByRC(lineIndex, collumn);
        var currentRange = this.getDistRange(currentInfo, currentInfo.type == GameType.Bar);
        if (currentInfo.type == GameType.Block) return currentRange;
        if (0 == collumn) {
          var rightInfo = this.getMoveBlockStateByRC(lineIndex, collumn + 1);
          var rightRange = this.getDistRange(rightInfo, true);
          range[0] = currentRange[0];
          rightInfo.type == GameType.Block ? range[1] = currentRange[1] : (rightInfo.type == GameType.Bar, 
          currentInfo.type == GameType.Bar ? range[1] = currentRange[1] : range[1] = rightRange[1]);
        } else if (4 == collumn) {
          var leftInfo = this.getMoveBlockStateByRC(lineIndex, collumn - 1);
          var leftRange = this.getDistRange(leftInfo, false);
          leftInfo.type == GameType.Bar || leftInfo.type == GameType.Block ? range[0] = currentRange[0] : range[0] = leftRange[0];
          range[1] = currentRange[1];
        } else {
          var _leftInfo = this.getMoveBlockStateByRC(lineIndex, collumn - 1);
          var _rightInfo = this.getMoveBlockStateByRC(lineIndex, collumn + 1);
          var _leftRange = this.getDistRange(_leftInfo, false);
          var _rightRange = this.getDistRange(_rightInfo, true);
          _leftInfo.type == GameType.Bar || _leftInfo.type == GameType.Block ? range[0] = currentRange[0] : range[0] = _leftRange[0];
          _rightInfo.type == GameType.Block ? range[1] = currentRange[1] : (_rightInfo.type == GameType.Bar, 
          currentInfo.type == GameType.Bar ? range[1] = currentRange[1] : range[1] = _rightRange[1]);
        }
        return range;
      },
      getDistRangeByPt2: function getDistRangeByPt2(pt) {
        var topIndex = this.getLineIndexByPtY(pt.y + 20);
        var bottomIndex = this.getLineIndexByPtY(pt.y - 20);
        var collumn = this.getCollumnIndexByPtX(pt.x + 350);
        var range = [];
        if (topIndex == bottomIndex) {
          var tmpRange = this.getRangeAtRC(topIndex, collumn);
          range.push.apply(range, _toConsumableArray(tmpRange));
        } else {
          var topRange = this.getRangeAtRC(topIndex, collumn);
          var bottomRange = this.getRangeAtRC(bottomIndex, collumn);
          if (topRange[0] == topRange[1]) range.push.apply(range, _toConsumableArray(bottomRange)); else {
            var leftMax = topRange[0] > bottomRange[0] ? topRange[0] : bottomRange[0];
            var rightMax = topRange[1] > bottomRange[1] ? bottomRange[1] : topRange[1];
            range.push(leftMax);
            range.push(rightMax);
          }
        }
        return [ range[0] + HalfTankWidth, range[1] - HalfTankWidth ];
      },
      getDistRangeByPt: function getDistRangeByPt(pt) {
        var collumn = this.getCollumnIndexByPtX(pt.x + 350);
        var tankPreWidth = 20;
        var width = 100;
        var topLeft = this.getMoveBlockState(cc.p(pt.x - width, pt.y + tankPreWidth));
        var topRight = this.getMoveBlockState(cc.p(pt.x + width, pt.y + tankPreWidth));
        var bottomLeft = this.getMoveBlockState(cc.p(pt.x - width, pt.y - tankPreWidth));
        var bottomRight = this.getMoveBlockState(cc.p(pt.x + width, pt.y - tankPreWidth));
        var topLeftRange = this.getDistRange(topLeft, false);
        var topRightRange = this.getDistRange(topRight, topRight.collumn > collumn);
        var bottomLeftRange = this.getDistRange(bottomLeft, false);
        var bottomRightRange = this.getDistRange(bottomRight, bottomRight.collumn > collumn);
        var leftMax = topLeftRange[0] > bottomLeftRange[0] ? topLeftRange[0] : bottomLeftRange[0];
        var rightmin = topRightRange[1] > bottomRightRange[1] ? bottomRightRange[1] : topRightRange[1];
        var currentRange = [ 140 * collumn, 140 * (collumn + 1) ];
        var currentInfo = this.getMoveBlockState(pt);
        currentInfo.type == GameType.Bar && (currentRange = [ 140 * collumn, 140 * (collumn + 1) - 10 ]);
        var ret = [ leftMax, rightmin ];
        if (currentInfo.type == GameType.Bar) {
          ret[0] > currentRange[0] && (ret[0] = currentRange[0]);
          ret[1] = currentRange[1];
        } else {
          ret[0] > currentRange[0] && (ret[0] = currentRange[0]);
          ret[1] < currentRange[1] && (ret[1] = currentRange[1]);
        }
        return [ ret[0] + HalfTankWidth, ret[1] - HalfTankWidth ];
      },
      checkChildNode: function checkChildNode(childs, collumn, pt) {
        var ret = {
          state: GameState.playing,
          mayState: GameState.playing,
          dist: 0
        };
        var childNodes = childs[collumn];
        if (childNodes) for (var i = 0; i < childNodes.length; ++i) if (childNodes[i]) {
          var com = childNodes[i].getComponent("GameComponent");
          if (com.type == GameType.Block) {
            ret.state = GameState.collision;
            ret.mayState = GameState.collision;
            break;
          }
          if (com.type == GameType.Bar) {
            var childptX = 140 * (collumn + 1);
            var ptX = pt.x + 350;
            var dist = Math.abs(childptX - ptX);
            if (dist <= BarTankDist) {
              ret.mayState = GameState.collision;
              ret.dist = ptX > childptX ? BarTankDist - dist : dist - BarTankDist;
            }
          }
        }
        return ret;
      },
      checkGameState: function checkGameState(pt) {
        var ret = {
          state: GameState.init,
          mayState: GameState.playing,
          dist: 0,
          collision: []
        };
        if (this.tankController.head) {
          var lineIndex = this.getLineIndexByPtY(pt.y + HalfTankHeight);
          var collumnLeft = this.getCollumnIndexByPtX(pt.x + 350 - 20);
          var collumnRight = this.getCollumnIndexByPtX(pt.x + 350 + 20);
          var lineInfo = this.blockController.lineNodeInfo[lineIndex];
          var childs = lineInfo["child"];
          if (childs.length > 0) if (collumnLeft == collumnRight) {
            var childInfo = this.checkChildNode(childs, collumnLeft, pt);
            ret.state = childInfo.state;
            ret.mayState = childInfo.mayState;
            ret.dist = childInfo.dist;
            ret.state == GameState.collision && ret.collision.push({
              lineIndex: lineIndex,
              collumn: collumnLeft
            });
          } else {
            var ret1 = this.checkChildNode(childs, collumnLeft, pt);
            var ret2 = this.checkChildNode(childs, collumnRight, pt);
            ret.state = ret1.state > ret2.state ? ret1.state : ret2.state;
            if (ret1.mayState > ret2.mayState) {
              ret.mayState = ret1.mayState;
              ret.dist = ret1.dist;
            } else {
              ret.mayState = ret2.mayState;
              ret.dist = ret2.dist;
            }
            ret1.state == GameState.collision && ret.collision.push({
              lineIndex: lineIndex,
              collumn: collumnLeft
            });
            ret2.state == GameState.collision && ret.collision.push({
              lineIndex: lineIndex,
              collumn: collumnRight
            });
          }
        }
        this.collisionNodeInfo = ret;
        return ret;
      },
      updateCamera: function updateCamera(pt) {
        this.camera.node.active && this.camera.node.setPositionY(pt.y);
      },
      updateCollisionBlock: function updateCollisionBlock() {
        if (this.collisionNodeInfo.state == GameState.collision) {
          var len = this.collisionNodeInfo.collision.length;
          for (var i = 0; i < len; ++i) {
            var collision = this.collisionNodeInfo.collision[i];
            this.blockController.collisionBlock({
              collumn: collision["collumn"],
              lineIndex: collision["lineIndex"]
            }, 1, false);
          }
        }
      },
      updateCollisionBlockI: function updateCollisionBlockI() {
        if (this.collisionNodeInfo.state == GameState.collision) {
          var len = this.collisionNodeInfo.collision.length;
          for (var i = 0; i < len; ++i) {
            var collision = this.collisionNodeInfo.collision[i];
            this.blockController.collisionBlock({
              collumn: collision["collumn"],
              lineIndex: collision["lineIndex"]
            }, 1, true);
          }
        }
      },
      updateScore: function updateScore() {
        if (!Global.showRecord && Global.score > Global.highScore) {
          this.playNewRecord();
          Global.showRecord = true;
        }
        this.scoreLabel.string = Global.score.toString();
      },
      checkItems: function checkItems() {
        var pt = this.tankController.head.getPosition();
        var lineIndex = this.getLineIndexByPtY(pt.y);
        if (lineIndex < 0) return;
        var collumn = this.getCollumnIndexByPtX(pt.x + 350);
        var lineInfo = this.blockController.lineNodeInfo[lineIndex];
        var childs = lineInfo["child"];
        if (childs.length > 0) {
          var childNodes = childs[collumn];
          if (!childNodes) return;
          var childNode = childNodes[2];
          if (childNode) {
            var com = childNode.getComponent("GameComponent");
            var type = com.type;
            if (type == GameType.Item) {
              var childNodePt = childNode.getPosition();
              var y = 140 * lineIndex + 70;
              var dSQ = cc.pDistanceSQ(cc.p(childNodePt.x, y), pt);
              console.log("dist:", childNodePt.x, y, pt, dSQ);
              dSQ < ItemTankDist && this.fireItems(com, com.subType, lineIndex, collumn);
            }
          }
        }
      },
      lateUpdate: function lateUpdate(dt) {
        this.gameState != GameState.playing && this.gameState != GameState.collision || this.checkItems();
      },
      updateState: function updateState(st) {
        this.gameState = st;
        this.gameState != GameState.over && this.gameState != GameState.overWaiting || (this.gameoverNode.active = true);
      },
      updateUI: function updateUI() {
        this.stLabel.string = this.tankController.itemTypes.time.toFixed(3).toString();
        if (this.tankController.itemTypes.invincible) this.stLabel.string = this.tankController.itemTypes.time.toFixed(3).toString(); else {
          this.tankController.itemTypes.one && (this.stLabel.string = "one");
          this.tankController.itemTypes.two && (this.stLabel.string = "two");
          this.tankController.itemTypes.double && (this.stLabel.string = this.stLabel.string + " double");
        }
      },
      fireItems: function fireItems(item, subType, lineIndex, collumn) {
        switch (subType) {
         case ItemType.TankBody:
          this.tankController.fireTankBody(item.count);
          break;

         case ItemType.One:
          this.tankController.fireOneBullet();
          break;

         case ItemType.Two:
          this.tankController.fireTwoBullet();
          break;

         case ItemType.Double:
          this.tankController.fireDobuleBullet();
          break;

         case ItemType.Invincible:
          this.tankController.fireInvincible(item.time);
        }
        this.blockController.deletItemNodeAt(item, lineIndex, collumn);
      },
      tankCanMove: function tankCanMove() {
        return this.tankController.tankCanMove();
      },
      tryBulletAtPt: function tryBulletAtPt(pt) {
        var blockInfo = this.getMoveBlockState(pt);
        if (blockInfo.type[0] == GameType.Bar) {
          if (Math.abs(140 * (blockInfo.collumn + 1) - 350 - pt.x) < .45 * (TankWidth + ItemWidth)) return true;
          return false;
        }
        if (blockInfo.type == GameType.Block) {
          this.blockController.collisionBlock(blockInfo, 1);
          return true;
        }
        return false;
      },
      gameOver: function gameOver() {
        this.tankController.head.active = false;
      },
      moreLife: function moreLife() {
        this.tankController.head.active = true;
      }
    });
    cc._RF.pop();
  }, {
    GameConfig: "GameConfig",
    GameState: "GameState",
    GameType: "GameType",
    GameUtils: "GameUtils",
    Global: "Global",
    ItemType: "ItemType"
  } ],
  gamefsm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c3e7jFPwZIq4siHSESc1OL", "gamefsm");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var StateMachine = require("../utils/state-machine");
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        console.log("onload ", "undefined" === typeof StateMachine ? "undefined" : _typeof(StateMachine));
        var fsm = StateMachine.create({
          initial: "green",
          events: [ {
            name: "warn",
            from: "green",
            to: "yellow"
          }, {
            name: "panic",
            from: "yellow",
            to: "red"
          }, {
            name: "calm",
            from: "red",
            to: "yellow"
          }, {
            name: "clear",
            from: "yellow",
            to: "green"
          } ],
          callbacks: {
            onpanic: function onpanic(event, from, to, msg) {
              console.log("panic! " + msg);
            },
            onclear: function onclear(event, from, to, msg) {
              console.log("thanks to " + msg);
            },
            ongreen: function ongreen(event, from, to) {
              console.log("green");
            },
            onyellow: function onyellow(event, from, to) {
              console.log("yellow");
            },
            onred: function onred(event, from, to) {
              console.log("red");
            },
            onwarn: function function_name(argument) {
              console.log("onwarn");
            },
            onbeforewarn: function onbeforewarn(argument) {
              console.log("onbeforewarn123");
            }
          }
        });
        fsm.onafterwarn = function(argument) {
          console.log("onafterwarn");
        }, fsm.onleavegreen = function(argument) {
          console.log("onleavegreen");
        }, fsm.onenteryellow = function(argument) {
          console.log("onenteryellow");
        }, fsm.onbeforepanic = function() {
          console.log("onbeforepanic");
        };
        fsm.onleaveyellow = function() {
          console.log("onleaveyellow");
        };
        fsm.onenteryellow = function() {
          console.log("onenteryellow");
        };
        fsm.onafterpanic = function(event) {
          console.log("onafterpanic", event);
        };
        fsm.warn();
      }
    });
    cc._RF.pop();
  }, {
    "../utils/state-machine": "state-machine"
  } ],
  gamemenu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb67aDIYPJOOKodka4hVfp5", "gamemenu");
    "use strict";
    var TouchView = require("TouchView");
    var Global = require("Global");
    var BlockFactory = require("BlockFactory");
    var SpriteFrameCenter = require("SpriteFrameCenter");
    var ParticleSystemCenter = require("ParticleSystemCenter");
    var GameUtils = require("GameUtils");
    var GameConfig = require("GameConfig");
    cc.Class({
      extends: TouchView,
      properties: {
        historyLabel: cc.Label,
        startNode: cc.Node
      },
      onLoad: function onLoad() {
        this.schedule(this.startAnimate, .5);
        SpriteFrameCenter.preLoadAtlas("png/game");
        SpriteFrameCenter.preLoadAtlas("png/tanks");
        Global.loadCount++;
        if (2 == Global.loadCount) {
          var FBP = require("FBPlugin");
          GameConfig.isFBInstantGame() && FBP.chooseAsync();
        }
        this.touchEndCallBack = this.onStart.bind(this);
        this._super();
      },
      star: function star() {
        this.historyLabel.string = Global.highScore.toString();
      },
      startAnimate: function startAnimate() {
        this.startNode.active = !this.startNode.active;
      },
      onStart: function onStart() {
        cc.director.loadScene("game");
      },
      onShare: function onShare(event, intent) {
        var FBP = require("FBPlugin");
        FBP.shareFb("SHARE");
      },
      onShortCut: function onShortCut(event, intent) {
        var FBP = require("FBPlugin");
        FBP.createShortCut();
      },
      onQuit: function onQuit() {
        var FBP = require("FBPlugin");
        var Global = require("Global");
        var str = " get a score of " + Global.thisscore.toString() + " in Tank and Fire！";
        FBP.updateAsync(str);
      },
      onTest1: function onTest1(event, intent) {
        ParticleSystemCenter.addParticleForNode("jk_lz.plist", this.node, cc.p(0, 0));
      }
    });
    cc._RF.pop();
  }, {
    BlockFactory: "BlockFactory",
    FBPlugin: "FBPlugin",
    GameConfig: "GameConfig",
    GameUtils: "GameUtils",
    Global: "Global",
    ParticleSystemCenter: "ParticleSystemCenter",
    SpriteFrameCenter: "SpriteFrameCenter",
    TouchView: "TouchView"
  } ],
  gamepool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11cb6GhhYRN9ZYso5mdaGNS", "gamepool");
    "use strict";
    var pool = function() {
      var pc = cc.Class({
        extends: cc.Object,
        properties: {},
        ctor: function ctor() {},
        getObject: function getObject(T) {
          if (!T.cName) {
            cc.warn("you should add the static property cName for :", T);
            return;
          }
        },
        clearObject: function clearObject(T) {
          if (!T.cName) {
            cc.warn("you should add the static property cName for :", T);
            return;
          }
        }
      });
    }();
    module.exports = pool;
    cc._RF.pop();
  }, {} ],
  maincontroller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9fa7157DgdIGKnPV4/GsoTT", "maincontroller");
    "use strict";
    var BingLog = require("BingLog");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      clickStart: function clickStart() {
        BingLog.log("clickStart");
        cc.director.loadScene("game");
      }
    });
    cc._RF.pop();
  }, {
    BingLog: "BingLog"
  } ],
  smController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "de6c2ekm5tGSJBmkoA5G8E5", "smController");
    "use strict";
    module.exports = function() {
      var StateMachine = require("state-machine");
      var Plugin = cc.Class({
        properties: {
          fsm: null,
          gamecontroller: cc.Component,
          tankCtr: cc.Component
        },
        ctor: function ctor() {
          var self = this;
          var fsm = StateMachine.create({
            initial: "idle",
            events: [ {
              name: "start",
              from: "idle",
              to: "playing"
            }, {
              name: "gameover",
              from: "playing",
              to: "over"
            }, {
              name: "restart",
              from: "over",
              to: "idle"
            }, {
              name: "addbuff",
              from: "playing",
              to: "buff"
            }, {
              name: "removebuff",
              from: "buff",
              to: "playing"
            } ],
            callbacks: {
              onstart: function onstart(event, from, to, msg) {
                console.log("start! " + msg);
              },
              ongameover: function ongameover(event, from, to, msg) {
                console.log("gameover " + msg);
              },
              onrestart: function onrestart(event, from, to) {
                console.log("restart");
              },
              onaddbuff: function onaddbuff(event, from, to) {
                console.log("addbuff");
              },
              onremovebuff: function onremovebuff(event, from, to) {
                console.log("removebuff");
              }
            }
          });
        }
      });
      var instance = new Plugin();
      return instance;
    }();
    cc._RF.pop();
  }, {
    "state-machine": "state-machine"
  } ],
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
  testCapture: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "54679n/GgRLjomr7EVWHAiq", "testCapture");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    cc.Class({
      extends: cc.Component,
      properties: {
        shareNode: cc.Node,
        sharesp: cc.Sprite,
        testsp: cc.Sprite
      },
      onLoad: function onLoad() {
        console.log("cc._renderType", cc._renderType);
        console.log("cc.RENDER_TYPE_WEBGL", cc.game.RENDER_TYPE_WEBGL);
        console.log("cc.game.RENDER_TYPE_CANVAS", cc.game.RENDER_TYPE_CANVAS);
      },
      onCapture: function onCapture() {
        this.test0();
      },
      test0: function test0() {
        this.render = new cc.RenderTexture(720, 1130);
        this.render.begin();
        this.shareNode._sgNode.visit();
        this.render.end();
        var sp = this.render.getSprite();
        console.log("sp type:", "undefined" === typeof sp ? "undefined" : _typeof(sp));
        console.log(sp);
        var nowFrame = this.render.getSprite().getSpriteFrame();
        sp.setPosition(0, 0);
        sp.setColor(cc.color(255, 0, 0, 255));
        this.sharesp.spriteFrame = nowFrame;
        this.canvas();
        cc.director.loadScene("gamemenu");
      },
      uint8arrayToStringMethod: function uint8arrayToStringMethod(myUint8Arr) {
        return String.fromCharCode.apply(null, myUint8Arr);
      },
      cap1: function cap1() {
        var u8 = this.render.getSprite().getTexture().getHtmlElementObj();
        var canvas = document.createElement("canvas");
        canvas.width = 720;
        canvas.height = 1130;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(u8, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        console.log(canvas.toDataURL());
      },
      cap2: function cap2() {
        var u8 = this.render.getSprite().getTexture().getHtmlElementObj();
        var canvas = document.createElement("canvas");
        canvas.width = 720;
        canvas.height = 1130;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(u8, 0, 0, u8.width, u8.height, 0, 0, canvas.width, canvas.height);
        console.log(canvas.toDataURL());
      },
      cb: function cb() {
        var canvas = document.getElementById("GameCanvas");
        var base64 = canvas.toDataURL("image/png");
        var image = new Image();
        image.src = base64;
        image.onload = function() {
          var newCvs = document.createElement("canvas");
          newCvs.width = canvas.width;
          newCvs.height = canvas.height;
          var widthRate = newCvs.width / cc.director.getVisibleSize().width;
          var heightRate = newCvs.height / cc.director.getVisibleSize().height;
          var targetWidth = _this.canvas.width * _this.canvas.scale * widthRate - 20;
          var targetHeight = _this.canvas.height * _this.canvas.scale * heightRate - 40;
          var newCtx = newCvs.getContext("2d");
          newCtx.drawImage(image, 0, 0);
          var left = Math.abs(marginX) * widthRate + 20;
          var top = Math.abs(cc.director.getVisibleSize().height - _this.canvas.height * _this.canvas.scale - Math.abs(marginY)) * heightRate + 20;
          var imgData = newCtx.getImageData(left, top, targetWidth, targetHeight);
          var cvs2 = document.createElement("canvas");
          cvs2.width = targetWidth;
          cvs2.height = targetHeight;
          var ctx2 = cvs2.getContext("2d");
          ctx2.putImageData(imgData, 0, 0);
          var result = cvs2.toDataURL();
        };
      },
      saveCancas: function saveCancas() {
        var self = this;
        var canvas1 = document.getElementById("GameCanvas");
        var href = canvas1.toDataURL("image/png");
        var canvas = cc.find("Canvas").getComponent(cc.Canvas);
        var vsbSize = cc.view.getVisibleSize();
        var designSize = canvas.designResolution;
        console.log("balance designSize" + designSize);
        console.log("balance visitblSize" + vsbSize);
        var scaleW = vsbSize.width / designSize.width;
        var scaleH = vsbSize.height / designSize.height;
        var fitScale = Math.max(scaleW, scaleH);
        var gameDiv = document.getElementById("Cocos2dGameContainer");
        var bigImg = document.createElement("img");
        bigImg.id = "QRCode";
        bigImg.src = href;
        bigImg.alt = "bigImg";
        bigImg.width = parseInt(gameDiv.style.width.replace(/px/, "")) * fitScale;
        bigImg.height = parseInt(gameDiv.style.height.replace(/px/, "")) * fitScale;
        bigImg.style.position = "absolute";
        bigImg.style.top = "0px";
        bigImg.style.left = parseInt(gameDiv.style.width.replace(/px/, "")) / 2 - bigImg.width / 2 + "px";
        gameDiv.appendChild(bigImg);
      },
      webGL0: function webGL0(spframe) {
        console.log(" webGL cc._renderType", cc._renderType);
        if (cc._renderType == cc.game.RENDER_TYPE_WEBGL) {
          var texture = spframe.getTexture();
          return;
        }
      },
      webGL: function webGL(spframe) {
        console.log(" webGL cc._renderType", cc._renderType);
        if (cc._renderType == cc.game.RENDER_TYPE_WEBGL) {
          var element = spframe.getTexture().getHtmlElementObj();
          console.log(spframe.getTexture()._gl.canvas.toDataURL());
          return;
        }
      },
      canvas: function canvas(spframe) {
        console.log(" webGL cc._renderType", cc._renderType);
        cc._renderType == cc.game.RENDER_TYPE_CANVAS && console.log(spframe.getTexture().getHtmlElementObj().toDataURL());
      },
      test1: function test1() {
        var canvas = document.getElementById("gameCanvas");
        var base64 = canvas.toDataURL("image/png");
        var href = base64.replace(/^data:image[^;]*/, "data:image/octet-stream");
        var aLink = document.createElement("a");
        aLink["download"] = filename;
        aLink.href = href;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);
        aLink.dispatchEvent(evt);
      },
      runSaveok: function runSaveok() {
        this.schedule(this.saveOK, .5);
      },
      saveOK: function saveOK() {
        console.log(this.render);
      }
    });
    cc._RF.pop();
  }, {} ],
  testFB: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb7d7LpRFdBj4W9JJM68e2T", "testFB");
    "use strict";
    var Global = require("Global");
    var GameState = require("GameState");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onShare: function onShare(event, intent) {
        var FBP = require("FBPlugin");
        FBP.shareFb("SHARE");
      },
      onChooseAsync: function onChooseAsync(event, intent) {
        var FBP = require("FBPlugin");
        FBP.chooseAsync();
      },
      onUpdateAsync: function onUpdateAsync(event, intent) {
        var FBP = require("FBPlugin");
        var str = " get a score of 99  in Tank and Fire！";
        FBP.updateAsync(str);
      },
      onHightShare: function onHightShare(event, intent) {
        var FBP = require("FBPlugin");
        var str = " get a score of 100  in Tank and Fire！";
        FBP.updateHighAsync(str);
      },
      oncreateShortCut: function oncreateShortCut(event, intent) {
        var FBP = require("FBPlugin");
        FBP.createShortCut();
      }
    });
    cc._RF.pop();
  }, {
    FBPlugin: "FBPlugin",
    GameState: "GameState",
    Global: "Global"
  } ],
  testOjb: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5bcd2zNAYJMp57CIqLRXKWJ", "testOjb");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        deleteNode: cc.Node
      },
      onLoad: function onLoad() {
        var arr = [];
        arr.length = 10;
        console.log(arr);
      },
      clickDel: function clickDel() {
        this.deleteNode && this.deleteNode.removeFromParent(true);
      }
    });
    cc._RF.pop();
  }, {} ],
  testbarbullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d5cdvONwVISoukdc33p05X", "testbarbullet");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onEnable: function onEnable() {
        var BarFactory = require("BarFactory");
        var bar = BarFactory.create();
        if (bar) {
          console.log("creat bar  OK!");
          this.node.addChild(bar);
          bar.position = cc.p(-200, -100);
        } else console.log("creat bar failed!");
        var BulletFactory = require("BulletFactory");
        var bullet = BulletFactory.create();
        if (bullet) {
          console.log("creat bullet  OK!");
          this.node.addChild(bullet);
          bullet.position = cc.p(-100, -150);
        } else console.log("creat bullet failed!");
      }
    });
    cc._RF.pop();
  }, {
    BarFactory: "BarFactory",
    BulletFactory: "BulletFactory"
  } ],
  testblock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a57e8BPNSlCQaSjNLD/CjNL", "testblock");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onEnable: function onEnable() {
        console.log("create Block");
        var Factory = require("BlockFactory");
        for (var i = 0; i < 5; i++) {
          var tank = Factory.create(i, (i % 4 + 1).toString());
          this.node.addChild(tank);
          tank.position = cc.p(140 * i - 350 + 70, 100);
        }
      }
    });
    cc._RF.pop();
  }, {
    BlockFactory: "BlockFactory"
  } ],
  testline: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c09ecOt4plKXa4QCu1DpP/u", "testline");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        blocksNodes: cc.Node
      },
      onEnable: function onEnable() {
        this.testYIndex = 0;
        var Factory = require("LineFactory");
        true;
        for (var line = 0; line < 10; line++) {
          var objs = Factory.create("new", "1", line);
          if (objs["b"].length > 0) for (var i = 0; i < objs["b"].length; i++) {
            var tank = objs["b"][i];
            if (tank) {
              this.blocksNodes.addChild(tank);
              tank.setPositionY(440 + 140 * line);
            }
          }
        }
        true;
        for (var _line = 10; _line < 15; _line++) {
          var _objs = Factory.create("new", "1", _line);
          if (_objs["bar"].length > 0) for (var _i = 0; _i < _objs["bar"].length; _i++) {
            var bar = _objs["bar"][_i];
            if (bar) {
              this.blocksNodes.addChild(bar);
              bar.setPositionY(440 + 140 * _line);
            }
          }
        }
      },
      update: function update(dt) {
        this.testYIndex++;
        this.testYIndex % 100 == 0;
        this.blocksNodes.getPositionY() < -2330 && this.blocksNodes.setPositionY(665);
      }
    });
    cc._RF.pop();
  }, {
    LineFactory: "LineFactory"
  } ],
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
  }, {} ],
  testtank: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd5ed8lwJ9HMYzLmioyIY9H", "testtank");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        t1: cc.Node,
        s1: cc.Node,
        t2: cc.Node,
        s2: cc.Node
      },
      onEnable: function onEnable() {},
      onClick: function onClick() {
        var pt = this.s1.getPosition();
        var worldpt = this.s1.convertToWorldSpace(pt);
        var s1pt = this.s1.convertToNodeSpace(worldpt);
        var t2pt = this.t2.convertToNodeSpace(worldpt);
        var t2test = this.t2.convertToWorldSpace(t2pt);
        this.s2.setPosition(t2pt.x, t2pt.y);
        var pt2 = this.s1.getPosition();
        var worldpt2 = this.s1.convertToWorldSpace(pt);
        var t2p2t = this.t2.convertToNodeSpace(worldpt);
        console.log("s t", pt, t2pt);
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "BlockMoveController", "BulletController", "InitialScript", "LineController", "MsgController", "ParticleSystemCenter", "SpriteFrameCenter", "TankController", "gamecontroller", "gamemenu", "gamepool", "maincontroller", "smController", "FBPlugin", "Bar", "BarFactory", "Block", "BlockConfig", "BlockFactory", "Bullet", "BulletFactory", "GameComponent", "GameConfig", "GameState", "GameType", "Global", "Item", "ItemConfig", "ItemFactory", "ItemType", "LineConfig", "LineFactory", "ObjectPool", "PositionConfig", "SpeedConfig", "Tank", "TankConfig", "TankFactory", "TankLink", "CameraControl", "HeroControl", "gamefsm", "testCapture", "testFB", "testOjb", "testbarbullet", "testblock", "testline", "testsc", "testtank", "BingLog", "GameUtils", "JSExtends", "LocalStorage", "state-machine", "GameOver", "MsgView", "TankView", "TouchView" ]);
//# sourceMappingURL=project.dev.js.map