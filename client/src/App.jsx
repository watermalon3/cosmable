import React, { useState } from "react";
import "./App.css";
import "./fonts/PlayfairDisplay-Regular.ttf";
import ButtonAppBar from "./Components/Create/header/HeaderNav";
import HomePage from "./Components/home/HomePage";
import Bio from "./Components/Bio/Bio";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails"
import Login from "./Components/login/login";
import HomeLogin from "./Components/loginHome/HomeLogin";


function App() {
  const [showHomeLogin, setShowHomeLogin] = useState(false);

  const handleLoginClick = () => {
    setShowHomeLogin(true);
  };

  return (
    <div className="App">
      {showHomeLogin ? (
        <HomeLogin />
      ) : (
        <>
          <ButtonAppBar isHomePage={true} onLoginClick={handleLoginClick} />
            <HomePage/>
            {/* <ProfileDetails/> */}
            {/* <HomeLogin /> */}
            {/* <Bio /> */}
            {/* <Login/> */}
    
        </>
      )}
    </div>
  );
}

export default App;