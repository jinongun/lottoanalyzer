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
      len: number
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
        Object.keys(data).map((key: string, index: number) => {
          return (
            <div className="row" key={key}>
              {
                NAME.map((name) => {
                  return (
                    <div className="abs">
                      {
                        data[key][`${name}`].map((num: number, jndex: number) => {
                          return <span key={jndex} className={`square ${num}`} style={{ background: 'red', opacity: num / data[key].length }} />
                        })
                      }
                    </div>
                  )
                })
              }
              <div className="abs">
                {
                  new Array(45).fill(0).map((num: number, jndex: number) => {
                    return <span key={jndex} className={`square`} />
                  })
                }
              </div>
              <div className="abs">
                {
                  data[key].drwtNo1.map((num: number, jndex: number) => {
                    return <span key={jndex} className={`square ${num}`} style={{ background: 'red', opacity: num / data[key].length }} />
                  })
                }
              </div>
              <div className="abs">
                {
                  data[key].drwtNo2.map((num: number, jndex: number) => {
                    return <span key={jndex} className={`square ${num}`} style={{ background: 'blue', opacity: num / data[key].length }} />
                  })
                }
              </div>
              <div className="abs">
                {
                  data[key].drwtNo3.map((num: number, jndex: number) => {
                    return <span key={jndex} className={`square ${num}`} style={{ background: 'green', opacity: num / data[key].length }} />
                  })
                }
              </div>
              <div className="abs">
                {
                  data[key].drwtNo4.map((num: number, jndex: number) => {
                    return <span key={jndex} className={`square ${num}`} style={{ background: 'purple', opacity: num / data[key].length }} />
                  })
                }
              </div>
              <div className="abs">
                {
                  data[key].drwtNo5.map((num: number, jndex: number) => {
                    return <span key={jndex} className={`square ${num}`} style={{ background: 'orange', opacity: num / data[key].length }} />
                  })
                }
              </div>
              <div className="abs">
                {
                  data[key].drwtNo6.map((num: number, jndex: number) => {
                    return <span key={jndex} className={`square ${num}`} style={{ background: 'orange', opacity: num / data[key].length }} />
                  })
                }
              </div>

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
          height: 100px;
          width: 100%;
        }
        .row{
          position: relative;
          display: flex;
          height: 8px;
        }
        .row + .row{
          margin-top: 2px;
        }
        .row > .abs{
          position: absolute;
          height: 8px;
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

