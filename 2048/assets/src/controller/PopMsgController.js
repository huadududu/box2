/**
 * Created by bing on 05/06/2018.
 */



module.exports = {

    showMsg:function (content,position) {
        let name = "prefab/popmsg";
        // if(!animation){
        //     name = "prefab/popmsg2";
        // }
        let prefab = cc.loader.getRes(name);
        let newNode = cc.instantiate(prefab);

        let pop = newNode.getComponent("PopMsg");
        newNode.position = position;
        pop.init(content);
        cc.find("Canvas/game").addChild(newNode);
    },


};