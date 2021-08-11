import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HandoutProvider } from "./contexts/HandoutContext";

ReactDOM.render(
  <React.StrictMode>
    <HandoutProvider>
      <App />
    </HandoutProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
