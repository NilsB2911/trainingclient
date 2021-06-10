import React, {Component} from 'react';
import "../../global/globalStyle.css";
import RoutineCard from "./routineCard";
import {observer} from "mobx-react";

import store from "../../context/Store";

@observer
class Sidebar extends Component {
    render() {
        return (
            <div id={"cardDiv"}>
                <p id={"woName"} className={"bebas"}>{store.selectedWorkout.name}</p>
                {store.selectedWorkout.json.map((v, index) => {
                    return (
                        <RoutineCard key={index} id={v.id} name={v.name} time={v.duration}
                                     isSame={index === store.currentStep}/>
                    )
                })}
            </div>
        );
    }
}

export default Sidebar;