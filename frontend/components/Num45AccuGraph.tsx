import * as React from "react";
import { Lotto } from "../interfaces";

/*
  props = {
    data: {
      drwtNo1: {
        '2019-07': {}
      }
    }
  }
*/

interface Props {
  data: {
    [key: string]: {
      length: any
      [key: string]: Array<number>;
    }
  }
}

const NAME = ['drwtNo1', 'drwtNo2', 'drwtNo3', 'drwtNo4', 'drwtNo5', 'drwtNo6'];

const Num45AccuGraph: React.FunctionComponent<Props> = ({ data }: Props) => {
  const [checkset, setCheckset] = React.useState([true, true, true, true, true, true]);

  function toggleCheckset(index: number) {
    setCheckset(Object.assign([], checkset, { [index]: !checkset[index] }));
  }
  console.log(data);
  console.log(console.log(Object.values(data)));
  return (
    <div className="Num45AccuGraph">
      <div className="row">
        {
          checkset.map((value: boolean, index: number) => {
            return (<Checkbox key={index} value={value} id={index} onChange={toggleCheckset} />);
          })
        }
      </div>
      {
        Object.keys(data).map((key: string) => {
          return (
            <div className="row" key={key}>
              {
                NAME.map((name: string, index: number) => {
                  return checkset[index] && (
                    <div className="abs">
                      {
                        data[key][`${name}`].map((num: number, jndex: number) => {
                          return <span key={jndex} className={`square ${name}`} style={{ opacity: num / data[key].length }} />
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
      {/* {
        Object.values(data).map((item:Lotto, index: number) => {
          return (
            <div className="row" key={item.drwNoDate}>
              {new Array(45).fill(0).map((i: number, jndex:number)=>{
                return <span key={jndex} className={`square ${coloring(item, jndex)}`} />
              })}
            </div>
          )
        })
      } */}
      {/* <div className="row">
        {
          new Array(45).fill(0).map((i:number, index:number) => {
            const reducer = Object.values(data).reduce((acc:any, cur:Lotto, index:number) => {
              return acc;
            },{ });
          })
        }
      </div> */}
      <style jsx>{`
        .Num45AccuGraph{
 
          width: 100%;
        }
        .row{
          position: relative;
          display: block;
          min-height: 8px;
        }
        .row + .row{
          margin-top: 2px;
        }
        .row > .abs{
          position: absolute;
          height: 8px;
          top: 0;
          left: 0;
        }
        .square{
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #d1d5d9;
          transition: background 0.4s linear;
        }
        .square + .square{
          margin-left: 2px;
        }
        .square + .square:nth-child(10n+1){
          margin-left: 4px;
        }
        .square.drwtNo1 { background: red; }
        .square.drwtNo2 { background: blue; }
        .square.drwtNo3 { background: yellow; }
        .square.drwtNo4 { background: green; }
        .square.drwtNo5 { background: purple; }
        .square.drwtNo6 { background: orange; }
      `}</style>
    </div>
  )
}
export default Num45AccuGraph;


const Checkbox: React.FunctionComponent<any> = ({ id, value, onChange }) => {
  const name = [`1st`, `2nd`, `3rd`, `4th`, `5th`, `6th`];
  return (
    <label htmlFor={name[id]}>
      <input type="checkbox" id={name[id]} checked={value} onChange={() => onChange(id)} />
      <span className="name">{name[id]} 번호</span>
      <style jsx>{`
        label{
          display: inline-flex;
          // flex-direction: column;
          align-items: center;
        }
        label > .name{
          font-size: 9pt;
        }
      `}</style>
    </label>
  )
}

