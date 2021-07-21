import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Input, Button} from "semantic-ui-react";
//import CameraView from "./cameraView";

//Keine Ahnung, warum das hier notwendig war
import {withRouter} from 'react-router-dom';

import store from "../../context/Store";

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
        store.setRoomId(null)
        this.props.history.push("/");
    }

    handleMsg = (e) => {
        this.setState({msg: e.target.value});
    }

    submitToSockets = () => {
        console.log(this.state.msg);
        this.setState({msg: null})
    }

    render() {
        return (
            <div id={"heightDef"}>
                <div id={store.roomId ? "cameraBarWith" : "cameraBarWithout"}>
                    {this.state.allUserInRoom.length > 0 ? <div>
                        {this.state.allUserInRoom.map((userObj, index) => {
                            return (
                                <div className={"videoNameWrapper"} key={index}>
                                    {/*<CameraView stream={this.state.myWeb}/>*/}
                                    <p>{userObj.userId}</p>
                                    <p>{userObj.nickname}</p>
                                </div>
                            )
                        })}
                    </div> : <p>No mate in room yet</p>}
                    {store.roomId ?
                        <div id={"chatInput"}>
                            <Input
                                control={"input"}
                                type={"text"}
                                label={"Chat"}
                                onChange={(e) => this.handleMsg(e)}
                                value={this.state.msg}
                            />
                            <Button onClick={this.submitToSockets}>Send</Button>
                        </div> : null}
                </div>
                <div id={store.roomId ? "leaveButton" : "noLeaveButton"}>
                    <div onClick={() => this.leaveRoom()} id={"actualLeaveButton"} className={"bebas"}>Leave room</div>
                </div>
            </div>
        );
    }

}

export default withRouter(Camerabar);