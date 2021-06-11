import 'semantic-ui-css/semantic.min.css';
import "./global/globalStyle.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainView from "./pages/mainView";
import Register from "./pages/register";
import Toolbar from "./components/toolbar";
import Login from "./pages/login";
import CreateWorkout from "./pages/createWorkout";
import SelectWorkout from "./pages/selectWorkout";

function App() {

    return (
        <div className="App">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Router>
                <Toolbar/>
                <Route exact path={"/"} component={MainView}/>
                <Route path={"/register"} component={Register}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/create"} component={CreateWorkout}/>
                <Route path={"/select"} component={SelectWorkout}/>
            </Router>
        </div>
    );
}

export default App;
