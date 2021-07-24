import React, {useHistory} from "react-router-dom";
import {Button} from "semantic-ui-react";

export default function SaveWorkout(props) {
    let history = useHistory();

    const callApiNewWorkout = async () => {
        if (props.currentUser !== "" && props.currentUser !== null && props.currentUser !== undefined) {
            if (props.update) {
                let url = 'http://localhost:3001/training/update';
                await fetch(url, {
                    method: 'put',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: props.workoutName,
                        json: JSON.stringify(props.workoutSteps),
                        duration: props.overallTime,
                        userId: props.currentUser,
                        tid: props.tid
                    })
                }).then(res => {
                    if(res.status === 204) {
                        history.push("/select");
                    } else if(res.status === 404) {
                        console.log("that didnt work");
                    }
                })
            } else {
                let url = 'http://localhost:3001/training/submit/';
                await fetch(url, {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: props.workoutName,
                        json: JSON.stringify(props.workoutSteps),
                        duration: props.overallTime,
                        userId: props.currentUser
                    })
                }).then(res => {
                    if (res.status === 201) {
                        history.push("/select");
                    } else if(res.status === 500) {
                        console.log("that didnt work")
                    }
                })
            }

        } else {
            history.push("/login")
        }
    }

    return (
        <div style={{width: "100%"}}>
            <Button primary onClick={callApiNewWorkout} style={{width: "100%"}}>Save Workout</Button>
        </div>
    )
}