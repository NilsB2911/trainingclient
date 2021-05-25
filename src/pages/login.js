import React, {Component} from 'react';
import SubmitLogin from "../components/functionComponents/submitLogin";
import {AuthContext} from "../context/AuthContext";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            pw: ""
        }
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value});
    };
    handlePw = (e) => {
        this.setState({pw: e.target.value});
    };

    render() {
        let user = this.context.currentUser
        return (
            <div id={"positionLoginMiddle"}>
                {user ? <p style={{color: "white"}}>{this.context.currentUser.uid}</p> : <p style={{color: "white"}}>Not logged in</p>}
                <div id={"loginTop"}>
                    <h2 id={"registerTag"} className={"bebas"}>Login</h2>
                    <p className={"bebas"}>Email</p>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                    <p className={"bebas"}>Password</p>
                    <input
                        type="text"
                        value={this.state.pw}
                        onChange={this.handlePw}
                    />
                    <SubmitLogin email={this.state.email} password={this.state.pw}/>
                </div>
            </div>

        );
    }
}

Login.contextType = AuthContext;

export default Login;