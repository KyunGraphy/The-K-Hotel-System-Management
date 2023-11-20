import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RoomProvider } from './contexts/RoomContext';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RoomProvider>
      <App />
    </RoomProvider>
  </AuthProvider>
);
