/**
 * Created by bing on 31/05/2018.
 */

let Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {

        itemPrefab:cc.Prefab,
        itemMorePrefab:cc.Prefab,
        itemExtra:require("DailyBonusItem"),
        Content:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

        this.node.position = cc.p(0,0);
        for(let i = 0; i < 7;++i){
            let node = this.addItem(i);
            node.setPosition(0,0);
            this.Content.addChild(node);
        }
        this.itemExtra.updateItem(7,true);
    },

    onClose:function () {
        this.node.removeFromParent(true);
    },

    addItem: function(index) {
        let node= cc.instantiate(this.itemPrefab);
        let Item = node.getComponent('DailyBonusItem');
        Item.updateItem(index,false);
        return node;
    },

    updateTotalDays:function () {
        this.itemExtra.updateTotalDays();
    }

});
