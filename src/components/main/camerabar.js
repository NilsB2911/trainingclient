import React, {Component} from 'react';
import {observer} from "mobx-react";
//import CameraView from "./cameraView";

//Keine Ahnung, warum das hier notwendig war
import {withRouter} from 'react-router-dom';

import store from "../../context/Store";
import UserCards from "./userCards";
import ChatBar from "./chatBar";

@observer
class Camerabar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myWeb: null,
            allUserInRoom: [],
            msg: null,
            allMsgs: []
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
    }

    leaveRoom = () => {
        store.socket.emit("disconnect")
        store.setRoomId(null)
        this.props.history.push("/");
    }


    render() {
        return (
            <div id={"heightDef"}>

                <div id={"frame"}>
                    <div id={"names"}></div>
                    <div id={"comments"}></div>
                    <div id={"input"}></div>
                </div>

                <div id={store.roomId ? "leaveButton" : "noLeaveButton"}>
                    <div onClick={() => this.leaveRoom()} id={"actualLeaveButton"} className={"bebas"}>Leave room</div>
                </div>
            </div>
        );
    }

}

export default withRouter(Camerabar);