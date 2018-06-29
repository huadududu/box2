/**
 * Created by bing on 16/04/2018.
 */


let GameConfig = require("GameConfig");
let debug= GameConfig.DebugVersion;

module.exports = {

    log:function(...arg){
        if(debug){
            console.log(...arg);
        }
    },

    warn:function(...arg){
        if(debug){
            console.warn(...arg);
        }
    }
};