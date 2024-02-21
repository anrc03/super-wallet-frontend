import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./App.css"
import './Index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { Provider } from 'react-redux'
import store from './components/redux/store.js'
import CurrencyProvider from './context/CurrencyProvider.jsx'
import axios from 'axios'
import { VITE_CURRENCY_API_URL, VITE_REST_COUNTRIES_API_URL } from './constant/CurrencyConverter.js'

axios.interceptors.request.use((config) => {
  const WHITE_LIST_URL = [
    "http://localhost:8088/api/auth/login/admins", 
    "http://localhost:8088/api/auth/login", 
    "http://localhost:8088/api/auth/register", 
    "http://localhost:8088/api/reset-password",
    VITE_CURRENCY_API_URL, 
    VITE_REST_COUNTRIES_API_URL
  ]
  if (WHITE_LIST_URL.includes(config.url)) return config
  const token = JSON.parse(localStorage.getItem("user")).token;
  const auth = token ? `Bearer ${token}` : "";
  config.headers.Authorization = auth;
  return config;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
