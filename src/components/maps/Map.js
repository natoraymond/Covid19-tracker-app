import React from 'react'
import './Map.css';
import  { MapContainer, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../utils/util';


function Map({ countries, casesType, center, zoom}) {
  return (
    <div className='map'>
      {/* <LeafletMap center={center} zoom={zoom}> */}
      <MapContainer className='markercluster-map' center={[51.0, 19.0]} zoom={4} maxZoom={18} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
         {/* Loop through countries and draw circles on the screen */}
         {showDataOnMap(countries, casesType)}
      </MapContainer>
      {/* </LeafletMap> */}
    </div>
  );
}

export default Map;
