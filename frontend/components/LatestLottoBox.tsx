import * as React from "react";
import { Lotto } from '../interfaces';
import { FaPlus } from "react-icons/fa";
import { numberToWon } from '../utils';

const BALL = ['drwtNo1', 'drwtNo2', 'drwtNo3', 'drwtNo4', 'drwtNo5', 'drwtNo6'];

interface Props{
  data: Lotto
}
const LatestLottoBox: React.FunctionComponent<Props> = ({data}:Props) => {
  console.log(data);
  return (
    <div className="LatestLottoBox">

      <h3>{data.drwNo}회차 로또 당첨 번호</h3>
      <p style={{fontSize: '11pt', color: 'gray', padding: '8px'}}>{data.drwNoDate} 추첨</p>
      <div className="numberBox">
        {
          BALL.map((i:string)=><LottoBall key={i} number={data[i]} />)
        }
        <span style={{display: 'inline-block',width: '48px', textAlign: 'center'}}><FaPlus /></span>
        <LottoBall number={data['bnusNo']} />
      </div>
      {/* <h4 style={{padding: '16px 0'}}>총 판매금액 : {numberToWon(data.totSellamnt)}원</h4> */}
      <div className="calculator">
      <div>
          <p className="decimalNum">{numberToWon(data.totSellamnt)}원</p>
          <p className="name">총 판매금액</p>
        </div>
        <div>
          <p className="decimalNum">{(data.firstPrzwnerCo)} 명</p>
          <p className="name">1등 당첨자 수</p>
        </div>
        <div>
          <p className="decimalNum">{numberToWon(data.firstAccumamnt)} 원</p>
          <p className="name">1등 당첨 금액</p>
        </div>
      </div>
      <div className="calculator" style={{display: 'flex'}}>
        <div>
          <p className="decimalNum">{(data.firstPrzwnerCo/data.total).toFixed(10)}%</p>
          <p className="name">실제 당첨자 비율</p>
        </div>
        <div>
          <p className="decimalNum">{(1/8145060).toFixed(10)}%</p>
          <p className="name">수학적 당첨 확률</p>
        </div>
        <div>

          <p className={`decimalNum ${Math.sign((data.firstPrzwnerCo/data.total) - (1/8145060)) === 1 ? 'plus' : 'minus'}`}>{((data.firstPrzwnerCo/data.total) - (1/8145060)).toFixed(10)}%</p>
          <p className="name">오차</p>
        </div>
      </div>
      <style jsx>{`
        .LatestLottoBox{
          padding: 40px 0;

          width: 100%;
          background-color: #f1f3f9;
          text-align: center;
        }
        .LatestLottoBox > h3 {
          padding: 8px;
        }
        .LatestLottoBox > .numberBox{
          // background-color: green;
          padding: 8px 0;
          text-align: center;
        }
        .LatestLottoBox > .calculator{
          display: flex;
          justify-content: space-around;
          margin: 16px 0;
        }
        .LatestLottoBox > .calculator .decimalNum{
          font-size: 11pt;
          font-weight: bold;
          padding-bottom: 8px;
        }
        .LatestLottoBox > .calculator .decimalNum.plus{
          color: blue;
        }
        .LatestLottoBox > .calculator .decimalNum.minus{
          color: red;
        }
        .LatestLottoBox > .calculator .name{
          font-size: 10pt;
          color: gray;
        }

      `}</style>
    </div>
  )
}

const LottoBall: React.FunctionComponent<any> = (props:any) => {
  return (
    <div className={`LottoBall drw${(~~(props.number/10)) +1}`}>
      <span className="number">{props.number}</span>
      <style jsx>{`
        .LottoBall{
          display: inline-block;
          width: 42px;
          height: 42px;
          border-radius: 100%;
          background: red;
          text-align: center;
          color: white;
        }
        .LottoBall.drw1{
          background-color: #FFBB00;
        }
        .LottoBall.drw2{
          background-color: #375E97;
        }
        .LottoBall.drw3{
          background-color: #FB6542;
        }
        .LottoBall.drw4{
          background-color: #B7B8B6;
        }
        .LottoBall.drw5{
          background-color: #598234;
        }
        .LottoBall + .LottoBall{
          margin-left: 8px;
        }
        .LottoBall > .number{
          text-align: center;
          line-height: 42px;
          font-weight: bold;
          font-size: 14pt;
        }
      `}</style>
    </div>
  )
}


export default LatestLottoBox;