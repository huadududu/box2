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

    loadPhoto:function (remoteUrl,callback) {

        cc.loader.load({url: remoteUrl, type: 'png'}, function (err,texture) {
            // Use texture to create sprite frame
            console.log("load photo");
            if(!err){
                if(callback){
                    callback(texture);
                }
            }
        });
    },

    LoadRequest: function (urlInput, postData, callback, onError = null, timeout = 0) {

        let requestData = postData || '';
        let url = urlInput;
        var xhr = cc.loader.getXMLHttpRequest(); //new XMLHttpRequest();
        xhr.open("POST", url,true);
        timeout = Math.max(Math.min(timeout,3),0);
        xhr.timeout = timeout*1000;//xhr.timeout值为毫秒
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                //cc.log("RealServerConnector response: method= "+ method+" | status= "+xhr.status+" | responseText= "+xhr.responseText);
                if(xhr.status >= 200 && xhr.status < 400)
                {
                    var response = JSON.parse(xhr.responseText);
                    console.log("response = ",response);
                    if (callback) {
                        if(!response["response"]){
                            // cc.warn("the response is wrong",response);
                        }
                        // self.ProccessResponse(response["response"]||{},callback);
                    }
                }
                else
                {
                    //var response = JSON.parse(xhr.responseText);
                    console.warn("response status  ",xhr.statusText);
                    if (onError) {
                        // self.ProccessResponse({"status":0,"error":1},onError);
                    }
                }
            }
            else
            {
                //console.log("XMLHttpRequest: readyState= "+ xhr.readyState+" | status= "+xhr.status);
            }
        };

        xhr.ontimeout = function (e) {
            // XMLHttpRequest 超时。在此做某事。
            if(onError){
                onError(e);
            }
        };
        xhr.onerror = function (e) {
            console.log("onerror",JSON.stringify(e));
            if(onError){
                onError(e);
            }
        };

        //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
        // xhr.setRequestHeader("Content-Type", "text/plain");
        //for cors
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-control-allow-headers");
        console.log("send data",requestData);
        xhr.send(requestData);
    },


    //格式化数字，如果有小数，保留两位。自动添加对应的单位。
    formartNumber:function (inputnum) {
        if(inputnum < 1000){
            return inputnum;
        }
        let dw = ["K","M","B","T","aa","bb","cc","dd","ee","ff"];
        let digits =[3,6,9,12,,15,18,21,24,27,30];
        let num = (inputnum||0).toString();
        let numlen = num.length;
        let index = 0;
        for(let i = digits.length-1; i >-1; --i){
            if(numlen >  digits[i]){
                index =  i;
                break;
            }
        }

        let dnum  =  Math.pow(10,digits[index]);
        let result =  inputnum/dnum;
        let tmp =  result.toString();
        if(tmp.indexOf(".") == -1){
            return tmp + dw[index];
        }else{
            return result.toFixed(2) + dw[index];
        }
    },
    //填充数字，前面补充0。
    //eg .num 2 2-> 02  /   5,3-> 005
    padding:function(num, length) {
        //这里用slice和substr均可
        return (Array(length).join("0") + num).slice(-length);
    },
};