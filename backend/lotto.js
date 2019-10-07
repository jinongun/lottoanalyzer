import AWS from "aws-sdk";
import axios from "axios";
import moment from "moment-timezone";

const DYNAMO_DB = new AWS.DynamoDB.DocumentClient();
const LOTTO_URL = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=";


export const setNumber = async (event, context, callback) => {
  // const {
  //   data: response
  // } = await axios.get(`${LOTTO_URL}`)
  const data = JSON.parse(event.body);
  const {
    data: response
  } = await axios.get(`${LOTTO_URL}${data.num}`);
  const params = {
    TableName: "Lotto",
    Item: {
      id: (response.drwNo+"").padStart(4, "0"),
      year: moment(response.drwNoDate).format("YYYY"),
      month: moment(response.drwNoData).format("MM"),
      price: response.drwNo < 88 ? 2000 : 1000,
      createdAt: moment().tz("Asia/Seoul").format("YYYY-MM-DD hh:mm:ss"),
      ...response
    }
  }
  await DYNAMO_DB.put(params, (error, data) => {
    if (error) {
      console.log(error);
      return {
        statusCode: error.statusCode || 501,
        headers: {
          "Content-Type": "text/plain"
        },
        body: {
          message: JSON.stringify(error)
        }
      }
    } else {
      console.log(data);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Put data success",
          timestamp: moment().tz("Asia/Seoul").format("YYYY-MM-DD hh:mm:ss"),
          data: JSON.stringify(response)
        })
      }
    }
  });

}

export const getNumber = (event, context, callback) => {
  const params = {
    TableName: "Lotto",
    Key: {
      "id": event.pathParameters.id
    }
  };
  console.log(params);
  DYNAMO_DB.get(params, (error, result) => {
    if (error) {
      console.log(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(params)
      });
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  });

}