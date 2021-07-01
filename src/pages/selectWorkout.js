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
            time: wo.time,
            tid: wo.tid
        })
        this.props.history.push("/");
    }

    callWorkouts = async () => {
        let queryString = "http://localhost:3001/training/get/" + store.user.uid;
        await fetch(queryString).then(response => response.json()).then(json => store.fetchWorkouts(json));
    }

    deleteWorkout = async (tid) => {
        await fetch("http://localhost:3001/training/deleteWorkout", {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tid: tid,
                uid: store.user.uid
            })
        }).then(response => response.json()).then(json => store.fetchWorkouts(json));
    }

    pushToEdit = (tid) => {
        this.props.history.push({
            pathname: '/edit/' + tid + "/true"
        })
    }

    render() {
        return (
            <div id={"setPosition"}>
                <p className={"bebas"} id={"selectHeader"}>Select your workout</p>
                <div id={"centerSelectionContent"}>
                    {store.allWorkouts ? store.allWorkouts.map((wo, index) => {
                        return (
                            <div className={"selectCard headline mouseHover"}>
                                <div
                                    onClick={() => this.updateSelected(wo)}
                                    key={index}>
                                    <p>{wo.name}</p>
                                    <p>{wo.time}</p>
                                </div>
                                <button onClick={() => this.deleteWorkout(wo.tid)}>delete</button>
                                <button onClick={() => this.pushToEdit(wo.tid)}>edit</button>
                            </div>
                        )
                    }) : <p style={{color: "white"}}>loading</p>}
                </div>
            </div>
        );
    }
}

export default SelectWorkout;