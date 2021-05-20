import React, {Component} from 'react';
import "../styles/routine.css"

class RoutineCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={"routineCard"}>
                <p>{this.props.id}</p>
                <p>{this.props.name}</p>
                <p>{this.props.time}</p>
            </div>
        );
    }
}

export default RoutineCard;
