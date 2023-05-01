import MapComponent from "@/components/map";
import LineGraph from "../../components/lineGraph";
import { useEffect, useState } from "react";
import axios from "axios";
import Datatable from "@/components/dataTable";

export default function Problem4() {
  const [data, setData] = useState<any>([]);
  const [newdata, setNewData] = useState<any>([]); //creating a copy or orginial data to filter
  const [clickedmarker, setClickedMarker] = useState("")
  const [cat, setCat] = useState(false);
  const [mapdata, setMapdata] = useState<any>([]);


  const GET_DATA = async () => {
    await axios.get('http://localhost:3000/api/hello').then((response: any) => {
      // console.log(response.data);
      setData(response.data);
      setNewData(response.data);
      // let newData = new Set(response.data.map((row: any) => row.Location));
      // setMapdata(newData);
      // console.log(newData, 'loc');
      // newData.forEach(element => { 
      //   for (let i = 0; i < response.data.length; i++) {
      //     const element = response.data[i];
      //   }
      //   const newData2 = response.data.filter((item: any) => item.Location === element); //data based on year year values
      //   console.log(newData2, "2");
      // });
    });
  }
  const getCurrentLoc = (val: any) => {
    setClickedMarker(`${val[1].toFixed(4)},${val[0]}`);
    console.log(newdata, 'newdata', `${val[0]},${val[1].toFixed(4)}`, 'coord');

    //   const data1 = newdata.filter((item: any) => {
    //   console.log(item,'itemsss');
    //     if( item.Location == `${val[1].toFixed(4)},${val[0]}`){
    //       return true
    //     }else{
    //       return false;
    //     }
    //  });
    //  console.log(data1,'tabel');

  }

  useEffect(() => {
    GET_DATA();
    // let newData = new Set(data.map((row: any) => row.Location));
    // setMapdata(newData);
    // console.log(newData,'loc');

    // getCurrentLoc([-60.1831,46.1351])
  }, [])

  useEffect(() => {
    if (clickedmarker) {
      const data1 = data.filter((item: any) => {
        console.log(item, 'itemsss');
        if (item.Location == clickedmarker) {
          return true
        } else {
          return false;
        }
      });
      console.log(data1, 'tabel');
      setNewData(data1);
      setCat(true);

    }
  }, [clickedmarker])


  return (
    <div>
      {data.length ? (
        <div>
          <MapComponent markerData={newdata} callback={getCurrentLoc} height={'60vh'} width={'100vh'} />
          <LineGraph markerData={newdata} category={cat} />
          <Datatable markerData={newdata} />
        </div>
      ) : ''}

    </div>

  )
} 
