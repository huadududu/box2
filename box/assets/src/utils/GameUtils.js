/**
 * Created by bing on 18/04/2018.
 */

let LanguageConfig = require('LanguageConfig');
let Global = require('Global');
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
            str = (num/1000).toFixed(1)+"K";
        }else{
            str = ""+num;
        }
        return str;
    },
    formatNumMAX:function(num){
        let str;
        let num1=0;
        if(num>1000000000){
            str = this.roundFun(num/1000000000)+"G";
        }else if(num> 1000000){
            str = this.roundFun(num/1000000)+"M";
            num1
        }else if(num> 1000){
            str =this.roundFun(num/1000)+"K";
        }else{
            str = num;
        }
        return str;
    },
    //保留n位小数
    roundFun:function(value, n) {
        let  value1 = (value).toString();
        let  re = /([0-9]+\.[0-9]{1})[0-9]*/;
        value1 = value1.replace(re,"$1");
        return value1 ;
    },
    //标准钱币表达（不带小数点）
    stardandFun:function(value){
        value= value.toString();
        var temp = value.split('').reverse().join('').match(/(\d{1,3})/g);
        return  temp.join(',').split('').reverse().join('');
    },

    formatTime(num){
        let str="";
        if(num>=3600){
            str+=Math.floor(num/3600)+"h";
            num%=3600;
        }
        if(num >= 60){
            str+=Math.floor(num/60)+"min";
            num%=60;
        }
        if(num>0){
           str+= Math.floor(num)+"s";
        }
        return str;
     },
    formatPrint:function() {
        var num = arguments.length;

        var oStr = arguments[0];

        for (var i = 1; i < num; i++) {

            var pattern = "/%s/";

            var re = new RegExp(pattern, "g");

            oStr = oStr.replace(re, arguments[i]);

        }
        return oStr;
    },
    formatHour:function(desc,num){
        let str="";
        if(num>=24){
            let strday = LanguageConfig['10025'][Global.language];
            str+=this.formatPrint(strday,Math.floor(num/24));
            num%=24;
        }
        if(num > 0){
            let strhour = LanguageConfig['10019'][Global.language];
            str+=this.formatPrint(strhour,num);
        }
        str = this.formatPrint(desc,str);
        return str;

    },
    formatPrint:function() {
        var num = arguments.length;

        var oStr = arguments[0];

        for (var i = 1; i < num; i++) {
            oStr = oStr.replace(/s%/, arguments[i]);
        }

        return oStr;
    },
};