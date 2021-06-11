import React, {Component} from 'react';
import "../../global/globalStyle.css";
import {observer} from "mobx-react";
//https://www.npmjs.com/package/react-countdown-circle-timer
import Countdown from 'react-countdown';

import store from "../../context/Store";

@observer
class CountdownRoutine extends Component {
    constructor() {
        super();
        this.state = {
            completed: false
        }
    }

    incrementStore = () => {
        if (store.currentStep < store.selectedWorkout.json.length - 1) {
            setTimeout(function () {
                store.currentStep += 1;
            }, 2000)
        } else {
            this.setState({completed: true})
        }
    }

    countdownRenderer = ({ hours, minutes, seconds, completed }) => {
        let minuteString = minutes < 10 ? "0" + String(minutes) : minutes;
        let secondString = seconds < 10 ? "0" + String(seconds) : seconds;

        return(
            <div id={"countdownRenderer"}>
                <h4>{minuteString}:{secondString}</h4>
            </div>
        )
    }

    render() {
        return (
            <div id={"infoBlock"} className={"headline"}>
                {store.selectedWorkout.name ?
                    <div>
                        <p>{store.selectedWorkout.json[store.currentStep].name}</p>
                        {this.state.completed === false ?
                            <Countdown
                                date={Date.now() + store.selectedWorkout.json[store.currentStep].duration * 1000}
                                onComplete={this.incrementStore}
                                key={store.currentStep} renderer={this.countdownRenderer}/> : <p>DONE</p>}
                    </div> : <p>None selected</p>
                }</div>
        );
    }
}

export default CountdownRoutine;