/**
 * Created by bing on 02/05/2018.
 */


//完全本地的存储。

module.exports  =  function () {
    let LC = cc.Class({
        extends:cc.Object,
        get: function (k, defaultv = '') {
            let v = cc.sys.localStorage.getItem(k);
            if( v == null ){
                v = defaultv;
            }
            return v;
        },

        set: function (k,v) {
            cc.sys.localStorage.setItem(k,v);
        },
       
        delete:function (k) {
           cc.sys.localStorage.removeItem(k);
        }
    });

    let instance = new LC();
    return instance;
}();



