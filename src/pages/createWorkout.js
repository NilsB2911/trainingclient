import React, {Component} from 'react';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import SaveWorkout from "../components/functionComponents/saveWorkout";
import {Input, Button} from "semantic-ui-react";
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

    async componentDidMount() {
        if (this.props.match.params.tid) {
            let queryString = "http://localhost:3001/training/edit/" + this.props.match.params.tid + "/" + store.user.uid
            await fetch(queryString).then(result => result.json()).then(json => {
                this.setState({workoutName: json[0].name, overallTime: json[0].duration}, () => {
                    let steps = JSON.parse(json[0].json);
                    this.setState({workoutSteps: steps}, () => {
                        this.calculateTotalTime();
                    });
                });
            })
        }
    }

    render() {
        return (
            <div id={"centerCreate"}>
                <Input type={"text"} placeholder={"Give your workout a descriptive name"} value={this.state.workoutName}
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
                                                            <p className={"bebas listSteps"}>Step {index + 1} {index + 1 < 10 ?
                                                                <span
                                                                    style={{color: "transparent"}}>0</span> : null}</p>
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
                                                            <div id={"handles"}>
                                                                <span className={"material-icons"}
                                                                      style={index === 0 ? {zIndex: -1} : {}}
                                                                      onClick={e => this.deleteStep(e, index)}
                                                                      id={"deleteHandles"}>delete</span>
                                                                <span
                                                                    className={"material-icons"}
                                                                    id={"dragHandles"} {...provided.dragHandleProps}>reorder</span>
                                                            </div>

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
                <Button secondary onClick={this.pushToArray}>Add Step</Button>
                <p className={"bebas"} id={"overallTime"}>Total workout time: {this.state.overallTime}</p>
                <SaveWorkout workoutName={this.state.workoutName} workoutSteps={this.state.workoutSteps}
                             overallTime={this.state.overallTime} currentUser={store.user.uid} update={!!this.props.match.params.update} tid={this.props.match.params.tid}/>
            </div>
        );
    }

    deleteStep = (e, index) => {
        if (this.state.workoutSteps.length > 1) {
            let newArray = Array.from(this.state.workoutSteps);
            newArray.splice(index, 1);
            this.setState({workoutSteps: newArray}, () => this.calculateTotalTime());
        }
    }

    handleDragEnd = e => {
        if (!e.destination) return;
        const copyArray = Array.from(this.state.workoutSteps);
        const [movedStep] = copyArray.splice(e.source.index, 1);

        copyArray.splice(e.destination.index, 0, movedStep);

        this.setState({workoutSteps: copyArray});
    }

    handleName = e => {
        this.setState({workoutName: e.target.value});
    }

    handleInput = (e, index) => {
        let {id, value} = e.target;
        //let filterId = id.substring(0, id.length - 1);
        let selectorId
        if (index < 10) {
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