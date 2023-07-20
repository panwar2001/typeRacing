import React from "react";
import Navbar from "./Navbar/Navbar";
import Username from "./Username";
import Practice from "./Practice/Practice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (<>
    <Navbar/>
    <BrowserRouter>      
        <Routes>
           <Route exact path="/" element={<Username />}/>
           <Route  path="/Practice" element={<Practice/>}/>
           <Route  path="/MultiPlayer" element={<Practice/>}/>
        </Routes>
    </BrowserRouter>
    </>);
};

export default App;
