import * as React from "react";
import { Lotto } from "../interfaces";

interface Props{
  //numbers: Array<Lotto>
  data: {
    [key: string]: Lotto
  }
}
const Num45AccuGraph: React.FunctionComponent<Props> = ({ data }:Props) => {
  const [checkset, setCheckset] = React.useState([true, true, true, true, true, true]);

  function toggleCheckset(index:number){
    setCheckset(Object.assign([], checkset, {[index]: !checkset[index]}));
  }
  function coloring(item:Lotto, index:number){
    if(checkset[0] && item[`drwtNo1`] === (index + 1)) {
      return 'no1';
    }
    if(checkset[1] && item[`drwtNo2`] === (index + 1)) {
      return 'no2';
    }
    if(checkset[2] && item[`drwtNo3`] === (index + 1)) {
      return 'no3';
    }
    if(checkset[3] && item[`drwtNo4`] === (index + 1)) {
      return 'no4';
    }
    if(checkset[4] && item[`drwtNo5`] === (index + 1)) {
      return 'no5';
    }
    if(checkset[5] && item[`drwtNo6`] === (index + 1)) {
      return 'no6';
    }
  }
  console.log(data);
  return (
    <div className="Num45AccuGraph">
      <div className="row">
        {
          checkset.map((value:boolean, index:number) => {
            return (<Checkbox key={index} value={value} id={index} onChange={toggleCheckset} />);
          })
        }
      </div>
      {
        // Object.values(data).map((drwtNo:string, index:number) => {
        //   return null;
        // })
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
          height: 100px;
          width: 100%;
        }
        .row{
          display: flex;
        }
        .row + .row{
          margin-top: 2px;
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
        .square.no1 { background: red; }
        .square.no2 { background: blue; }
        .square.no3 { background: yellow; }
        .square.no4 { background: green; }
        .square.no5 { background: purple; }
        .square.no6 { background: orange; }
      `}</style>
    </div>
  )
}
export default Num45AccuGraph;


const Checkbox: React.FunctionComponent<any> = ({id, value, onChange}) => {
  const name = [`1st`,`2nd`,`3rd`,`4th`,`5th`,`6th`];
  return (
    <label htmlFor={name[id]}>
      <input type="checkbox" id={name[id]} checked={value} onChange={()=>onChange(id)} />
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

