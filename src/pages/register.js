import React, {Component} from 'react';
import SubmitRegister from "../components/functionComponents/submitRegistration";
import {observer} from "mobx-react";
import {Input} from "semantic-ui-react";


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
                <div id={"registerTop"}>
                    <h2 id={"registerTag"} className={"bebas"}>Register</h2>
                    <div className={"spaceBetweenFields"}>
                        <Input
                            className={"registerField"}
                            label={"Mail"}
                            type="text"
                            value={this.state.email}
                            onChange={this.handleMail}
                        />
                        <Input
                            className={"registerField"}
                            label={"Name"}
                            type="text"
                            value={this.state.name}
                            onChange={this.handleName}
                        />
                        <Input
                            className={"registerField"}
                            label={"Password"}
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePw}
                        />
                        <Input
                            className={"registerField"}
                            label={"Repeat"}
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleCpw}
                        />
                    </div>
                    <SubmitRegister email={this.state.email} password={this.state.password}
                                    confirmPassword={this.state.confirmPassword} name={this.state.name}/>
                </div>
            </div>

        );
    }
}

export default Register;