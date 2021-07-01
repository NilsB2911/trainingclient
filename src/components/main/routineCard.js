import React, {Component} from 'react';

class RoutineCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"routineCard headline"}
                 style={this.props.isSame ? {backgroundColor: "#06374d", color: "#f7f7f7"} : null}>
                <p className={"routineCardName"}>{this.props.name}</p>
                <p className={"routineCardTime"}>{this.props.time} seconds</p>
            </div>
        );
    }
}

export default RoutineCard;
