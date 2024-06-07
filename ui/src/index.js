import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import rootReducer from "./reducers";
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const store = configureStore({
    reducer:rootReducer,
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = {store}>   
   <BrowserRouter>
    <App />
</BrowserRouter>
    </Provider>
);


