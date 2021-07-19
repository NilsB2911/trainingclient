import React, {Component, createRef} from 'react';
import {observer} from "mobx-react";

//Keine Ahnung, warum das hier notwendig war
import {withRouter} from 'react-router-dom';

import store from "../../context/Store";

@observer
class Camerabar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUserInRoom: [],
            streams: createRef([])
        }
    }

    componentDidMount() {
        store.socket.on("newUsernames", (array) => {
            this.setState({allUserInRoom: array})
        })
    }

    leaveRoom = () => {
        store.socket.disconnect("user exit")
        store.setRoomId(null)
        this.props.history.push("/");
    }

    render() {
        return (
            <div id={"heightDef"}>
                {/*this.state.streams.map((stream, index) => {
                    return (
                        <video src={stream} key={index}/>
                    )
                })*/}
                <div id={store.roomId ? "cameraBarWith" : "cameraBarWithout"}>
                    {this.state.allUserInRoom.length > 0 ? <div>
                        {this.state.allUserInRoom.map((name, index) => {
                            return (
                                <p key={index}>{name}</p>
                            )
                        })}
                    </div> : <p>No mate in room yet</p>}
                </div>
                <div id={store.roomId ? "leaveButton" : "noLeaveButton"}>
                    <div onClick={() => this.leaveRoom()} id={"actualLeaveButton"} className={"bebas"}>Leave room</div>
                </div>
            </div>
        );
    }

}

export default withRouter(Camerabar);