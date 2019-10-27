import * as React from "react";
import { Lotto } from "../interfaces";
import BallBox from "./BallBox";
import LottoPaper from "./LottoPaper";

interface Props {
  data: {
    [key: string]: Lotto
  }
}
const WinNumFilter: React.FunctionComponent<Props> = ({ data }: Props) => {
  // console.log(data);
  const [num, setNum] = React.useState({});
  const NUM = [1, 3, 17, 21, 34, 41];
  const NAME = ['drwtNo1', 'drwtNo2', 'drwtNo3', 'drwtNo4', 'drwtNo5', 'drwtNo6'];
  return (
    <div className="WinNumFilter">
      {/* <BallBox showEmpty={true} data={Object.keys(num).map(Number) || []}  /> */}
      <LottoPaper numbers={num} setNumbers={setNum} />

      {/* {
        Object.values(data).map((item: Lotto, index: number) => {
          let cnt = 0;
          let arr: any = [];
          NAME.forEach((s: string) => {
            if (Object.keys(num).map(Number).includes(item[s])) {
              cnt++;
              arr.push(item[s]);
            }
          });
          if (cnt === 5) {
            return Object.keys(num).map(Number).includes(item.bnusNo) ? <p>{item.drwNo}회 일치횟수 2등</p> : <p>{item.drwNo}회 일치횟수 3등</p>
          }
          if (cnt >= 3) {
            return (<p>
              {item.drwNo}회 일치횟수
              {cnt >= 4 ? <b style={{ fontSize: "16pt" }}>{cnt}</b> : cnt}
            </p>)
          }
          return null

        })
      } */}
      <style jsx>{`
        .WinNumFilter{
          background-color: white;
          text-align: center;
          margin-bottom: 100px;
        }
      
      `}</style>
    </div>
  )
}

export default WinNumFilter;

/*
  data형을 array로 받으면.. 클릭 순서에 따른/.. 
*/
/*
  data: [1, 2, 3, 4, 5, 6, 7], object로 받는게 훨씬 낫지 않을까?
  data: {
    '1': true,
    '9': true,
    '11': ture,
  }
  showBnus?: false,
  clickable?: false,

*/

/*
  checked: {
    '1': true
  }
*/
