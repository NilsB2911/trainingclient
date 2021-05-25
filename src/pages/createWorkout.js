import React, {Component} from 'react';

class CreateWorkout extends Component {

    constructor() {
        super();
        this.state = {
            workoutSteps: [
                {
                    id: 0,
                    name: "Handstand",
                    duration: 60
                },
                {
                    id: 1,
                    name: "Liegestütze",
                    duration: 15
                },
                {
                    id: 2,
                    name: "Dumbell Rows",
                    duration: 60
                }
            ]
        }
    }

    render() {
        return (
            <div>
                {this.state.workoutSteps.map(step => {
                    return (
                        <div key={step.id}>
                            <div>
                                <input id={step.id + "N"} type={"text"} placeholder={step.id + "N"}
                                       value={this.state.workoutSteps[step.id].name} onChange={this.handleInput}/>
                                <input id={step.id + "D"} type={"text"} placeholder={step.id + "D"}
                                       value={this.state.workoutSteps[step.id].duration} onChange={this.handleInput}/>
                            </div>

                        </div>
                    )
                })}
                <button onClick={this.pushToArray}>Add Step</button>
            </div>
        );
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
            item.duration = value
        }

        tempArray[filterId] = item;
        this.setState({workoutSteps: tempArray});
    };

    pushToArray = () => {
        let newStep = {id: this.state.workoutSteps.length, name: "", duration: ""};
        console.log("called");
        this.setState({workoutSteps: [...this.state.workoutSteps, newStep]});
    }

}

export default CreateWorkout;