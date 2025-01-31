// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup"; // Path to your Signup component
import Login from "./components/Login"; // Path to your Login component
import Home from "./components/Home";
import Uploadform from "./components/Uploadform";
import Allresearch from "./components/Allresearch";
import Landing from "./components/Landing";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define Routes for Login and Signup */}
        <Route path="/Landing" element={<Landing/>}/>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Uploadform" element={<Uploadform />} />
        <Route path="/Allresearch" element={<Allresearch />} />
      </Routes>
    </Router>
  );
};

export default App;
