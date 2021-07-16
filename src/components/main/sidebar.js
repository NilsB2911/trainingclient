import React, {Component} from 'react';
import "../../global/globalStyle.css";
import RoutineCard from "./routineCard";
import {observer} from "mobx-react";

import store from "../../context/Store";

@observer
class Sidebar extends Component {

    componentDidMount() {
        store.socket.on("newCurrentStep", (step) => {
            this.setStoreStep(step);
        })
    }

    emittingNewStep = (stepId) => {
        store.socket.emit("currentStepChanged", stepId);
        this.setStoreStep(stepId)
    }

    setStoreStep = (stepId) => {
        store.setStep(stepId);

        if(store.currentStep !== 0) {
            store.setPlayingFromSocket(true)
        }

        let passedTime = 0;

        for (let i = 0; i < stepId; i++) {
            passedTime += store.selectedWorkout.json[stepId].duration;
        }
        store.setElapsedTimeManually(passedTime);
    }

    render() {
        return (
            <div id={"cardDiv"}>
                <p id={"woName"} className={"bebas"}>{store.selectedWorkout.name}</p>
                {store.selectedWorkout.json ? store.selectedWorkout.json.map((v, index) => {
                    return (
                        <div onClick={() => this.emittingNewStep(index)}>
                            <RoutineCard key={index} id={v.id} name={v.name} time={v.duration}
                                         isSame={index === store.currentStep}/>
                        </div>
                    )
                }) : null}
            </div>
        );
    }
}

export default Sidebar;