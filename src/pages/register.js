import React, {Component} from 'react';
import SubmitRegister from "../components/functionComponents/submitRegistration";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
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

    render() {
        return (
            <div id={"positionRegisterMiddle"}>
                <div id={"registerTop"}>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={this.handleMail}
                    />
                    <input
                        type="text"
                        value={this.state.password}
                        onChange={this.handlePw}
                    />
                    <input
                        type="text"
                        value={this.state.confirmPassword}
                        onChange={this.handleCpw}
                    />
                    <SubmitRegister email={this.state.email} password={this.state.password}
                                    confirmPassword={this.state.confirmPassword}/>
                </div>
            </div>

        );
    }
}

export default Register;