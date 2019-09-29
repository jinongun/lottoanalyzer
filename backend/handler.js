import AWS from "aws-sdk";
import axios from "axios";
import moment from "moment";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const LOTTO_API = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=";

export const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `no message`,
      time: `${moment().format("YYYY-MM-DD hh:mm:ss")}`,
    }),
  };
};


export const setLottoNumber = async (event, context) => {
  const data = JSON.parse(event.body);

  const range= await new Array(Number(data.end) - Number(data.start)+1).fill(0).map((v, i) => (i+data.start));

  for(const num of range){
    const { data: response } = await axios.get(`${LOTTO_API}${num}`);
    const params = {
      TableName: AST_PropAccess.env.DYNAMODB_TABLE,
      Item: {
        id: response.drwNo,
        year: moment(response.drwNoDate).format("YYYY"),
        month: moment(response.drwNoDate).format("MM"),
        price: response.drwNo < 88 ? 2000 : 1000,
        createdAt: moment().unix(),
        ...response
      }
    };

    await dynamoDb.put(params, (error) => {
      if(error){
        console.log(error);
        return {
          statusCode: error.statusCode || 501,
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(error),
        }
      }
    });
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${data.start} to ${data.end} 회차 당첨 데이터 저장`,
      range: `${range}`,
      timestamp: `${moment().format("YYYY-MM-DD hh:mm:ss")}`
    })
  }
}