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
        console.log("CALLED");
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
        let user = store.user.uid
        return (
            <div>
                {user ? <p style={{color: "white"}}>{user}</p> : <p style={{color: "white"}}>Not logged in</p>}
                {store.allWorkouts ? store.allWorkouts.map((wo, index) => {
                    return (
                        <div className={"routineCard headline mouseHover"} onClick={() => this.updateSelected(wo)}
                             key={index}>
                            <p>{wo.name}</p>
                            <p>{wo.time}</p>
                            <p>{wo.json}</p>
                        </div>
                    )
                }) : <p style={{color: "white"}}>loading</p>}
            </div>
        );
    }
}

export default SelectWorkout;