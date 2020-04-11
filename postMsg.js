var wechatAPI = require('wechat-api');
var info = require("./config");
var api = new wechatAPI(info.appid, info.appsecret);
var superagent = require('superagent')
const schedule = require('node-schedule')
const Rule2 = new schedule.RecurrenceRule()
Rule2.hour = [14]
Rule2.minute = [55]
var sendmessage = function () {                   // 传值给我

    var openid = 'ouRXww357-Uu8UtEnjXW2yLsrrfk'
    var templateId = 'gPxkidhbj35uH6wibpLfp9TbvEIYmBwJHsQuKrXuQjg';
    var url = 'http://weixin.qq.com/download';

    const Rule1 = new schedule.RecurrenceRule()
    Rule1.hour = [20]
    Rule1.minute = [30]
    schedule.scheduleJob(Rule1, function () {
        var data = {
            remark: {
                value: "别忘记看咸鱼!!",
                "color": "#000"
            }
        };

        
        api.sendTemplate(openid, "jzQyAWx1S9wEuE3wNRjCSr-WxVzahJ2VVAoT2dtuEMk", url, data, function (err, result) {
            if (err) {
                console.log('err');
            } else {
                console.log(result);
            }
        }); 

    }),
    schedule.scheduleJob(Rule2, function () {
        // 每天14点/55分
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
            if (dataD['10'] * 1 < 2700) {
                data.remark.value = "2000左右处于绝对低位非常非常建议购买"
            }else if (dataD['10'] * 1 < 2750) {
                data.remark.value = "2750左右处于低位建议购买"
            } else if (dataD['10'] * 1 < 2800) {
                data.remark.value = "2800可以购买"
            } else if (dataD['10'] * 1 < 2850) {
                data.remark.value = "2850一般般吧观望"
            } else if (dataD['10'] * 1 < 2900) {
                data.remark.value = "建议卖出20%"
            }else if (dataD['10'] * 1 < 3000) {
                data.remark.value = "建议卖出30%"
            }else if (dataD['10'] * 1 < 3100) {
                data.remark.value = "建议卖出50%"
            }else if (dataD['10'] * 1 > 3100) {
                data.remark.value = "建议卖出100%"
            }else {
                data.remark.value = "特殊价格自己想想吧"
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