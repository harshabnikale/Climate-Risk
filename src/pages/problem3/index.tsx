import axios from "axios";
import LineGraph from "../../components/lineGraph";
import csvParser from 'csv-parser';
import * as fs from'fs';
import { useEffect, useState } from "react";

export default function Problem3() {
  const[data,setData] = useState<any>([]);

  const GET_DATA = async() => {
    await axios.get('http://localhost:3000/api/hello').then((response : any) => {
      console.log(response.data);
      setData(response.data)})
  }
  const getCurrentLoc = (val:any) => {
    console.log(val,'line gprah val')
  }
  
  useEffect(()=> {
    GET_DATA();
  }, [])


  return (
    <div>
  {data.length ? (
      <LineGraph  markerData={data} />
   ) : ''}
    </div>
  )
} 
