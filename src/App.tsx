import React, { useState, createContext, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Form from './components/Form';
// eslint-disable-next-line import/no-cycle
import GoogleMapRoute from './components/GoogleMapRoute';
import ResultView from './components/ResultView';

type PointType = 'origin' | 'waypoint' | 'destination';
interface State {
  id: string;
  name: string;
  type: PointType;
}

const initialState: State[] = [
  { id: nanoid(), name: '', type: 'origin' },
  { id: nanoid(), name: '', type: 'waypoint' },
  { id: nanoid(), name: '', type: 'destination' },
];

export const userInputContext = createContext<State[]>(initialState);

function App() {
  const [points, setPoints] = useState<State[]>(initialState);
  const [countUp, setCountUp] = useState(0);
  const [waypointOrder, setWaypointOrder] = useState<number[]>([]);

  const handleFormAddClick = (id: string, name: string, inputType: PointType) => {
    let newPoints: State[] = [];
    setPoints((prevPoints) => {
      newPoints = prevPoints.map((prevPoint) => (prevPoint.id === id ? { ...prevPoint, name } : prevPoint));
      if (inputType === 'waypoint') {
        newPoints.splice(-1, 0, { id: nanoid(), name: '', type: 'waypoint' });
      }
      return newPoints;
    });
  };

  const handleFormEditClick = (id: string, name: string) => {
    setPoints((prevPoints) =>
      prevPoints.map((prevPoint) => (prevPoint.id === id ? { ...prevPoint, name } : prevPoint))
    );
  };

  const handleFormDeleteClick = (id: string) => {
    setPoints((prevPoints) => prevPoints.filter((prevPoint) => prevPoint.id !== id));
  };

  const handleSearchRoute = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCountUp((prevCount) => prevCount + 1);
  };

  const fetchWaypointOrder = (order: number[]): void => {
    setWaypointOrder(order);
  };

  const pointsList = points.map((point: State) => (
    <Form
      key={point.id}
      id={point.id}
      name={point.name}
      type={point.type}
      onAddClick={handleFormAddClick}
      onEditClick={handleFormEditClick}
      onDeleteClick={handleFormDeleteClick}
    />
  ));

  return (
    <div className="container">
      <h2>Best Route by GoogleMap</h2>
      <ul>{pointsList}</ul>
      <form method="post" onSubmit={handleSearchRoute}>
        <button type="submit" className="searchButton">
          検索
        </button>
      </form>
      {countUp > 0 && (
        <>
          <userInputContext.Provider value={points}>
            <GoogleMapRoute key={countUp} pushWaypointOrder={fetchWaypointOrder} />
          </userInputContext.Provider>
          <ResultView points={points} order={waypointOrder} />
        </>
      )}
    </div>
  );
}

export default App;
