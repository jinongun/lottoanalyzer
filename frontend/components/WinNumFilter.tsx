import * as React from "react";
import { Lotto } from "../interfaces";
import BallBox from "./BallBox";

interface Props{
  data: {
    [key: string]: Lotto
  }
}

const WinNumFilter: React.FunctionComponent<Props> = ({data}:Props) => {
  console.log(data);
  const NUM = [7,17,19,23,24,45];
  const NAME = ['drwtNo1', 'drwtNo2', 'drwtNo3', 'drwtNo4', 'drwtNo5', 'drwtNo6'];
  return (
    <div className="WinNumFilter">
      <input type="number" />
      <BallBox />
      {
        Object.values(data).map((item:Lotto, index:number)=> {
          let cnt = 0;
          NAME.forEach((s:string)=>{
            NUM.includes(item[s]) ? cnt++ : cnt;
          });

          if(cnt >= 4){
            return (<p>
              {item.drwNo}회 일치횟수
              {cnt>=4 ?<b style={{fontSize: "16pt"}}>{cnt}</b> : cnt}
            </p>)
          }
          return null
          
        })
      }
      <style jsx>{`

      
      `}</style>
    </div>
  )
}

export default WinNumFilter;