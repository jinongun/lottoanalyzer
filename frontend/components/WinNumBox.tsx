import * as React from "react";
import { Lotto } from '../interfaces'

interface Props {
  numbers: Array<Lotto>

}
const WinNumBox: React.FunctionComponent<Props> = ({ numbers }) => {

  return (
    <>
      {
        numbers.map((item: Lotto, index: number) => {
          return (
            <div className="WinNumBox">
              
              {
                new Array(45).fill(0).map((i: number, index: number) => {
                  return (
                    <>
                      <div className={
                        `box ${(index + 1) === item[`drwtNo1`] ? 'win1' : ''}
                        ${(index + 1) === item[`drwtNo2`] ? 'win2' : ''}
                        ${(index + 1) === item[`drwtNo3`] ? 'win3' : ''}
                        ${(index + 1) === item[`drwtNo4`] ? 'win4' : ''}
                        ${(index + 1) === item[`drwtNo5`] ? 'win5' : ''}
                        ${(index + 1) === item[`drwtNo6`] ? 'win6' : ''}
                        `} />
                    </>
                  )
                })
              }
              <span>{item.drwNo}</span>
            </div>
          )
        })
      }
      <style jsx>{`
        .WinNumBox{
          display: block;
          font-size: 20pt;
        }
        .WinNumBox > .box{
          display: inline-block;
          width: 24px;
          height: 24px;
          background-color: gray;
        }
        .WinNumBox > .box.win1{
          background: red;
        }
        .WinNumBox > .box.win2{
          background: orange;
        }
        .WinNumBox > .box.win3{
          background: yellow;
        }
        .WinNumBox > .box.win4{
          background: green;
        }
        .WinNumBox > .box.win5{
          background: blue;
        }
        .WinNumBox > .box.win6{
          background: purple;
        }
        .WinNumBox > .box + .box{
          margin-left: 8px;
        }
      `}
      </style>
    </>


  )
}

export default WinNumBox;