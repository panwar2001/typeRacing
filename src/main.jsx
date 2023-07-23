import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from "./Navbar/Navbar";
import Home from './Home';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <Home/>
 </React.StrictMode>,
)
