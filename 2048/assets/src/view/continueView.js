/*
 * Created by Ren on 2018/7/12.
 */

cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function () {
        this.bottomisDone = false;
        this.newNode = null;
    },
    onEnable: function () {
        // if (!this.bottomisDone) {
        //     this.createBottom();
        //     this.bottomisDone = true;
        // }
    },
    createBottom: function () {
        let prefab = cc.loader.getRes("prefab/bottom");
        // this.newNode = cc.instantiate(prefab);
        // this.newNode.setTag(110);
        // cc.find("Canvas").addChild(this.newNode);

        let  newNode = cc.instantiate(prefab);
        newNode.setTag(110);
        cc.find("Canvas").addChild(newNode);
    },
    /*
    onDisable: function () {
        if (this.newNode) {
            // this.newNode.removeFromParent(true);
            this.bottomisDone = false;
        }
    }*/

});