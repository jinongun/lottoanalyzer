import moment from "moment";
import axios from "axios";

export const hello = async (event, context) => {
  const response = await axios.get(`http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=819`).then((res) => {
    console.log(res.data);
    return (res.data);
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless v1.0! ${(await message({ time: 1, copy: 'Your function executed successfully!'}))}`,
      time: `${moment().format("YYYY-MM-DD hh:mm:ss")}`,
      lotto: response
    }),
  };
};

const message = ({ time, ...rest }) => new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`);
  }, time * 1000)
);