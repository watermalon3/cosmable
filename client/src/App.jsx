import React, { useState } from "react";
import "./App.css";
import "./fonts/PlayfairDisplay-Regular.ttf";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ButtonAppBar from "./Components/Create/header/HeaderNav";
import HomePage from "./Components/home/HomePage";
import Bio from "./Components/Bio/Bio";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails";
import Login from "./Components/login/login";
import HomeLogin from "./Components/loginHome/HomeLogin";

function App() {
  return (
    <Router>
      <div className="App">
        <ButtonAppBar isHomePage={true} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<ProfileDetails />} />
          <Route path="/home-login" element={<HomeLogin />} />
          <Route path="/dashboard" element={<Bio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
