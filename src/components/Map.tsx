import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Directions from './Directions';

export default function GoogleMapRoute() {
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}>
        <Map fullscreenControl={false}>
          <Directions />
        </Map>
      </APIProvider>
    </div>
  );
}
