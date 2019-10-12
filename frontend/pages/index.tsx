import * as React from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { Lotto } from '../interfaces'
import axios from 'axios'
import { numberToWon } from '../utils';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import WinNumBox from "../components/WinNumBox";

const IndexPage: NextPage = ({ data }: any) => {
  const [numbers, setNumbers] = React.useState([]);
  React.useEffect(() => {
    setNumbers(data.Items.sort((a: Lotto, b: Lotto) => {
      if (a.drwNo > b.drwNo) {
        return 1;
      } else if (a.drwNo < b.drwNo) {
        return -1;
      } else {
        return 0;
      }
    }));
  }, []);
  function getMaximum() {
    const maximum = data.Items.reduce((prev: Lotto, cur: Lotto) => prev.totSellamnt > cur.totSellamnt ? prev : cur)
    return maximum;
  }
  function getMinimum() {
    const minimum = data.Items.reduce((prev: Lotto, cur: Lotto) => prev.totSellamnt > cur.totSellamnt ? cur : prev)
    return minimum;
  }
  function totalSellAmount() {
    const total = data.Items.reduce((acc: number, cur: Lotto) => acc + cur.totSellamnt, 0);
    return total;
  }
  function getMaxFirstWinAmnt() {
    const max = data.Items.reduce((prev: Lotto, cur: Lotto) => prev.firstWinamnt > cur.firstWinamnt ? prev : cur)
    return max;
  }
  function getMinFirstWinAmnt() {
    const min = data.Items.reduce((prev: Lotto, cur: Lotto) => (prev.firstWinamnt !== 0) && (cur.firstWinamnt !== 0) && prev.firstWinamnt > cur.firstWinamnt ? cur : prev)
    return min;
  }
  function distributes() {
    let temp: any = new Array(45).fill(0);

    data.Items.forEach((item: any) => {
      for (let i = 1; i <= 6; i++) {
        temp[item[`drwtNo${i}`] - 1]++;
      }
    });
    let arr = temp.map((item: any, index: number) => {
      return {
        key: index + 1,
        value: item
      }
    })
    return arr;
  }
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        {JSON.stringify(getMaximum())}
      </p>
      <p>
        {JSON.stringify(getMinimum())}
      </p>
      <p>
        {numberToWon(totalSellAmount())}원
      </p>
      <p>
        {JSON.stringify(getMaxFirstWinAmnt())}
      </p>
      <p>
        {JSON.stringify(getMinFirstWinAmnt())}
      </p>
      <BarChart
        width={1600}
        height={300}
        data={distributes()}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="key" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      <WinNumBox numbers={numbers} />
    </Layout>
  )
}
IndexPage.getInitialProps = async () => {
  const response = await axios.get("https://r6cpoaneyb.execute-api.ap-northeast-2.amazonaws.com/dev/scanAll");
  return { data: response.data }
}

export default IndexPage
