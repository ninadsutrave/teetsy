import React from 'react'
import {  Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css';
import Homepage from './Components/Homepage'
import Error404 from './Components/Error'

const App = () => {

  return (

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="*" element={<Error404/>} />
        </Routes>      
    </BrowserRouter>
    
  );
}

export default App;