import React, {Component} from 'react';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import SaveWorkout from "../components/functionComponents/saveWorkout";
import {Input} from "semantic-ui-react";
import {observer} from "mobx-react";

import store from "../context/Store";

@observer
class CreateWorkout extends Component {

    constructor() {
        super();
        this.state = {
            workoutName: "",
            overallTime: undefined,
            workoutSteps: [
                {
                    id: 0,
                    name: "",
                    duration: undefined
                }
            ]
        }
    }

    render() {
        console.log(this.state.workoutSteps);
        return (
            <div id={"centerCreate"}>
                {store.user.uid ? <p style={{color: "white"}}>{store.user.uid}</p> : <p style={{color: "white"}}>Not logged in</p>}
                <input type={"text"} placeholder={"Give your workout a descriptive name"} value={this.state.workoutName}
                       onChange={this.handleName}/>
                <div id={"topWrapper"}>
                    <DragDropContext onDragEnd={this.handleDragEnd}>
                        <Droppable droppableId={"stepsDrop"}>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {this.state.workoutSteps.map((step, index) => {
                                        return (
                                            <Draggable key={step.id} draggableId={step.id + "drag"} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} ref={provided.innerRef}>
                                                        <div className={"draggableDiv"}>
                                                            <p style={{color: "white"}}
                                                               className={"bebas"}>Übung {index + 1}</p>
                                                            <Input
                                                                id={step.id + "N"}
                                                                control={"input"}
                                                                type={"text"}
                                                                label={"Exercise"}
                                                                onChange={(e) => this.handleInput(e, index)}
                                                                value={this.state.workoutSteps[index].name}
                                                            />
                                                            <Input
                                                                id={step.id + "D"}
                                                                control={"input"}
                                                                type={"number"}
                                                                label={"Duration"}
                                                                onChange={(e) => this.handleInput(e, index)}
                                                                value={this.state.workoutSteps[index].duration}
                                                            />
                                                            {/*<input id={step.id + "N"} type={"text"}
                                                                   className={"workoutInput"}
                                                                   placeholder={step.id + "N"}
                                                                   value={this.state.workoutSteps[index].name}
                                                                   onChange={(e) => this.handleInput(e, index)}/>

                                                            <input id={step.id + "D"} type={"text"}
                                                                   className={"workoutInput"}
                                                                   placeholder={step.id + "D"}
                                                                   value={this.state.workoutSteps[index].duration}
                                                                   onChange={(e) => this.handleInput(e, index)}/>*/}
                                                            <span className={"material-icons"} {...provided.dragHandleProps}>reorder</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <button onClick={this.pushToArray}>Add Step</button>
                <p className={"bebas"} style={{color: "white"}}>{this.state.overallTime}</p>
                <SaveWorkout workoutName={this.state.workoutName} workoutSteps={this.state.workoutSteps}
                             overallTime={this.state.overallTime} currentUser={store.user.uid}/>
            </div>
        );
    }

    handleDragEnd = e => {
        if (!e.destination) return;
        const copyArray = Array.from(this.state.workoutSteps);
        const [movedStep] = copyArray.splice(e.source.index, 1);

        //console.log(movedStep.id, e.destination.index);
        copyArray.splice(e.destination.index, 0, movedStep);

        this.setState({workoutSteps: copyArray});
    }

    handleName = e => {
        this.setState({workoutName: e.target.value});
    }

    handleInput = (e, index) => {
        console.log(index);
        let {id, value} = e.target;
        //let filterId = id.substring(0, id.length - 1);
        let selectorId
        if(index < 10) {
            selectorId = id.substring(1);
        } else {
            selectorId = id.substring(2);
        }


        let tempArray = [...this.state.workoutSteps];
        let item = tempArray[index];

        if (selectorId === "N") {
            item.name = value;
        } else if (selectorId === "D") {
            item.duration = parseInt(value);
        }

        tempArray[index] = item;
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

export default CreateWorkout;