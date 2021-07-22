import React, {Component} from 'react';
import store from "../../context/Store";
import {Button, Input} from "semantic-ui-react";
import {observer} from "mobx-react";

@observer
class ChatBarInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: "",
        }
    }

    handleMsg = (e) => {
        this.setState({msg: e.target.value});
    }

    submitMessage = () => {
        store.socket.emit("newMsg", {
            msg: this.state.msg,
            from: store.user.name
        })
        this.setState({msg: ""})
    }

    render() {
        return (
            <div id={"inputComponent"}>
                <Input
                    id={"inputComponentField"}
                    control={"input"}
                    type={"text"}
                    label={"Message"}
                    onChange={this.handleMsg}
                    value={this.state.msg}/>
                <Button onClick={this.submitMessage}>Send</Button>
            </div>
        );
    }
}

export default ChatBarInput;