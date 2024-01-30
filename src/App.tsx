import React, { useState, createContext, useCallback } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Form from './components/Form';
// eslint-disable-next-line import/no-cycle
import GoogleMapRoute from './components/Map';

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
  let waypointOrder: number[] = [];

  const [points, setPoints] = useState(initialState);
  const [showMap, setShowMap] = useState(false);

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
    setShowMap(true);
  };

  const fetchWaypointOrder = (order: number[]) => {
    waypointOrder = order;
    console.log(`order: ${waypointOrder}`);
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
      {showMap && (
        <userInputContext.Provider value={points}>
          <GoogleMapRoute pushWaypointOrder={fetchWaypointOrder} />
        </userInputContext.Provider>
      )}
    </div>
  );
}

export default App;
