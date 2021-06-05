import React, {Component} from 'react';
import SubmitRegister from "../components/functionComponents/submitRegistration";
import {AuthContext} from "../context/AuthContext";

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
        let user = this.context.user;
        return (
            <div id={"positionRegisterMiddle"}>
                {user ? <p style={{color: "white"}}>{user.json.uid}</p> : <p style={{color: "white"}}>Not logged in</p>}
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

Register.contextType = AuthContext

export default Register;