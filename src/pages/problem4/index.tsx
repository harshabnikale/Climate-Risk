import MapComponent from "@/components/map";
import LineGraph from "../../components/lineGraph";
import { useEffect, useState } from "react";
import axios from "axios";
import Datatable from "@/components/dataTable";
import { APIROUTES } from "../../constants/apiRoutes";

export default function Problem4() {
  const [data, setData] = useState<any>([]);
  const [newdata, setNewData] = useState<any>([]); //creating a copy or orginial data to filter
  const [clickedmarker, setClickedMarker] = useState("")
  const [cat, setCat] = useState(false);
  const [mapdata, setMapdata] = useState<any>([]);


  const GET_DATA = async () => {
    await axios.get(APIROUTES.GET_DATA_FROM_CSV).then((response: any) => {
      // console.log(response.data);
      setData(response.data);
      setNewData(response.data);
      // let newData = new Set(response.data.map((row: any) => row.Location));
      // console.log(newData, 'loc');
      // // });
      if (response.data) {
        const result = Object.values(
          response.data.reduce((acc: any, obj: any) => ({ ...acc, [obj.Location]: obj }), {})
        );
        setMapdata(result);
      }
    });
  }
  const getCurrentLoc = (val: any) => {
    setClickedMarker(`${val[1].toFixed(4)},${val[0].toFixed(4)}`);

  }

  useEffect(() => {
    GET_DATA();

  }, [])

  useEffect(() => {
    if (clickedmarker) {
      const data1 = data.filter((item: any) => {
        if (item.Location == clickedmarker) {
          return true
        } else {
          return false;
        }
      });
      setNewData(data1);
      setCat(true);

    }
  }, [clickedmarker])


  return (
    <div>
      {data.length ? (
        <div>
          <div className="flex">
            <MapComponent markerData={mapdata} callback={getCurrentLoc} height={'60vh'} width={'100vh'} />
            <LineGraph markerData={newdata} category={cat} width={700} />
          </div>
          <div>
            <Datatable markerData={newdata} />
          </div>
        </div>
      ) : ''}

    </div>

  )
} 
