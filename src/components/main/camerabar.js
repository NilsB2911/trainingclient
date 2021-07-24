import React, {Component} from 'react';
import {observer} from "mobx-react";
//import CameraView from "./cameraView";

//Keine Ahnung, warum das hier notwendig war
import {withRouter} from 'react-router-dom';

import store from "../../context/Store";
import UserCards from "./userCards";
import ChatBarMessages from "./chatBarMessages";
import ChatBarInput from "./chatBarInput";

@observer
class Camerabar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myWeb: null,
            allUserInRoom: []
        }

    }

    componentDidMount() {
        /*navigator.mediaDevices.getUserMedia({
            video: {
                height: 1080, width: 1920
            }
        }).then(stream => {
            this.setState({myWeb: stream})
        }).catch(err => console.log(err))*/

        store.socket.on("newUsernames", (array) => {
            this.setState({allUserInRoom: array}, () => {
                console.log(this.state.allUserInRoom)
            })
        })

        store.socket.on("userDisconnected", (leftId) => {
            let pointToSplice = 0
            for (let i = 0; i < this.state.allUserInRoom.length; i++) {
                if (leftId === this.state.allUserInRoom[i].userId) {
                    pointToSplice = i;
                }
            }
            let tmp = [...this.state.allUserInRoom];
            tmp.splice(pointToSplice, 1);
            this.setState({allUserInRoom: tmp})
        })
    }

    componentWillUnmount() {
        this.leaveRoom(false)
    }

    leaveRoom = (withPush) => {
        store.socket.disconnect()
        store.setRoomId(null)
        if (withPush === true) {
            this.props.history.push("/")
        }
    }


    render() {
        return (
            <div id={"heightDef"}>
                {store.roomId !== null ?
                    <div id={"frame"}>
                        <div id={"names"}>
                            <UserCards allUsers={this.state.allUserInRoom}/>
                        </div>
                        <div id={"comments"}>
                            <ChatBarMessages/>
                        </div>
                        <div id={"input"}>
                            <ChatBarInput/>
                        </div>
                    </div> :
                    <div id={"blockContent"}>
                        <p>You are not part of a room</p>
                    </div>}


                <div id={store.roomId ? "leaveButton" : "noLeaveButton"}>
                    <div onClick={() => this.leaveRoom(true)} id={"actualLeaveButton"} className={"bebas"}>Leave room</div>
                </div>
            </div>
        );
    }

}

export default withRouter(Camerabar);