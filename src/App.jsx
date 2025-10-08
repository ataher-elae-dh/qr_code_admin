import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Nav from './Components/NavBar/Nav';
import Home from './Components/Home/Home';
import PrivateRoute from './Auth/PrivateRoute';
import Login from './Components/Login/Login';
import Story from './Components/Story/Story';
import Items from './Components/Items/Items';

const App = () => {
  return (
    <div>
      <Nav></Nav>

      

      <div className="p-4">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={<Login/>} />
          <Route path="/Story" element={<Story></Story>} />
          <Route path="/Items" element={ <PrivateRoute> <Items></Items> </PrivateRoute> } />
        </Routes>
      </div>
    </div>
  );
};

export default App;