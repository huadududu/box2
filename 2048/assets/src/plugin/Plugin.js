/**
 * Created by bing on 04/05/2018.
 */

module.exports = function () {

    //TODO::replace the image.
    let GameConfig  = require("GameConfig");
    let p = null;
    if(GameConfig.isFBInstantGame()){
        let fbp = require("FBPlugin");
        p = new fbp();
    }else{
        
    }
    return p;

}();