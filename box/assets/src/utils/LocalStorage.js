/**
 * Created by bing on 02/05/2018.
 */

let GameConfig = require("GameConfig");


module.exports  =  function () {

    let LC = cc.Class({
        extends:cc.Object,

        get: function (k, defaultv = '',callback) {

            if(GameConfig.isFBInstantGame()){
                FBInstant.player.getDataAsync([k])
                    .then(function(data){
                        if (typeof data[k] !== 'undefined') {
                            callback(data[k]);
                        }
                    });
            }else{

                let v = cc.sys.localStorage.getItem(k);
                if(!v){
                    v = defaultv;
                }
                // return v;
                callback(v);
            }
        },
        getMore: function (moreKeys, defaultv = '',callback) {
            if(GameConfig.isFBInstantGame()){
                let defaultData  =  defaultv;
                console.log("get ",[k]);
                FBInstant.player.getDataAsync(moreKeys)
                    .then(function(data){
                        console.log('data is get',data);
                        if(callback){
                            if (typeof data!= 'undefined') {
                                callback(data[k]);
                            }else{
                                callback(defaultData);
                            }
                        }

                    });
            }
        },
        set: function (k,v) {

            if(GameConfig.isFBInstantGame()){
                FBInstant.player.setDataAsync({
                    k:v
                });
            }else{
                cc.sys.localStorage.setItem(k,v);
            }
        },
       
        delete:function (k) {
           cc.sys.localStorage.removeItem(k);
        }
        
        
    });


    let instance = new LC();
    return instance;
}();



