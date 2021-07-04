import React, {Component} from 'react';

import store from "../context/Store";
import {observer} from "mobx-react";

@observer
class SelectWorkout extends Component {

    constructor() {
        super();
        this.state = {
            isHovering: false,
            hoverId: null
        }
    }

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

    getTimeFormatted = (seconds) => {
        let minute = parseInt(seconds / 60);
        let second = seconds % 60;

        let minuteString;
        let secondString;

        minute < 10 ? minuteString = `0${minute}` : minuteString = minute
        second < 10 ? secondString = `0${second}` : secondString = second
        return `${minuteString}:${secondString}`
    }

    getString = (workout) => {
        let asJson = JSON.parse(workout);
        let conactString = "";

        for (let i = 0; i < asJson.length; i++) {
            if (i !== asJson.length - 1) {
                conactString += asJson[i].name + ", ";
            } else {
                conactString += asJson[i].name
            }

        }
        return conactString
    }

    handleMouseHover = (e, index) => {
        this.toggleHoverState(index)
    }

    toggleHoverState = (index) => {
        this.setState({isHovering: !this.state.isHovering, hoverId: index})
    }

    render() {
        return (
            <div id={"setPosition"}>
                <p className={"bebas"} id={"selectHeader"}>Select your workout</p>
                <div id={"centerSelectionContent"}>
                    {store.allWorkouts ? store.allWorkouts.map((wo, index) => {
                        return (
                            <div className={"selectCard headline mouseHover workoutCard"} key={index}>
                                <div onClick={() => this.updateSelected(wo)}
                                     onMouseEnter={(e) => this.handleMouseHover(e, index)}
                                     onMouseLeave={this.handleMouseHover}>
                                    <p className={"workoutHeader"}>{wo.name}</p>
                                    <p className={"workoutInfo"}>{this.getTimeFormatted(wo.time)} minutes</p>
                                    {this.state.isHovering && this.state.hoverId === index ?
                                        <p>{this.getString(wo.json)}</p> : null}
                                </div>
                                <div className={"deleteEditButtons"}>
                                    <span className={"material-icons"}
                                          onClick={() => this.deleteWorkout(wo.tid)}>delete</span>
                                    <span className={"material-icons"}
                                          onClick={() => this.pushToEdit(wo.tid)}>edit</span>
                                </div>
                            </div>
                        )
                    }) : <p style={{color: "white"}}>loading</p>}
                </div>
            </div>
        );
    }
}

export default SelectWorkout;