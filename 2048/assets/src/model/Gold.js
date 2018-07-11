/*
 * Created by Ren on 2018/7/10.
 */
cc.Class({
    extends: cc.Component,

    properties: {

        nodeID: {
            visible: false,
            default: 0
        },
        callback: {
            visible: false,
            default: null
        },
        createCount: {
            visible: false,
            default: 10
        }
    },


    onLoad: function () {
        // BingLog.log("tanke onLoad");
        // this.updateNode();
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.schedule(this.destroyNode, 1);
    },
    destroyNode: function () {
        this.createCount--;
        if (this.createCount == 3) {
            // let faceOut = cc.fadeOut(0.3);
            // let faceIn = cc.fadeIn(0.3);
            // let seq = cc.sequence(faceOut, faceIn);
            let seq = cc.blink(3,3);
            this.node.runAction(seq);
        }
        if (this.createCount <= 0) {
            if (this.callback) {
                this.callback('end', this.nodeID);
            }
            this.node.destroy();
            this.unschedule(this.destroyNode);
        }

    },
    setNodeInfo: function (nodeID, callback) {
        this.nodeID = nodeID
        this.callback = callback;
    },
    onCollisionEnter: function (other, self) {
        if (this.callback) {
            this.callback('get', this.nodeID);
            // this.node.destroy();
        }
    },
});