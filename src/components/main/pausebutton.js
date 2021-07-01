import React, {Component} from 'react';

class Pausebutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
    }

    isPlayingTriggered = () => {
        this.setState({isPlaying: !this.state.isPlaying}, () => {
            if (this.state.isPlaying === true) {
                this.props.startTimer();
            } else if (this.state.isPlaying === false) {
                this.props.stopTimer()
            }
        });
    }

    render() {
        return (
            <div id={"cirlce"} onClick={this.isPlayingTriggered}>
                <p className={"material-icons"} id={"startStop"}>{this.state.isPlaying ? "pause" : "play_arrow"}</p>
            </div>
        );
    }
}

export default Pausebutton;