import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RoomsManaProvider } from './contexts/RoomsManaContext';
import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RoomsManaProvider>
      <App />
    </RoomsManaProvider>
  </AuthContextProvider>
);
