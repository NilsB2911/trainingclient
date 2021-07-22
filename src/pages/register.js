import React, {Component} from 'react';
import SubmitRegister from "../components/functionComponents/submitRegistration";
import {observer} from "mobx-react";
import {Input, Label} from "semantic-ui-react";


@observer
class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            profilePicture: null,
            errorOnCreate: false
        }
    }

    receivedErrorOnCreate = () => {
        this.setState({errorOnCreate: true})
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
    handleProfilePicture = (e) => {
        this.setState({profilePicture: e.target.files[0]});
    }

    render() {
        return (
            <div id={"positionRegisterMiddle"}>
                <div id={"registerTop"}>
                    <h2 id={"registerTag"} className={"bebas"}>Register your "Train With Me"-Account</h2>
                    {this.state.errorOnCreate ? <p>Something went wrong here. Please try again later</p> : null}
                    <div className={"spaceBetweenFields"}>
                        <Input
                            className={"registerField"}
                            label={"E-Mail"}
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
                        <label id={"customUpload"}>
                            <Input
                                label={"Profile Picture"}
                                type="file"
                                onChange={this.handleProfilePicture}
                            />
                        </label>
                    </div>
                    <SubmitRegister email={this.state.email} password={this.state.password}
                                    confirmPassword={this.state.confirmPassword} name={this.state.name} profilePicture={this.state.profilePicture}
                                    onError={this.receivedErrorOnCreate}/>
                </div>
            </div>

        );
    }
}

export default Register;