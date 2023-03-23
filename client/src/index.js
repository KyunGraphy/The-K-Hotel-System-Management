import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RoomsManaProvider } from './contexts/RoomsManaContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RoomsManaProvider>
    <App />
  </RoomsManaProvider>
);
