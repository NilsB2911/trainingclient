import React, {Component} from 'react';
import store from "../../context/Store";
import {Button, Input} from "semantic-ui-react";
import {observer} from "mobx-react";

@observer
class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            allMsgs: []
        }
    }

    componentDidMount() {
        store.socket.on("newMsgToAppend", (msg) => {
            console.log(msg)
            let tmp = [...this.state.allMsgs];
            tmp.push(msg)
            this.setState({allMsgs: tmp});
        })
    }

    handleMsg = (e) => {
        this.setState({msg: e.target.value});
    }

    submitToSockets = () => {
        store.socket.emit("newMsg", {
            msg: this.state.msg,
            from: store.user.name
        });
        this.setState({msg: ""})
    }


    render() {
        return (
            <div>
                <div id={"messageSection"}>
                    {this.state.allMsgs.map((msgObj, index) => {
                            return (
                                <div className={"messageBlock"}>
                                    <div className={msgObj.from === store.user.name ? "flexStart" : "flexEnd"}>
                                        <p className={"username"}>{msgObj.from}</p>
                                        <p className={"message"}>{msgObj.msg}</p>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>


                <div id={"chatInput"}>
                    <Input
                        control={"input"}
                        type={"text"}
                        label={"Chat"}
                        onChange={(e) => this.handleMsg(e)}
                        value={this.state.msg}
                    />
                    <Button onClick={this.submitToSockets}>Send</Button>
                </div>
            </div>

        );
    }
}

export default ChatBar;