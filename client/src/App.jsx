import React, { useState } from "react";
import "./App.css";
import "./fonts/PlayfairDisplay-Regular.ttf";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ButtonAppBar from "./Components/Create/header/HeaderNav";
import HomePage from "./Components/home/HomePage";
import EditBio from "./Components/EditBio/EditBio";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails";
import Register from "./Components/login/Register";
import HomeLogin from "./Components/loginHome/HomeLogin";
import Bio from "./Components/Bio/Bio";


function App() {
  const [userId, setUserId] = useState("")
  return (
    // <Bio />
    // <EditBio />
    <Router>
      <div className="App">
        {/* <ButtonAppBar isHomePage={true} /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register setUserId={setUserId} />} />
          <Route path="/profile-details" element={<ProfileDetails userId={userId} />} />
          <Route path="/home-login" element={<HomeLogin setUserId={setUserId}/>} />
          <Route path="/dashboard" element={<Bio userId={userId}/>} />
          <Route path="/dashboard/edit" element={<EditBio userId={userId}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
