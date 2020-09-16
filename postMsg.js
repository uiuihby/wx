var wechatAPI = require('wechat-api');
var info = require("./config");
var api = new wechatAPI(info.appid, info.appsecret);
var superagent = require('superagent')
const schedule = require('node-schedule')


var sendmessage = function () {                   // 传值给我

    var openid = 'ouRXww357-Uu8UtEnjXW2yLsrrfk'
    var templateId = 'gPxkidhbj35uH6wibpLfp9TbvEIYmBwJHsQuKrXuQjg';
    var url = 'http://weixin.qq.com/download';
    var getBtc=getDataBtc();






    schedule.scheduleJob("59 26 17 12 * *", function () {
    getBtc.then(function(dataBtc){
        let templateId2="bwY2PmPrNcTlOcHw_Crsn5QMpipiLngeFgHQ8TSSNqM"
        let btcPrice=dataBtc.body.data[dataBtc.body.data.length-1].net_price.toFixed(2)
        let data={
            keyword1: {
                value: btcPrice,
            },
            remark: {
                value: "一个月买一次 低于5w可以考虑",
            }
        }
        api.sendTemplate(openid,templateId2, url, data, function (err, result) {
            if (err) {
                console.log('err');
            } else {
                console.log(result);
            }
        }); 
    })
})

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
            dataD['10'] = dataD['10'] * 1
      
            if (dataD['10'] * 1 <= 2450) {
                data.remark.value = "2450左右杠杆仓位20%，已经到了最低仓位了"
            }if (dataD['10'] * 1 <= 2500) {
                data.remark.value = "2500左右杠杆仓位20%"
            }else if (dataD['10'] * 1 <= 2550) {
                data.remark.value = "2550左右杠杆仓位20%"
            }else if (dataD['10'] * 1 <= 2600) {
                data.remark.value = "2600左右杠杆仓位20%"
            }else if (dataD['10'] * 1 <= 2650) {
                data.remark.value = "2650左右杠杆仓位20%"
            }else if ( dataD['10'] * 1 <= 2700) {
                data.remark.value = "2700左右买入总仓位20%"
            }else if (dataD['10'] * 1  <= 2750) {
                data.remark.value = "2750左右买入总仓位20%"
            } else if (dataD['10'] * 1 <= 2800) {
                data.remark.value = "2800左右买入总仓位20%"
            } else if (dataD['10'] * 1 <= 2850) {
                data.remark.value = "2850左右买入总仓位20%"
            }else if (dataD['10'] * 1 <= 2900) {
                data.remark.value = "2900左右买入总仓位20%"
            }else if ( dataD['10'] * 1 < 3000 ) {
                data.remark.value = "2950左右一般般吧观望"
            }else if (dataD['10'] * 1 >= 3200) {
                data.remark.value = "3200以上卖出0.2/仓位比,空仓了"
            } else if (dataD['10'] * 1 >= 3150) {
                data.remark.value = "3150左右,卖出0.2/仓位比"
            }else if (dataD['10'] * 1 >= 3100) {
                data.remark.value = "3100左右,卖出0.2/仓位比"
            }else if (dataD['10'] * 1 >= 3050) {
                data.remark.value = "3050左右,卖出0.2/仓位比"
            }else if (dataD['10'] * 1 >= 3000) {
                data.remark.value = "3000左右,卖出0.2/仓位比"
            }
            
            data.keyword1.value = dataD['10']
            data.keyword2.value = dataD['264648'];
            data.keyword3.value = dataD['199112'] + "%";
            if(dataD['10'] * 1 >= 3000 || dataD['10'] * 1 <= 2450){
                       return 
            }
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
function getDataBtc(){

    return new Promise(function (resolve, reject) {
        superagent
            .get("https://www.ibtctrade.com/api/coindata/currency_price_trend?currency=btc&unit=CNY&type=day&language=zh_cn")
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                console.log(err);
            });
    });
  }


module.exports = sendmessage;
