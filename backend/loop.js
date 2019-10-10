const axios = require('axios');
const moment = require('moment-timezone');

const LOTTO_URL = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=";

const go = async () => {
  try{
    for(let i = 600; i <=650; i++){
      console.log(i);
      axios.post(`https://r6cpoaneyb.execute-api.ap-northeast-2.amazonaws.com/dev/setNumber`, {
        num: i
      })
    }
  }catch (e){
    //console.log(e);
  }
}

go();

// const test = async () => {
//   try{

//     var now = moment().tz("Asia/Seoul");
//     console.log(now);
//     var end = moment("2002-12-02");
//     var dur = moment.duration(now.diff(end));
//     var res = dur.asWeeks();
//     console.log(res);
//   }catch (e){

//   }
// }

// test();