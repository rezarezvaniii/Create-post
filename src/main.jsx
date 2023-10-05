import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>

      <ThemeProvider>
        <App />
      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>,
)