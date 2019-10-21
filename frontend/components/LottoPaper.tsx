import * as React from "react";


interface Props{
  numbers: {
    [key: string]: boolean
  }
  setNumbers: Function
}
function delObj(num:any, numbers:any){
  const {[num]: bye, ...rest} = numbers;
  return rest;
}
const LottoPaper: React.FunctionComponent<Props> = ({numbers, setNumbers}) => {
  const [checked, setChecked]:any = React.useState({ });
  const NUM = new Array(45).fill(0).map((i:number,index:number)=>index+1);
  
  function toggle(num:number){
    if(numbers[num] === true){
      setNumbers(delObj(num, numbers));
    }else if(Object.keys(numbers).length < 6){
      setNumbers({...numbers, [num]: true });
    }
    
  }

  function auto(){
    const item = new Set();
    while (item.size < 6) { // O(1)
      let num = Math.floor(Math.random() * 45) + 1;
      item.add(num);
    }
    console.log(item);
    const obj:any = {};
    item.forEach((i:any)=> {
      obj[i]=true;
    })
    console.log(obj);
    setNumbers(obj);
    //setNumbers(item);
  }

  function generate(){
    let rows:any = [];
    let res:any = [];
    NUM.forEach((num: number)=> {
      rows.push(<span key={num} className={`box ${numbers[num] ? 'checked': ''}`}onClick={()=>toggle(num)}>{num}</span>);
      if(num%7===0){
        res.push(<div key={`row${num}`} className="row">{rows}</div>);
        rows = [];
      }
      if(num ===45){
        res.push(
        <div key={`row${num}`} className="row">
          {rows}
          <span className={`box`} style={{marginLeft: '32px'}} onClick={()=>auto()}>Auto</span>
          <span className={`box`} style={{}} onClick={()=>setNumbers({})}>Clear</span>
          
        </div>);
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
          text-align: left;
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
        .LottoPaper > .row >.box:hover{
          background-color: #f9f8f7;
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
export default LottoPaper;