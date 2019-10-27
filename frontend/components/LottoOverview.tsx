import * as React from "react";
import BallBox from "./BallBox";
import LottoPaper from "./LottoPaper";

interface Props{

}
const LottoOverview: React.FunctionComponent<Props> = ({}) => {
  return (
    <div className="LottoOverview">
      <h3>882회차 로또 통계</h3>
      <BallBox data={[1,10,20,30,40,45,2]} />
      <div className="dataview">
        <div className="row">
          <span className="name">총 판매액</span>
          <span style={{fontSize: '10pt'}}>828억1257만3000원</span>
        </div>
        <div className="row">
          <span className="name">1등 당첨 금액</span>
          <span style={{fontSize: '10pt'}}>42억1257만3000원</span>
        </div>
        <div className="row">
          <span className="name">1등 당첨자 수</span>
          <span style={{fontSize: '10pt'}}>5명</span>
        </div>
        <div className="row">
          <span className="name">실제 당첨률</span>
          <span style={{fontSize: '10pt'}}>0.0000001228%</span>
        </div>
        <div className="row">
          <span className="name">1등 당첨 확률</span>
          <span style={{fontSize: '10pt'}}>0.0000001228%</span>
        </div>
        <div className="row">
          <span className="name">오차</span>
          <span style={{fontSize: '10pt'}}>-0.0000000001%</span>
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
        }
        .LottoOverview > .dataview > .row > .name{
          color: #5994ce;
        }
      `}</style>
    </div>
  )
}

export default LottoOverview;