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
