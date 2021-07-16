import React, {Component} from 'react';
import store from "../../context/Store";
import {observer} from "mobx-react";

@observer
class Pausebutton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            modalOpen: true
        }
    }

    componentDidMount() {
        store.socket.on("newPlaying", (data) => {
            store.setPlayingFromSocket(data);
            if (data === true) {
                this.props.startTimer();
            } else if (data === false) {
                this.props.stopTimer();
            }

        })
    }

    isPlayingTriggered = () => {
        store.setPlaying()

        if (store.isPlaying === true) {
            this.props.startTimer();
            store.socket.emit("playing", true)
        } else if (store.isPlaying === false) {
            this.props.stopTimer()
            store.socket.emit("playing", false)
        }

    }


    render() {
        return (
            <div>
                <div id={"cirlce"} onClick={this.isPlayingTriggered}>
                    <p className={"material-icons"}
                       id={"startStop"}>{store.isPlaying ? "pause" : "play_arrow"}</p>
                </div>
            </div>
        )
    }
}

export default Pausebutton;