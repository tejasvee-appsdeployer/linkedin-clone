import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useEffect, useState } from "react";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Feed from './components/Feed';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <ToastContainer position='top-center' />
      <Routes>
        <Route exact path='/' element={<Feed/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
