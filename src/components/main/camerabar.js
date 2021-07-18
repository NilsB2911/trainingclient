import React, {Component} from 'react';
import {observer} from "mobx-react";

import store from "../../context/Store";

@observer
class Camerabar extends Component {
    render() {
        return (
            <div id={"heightDef"}>
                <div id={store.roomId ? "cameraBarWith" : "cameraBarWithout"}>
                    Hallo
                </div>
                <div id={store.roomId ? "leaveButton" : "noLeaveButton"}>
                    <div id={"actualLeaveButton"}>Leave room</div>
                </div>
            </div>
        );
    }
}

export default Camerabar;