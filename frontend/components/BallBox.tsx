import * as React from "react";
import { FaPlus } from "react-icons/fa";


/*
  data: {
    numbers: [1,4,9,11,16,29] | [1,4,9,11,16,29,2] // 배열의 length가 7이면 마지막 번호는 보너스 번호이다.
  }
*/
interface Props{
  data?: {
    numbers: Array<number> 
  }
}
const BallBox:React.FunctionComponent<Props> = ({data}:Props) => {
  const NUM1 = [1,2,3,4,5,6];
  const NUM2 = [1,5,11,19,23,36,12];
  return (
    <div className="BallBox">
      {
        NUM2.map((num:number,index:number) => {
          if(index===6){
            return (
              <>
                <span style={{ display: 'inline-flex', justifyContent:'center', alignItems:'center', width: '40px', textAlign: 'center' }}><FaPlus /></span>
                <span className={`ball drw${~~(num/10)+1}`}>{num}</span>
              </>
            )
          }
          return (
            <span className={`ball drw${~~(num/10)+1}`}>{num}</span>
          )
        })
      }
      <style jsx>{`
        .BallBox{
          padding: 8px 0;
          text-align: center;
        }
        .ball{
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          background: gray;
          color: white;
          font-weight: bold;
        }
        .ball+.ball{
          margin-left: 8px;
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
      `}</style>
    </div>
  )
}

export default BallBox;