import React from 'react';
import Header from './Components/Header';
import { Route, Routes } from "react-router-dom";
import Home from './Components/pages/Home';
import General from './Components/pages/General';
import Entertainment from './Components/pages/Entertainment';
import Business from './Components/pages/Business';
import Politics from './Components/pages/Politics';
import Sports from './Components/pages/Sports';
import Tech from './Components/pages/Tech';
import Travel from './Components/pages/Travel';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/general' element={< General />} ></Route>
        <Route path='/entertainment' element={<Entertainment />}></Route>
        <Route path='/business' element={<Business />}></Route>
        <Route path='/politics' element={<Politics />}></Route>
        <Route path='/sports' element={<Sports />}></Route>
        <Route path='/tech' element={<Tech />}></Route>
        <Route path='/travel' element={<Travel />} ></Route>
      </Routes>
      <Footer />
    </>
  )
};

export default App;
