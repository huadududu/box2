/**
 * Created by bing on 18/04/2018.
 */


module.exports = {

    //[min,max]
    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    //随机的 [0 ～ number]
    random: function (number) {
        return this.randomInt(0, number);
    },
    formatNum:function(num){
        let str;
        if(num> 1000){
            str = parseInt(num/1000)+"k";
        }else{
            str = ""+num;
        }
        return str;
    }
};