import React from 'react';

type PointType = 'origin' | 'waypoint' | 'destination';
interface State {
  id: string;
  name: string;
  type: PointType;
}

interface Props {
  points: State[];
  order: number[];
}

export default function ResultView({ points, order }: Props) {
  let origin: string = '';
  let destination: string = '';
  const waypoints: string[] = [];
  points
    .filter((point) => point.name !== '')
    .forEach((point) => {
      switch (point.type) {
        case 'origin':
          origin = `${point.name} => `;
          break;
        case 'waypoint':
          waypoints.push(`${point.name} => `);
          break;
        case 'destination':
          destination = point.name;
          break;
        default:
          console.log('unexpected case');
          break;
      }
    });
  // orderに基づいてソート
  waypoints.sort((a, b) => {
    const indexA = order.indexOf(waypoints.indexOf(a));
    const indexB = order.indexOf(waypoints.indexOf(b));
    return indexA - indexB;
  });

  const concatArray: string[] = [origin, ...waypoints, destination];
  const convertToJsx = concatArray.map((item) => <span>{item}</span>);

  return <p>{convertToJsx}</p>;
}
