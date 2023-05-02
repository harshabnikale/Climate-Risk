
import MapComponent from "../../components/map";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIROUTES } from "../../constants/apiRoutes";
import { Navbar } from "@/components/navbar";

export default function Problem1() {

  const [data, setData] = useState<any>([]);
  console.log(APIROUTES.GET_DATA_FROM_CSV, 'api')
  const GET_DATA = async () => {
    await axios.get(APIROUTES.GET_DATA_FROM_CSV).then((response: any) => {
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
  return (
    <div>
      <Navbar activeClass={1}/>
      <div>
        {data.length ? (
          <MapComponent markerData={data} height={'85vh'} width={''} callback={dummyFunction} />
        ) : ''}
      </div>
    </div>

  )
}

