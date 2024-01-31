import React, { useEffect } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
// eslint-disable-next-line import/no-cycle
import Directions from './Directions';

interface Type {
  pushWaypointOrder: (order: number[]) => void;
}

export default function GoogleMapRoute({ pushWaypointOrder }: Type) {
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}>
        <Map fullscreenControl={false}>
          <Directions pushWaypointOrder={pushWaypointOrder} />
        </Map>
      </APIProvider>
    </div>
  );
}
