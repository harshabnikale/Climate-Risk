import axios from "axios";
import LineGraph from "../../components/lineGraph";
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { useEffect, useState } from "react";
import { APIROUTES } from "../../constants/apiRoutes";
import { Navbar } from "@/components/navbar";

export default function Problem3() {
  const [data, setData] = useState<any>([]);

  const GET_DATA = async () => {
    await axios.get(APIROUTES.GET_DATA_FROM_CSV).then((response: any) => {
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


  return (
    <div>
      <Navbar activeClass={3} />
      <div>
        {data.length ? (
          <LineGraph markerData={data} width={1500} />
        ) : ''}
      </div>
    </div>

  )
} 
