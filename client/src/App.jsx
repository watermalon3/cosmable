import "./App.css";
import ButtonAppBar from "./Components/Create/header/HeaderNav"
import HomePage from "./Components/home/HomePage";
import LoginPage from "./Components/loginHome/HomeLogin";
import Bio from "./Components/Bio/Bio";
import Almost from "./Components/Almost/Almost";

function App() {
  
  return (
    <>
      <ButtonAppBar/>
      {/* <Almost/> */}
      {/* <HomePage/> */}
      <LoginPage/>
      <Bio />
      
    </>
  );
}

export default App;
