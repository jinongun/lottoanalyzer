import * as React from "react";
import BallBox from "./BallBox";
import LottoPaper from "./LottoPaper";
import { Lotto } from '../interfaces';
import { numberToWon } from '../utils';
import CountUp from 'react-countup';

interface Props {
  data: Lotto
}
const LottoOverview: React.FunctionComponent<Props> = ({data}) => {
  const [numbers, setNumbers]:any = React.useState([]);
  React.useEffect(()=>{
    setNumbers(
      [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6, data.bnusNo]
    )
  },[data]);
  function probability(str:string){
    const [zeros, digits] = str.split(/([1-9].*)/);
    return (
      <CountUp start={0} end={Number(digits)} prefix={zeros} suffix="%" delay={0}>{({ countUpRef }) => (<span ref={countUpRef} />)}</CountUp>
    )
  }
  return (
    <div className="LottoOverview">
      <h3>{data.drwNo}회차 로또 통계</h3>
      <BallBox data={numbers} />
      <div className="dataview">
        <div className="row">
          <span className="name">총 판매액</span>
          <span style={{fontSize: '10pt'}}>{numberToWon(data.totSellamnt)}원</span>
          <span> 증가 </span>
        </div>
        <div className="row">
          <span className="name">1등 당첨 금액</span>
          <span style={{fontSize: '10pt'}}>{numberToWon(data.firstWinamnt)} 원</span>
        </div>
        <div className="row">
          <span className="name">1등 당첨자 수</span>
          <span style={{fontSize: '10pt'}}>{(data.firstPrzwnerCo)} 명</span>
        </div>
        <div className="row">
          <span className="name">실제 당첨률</span>
          <span style={{fontSize: '10pt'}}>{probability((data.firstPrzwnerCo / data.total).toFixed(10))}</span>
        </div>
        <div className="row">
          <span className="name">1등 당첨 확률</span>
          <span style={{fontSize: '10pt'}}>{probability((1 / 8145060).toFixed(10))}</span>
        </div>
        <div className="row">
          <span className="name">오차</span>
          <span style={{fontSize: '10pt'}}>{probability(((data.firstPrzwnerCo / data.total) - (1 / 8145060)).toFixed(10))}
</span>
        </div>
      </div>

      {/* <div className="paper">
        <LottoPaper hasAuto={false} hasClear={false} numbers={{'1': true, '10': true, '20': true, '30': true, '40': true, '45': true}} />
      </div> */}
      <style jsx>{`
        .LottoOverview{
          text-align: center;
          color: white;
          padding: 0 4px;
        }
        .LottoOverview > h3{
          padding: 16px; 0;
        }
        .LottoOverview > .paper{
          background-color: white;
          padding: 16px;
        }
        .LottoOverview > .dataview{
          //display: flex;
          box-sizing: border-box;
          //border: 1px solid white;
          width: 100%;
          border-radius: 4px;
          //background-color: black;
          padding: 8px;
        }
        .LottoOverview > .dataview > .row{
          font-size: 8pt;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 0 32px;
        }
        .LottoOverview > .dataview > .row > .name{
          color: #7FDBFF;
        }
      `}</style>
    </div>
  )
}

export default LottoOverview;