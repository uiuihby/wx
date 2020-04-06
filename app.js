//express_demo.js 文件
var express = require('express');
var app = express();
const getToken=require("./getToken")
//xml解析模块
var XMLJS = require('xml2js');
//解析，将xml解析为json
var parser = new XMLJS.Parser();
//重组，将json重组为xml
var wechat=require("./wechat")           //  接收的事件

var sendmessage=require("./postMsg")
var sha1 = require("sha1");



app.get("/", (req, res, next)=> {

  // 获取微信服务器发送的数据
  var signature = req.query.signature,
  timestamp = req.query.timestamp,
      nonce = req.query.nonce,
  echostr = req.query.echostr;

  // token、timestamp、nonce三个参数进行字典序排序
  var arr = [config.test, timestamp, nonce].sort().join('');
  // sha1加密    
  var result = sha1(arr);
  
  if(result === signature){
      res.send(echostr);
  }else{
      res.send('mismatch');
  }
})

app.post('/', function(req, res, next) {                                 // 接收请求，获取xml数据 对请求进行各种回馈
        req.on("data", function(data) {                                  // 将xml解析
            parser.parseString(data.toString(), function(err, result) {  // xml转字符串
                var body = result.xml;
                var messageType = body.MsgType[0];                       // 获取返回类型
                wechat(messageType,body, res);
            });
        });
});
// getToken()


sendmessage()




// 验证判断
var server = app.listen(5001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})