import AWS from "aws-sdk";
import axios from "axios";
import moment from "moment-timezone";

const DYNAMO_DB = new AWS.DynamoDB.DocumentClient();
const LOTTO_URL = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=";




export const autoSaveNumber = (event, context, callback) => {
  let now = moment().tz("Asia/Seoul");
  let start = moment("2002-12-02");
  let no = ~~(moment.duration(now.diff(start)).asWeeks())+1;
  console.log(no);


  axios.get(`${LOTTO_URL}${no}`).then(({data: response})=>{
    if (response.returnValue !== "success") {
      const res = {
        statusCode: 200,
        body: JSON.stringify({
          message: `THE ${no}th WINNING NUMBERS ARE NOT UPDATED YET.`
        })
      }
      callback(null, res);
      return;
    }else{
      console.log("gogogo")
      const getParams = {
        TableName: "Lotto",
        Key: {
          "id": no.toString()
        }
      };
      DYNAMO_DB.get(getParams, (error, result) => {
        console.log(result);
        if (error) {
          console.log(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: {
              "Content-Type": "text/plain"
            },
            body: JSON.stringify(getParams)
          });
          return;
        }
        if(Object.keys(result).length === 0 && result.constructor === Object){
          const price = no < 88 ? 2000 : 1000;
          const putParams = {
            TableName: "Lotto",
            Item: {
              id: no+"",
              price: price,
              year: moment(response.drwNoDate).format("YYYY"),
              month: moment(response.drwNoDate).format("MM"),
              total: response.totSellamnt / price,
              createdAt: moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
              ...response
            }
          }
          console.log("PUT")
          console.log(putParams);
          DYNAMO_DB.put(putParams, (error)=>{
            if(error){
              console.log(error);
              const putErrResponse = {
                statusCode: error.statusCode || 501,
                body: JSON.stringify(error)
              }
              callback(null, putErrResponse);
            }
          });
          const putResponse = {
            statusCode: 200,
            body: JSON.stringify({
              msg: "SUCCESS",
              ...putParams
            })
          };
          callback(null, putResponse);
        }else{
          const getResponse = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
          };
          callback(null, getResponse);
        }
        
        
      });
    }
  });
}
export const scanAll = (event, context, callback) => {
  console.log("SCANALL")
  const params = {
    TableName: "Lotto"
    //ProjectionExpression: "id, drwNoDate, createdAt"
  }

  DYNAMO_DB.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: {
          "Content-Type": "text/plain"
        },
        body: {
          message: JSON.stringify(err)
        }
      })
    }
    console.log("scan Success");
    const response = {
      statusCode: 200,
      body: JSON.stringify(data)
    };
    callback(null, response);
  });
}

export const setNumber = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const {
    data: response
  } = await axios.get(`${LOTTO_URL}${data.num}`);
  const price = data.num < 88 ? 2000 : 1000;
  const params = {
    TableName: "Lotto",
    Item: {
      id: data.num+"",
      price: price,
      year: moment(response.drwNoDate).format("YYYY"),
      month: moment(response.drwNoDate).format("MM"),
      total: response.totSellamnt / price,
      createdAt: moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
      ...response
    }
  }
  if (response.returnValue == "success") {
    DYNAMO_DB.put(params, (error) => {
      if (error) {
        console.log(error);
        const res = {
          statusCode: error.statusCode || 501,
          body: JSON.stringify(error)
        }
        callback(null, res);
      }
    });
    const res = {
      statusCode: 200,
      body: JSON.stringify({
        msg: "SUCCESS",
        ...params
      })
    };
    callback(null, res);
  } else {
    const res = {
      statusCode: 200,
      body: JSON.stringify({
        msg: "FAILURE",
        ...params
      })
    };
    callback(null, res);
  }
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