import "./App.css";
import "./fonts/PlayfairDisplay-Regular.ttf";
import ButtonAppBar from "./Components/Create/header/HeaderNav";
import HomePage from "./Components/home/HomePage";
import Bio from "./Components/Bio/Bio";
import Almost from "./Components/Almost/Almost";
import Login from "./Components/login/login";
import HomeLogin from "./Components/loginHome/HomeLogin";

function App() {
  return (
    <>
      <ButtonAppBar isHomePage={true} />
      <HomeLogin />
      {/* <Almost/> */}
      {/* <HomePage/> */}
      {/* <Bio /> */}
      {/* <Login/> */}
    </>
  );
}

export default App;
