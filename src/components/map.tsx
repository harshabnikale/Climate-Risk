import { Map, Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { useEffect, useRef, useState } from 'react';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Circle, Fill, Icon, Stroke, Style } from 'ol/style.js';

function MapComponent({ markerData , callback, height , width }: any) {
  const mapRef = useRef(null);
  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState([]);  //storing data parsed from CSV file
  const [filteredData, setFilteredData] = useState([]); //storing filtered data based on user selects value in the dropdown
  const [options, setOptions] = useState([]); //setting options to dropdwon
  const [currentMarkers, setCurrentMarkers] = useState<any>(null);


  //adding style to markers
  const markerStyle1 = new Style({
    image: new Circle({
      radius: 9,
      fill: new Fill({
        color: 'orange',
      }),
      stroke: new Stroke({
        color: 'white',
        width: 2,
      }),
    }),
  });
  const markerStyle2 = new Style({
    image: new Circle({
      radius: 9,
      fill: new Fill({
        color: 'red',
      }),
      stroke: new Stroke({
        color: 'white',
        width: 2,
      }),
    }),
  });
  const markerStyle3 = new Style({
    image: new Circle({
      radius: 9,
      fill: new Fill({
        color: 'pink',
      }),
      stroke: new Stroke({
        color: 'white',
        width: 2,
      }),
    }),
  });
  const markerStyle4 = new Style({
    image: new Circle({
      radius: 9,
      fill: new Fill({
        color: 'purple',
      }),
      stroke: new Stroke({
        color: 'white',
        width: 2,
      }),
    }),
  });

  useEffect(() => {
    setData(markerData);
    setFilteredData(markerData);
    const uniqueValues = new Set(markerData.map((row: { Year: any; }) => row.Year));
    const sortedValues: any = Array.from(uniqueValues).sort();
    setOptions(sortedValues);
  }, [])

  useEffect(() => {
    if (mapRef.current) {
      
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
        overlays: []
      });

      //addign markers to map
      const markers: any = new VectorLayer({
        source: new VectorSource({
          features: filteredData.map((marker: any, index: number) => {
            const feature = new Feature({
              geometry: new Point(fromLonLat([marker.Long, marker.Lat])),
              name: marker.Asset_Name,
              // overlay: 'hi'
            });
            // console.log(marker.Long, marker.Lat, 'latlong');
            if (marker.Risk_Rating <= 0.25) {
              feature.setStyle(markerStyle1);
            } else if (marker.Risk_Rating >= 0.25 && marker.Risk_Rating <= 0.5) {
              feature.setStyle(markerStyle2);
            }
            else if (marker.Risk_Rating >= 0.5 && marker.Risk_Rating <= 0.75) {
              feature.setStyle(markerStyle3);
            }
            else {
              feature.setStyle(markerStyle4);
            }

            return feature;
          }),
        }),
      });


        // get coordinates on click
      map.on('click', function (evt) {
        const feature: any = map.getFeaturesAtPixel(evt.pixel)[0];
        if (feature) {
          const out = feature.getGeometry().getCoordinates();
          // console.log('out', out);
          const coordinate = toLonLat(out);
          console.log('coordinate:', coordinate);
          callback(coordinate)
        }
      });
      let layerExtent = markers.getSource().getExtent();
      map.getView().fit(layerExtent);
      // change mouse cursor when over marker
      map.on('pointermove', function (e) {
        const pixel = map.getEventPixel(e.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        const a:any = map.getTarget();
        a.style.cursor = hit ? 'pointer' : 'cursor';
      });




      map.addLayer(markers)


      // const overlayContainer = document.createElement('div');
      // overlayContainer.id = 'myOverlay';
      // overlayContainer.innerHTML = 'This is my overlay';
      // overlayContainer.style.position= 'absolute';
      // overlayContainer.style.zIndex='999'

      // const overlay = new Overlay({
      //   element: overlayContainer,
      //   positioning: 'bottom-center',
      //   offset: [0, -20]
      // });

      // map.addOverlay(overlay);



      return () => {
        map.setTarget(undefined);
      };
    }
  }, [filteredData]);



  //upload file from user input
  const handleFileUpload = (e: any) => {
    setFile(e.target.files[0]);
  };

  

  //filter data based on user selection from dropdown
  const filterDataBasedOnYear = (event: any) => {
    const selectedValue = event.target.value;
    const filteredData = data.filter((item: any) => item.Year === selectedValue);
    setFilteredData(filteredData);
  };

  return (
    <div>
      {data?.length ? (
        <div className='m-5'>
          <div className='font-medium text-lg'>Select a decade year:</div>
          <div className='my-3'>
            <select className='border-2 border-gray-600 px-5 py-1 w-50' onChange={filterDataBasedOnYear}>
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div ref={mapRef} style={{ height, width }}></div>
          <div id="popup"></div>

        </div>
      ) : (
        <div className='p-5 font-medium text-lg'>Please wait while Map is loading</div>
      )}
    </div>
  );
}
export default MapComponent;
