import React, { useState } from "react";
import "./App.css";
import "./fonts/PlayfairDisplay-Regular.ttf";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ButtonAppBar from "./Components/Create/header/HeaderNav";
import HomePage from "./Components/home/HomePage";
import EditBio from "./Components/EditBio/EditBio";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails";
import Login from "./Components/login/Register";
import HomeLogin from "./Components/loginHome/HomeLogin";
import Bio from "./Components/Bio/Bio";

function App() {
  return (
    // <Bio />
    // <EditBio />
    <Router>
      <div className="App">
        {/* <ButtonAppBar isHomePage={true} /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<ProfileDetails />} />
          <Route path="/home-login" element={<HomeLogin />} />
          <Route path="/dashboard" element={<Bio />} />
          <Route path="/dashboard/edit" element={<EditBio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
//http://localhost:5173/