import AWS from "aws-sdk";
import axios from "axios";
import moment from "moment";

const DYNAMO_DB = new AWS.DynamoDB.DocumentClient();
const LOTTO_URL = "http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=";


export const setNumber = async (event, context, callback) => {
  
  const { data: response } = await axios.get(`${LOTTO_URL}${}`)
}