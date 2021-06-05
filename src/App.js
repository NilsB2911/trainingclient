import "./global/globalStyle.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import React, {useState, useMemo} from "react";
import MainView from "./pages/mainView";
import Register from "./pages/register";
import Toolbar from "./components/toolbar";
import Login from "./pages/login";
import {AuthContext} from "./context/AuthContext";
import CreateWorkout from "./pages/createWorkout";
import SelectWorkout from "./pages/selectWorkout";

function App() {

    const [user, setUser] = useState(null);
    const userValue = useMemo(() => ({user, setUser}), [user, setUser]);

    return (
        <div className="App">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <AuthContext.Provider value={userValue}>
                <Router>
                    <Toolbar/>
                    <Route exact path={"/"} component={MainView}/>
                    <Route path={"/register"} component={Register}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/create"} component={CreateWorkout}/>
                    <Route path={"/select"} component={SelectWorkout}/>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
