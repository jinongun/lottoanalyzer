const s = ["만", "억", "조", "경", "해"];
export function numberToWon(number:number):string{
  let str = number.toString();
  let arr = [];
  while(str.length){
    arr.push(str.slice(-4));
    str = str.slice(0,-4);
  }
  for(let i = 1; i<arr.length; i++){
    arr[i] = arr[i]+s[i-1];
  }
  arr.reverse();
  return arr.join("");
}