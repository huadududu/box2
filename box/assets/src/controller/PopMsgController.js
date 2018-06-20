/**
 * Created by bing on 05/06/2018.
 */



module.exports = {

    showMsg:function (content) {
        let prefab = cc.loader.getRes("prefab/popmsg");
        let newNode = cc.instantiate(prefab);

        let pop = newNode.getComponent("PopMsg");

        pop.init(content);
        cc.find("Canvas").addChild(newNode);
        newNode.setPosition(0,0);
    }
};