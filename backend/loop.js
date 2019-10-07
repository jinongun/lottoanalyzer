const axios = require('axios');

const LOTTO_URL = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=";

const go = async () => {
  try{
    for(let i = 701; i <800; i++){
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