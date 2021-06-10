import React, {Component} from 'react';
import SubmitRegister from "../components/functionComponents/submitRegistration";
import {observer} from "mobx-react";

import store from "../context/Store";

@observer
class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            name: ""
        }
    }

    handleMail = (e) => {
        this.setState({email: e.target.value});
    };
    handlePw = (e) => {
        this.setState({password: e.target.value});
    };
    handleCpw = (e) => {
        this.setState({confirmPassword: e.target.value});
    };
    handleName = (e) => {
        this.setState({name: e.target.value});
    };

    render() {
        return (
            <div id={"positionRegisterMiddle"}>
                {store.user.uid ? <p style={{color: "white"}}>{store.user.uid}</p> : <p style={{color: "white"}}>Not logged in</p>}
                <div id={"registerTop"}>
                    <h2 id={"registerTag"} className={"bebas"}>Register</h2>
                    <p className={"bebas"}>Mail</p>
                    <input
                        className={"formInput"}
                        type="text"
                        value={this.state.email}
                        onChange={this.handleMail}
                    />
                    <input
                        className={"formInput"}
                        type="text"
                        value={this.state.name}
                        onChange={this.handleName}
                    />
                    <p className={"bebas"}>Password</p>
                    <input
                        className={"formInput"}
                        type="text"
                        value={this.state.password}
                        onChange={this.handlePw}
                    />
                    <p className={"bebas"}>Repeat password</p>
                    <input
                        className={"formInput"}
                        type="text"
                        value={this.state.confirmPassword}
                        onChange={this.handleCpw}
                    />
                    <SubmitRegister email={this.state.email} password={this.state.password}
                                    confirmPassword={this.state.confirmPassword} name={this.state.name}/>
                </div>
            </div>

        );
    }
}

export default Register;