import csvParser from 'csv-parser';
import * as fs from 'fs';
import Datatable from "../../components/dataTable";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIROUTES } from '../../constants/apiRoutes';
import { Navbar } from '@/components/navbar';
import { Button, CircularProgress } from '@mui/material';

export default function Problem2() {

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQues, setShowQues] = useState(false);

  const GET_DATA = async () => {
    setIsLoading(true);
    await axios.get(APIROUTES.GET_DATA_FROM_CSV).then((response: any) => {
      setIsLoading(false);
      console.log(response.data);
      setData(response.data)
    })
  }

  useEffect(() => {
    GET_DATA();
  }, [])

  const changeShowQues = () => {
    setShowQues(!showQues);
  }

  return (
    <div>
      {isLoading ? (
        <CircularProgress className="absolute inset-x-1/2 inset-y-1/4" />
      ) : (
        <div>
          <div className="border-b-2 mx-5 p-5">
            <Navbar activeClass={2} />
          </div>
          <div className="border-b-2 mx-5 p-5">
            <Button onClick={changeShowQues}>{!showQues ? 'Show Question' : 'Hide Question'}</Button>
            {showQues ? <div className="font-semibold text-xl p-2">Display the climate risk data in a table format, allowing users to sort and filter the dataset.</div> : ''}
          </div>
          <div>
            {data.length ? (
              <Datatable markerData={data} />
            ) : ''}
          </div>

        </div>
      )}
    </div>
  )
} 
