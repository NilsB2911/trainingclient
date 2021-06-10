import React, {Component} from 'react';
import "../../global/globalStyle.css";
import {observer} from "mobx-react";
//https://www.npmjs.com/package/react-countdown-circle-timer
import Countdown from 'react-countdown';

import store from "../../context/Store";

@observer
class RoutineInfo extends Component {
    constructor() {
        super();
        this.state = {
            completed: false
        }
    }

    incrementStore = () => {
        console.log(store.selectedWorkout.json.length)
        if (store.currentStep < store.selectedWorkout.json.length - 1) {
            setTimeout(function () {
                store.currentStep += 1;
            }, 2000)
        } else {
            this.setState({completed: true})
        }
    }

    render() {
        console.log(store.selectedWorkout.time);
        return (
            <div id={"infoBlock"} className={"headline"}>
                {store.selectedWorkout.name ?
                    <div>
                        <p>{store.selectedWorkout.json[store.currentStep].name}</p>
                        {this.state.completed === false ?
                            <Countdown
                                date={Date.now() + store.selectedWorkout.json[store.currentStep].duration * 1000}
                                onComplete={this.incrementStore}
                                key={store.currentStep}/> : <p>DONE</p>}
                    </div> : <p>None selected</p>
                }</div>
        );
    }
}

export default RoutineInfo;