import AWS from "aws-sdk";
import axios from "axios";
import moment from "moment";

const DYNAMO_DB = new AWS.DynamoDB.DocumentClient();
const LOTTO_URL = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=";


export const setNumber = async (event, context, callback) => {
  // const {
  //   data: response
  // } = await axios.get(`${LOTTO_URL}`)
  const data = JSON.parse(event.body);
  const params = {
    TableName: "lotto",
    Item: {
      id: data.num + "",
      test: moment().format("YYYY_MM_DD_hh_mm_ss")
    }
  }
  await DYNAMO_DB.put(params, (error) => {
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
    };


  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Put data success",
      timestamp: moment().format("YYYY-MM-DD hh:mm:ss")
    })
  }
}

export const getNumber = (event, context, callback) => {
  const params = {
    TableName: "lotto",
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