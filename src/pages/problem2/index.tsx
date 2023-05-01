import csvParser from 'csv-parser';
import * as fs from'fs';
import Datatable from "../../components/dataTable";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Problem2() {

  const[data,setData] = useState<any>([]);

  const GET_DATA = async() => {
    await axios.get('http://localhost:3000/api/hello').then((response : any) => {
      console.log(response.data);
      setData(response.data)})
  }
  
  useEffect(()=> {
    GET_DATA();
  }, [])

  return (
    <div>
    {data.length ? (
        <Datatable  markerData={data}/>
     ) : ''}
      </div>
      
    )
} 
