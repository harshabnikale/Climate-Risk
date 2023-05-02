import csvParser from 'csv-parser';
import * as fs from 'fs';
import Datatable from "../../components/dataTable";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIROUTES } from '../../constants/apiRoutes';
import { Navbar } from '@/components/navbar';

export default function Problem2() {

  const [data, setData] = useState<any>([]);

  const GET_DATA = async () => {
    await axios.get(APIROUTES.GET_DATA_FROM_CSV).then((response: any) => {
      console.log(response.data);
      setData(response.data)
    })
  }

  useEffect(() => {
    GET_DATA();
  }, [])

  return (
    <div>
      <Navbar activeClass={2}/>
      <div>
        {data.length ? (
          <Datatable markerData={data} />
        ) : ''}
      </div>

    </div>
  )
} 
