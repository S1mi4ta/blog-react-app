// src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'; // Import BrowserRouter and Routes
import App from './App';
import HomeScreen from './screens/HomeScreen'; // Assuming you have a HomeScreen component
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import LoginScreen from './screens/LoginScreen';

const router= createBrowserRouter (
  createRoutesFromElements(
  <Route path="/" element={<App />}>
      <Route index={true}  path= "/" element={<HomeScreen />} />
      <Route path= "/login" element={<LoginScreen/>} />

    </Route>
)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  
);
