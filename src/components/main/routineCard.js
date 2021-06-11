import React, {Component} from 'react';

class RoutineCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"routineCard headline"}
                 style={this.props.isSame ? {backgroundColor: "#4AE4C5", color: "#0F0F0F"} : null}>
                <p>{this.props.id}</p>
                <p>{this.props.name}</p>
                <p>{this.props.time}</p>
            </div>
        );
    }
}

export default RoutineCard;
