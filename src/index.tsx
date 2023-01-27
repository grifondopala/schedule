import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./store";
import { Provider } from "react-redux";


import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </React.StrictMode>
    </Provider>
);

reportWebVitals();
