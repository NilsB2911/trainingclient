import React, {Component} from 'react';
import SubmitLogin from "../components/functionComponents/submitLogin";

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
        return (
            <div id={"positionLoginMiddle"}>
                <div id={"loginTop"}>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
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

export default Login;