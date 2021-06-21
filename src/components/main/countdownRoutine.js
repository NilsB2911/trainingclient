import React, {Component} from 'react';
import "../../global/globalStyle.css";
import {observer} from "mobx-react";
//https://www.npmjs.com/package/react-countdown-circle-timer
import Countdown from 'react-countdown';

import store from "../../context/Store";
import audio from "../../global/stepDone.mp3";

@observer
class CountdownRoutine extends Component {
    constructor() {
        super();
        this.state = {
            completed: false,
        }
    }

    incrementStore = () => {
        if (store.currentStep < store.selectedWorkout.json.length - 1) {
            setTimeout(function () {
                store.setStep(store.currentStep + 1);
            }, 2000)
        } else {
            this.setState({completed: true})
        }
    }

    countdownRenderer = ({ hours, minutes, seconds, completed, total }) => {
        if (completed){
            new Audio(audio).play();
        }

        let hourString = hours < 10 ? "0" + String(hours) : hours;
        let minuteString = minutes < 10 ? "0" + String(minutes) : minutes;
        let secondString = seconds < 10 ? "0" + String(seconds) : seconds;

        if(total !== store.selectedWorkout.json[store.currentStep].duration * 1000) {
            store.incrementElapsedTime(1/2)
        }

        return(
            <div id={"countdownRenderer"}>
                <h4 id={"numberCountDown"}>{hourString}:{minuteString}:{secondString}</h4>
            </div>
        )
    }

    render() {
        return (
            <div id={"infoBlock"} className={"headline"}>
                {store.selectedWorkout.name ?
                    <div id={"nameAndTime"}>
                        <p id={"stepName"}>{store.selectedWorkout.json[store.currentStep].name}</p>
                        {this.state.completed === false ?
                            <Countdown
                                date={Date.now() + store.selectedWorkout.json[store.currentStep].duration * 1000}
                                onComplete={this.incrementStore}
                                key={store.currentStep}
                                renderer={this.countdownRenderer}/> : <p>DONE</p>}
                    </div> : <p>None selected</p>
                }</div>
        );
    }
}

export default CountdownRoutine;