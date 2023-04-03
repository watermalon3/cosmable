import { ReactDOM } from 'react-dom/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ButtonAppBar from "./Components/Create/header/HeaderNav"
import HomePage from "./Components/home/HomePage"
import LoginPage from "./Components/loginHome/HomeLogin"
import Bio from "./Components/Bio/Bio"
import ProfileDetails from "./Components/ProfileDetails/ProfileDetails"


function Routes() {
  return (
    <Router>
        <ButtonAppBar />
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/bio">
                <Bio />
            </Route>
            <Route path="/profiledetails">
                <ProfileDetails />
            </Route>
        </Switch>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)