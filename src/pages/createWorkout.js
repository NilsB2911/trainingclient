import React, {Component} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import SaveWorkout from "../components/functionComponents/saveWorkout";

class CreateWorkout extends Component {

    constructor() {
        super();
        this.state = {
            workoutName: "",
            overallTime: 0,
            workoutSteps: [
                {
                    id: 0,
                    name: "",
                    duration: 0
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <input type={"text"} placeholder={"Give your workout a descriptive name"} value={this.state.workoutName} onChange={this.handleName}/>
                {this.state.workoutSteps.map(step => {
                    return (
                        <div key={step.id}>
                            <div>
                                <p style={{color: "white"}} className={"bebas"}>Übung {step.id + 1}</p>
                                <input id={step.id + "N"} type={"text"} placeholder={step.id + "N"}
                                       value={this.state.workoutSteps[step.id].name} onChange={this.handleInput}/>
                                <input id={step.id + "D"} type={"text"} placeholder={step.id + "D"}
                                       value={this.state.workoutSteps[step.id].duration} onChange={this.handleInput}/>
                            </div>
                        </div>
                    )
                })}
                <button onClick={this.pushToArray}>Add Step</button>
                <p className={"bebas"} style={{color: "white"}}>{this.state.overallTime}</p>
                <SaveWorkout workoutName={this.state.workoutName} workoutSteps={this.state.workoutSteps} overallTime={this.state.overallTime} currentUser={this.context.currentUser}/>
            </div>
        );
    }

    handleName = e => {
        this.setState({workoutName: e.target.value});
    }

    handleInput = e => {
        let {id, value} = e.target;
        let filterId = id.substring(0, id.length - 1);
        let selectorId = id.substring(1);

        let tempArray = [...this.state.workoutSteps];
        let item = tempArray[filterId];

        if (selectorId === "N") {
            item.name = value;
        } else if (selectorId === "D") {
            value = parseInt(value);
            isNaN(value) ? value = 0 : console.log("NOT NAN " + value);
            item.duration = value;
        }

        tempArray[filterId] = item;
        this.setState({workoutSteps: tempArray});
        this.calculateTotalTime();
    };

    pushToArray = () => {
        let newStep = {id: this.state.workoutSteps.length, name: "", duration: ""};
        console.log("called");
        this.setState({workoutSteps: [...this.state.workoutSteps, newStep]});
    }

    calculateTotalTime = () => {
        let totalTime = 0;
        this.state.workoutSteps.forEach(step => {
            totalTime += step.duration;
        })
        this.setState({overallTime: totalTime});
    }
}

CreateWorkout.contextType = AuthContext;

export default CreateWorkout;