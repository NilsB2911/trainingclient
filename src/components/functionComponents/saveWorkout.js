import React, {useHistory} from "react-router-dom";
import {Button} from "semantic-ui-react";

export default function SaveWorkout(props) {
    let history = useHistory();

    const callApiNewWorkout = async () => {
        if (props.currentUser !== "" && props.currentUser !== null && props.currentUser !== undefined) {
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
            }).then(answer => answer.json()).then(json => console.log(json)).then(() => history.push("/select"));
        } else {
            history.push("/login")
        }
    }

    return (
        <div>
            <Button className={"loginRegisterButton"} onClick={callApiNewWorkout}>Submit</Button>
        </div>
    )
}