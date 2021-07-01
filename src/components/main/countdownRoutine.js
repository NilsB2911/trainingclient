import React, {Component} from 'react';
import "../../global/globalStyle.css";
import {observer} from "mobx-react";
//https://www.npmjs.com/package/react-countdown-circle-timer
import Countdown from 'react-countdown';

import store from "../../context/Store";
import audio from "../../global/yaaah.mp3";
import Pausebutton from "./pausebutton";

@observer
class CountdownRoutine extends Component {
    constructor() {
        super();
        this.state = {
            completed: false,
            countdownApi: null,
            isPaused: true
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

    countdownRenderer = ({hours, minutes, seconds, completed, total}) => {
        if (completed) {
            new Audio(audio).play();
        }

        let hourString = hours < 10 ? "0" + String(hours) : hours;
        let minuteString = minutes < 10 ? "0" + String(minutes) : minutes;
        let secondString = seconds < 10 ? "0" + String(seconds) : seconds;

        if (total !== store.selectedWorkout.json[store.currentStep].duration * 1000) {
            store.incrementElapsedTime(1 / 2)
        }

        return (
            <div id={"countdownRenderer"}>
                <h4 id={"numberCountDown"}>{hourString !== "00" ? hourString + ":" : null}{minuteString}:{secondString}</h4>
            </div>
        )
    }

    setRef = (countdown) => {
        if (countdown) {
            this.setState({countdownApi: countdown.getApi()})
        }
    }

    startTimer = () => {
        //console.log("called from parent");
        this.state.countdownApi && this.state.countdownApi.start();
    }

    stopTimer = () => {
        //console.log("called from parent");
        this.state.countdownApi && this.state.countdownApi.pause();
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
                                autoStart={store.currentStep !== 0}
                                controlled={false}
                                ref={this.setRef}
                                renderer={this.countdownRenderer}/> : <p>DONE</p>}
                    </div> : <p>None selected</p>
                }
                {store.selectedWorkout.tid ? <div id={"placeButtonId"}>
                    <Pausebutton startTimer={this.startTimer} stopTimer={this.stopTimer}/>
                </div> : null}

            </div>
        );
    }
}

export default CountdownRoutine;