import React, {Component} from 'react';
import {AuthContext} from "../context/AuthContext";

class SelectWorkout extends Component {
    constructor() {
        super();
        this.state = {
            allUserWorkouts: []
        }
    }

    componentDidMount() {
        this.getUserWorkoutsFromDb().then(r => console.log(r));
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }

    getUserWorkoutsFromDb = async () => {
        let queryString = "http://localhost:3001/training/get/" + this.context.currentUser.uid;
        await fetch(queryString)
    }
}

SelectWorkout.contextType = AuthContext;

export default SelectWorkout;