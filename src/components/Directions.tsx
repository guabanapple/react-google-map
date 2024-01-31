import React, { useEffect, useState, useContext } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
// eslint-disable-next-line import/no-cycle
import { userInputContext } from '../App';
import './Directions.css';

interface Type {
  pushWaypointOrder: (order: number[]) => void;
}

export default function Directions({ pushWaypointOrder }: Type) {
  const points = useContext(userInputContext);

  const origin: string = points[0].name;
  const destination: string = points[points.length - 1].name;
  const waypoints: google.maps.DirectionsWaypoint[] = points
    .filter((point) => point.type === 'waypoint' && point.name !== '')
    .map((point) => ({ location: point.name, stopover: true }));

  const travelMode = google.maps.TravelMode.DRIVING;

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!map || !routesLibrary) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary]);

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin,
        destination,
        travelMode,
        waypoints,
        optimizeWaypoints: true,
      })
      .then((res) => {
        directionsRenderer.setDirections(res);
        setRoutes(res.routes);
        pushWaypointOrder(res.routes[0]?.waypoint_order);
      });
  }, [directionsService, directionsRenderer]);

  return (
    <div>
      <p>aaa</p>
    </div>
  );
}
