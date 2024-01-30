import React, { useEffect, useState } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import './Directions.css';

export default function Directions() {
  const origin: string = '大阪駅';
  const destination: string = '近鉄奈良駅';
  const transitPoints = [
    { location: 'あべのハルカス', stopover: true },
    { location: '東大寺', stopover: true },
    { location: 'JR神戸駅', stopover: true },
  ];
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
        waypoints: transitPoints,
        optimizeWaypoints: true,
      })
      .then((res) => {
        directionsRenderer.setDirections(res);
        setRoutes(res.routes);
      });
  }, [directionsService, directionsRenderer]);

  const orderNames: string[] = routes[0]?.waypoint_order?.map((name) => transitPoints[name].location);
  return (
    <div className="directions">
      <h3>{origin}</h3>
      <p>{orderNames}</p>
      <h3>{destination}</h3>
    </div>
  );
}
