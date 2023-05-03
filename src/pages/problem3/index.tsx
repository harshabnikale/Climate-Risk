import axios from "axios";
import LineGraph from "../../components/lineGraph";
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { useEffect, useState } from "react";
import { APIROUTES } from "../../constants/apiRoutes";
import { Navbar } from "@/components/navbar";
import { Button, CircularProgress } from '@mui/material';

export default function Problem3() {
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
  const getCurrentLoc = (val: any) => {
    console.log(val, 'line gprah val')
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
            <Navbar activeClass={3} />
          </div>
          <div className="border-b-2 mx-5 p-5">
            <Button onClick={changeShowQues}>{!showQues ? 'Show Question' : 'Hide Question'}</Button>
            {showQues ? <div className="font-semibold text-xl p-2">Create a line graph to visualize the changes in risk levels over time for a given location, Asset or Business Category.</div> : ''}
          </div>
          <div>
            {data.length ? (
              <LineGraph markerData={data} width={1500} />
            ) : ''}
          </div>
        </div>
      )}
    </div>
  )
} 
