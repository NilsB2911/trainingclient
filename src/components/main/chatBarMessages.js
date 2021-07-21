import React, {Component, createRef} from 'react';
import store from "../../context/Store";
import {observer} from "mobx-react";

@observer
class ChatBarMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allMsgs: [],
            scrollToBottom: createRef()
        }
    }

    componentDidMount() {
        store.socket.on("newMsgToAppend", (msg) => {
            let tmp = [...this.state.allMsgs];
            tmp.push(msg)
            this.setState({allMsgs: tmp});
        })
    }

    render() {
        return (
            <div id={"commentsComponent"} ref={this.state.scrollToBottom}>
                {this.state.allMsgs.map((msgObj) => {
                    return (
                        <div className={msgObj.from === store.user.name ? "bubbles right" : "bubbles left"}>
                            <p className={"bubbleName bebas"}>{msgObj.from}</p>
                            <p className={"bubbleMsg bebas"}>{msgObj.msg}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ChatBarMessages;