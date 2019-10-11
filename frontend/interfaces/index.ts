import { number, string } from "prop-types"

// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}


export interface Lotto {
  id: string
  drwNo: number
  returnValue: string
  totSellamnt: number
  firstWinamnt: number
  firstAccumamnt: number
  total: number
  firstPrzwnerCo: number
  year: string
  month: string
  price: number
  createdAt: string
  drwNoDate: string
  bnusNo: number
  drwtNo1: number
  drwtNo2: number
  drwtNo3: number
  drwtNo4: number
  drwtNo5: number
  drwtNo6: number
}