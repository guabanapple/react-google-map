import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Form from './components/Form';

type PointType = 'start' | 'waypoint' | 'goal';

function App() {
  interface State {
    id: string;
    name: string;
    type: PointType;
  }
  const orderList: string[] = ['start', 'waypoint', 'goal'];

  const initialState: State[] = [
    { id: nanoid(), name: '', type: 'start' },
    { id: nanoid(), name: '', type: 'waypoint' },
    { id: nanoid(), name: '', type: 'goal' },
  ];
  const [points, setPoints] = useState(initialState);

  const handleFormAddClick = (name: string, inputType: PointType) => {
    setPoints((prevPoints) => {
      const newPoints = prevPoints.map((prevPoint) =>
        prevPoint.type === inputType ? { ...prevPoint, name } : prevPoint
      );
      if (inputType === 'waypoint') {
        newPoints.push({ id: nanoid(), name: '', type: 'waypoint' });
      }

      // 並び替え: 'start' => 'goal' => 'waypoint'
      newPoints.sort((x, y) => orderList.indexOf(x.type) - orderList.indexOf(y.type));
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

  const pointsList = points.map((point: State) => (
    <Form
      key={point.id}
      id={point.id}
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
    </div>
  );
}

export default App;
