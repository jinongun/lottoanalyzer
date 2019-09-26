import AWS from "aws-sdk";
import axios from "axios";
import moment from "moment";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const LOTTO_API = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo="
export const getLatest = async (event, context, callback) => {
  const {start, end} = event.body;
  const range = await new Array(end-start).fill().map((v, i) => (i+start));

  for(const num of range){
    const response = await axios.get(`${LOTTO_API}${num}`).then((r) => r);
    const timestamp = new Date().getTime();
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

    await dynamoDb.put(params, (error) => {
      if(error) { 
        console.log(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(error),
        });
        return;
      }
    });
  }

  callback(null, {
    statusCode: 200,
    body: {
      message: `${start} to ${end} 회차 당첨 데이터 저장 성공`,
    }
  })

  const response = {
    statusCode: 200,
    body: "The Latest Winning Number is updated successfully",
  }
  callback(null, response);
}