
import MapComponent from "../../components/map";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIROUTES } from "../../constants/apiRoutes";

export default function Problem1() {
  
  const[data,setData] = useState<any>([]);
  console.log(APIROUTES.GET_DATA_FROM_CSV,'api')
  const GET_DATA = async() => {
    await axios.get(APIROUTES.GET_DATA_FROM_CSV).then((response : any) => {
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

