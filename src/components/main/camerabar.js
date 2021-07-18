import React, {Component} from 'react';
import {observer} from "mobx-react";

//Keine Ahnung, warum das hier notwendig war
import { withRouter } from 'react-router-dom';

import store from "../../context/Store";

@observer
class Camerabar extends Component {

    leaveRoom = () => {
        store.socket.disconnect("user exit")
        store.setRoomId(null)
        this.props.history.push("/");
    }

    render() {
        return (
            <div id={"heightDef"}>
                <div id={store.roomId ? "cameraBarWith" : "cameraBarWithout"}>
                    Hallo
                </div>
                <div id={store.roomId ? "leaveButton" : "noLeaveButton"}>
                    <div onClick={() => this.leaveRoom()} id={"actualLeaveButton"} className={"bebas"}>Leave room</div>
                </div>
            </div>
        );
    }
}

export default withRouter(Camerabar);