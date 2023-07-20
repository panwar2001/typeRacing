import React from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home";
import Practice from "./Practice/Practice";
import Multiplayer from "./Multiplayer/Multiplayer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (<>
    <Navbar/>
    <BrowserRouter>      
        <Routes>
           <Route exact path="/" element={<Home />}/>
           <Route  path="/Practice" element={<Practice/>}/>
           <Route  path="/MultiPlayer" element={<Multiplayer/>}/>
        </Routes>
    </BrowserRouter>
    </>);
};

export default App;
