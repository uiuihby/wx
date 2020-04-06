var XMLJS = require('xml2js');
var builder = new XMLJS.Builder();
//微信客户端各类回调用接口
function wechat(type,body,res){
  var xml  = {xml: {
    ToUserName: body.FromUserName,
    FromUserName: body.ToUserName,
    CreateTime: + new Date(),
    MsgType: 'text',
    Content: ''
  }};
   if(type=='text'){
        xml.xml.Content=body.Content[0]
        xml = builder.buildObject(xml);         // json转为xml
        res.send(xml);
   }

}
module.exports = wechat;



