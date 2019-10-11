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
const filteredValues = obj.value.map((i)=>{
  const filteredImages = i.descImages.filter((j)=>{
    if(j.langs.includes(param)){
      return j;
    }
  });
  return {...i, descImages: filteredImages};
});
const result = {...obj, value: filteredValues};

var input =  {
  "key" : "popup",
  "__v" : 0,
  "value" : [ 
      {
          "url" : "test2",
          "descImages" : [ 
              {
                  "img" : "/popup/list_0/img_0/1570516240629.png",
                  "langs" : "ko, ja"
              }, 
              {
                  "img" : "/popup/list_1/img_1/1570516624306.png",
                  "langs" : "en"
              }
          ]
      }, 
      {
        "url" : "test3",
          "descImages" : [ 
              {
                  "langs" : "ja, en",
                  "img" : "/popup/list_1/img_0/1570519106446.png"
              }
          ],
          
      }
  ]
}

function makePopupList(arr){
  const popupList = arr.map(lang => {
    let listItem = {
      lang: lang,
      list: []
    };
    input.value.forEach(item => {
      const URL = item.url;
      const IMG = item.descImages.find(jtem => {

        if(jtem.langs.includes(lang)){ return jtem.img }
      });
      listItem.list.push({ url: URL, img: { ...IMG } });
    });
    return listItem;
  });
  console.log(popupList);
}
makePopupList(["ko","en","ja"]);
var data = {
  "popupList": [
  {
      "lang": "ko",
      "list": [
          {
              "url": "url1",
              "img": "/popup/list_0/img_0/1570516240629.png"
          },
          {
              "url": "url2",
              "img": "/popup/list_0/img_0/1570516240629.png"
          },
          {
              "url": "url3",
              "img": "/popup/list_0/img_0/1570516240629.png"
          }
      ]
  },
  {
      "lang": "en",
      "list": [
          {
              "url": "url4",
              "img": "/popup/list_0/img_0/1570516240629.png"
          },
          {
              "url": "url5",
              "img": "/popup/list_0/img_0/1570516240629.png"
          }
      ]
  }
]}