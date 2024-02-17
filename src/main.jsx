import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./App.css"
import './Index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { Provider } from 'react-redux'
import store from './components/redux/store.js'
import axios from 'axios'

axios.interceptors.request.use((config) => {
  const WHITE_LIST_URL = ["http://localhost:8088/api/auth/login/admins", "http://localhost:8088/api/auth/login", "http://localhost:8088/api/auth/register"]
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
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
