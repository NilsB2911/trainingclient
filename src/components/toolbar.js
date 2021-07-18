import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {observer} from 'mobx-react';

import store from "../context/Store";
import Logout from "./functionComponents/logout";

@observer
class Toolbar extends Component {
    render() {
        return (
            <div id={"wrapper"}>
                <div id={"toolbarDiv"}>
                    <Link to={"/"} className={"linkClass"} id={"home"}>Train with me</Link>
                    {store.user.uid ?
                        <div id={"floatRight"}>
                            <Link to={"/select"} className={"linkClass"}>Select Workout</Link>
                            <Link to={"/create"} className={"linkClass"}>Create Workout</Link>
                        </div>
                        :
                        <div id={"floatRight"}>
                            {<Link to={"/register"} className={"linkClass"}>Registrieren</Link>}
                            {<Link to={"/login"} className={"linkClass"}>Login</Link>}
                        </div>
                    }
                    {store.user.uid ?
                        <div id={"alignLogoutRight"}>
                            <div id={"usernameCircle"}></div>
                            <Logout id={"loginButtonPosition"}/>
                        </div> :
                        null}

                </div>
            </div>

        );
    }
}

export default Toolbar;