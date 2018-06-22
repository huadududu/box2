/**
 * Created by bing on 05/06/2018.
 */



module.exports = {

    showMsg:function (content,animation =true) {
        let name = "prefab/popmsg";
        if(!animation){
            name = "prefab/popmsg2";
        }
        let prefab = cc.loader.getRes(name);
        let newNode = cc.instantiate(prefab);

        let pop = newNode.getComponent("PopMsg");
        pop.init(content,animation);
        cc.find("Canvas").addChild(newNode);
        newNode.setPosition(0,0);
    },


};