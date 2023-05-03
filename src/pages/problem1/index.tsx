
import MapComponent from "../../components/map";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIROUTES } from "../../constants/apiRoutes";
import { Navbar } from "@/components/navbar";
import { Button, CircularProgress } from '@mui/material';

export default function Problem1() {

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQues, setShowQues] = useState(false);

  console.log(APIROUTES.GET_DATA_FROM_CSV, 'api')
  const GET_DATA = async () => {
    setIsLoading(true);
    await axios.get(APIROUTES.GET_DATA_FROM_CSV).then((response: any) => {
      setIsLoading(false);
      console.log(response.data);
      setData(response.data)
    })
  }

  function dummyFunction() {
    return
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
            <Navbar activeClass={1} />
          </div>
          <div className="border-b-2 mx-5 p-5">
            <Button onClick={changeShowQues}>{!showQues ? 'Show Question' : 'Hide Question'}</Button>
            {showQues ? <div className="font-semibold text-xl p-2">Create an interactive map that displays the geographic locations from the provided dataset and highlights the relative risk levels using color-coded markers.</div> : ''}
          </div>
          <div>
            {data.length ? (
              <MapComponent markerData={data} height={'85vh'} width={''} callback={dummyFunction} />
            ) : ''}
          </div>
        </div>
      )}
    </div>
  )
}

