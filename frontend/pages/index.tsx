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
import LatestLottoBox from "../components/LatestLottoBox";

interface Props {
  data: {
    [key: string]: Lotto
  }
}
const IndexPage: NextPage<Props> = ({ data }: Props) => {
  //console.log(data);
  const [totalRank, setTotalRank]: any = React.useState({});
  /*
    ranking: {
      1: {
        totSellamnt: {
          value: 1,
          with: [44]
        }, //전체 판매 금액
        firstPrzwnerCo: {
          value: 5,
          with: [412,423]
        }, // 1등 당첨자 수
        amount: {
          value: 3,
          with: [12,5]
        },  // 1등 당첨 금액
      } 
    }
  */
  React.useEffect(() => {
    const arr1: Array<Lotto> = Object.values(data);
    const arr2: Array<Lotto> = Object.values(data);
    const arr3: Array<Lotto> = Object.values(data);

    arr1.forEach((item: Lotto, index: number) => {

    })

    const totSellamnt: Array<Lotto> = arr1.sort((a: Lotto, b: Lotto) => {
      if (a.totSellamnt < b.totSellamnt) {
        return 1;
      } else if (a.totSellamnt > b.totSellamnt) {
        return -1;
      } else {
        return 0;
      }
    });
    const firstPrzwnerCo: Array<Lotto> = arr2.sort((a: Lotto, b: Lotto) => {
      if (a.firstPrzwnerCo < b.firstPrzwnerCo) {
        return 1;
      } else if (a.firstPrzwnerCo > b.firstPrzwnerCo) {
        return -1;
      } else {
        return 0;
      }
    });
    const firstWinamnt: Array<Lotto> = arr3.sort((a: Lotto, b: Lotto) => {
      if (a.firstWinamnt < b.firstWinamnt) {
        return 1;
      } else if (a.firstWinamnt > b.firstWinamnt) {
        return -1;
      } else {
        return 0;
      }
    });
    const obj: any = {};
    firstWinamnt.forEach((item: Lotto, index: number) => {
      obj[item.drwNo] = {
        firstWinamnt: {
          value: index + 1
        }
      }
    });
    firstPrzwnerCo.forEach((item: Lotto, index: number) => {
      obj[item.drwNo] = {
        ...obj[item.drwNo],
        firstPrzwnerCo: {
          value: index + 1
        }
      }
    });
    totSellamnt.forEach((item: Lotto, index: number) => {
      obj[item.drwNo] = {
        ...obj[item.drwNo],
        totSellamnt: {
          value: index + 1
        }
      }
    });

    console.log(obj);
  }, []);
  function getLatest() {
    return data[`${Object.keys(data).length}`];
  }
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="content">
        <LatestLottoBox data={getLatest()} />

      </div>
      <style jsx>{`
        .content{
          
        }
      `}</style>
    </Layout>
  )
}
IndexPage.getInitialProps = async () => {
  const response = await axios.get("https://r6cpoaneyb.execute-api.ap-northeast-2.amazonaws.com/dev/scanAll");
  const obj: any = {};
  await response.data.Items.forEach((item: any) => {
    obj[`${item.drwNo}`] = item;
  })
  return { data: obj };
}

export default IndexPage
