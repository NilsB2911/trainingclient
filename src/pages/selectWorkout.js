import React, {Component} from 'react';

import store from "../context/Store";
import {observer} from "mobx-react";

@observer
class SelectWorkout extends Component {
    componentDidMount() {
        this.callWorkouts()
    }

    /* eslint-enable */
    updateSelected = (wo) => {
        store.setSelectedWorkout({
            json: JSON.parse(wo.json),
            name: wo.name,
            time: wo.time
        })
        this.props.history.push("/");
    }

    callWorkouts = async () => {
        let queryString = "http://localhost:3001/training/get/" + store.user.uid;
        await fetch(queryString).then(response => response.json()).then(json => store.fetchWorkouts(json));
    }

    render() {
        return (
            <div>
                {store.allWorkouts ? store.allWorkouts.map((wo, index) => {
                    return (
                        <div className={"selectCard headline mouseHover"} onClick={() => this.updateSelected(wo)}
                             key={index}>
                            <p>{wo.name}</p>
                            <p>{wo.time}</p>
                        </div>
                    )
                }) : <p style={{color: "white"}}>loading</p>}
            </div>
        );
    }
}

export default SelectWorkout;