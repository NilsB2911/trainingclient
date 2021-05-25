import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logout from "./functionComponents/logout";
import {AuthContext} from "../context/AuthContext";

class Toolbar extends Component {
    render() {
        let user = this.context.currentUser
        return (
            <div id={"toolbarDiv"}>
                <div id={"floatRight"}>
                    {user ? <p>{this.context.currentUser.uid}</p> : <p>Not logged in</p>}
                    {user ? null : <Link to={"/register"} className={"linkClass"}>Registrieren</Link>}
                    {user ? <Logout/> : <Link to={"/login"} className={"linkClass"}>Login</Link>}
                    <Link to={user ? "/create" : "/login"} className={"linkClass"}>Create Workout</Link>
                </div>
            </div>
        );
    }
}

Toolbar.contextType = AuthContext;

export default Toolbar