var fs= require("fs");          
var info = require("./config");
var request = require('request');
function getToken(){
let url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+info.appid+"&secret="+info.appsecret+""
setInterval(function(){
    getAccessToken(url);
},7000000)
function getAccessToken(url){
    request(url, function (error, response, body) {                    // 发送请求获取access_token
        let token=JSON.parse(body).access_token
        fs.writeFile('./token.txt', token , function(err) {});   // 将自己的token写入方便查看
      });
}
getAccessToken(url);




}

module.exports = getToken;