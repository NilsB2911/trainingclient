import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logout from "./functionComponents/logout";

class Toolbar extends Component {
    render() {
        return (
            <div id={"toolbarDiv"}>
                <Link to={"/register"}>Registrieren</Link>
                <Link to={"/login"}>Login</Link>
                <Logout/>
            </div>
        );
    }
}

export default Toolbar;