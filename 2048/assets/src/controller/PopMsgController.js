/**
 * Created by bing on 05/06/2018.
 */



module.exports = {

    showBlockMsg:function (content,position) {
        let name = "prefab/popmsg";
        // if(!animation){
        //     name = "prefab/popmsg2";
        // }
        let prefab = cc.loader.getRes(name);
        let newNode = cc.instantiate(prefab);

        let pop = newNode.getComponent("PopMsg");
        newNode.position = position;
        pop.init(content);
        cc.find("Canvas/blockpanl/game").addChild(newNode);
    },
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
        cc.find("Canvas/").addChild(newNode);
    },
    showBlockGet:function(content){
        let name = "prefab/poppngmsg";
        let prefab = cc.loader.getRes(name);
        let newNode = cc.instantiate(prefab);

        let pop = newNode.getComponent("PopPngMsg");
        // newNode.position = cc.p(240,360);
        pop.init(content);
        cc.find("Canvas/blockpanl").addChild(newNode);
    }


};