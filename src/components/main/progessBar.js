import React, {Component} from 'react';
import {observer} from "mobx-react";

import store from "../../context/Store";

@observer
class ProgessBar extends Component {
    render() {
        const progressingBar = {
            zIndex: 2,
            width: this.getPassedTime(store.elapsedTime, 0, store.selectedWorkout.time, 0, 100) + "%",
            height: "100%"
        }

        return (
            <div id={"progress"} className={"headline"}>
                <div id={"progressing"} style={progressingBar}></div>
            </div>
        );
    }

    getPassedTime = (valIn, start1, stop1, start2, stop2, withinBounds) => {

        if(valIn === null || start1 === null || stop1 === null || start2 === null || stop2 === null) {
            return 0
        }

        const newval = (valIn - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return Math.max(Math.min(valIn, start2), stop2);
        } else {
            return Math.max(Math.min(valIn, stop2), start2);
        }
    }

}

export default ProgessBar;