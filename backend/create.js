import AWS from "aws-sdk";
//import uuid from "uuid";
import axios from "axios";
import moment from "moment";
//import moment from "moment";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const create = async (event, context, callback) => {
  console.log((event.body));
  const arr = await new Array(100).fill().map((v,i) => (i+1));
  for(const number of arr){
    const timestamp = new Date().getTime();
    const response = await axios.get(`http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=${number}`).then((res) => {
      console.log(`++++++++++++++++${number}++++++++++++`);
    //console.log(res.data);
      return (res.data);
    });
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: moment(response.drwNoDate).unix(),
        totSellamnt: response.totSellamnt,
        returnValue: response.returnValue,
        drwNoDate: response.drwNoDate,
        firstWinamnt: response.firstWinamnt,
        drwtNo6: response.drwtNo6,
        drwtNo4: response.drwtNo4,
        firstPrzwnerCo: response.firstPrzwnerCo,
        drwtNo5: response.drwtNo5,
        bnusNo: response.bnusNo,
        firstAccumamnt: response.firstAccumamnt,
        drwNo: response.drwNo,
        drwtNo2: response.drwtNo2,
        drwtNo3: response.drwtNo3,
        drwtNo1: response.drwtNo1,
        createdAt: timestamp,
        updatedAt: timestamp,
        price: response.drwNo < 88 ? 2000 : 1000
      },
    };
     // write the todo to the database
  await dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(error),
      });
      return;
    }


  });
  }
  // create a response
  const response = {
    statusCode: 200,
    body: "success",
  };
  callback(null, response);
};