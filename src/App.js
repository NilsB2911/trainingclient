import "./global/globalStyle.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import React from "react";
import MainView from "./pages/mainView";
import Register from "./pages/register";
import {AuthProvider} from "./context/AuthContext";
import Toolbar from "./components/toolbar";
import Login from "./pages/login";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Toolbar/>
                    <Route exact path={"/"} component={MainView}/>
                    <Route path={"/register"} component={Register}/>
                    <Route path={"/login"} component={Login}/>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
