var wechatAPI = require('wechat-api');
var info = require("./config");
var api = new wechatAPI(info.appid, info.appsecret);
var superagent = require('superagent')
const schedule = require('node-schedule')


var sendmessage = function () {                   // 传值给我

    var openid = 'ouRXww357-Uu8UtEnjXW2yLsrrfk'
    var templateId = 'gPxkidhbj35uH6wibpLfp9TbvEIYmBwJHsQuKrXuQjg';
    var url = 'http://weixin.qq.com/download';


    schedule.scheduleJob("1 55 14 * * *", function () {
        // 每天14点/55分/1s
        var getDp = getDap();
        getDp.then(function (dataD) { // 如果AJAX成功，获得响应内容
            let color = "#CD0"
            if (dataD['264648'] >= 0) {
                color = "#CD0"
            } else {
                color = "#A2CD5A"
            }
            var data = {
                first: {
                    value: "今日大盘",
                    "color": color
                },
                keyword1: {
                    value: "大盘点数",
                    "color": color
                },
                keyword2: {
                    value: "红绿点数",
                    "color": color
                },
                keyword3: {
                    value: "同比",
                    "color": color
                },
                remark: {
                    value: "欢迎再次购买！",
                    "color": color
                }
            };
            if (dataD['10'] * 1 <= 2675) {
                data.remark.value = "可以加钱杠杆了"
            }else if ( dataD['10'] * 1 <= 2725) {
                data.remark.value = "2700左右可以买入25%"
            }else if (dataD['10'] * 1  <= 2775) {
                data.remark.value = "2750左右买入25%"
            } else if (dataD['10'] * 1 <= 2825) {
                data.remark.value = "2800买入25%"
            } else if (dataD['10'] * 1 <= 2855) {
                data.remark.value = "2850左右买入25%"
            }else if ( dataD['10'] * 1 < 2900 ) {
                data.remark.value = "2900左右一般般吧观望"
            } else if (dataD['10'] * 1 >= 2900) {
                data.remark.value = "2900以上卖出25%"
            }else if (dataD['10'] * 1 >= 2950) {
                data.remark.value = "2950以上卖出25%"
            }else if (dataD['10'] * 1 >= 3000) {
                data.remark.value = "3000以上卖出25%"
            }else if (dataD['10'] * 1 >= 3050) {
                data.remark.value = "3050以上卖出25%"
            }else if (dataD['10'] * 1 > 3100) {
                data.remark.value = "高于3100建议卖出100%"
            }else {
                data.remark.value = "特殊价格自己想想吧 一般来说到订了QAQ"
            }
            data.keyword1.value = dataD['10']
            data.keyword2.value = dataD['264648'];
            data.keyword3.value = dataD['199112'] + "%";

            api.sendTemplate(openid, templateId, url, data, function (err, result) {
                if (err) {
                    console.log('err');
                } else {
                    console.log(result);
                }
            }); 


        })

    })




}



function getDap() {   // 接口获取大盘比

    return new Promise(function (resolve, reject) {
        superagent
            .get("http://stockpage.10jqka.com.cn/1A0001/quote/header/")
            .then(res => {
                let data = JSON.parse(res.text).data['1A0001']

                resolve(data);
            })
            .catch(err => {
                console.log(err);
            });


    });
}


module.exports = sendmessage;
