import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RoomsManaContextProvider } from './contexts/RoomsManaContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RoomsManaContextProvider>
    <App />
  </RoomsManaContextProvider>
);
