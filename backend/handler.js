import AWS from "aws-sdk";
import axios from "axios";
import moment from "moment";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const LOTTO_API = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=";

export const hello = async (event, context) => {

  const { data: response } = await axios.get(`${LOTTO_API}879`);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: moment().format("YYYY-MM-DD hh:mm:ss"),
      requestURL: `${LOTTO_API}879`,
      ...response
    }
  };
  console.log("+++++++");
  console.log(params);
  await dynamoDb.put(params, (error) => {
    if(error){
      console.log(error);
      return {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: {
          temp: "db put error",
          message: JSON.stringify(error)
        },
      }
    }
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      params: `${JSON.stringify(params)}`,
      message: `${JSON.stringify(response)}`,
      time: `${moment().format("YYYY-MM-DD hh:mm:ss")}`,
    }),
  };
};

export const getData = async (event, context, callback) => {
  console.log("+++++++++GETDATA");

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      "id": "TEST"
    }
  };
  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    console.log(params);
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(params),
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
}

export const putNumber = async (event, context) => {
  const data = JSON.parse(event.body);
  console.log(data.num);
  const { data: response } = await axios.get(`${LOTTO_API}${data.num}`);
  console.log(response);

  // const params = {
  //   TableName: process.env.DYNAMODB_TABLE,
  //   Item: {
  //     id: moment().format("YYYY-MM-DD hh:mm:ss"),
  //     requestURL: `${LOTTO_API}879`,
  //     ...response
  //   }
  // };
  const params = {
    TableName: "Lotto",
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
    console.log("+++++++++++++++DB+++++++++++++");
    console.log(params);
    if(error){
      console.log("+++ ERROR during PUT DATA ++ ");
      console.log(error);
      return {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(error),
      }
    }
  });

  console.log("++ PUT DATA SUCCESS?? ++ ");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${data.num} 회차 당첨 데이터 저장 성공`,
      timestamp: `${moment().format("YYYY-MM-DD hh:mm:ss")}`
    })
  }
}


export const setLottoNumber = async (event, context) => {
  const data = JSON.parse(event.body);
  
  const range= await new Array(Number(data.end) - Number(data.start)+1).fill(0).map((v, i) => (i+data.start));

  for(const num of range){
    const { data: response } = await axios.get(`${LOTTO_API}${num}`);
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
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