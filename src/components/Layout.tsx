import styled from '../Theme/themed-components';
import { useState, useEffect } from 'react';
import Header from './Headers';
import Loading from '../common/Loading';
import Section1 from './Section1';
import axiosSet from '../common/axiosSet';

// const Main = styled.main`
//   width: 100%;
//   height: 100vh;
//   background-color: #fff;
//   border-radius: 20px;
//   overflow: hidden;
// `;

export interface DataObject {
  close: string;
  day: string;
  high: string;
  low: string;
  market: string;
  name: string;
  open: string;
  volume: string;
  [index: number]: any; // Index Signature
} // 배열안에있는 객체 프로퍼티 타입 선언

const Layout = () => {
  const [StockType, setSTockType] = useState<string>('kospi');
  const [loading, setLoading] = useState<boolean>(true);
  const [data, getData] = useState<DataObject[]>([]);

  const getStockType = (Type: string) => {
    setSTockType(Type);
  };

  useEffect(() => {
    const getDatas = async () => {
      try {
        setLoading(true);
        await axiosSet.get(`/${StockType}`).then((res) => {
          getData(res.data);
        });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getDatas();
  }, [StockType]);
  //header에서 받아오는 셀렉트값에 따른 다른 데이터 송출

  let volumearr: any = [];
  data.forEach((value) => {
    volumearr.push([
      value[0],
      {
        gap: value[0].close - value[1].close,
        percent: (value[0].close - value[1].close) / (value[0].close / 100),
        mid: value[1].mid,
        medomesu: value[1].medomesu,
      },
    ]);
  });
  const setvolume = volumearr.sort(
    (a: any, b: any) => b[0].volume - a[0].volume
  );

  return (
    <>
      <div className='main'>
        <Header getStockType={getStockType}></Header>
        {loading ? (
          <Loading></Loading>
        ) : data && StockType === 'kospi' ? (
          <Section1 volume={setvolume}></Section1>
        ) : (
          <Section1 volume={setvolume}></Section1>
        )}
      </div>
    </>
  );
};

export default Layout;
