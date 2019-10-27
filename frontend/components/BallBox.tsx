import * as React from "react";
import { FaPlus } from "react-icons/fa";
import CountUp from "react-countup";

/*
  data: [1,4,9,11,16,29] | [1,4,9,11,16,29,2] // 배열의 length가 7이면 마지막 번호는 보너스 번호이다.
*/
interface Props{
  data: Array<number> 
  showEmpty?: boolean
}
const BallBox:React.FunctionComponent<Props> = ({data, showEmpty=false}:Props) => {
  return (
    <div className="BallBox">
      {
        data.map((num:number,index:number) => {
          if(index===6){
            return (
              <>
                <span style={{ display: 'inline-flex', justifyContent:'center', alignItems:'center', width: '36px', textAlign: 'center' }}><FaPlus fill="#fff" /></span>
                <span className={`ball drw${~~(num/10)+1}`}>{num}</span>
              </>
            )
          }
          return (
            <span key={`drw${num}`} className={`ball drw${~~(num/10)+1}`}>
              {num}
            </span>
          )
        })
      }
      {
        showEmpty && data.length === 0 && new Array(6).fill(0).map((num:number, index: number)=> {
          return (
            <span key={`drw${index}`} className={`ball empty`}>
              
            </span>
          )
        })
      }
      <style jsx>{`
        .BallBox{
          padding: 8px 0;
          text-align: center;
          display: flex;
          justify-content: center;
        }
        .ball{
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          background: gray;
          color: white;
          font-weight: bold;
        }
        .ball+.ball{
          margin-left: 4px;
        }

        .ball:nth-child(7){
          background-color: red;
        }
        .ball.drw1{
          background-color: #FFBB00;
        }
        .ball.drw2{
          background-color: #375E97;
        }
        .ball.drw3{
          background-color: #FB6542;
        }
        .ball.drw4{
          background-color: #B7B8B6;
        }
        .ball.drw5{
          background-color: #598234;
        }
        .ball.empty{
          background-color: #e1e5e9;
        }
      `}</style>
    </div>
  )
}

export default BallBox;