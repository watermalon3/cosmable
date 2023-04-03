import "./App.css";
import "./fonts/PlayfairDisplay-Regular.ttf";
import ButtonAppBar from "./Components/Create/header/HeaderNav";
import HomePage from "./Components/home/HomePage";
import Bio from "./Components/Bio/Bio";
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails";
import Login from "./Components/login/login";
import HomeLogin from "./Components/loginHome/HomeLogin";
import Routes from "./Components/Routes/Routes";
function App() {
  return (
    <>
      <ButtonAppBar />
      <HomeLogin />
      <Bio />
      <Login />
      <HomePage isHomePage={true} />    
       <ProfileDetails />
       <Routes />
    </>
  );
}

export default App;
