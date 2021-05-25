import React, {Component} from 'react';

class RoutineCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={"routineCard headline"}>
                <p>{this.props.id}</p>
                <p>{this.props.name}</p>
                <p>{this.props.time}</p>
            </div>
        );
    }
}

export default RoutineCard;
