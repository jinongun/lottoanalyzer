import * as React from "react";
import { Lotto } from "../interfaces";
import BallBox from "./BallBox";

interface Props {
  data: {
    [key: string]: Lotto
  }
}
const WinNumFilter: React.FunctionComponent<Props> = ({ data }: Props) => {
  // console.log(data);
  const NUM = [7, 17, 19, 23, 24, 38];
  const NAME = ['drwtNo1', 'drwtNo2', 'drwtNo3', 'drwtNo4', 'drwtNo5', 'drwtNo6'];
  return (
    <div className="WinNumFilter">
      <LottoPaper />

      <input type="number" />
      <BallBox />
      {
        Object.values(data).map((item: Lotto, index: number) => {
          let cnt = 0;
          let arr: any = [];
          NAME.forEach((s: string) => {
            if (NUM.includes(item[s])) {
              cnt++;
              arr.push(item[s]);
            }
            //NUM.includes(item[s]) ? cnt++ : cnt;
          });
          // console.log(arr);
          if (cnt === 5) {
            return NUM.includes(item['bnusNo']) ? <p>2등</p> : <p>3등</p>
          }
          if (cnt >= 4) {
            return (<p>
              {item.drwNo}회 일치횟수
              {cnt >= 4 ? <b style={{ fontSize: "16pt" }}>{cnt}</b> : cnt}
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

const LottoPaper: React.FunctionComponent<any> = () => {
  const [checked, setChecked]:any = React.useState({});
  const NUM = new Array(45).fill(0).map((i:number,index:number)=>index+1);
  
  function toggle(num:number){
    setChecked({...checked, [num]: !checked[num] });
  }

  function generate(){
    let rows:any = [];
    let res:any = [];

    NUM.forEach((num: number)=> {

      rows.push(<span key={num} className={`box ${checked[num] ? 'checked': ''}`}onClick={()=>toggle(num)}>{num}</span>);
      if(num%7===0){
        res.push(<div key={`row${num}`} className="row">{rows}</div>);
        rows = [];
      }
      if(num ===45){
        res.push(<div key={`row${num}`} className="row">{rows}</div>);
      }
    })
    return res;
  }
  return (
    <div className="LottoPaper">
      {
        generate()
      }
      <style jsx global>{`
        .LottoPaper{
          //background-color: gray;
          display: inline-block;
        }
        .LottoPaper > .row{
          padding: 4px 8px; 
        }
        .LottoPaper > .row >.box{
          user-select: none;
          display: inline-block;
          min-width: 23px;
          box-sizing: border-box;
          text-align: center;
          position: relative;
          cursor: pointer;
          font-size: 9pt;
          background: white;
          padding: 6px 4px;
          color: pink;
          font-weight: bold;
          border-bottom: 2px solid pink;
          border-top: 2px solid pink;
        }
        .LottoPaper > .row > .box.checked::before{
          content: '';
          position: absolute;
          display: inline-block;
          border-radius: 10px;
          top:4px;
          bottom: 4px;
          left: 6px;
          right: 6px;
          background: black;
        }
         .box + .box {
          margin-left: 4px;
        }
      `}</style>
    </div>
  )
}