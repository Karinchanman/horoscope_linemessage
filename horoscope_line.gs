var ACCESS_TOKEN = "1KR9QQFNl2gOdvsUTEWHBVgsiS1ZX23eyC4KwHvqiOiHBCRe0K5xEA5flNAeI/f4TMKvql19ZxrNZXLL7vVZdbpNcYYje4JU6J8giPG2AOTYbQd8KJPC2LCtFuQQ/x61iRN7N6UTdn+O/q+hrYT4EQdB04t89/1O/w1cDnyilFU=";
//var ID = '1iawmMuyeYb93wV7xSbZn172CJuVC515xhNd4bzlxTV8';
var URL = 'https://api.line.me/v2/bot/message/reply'; // 応答メッセージ用のAPI URL

function doPost(e) {
    //JSONをパースする
    var json = JSON.parse(e.postData.contents);

    //返信するためのトークン取得
    var reply_token = json.events[0].replyToken;
    if (typeof reply_token === 'undefined') {
        return;
    }

    //送られたLINEメッセージを取得
    var user_message = json.events[0].message.text;
    var post_message = "";

    post_message=get_result(user_message)


    UrlFetchApp.fetch(URL, {
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        'method': 'post',
        'payload': JSON.stringify({
            'replyToken': reply_token,
            'messages': [{
                'type': 'text',
                'text': post_message,
            }],
        }),
    });
    return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

function get_result(user_message) {
  var horo = user_message
  var message = null

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('horoscope_result');
  var lastRow
  lastRow = sheet.getLastRow();
  for(let i=1;i<=lastRow;i++){
    if(horo==sheet.getRange(i,1).getValue()){
      line = sheet.getRange(i,2).getValue();
      docomo = sheet.getRange(i,3).getValue();
      asahi = sheet.getRange(i,4).getValue();
      average = sheet.getRange(i,5).getValue();
      var message = "LINEでは" + line + "位です！\n" + "docomoでは" + docomo + "位です！\n" +
                    "朝日新聞では" + asahi + "位です！\n" + "平均は" + average + "位です！\n今日もいいことがあるといいですね！";
      break;
    }

  }
 
  if(message==null){
    message="正しく入力してね！（例：しし座）"
  }
 
  return message;

}
