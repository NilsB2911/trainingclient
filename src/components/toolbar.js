import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logout from "./functionComponents/logout";
import { observer } from 'mobx-react';

import store from "../context/Store";

@observer
class Toolbar extends Component {
    render() {
        return (
            <div id={"toolbarDiv"}>
                <p style={{color: "white"}}>{store.user.uid}</p>
                <div id={"floatRight"}>
                    {store.user.uid ? null : <Link to={"/register"} className={"linkClass"}>Registrieren</Link>}
                    {store.user.uid ? <Logout/> : <Link to={"/login"} className={"linkClass"}>Login</Link>}
                    <Link to={store.user.uid ? "/select" : "/login"} className={"linkClass"}>Select Workout</Link>
                    <Link to={store.user.uid ? "/create" : "/login"} className={"linkClass"}>Create Workout</Link>
                </div>
            </div>
        );
    }
}

export default Toolbar;