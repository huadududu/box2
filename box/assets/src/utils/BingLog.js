/**
 * Created by bing on 16/04/2018.
 */


let GameConfig = require("GameConfig");
let debug= GameConfig.DebugVersion;

module.exports = {

    log:function(...arg){
        if(debug){
            for(let i = 0; i < arg.length;++i){
                console.log(arg[i]);
            }
        }
    },

    warn:function(...arg){
        if(debug){
            for(let i = 0; i < arg.length;++i){
                console.warn(arg[i]);
            }
        }
    }
};