import "./App.css";
import Login from "./Components/login/login";
import ButtonAppBar from "./Components/Create/header/HeaderNav"
import Almost from "./Components/almost/Almost";
import HomePage from "./Components/home/HomePage";
import LoginPage from "./Components/loginHome/HomeLogin";


function App() {
  
  return (
    <>
      <ButtonAppBar/>
      {/* <Login/> */}
      {/* <Almost/> */}
      {/* <HomePage/> */}
      <LoginPage/>
    </>
  );
}

export default App;
