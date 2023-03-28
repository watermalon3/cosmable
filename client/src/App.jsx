import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Bio from "./Components/Bio/Bio";
import Login from "./Components/login/Login";
import Almost from "./Components/Almost/Almost";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Login />
    <Almost />
    <Bio />
      
    </>
  );
}

export default App;
