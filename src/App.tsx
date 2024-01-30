import React, { useState, createContext } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Form from './components/Form';
import GoogleMapRoute from './components/Map';

type PointType = 'origin' | 'waypoint' | 'destination';

function App() {
  interface State {
    id: string;
    name: string;
    type: PointType;
  }
  const orderList: string[] = ['origin', 'waypoint', 'destination'];
  const waypointsOrder: number[] = [];

  const fields = [{ type: 'origin' }, { type: 'waypoint' }, { type: 'destination' }];

  const initialState: State[] = [
    { id: nanoid(), name: '', type: 'origin' },
    { id: nanoid(), name: '', type: 'waypoint' },
    { id: nanoid(), name: '', type: 'destination' },
  ];
  const [points, setPoints] = useState(initialState);
  // const userInputContext = createContext<State[]>(initialState);

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

  const handleSearchButtonClick = (): void => {
    console.log('search');
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
  console.log(points);

  return (
    <div className="container">
      <h2>Best Route by GoogleMap</h2>
      <ul>{pointsList}</ul>
      <button type="button" onClick={handleSearchButtonClick}>
        検索
      </button>
      {/* <GoogleMapRoute /> */}
    </div>
  );
}

export default App;
