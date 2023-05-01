
import MapComponent from "../../components/map";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function problem1() {
  
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
      <MapComponent  markerData={data}  height={'85vh'}  width={''}/>
   ) : ''}
    </div>
    
  )
} 

