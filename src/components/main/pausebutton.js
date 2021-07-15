import React, {Component} from 'react';
import store from "../../context/Store";

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
            this.setState({isPlaying: data}, () => {
                if (data === true) {
                    this.props.startTimer();
                } else if (data === false) {
                    this.props.stopTimer();
                }
            })
        })
    }

    isPlayingTriggered = () => {
        this.setState({isPlaying: !this.state.isPlaying}, () => {
            if (this.state.isPlaying === true) {
                this.props.startTimer();
                store.socket.emit("playing", true)
            } else if (this.state.isPlaying === false) {
                this.props.stopTimer()
                store.socket.emit("playing", false)
            }
        });
    }


    render() {
        return (
            <div>
                <div id={"cirlce"} onClick={this.isPlayingTriggered}>
                    <p className={"material-icons"}
                       id={"startStop"}>{this.state.isPlaying ? "pause" : "play_arrow"}</p>
                </div>
            </div>
        )
    }
}

export default Pausebutton;