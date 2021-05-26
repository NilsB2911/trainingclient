import React, {useHistory} from "react-router-dom";
import {Button} from "semantic-ui-react";

export default function SaveWorkout(props) {
    let history = useHistory();

    const callApiNewWorkout = async () => {
        let user = props.currentUser;
        let response;
        if (user) {
            let url = 'http://localhost:3001/training/submit/' + props.workoutName + "/" + JSON.stringify(props.workoutSteps) + "/" + props.overallTime + "/" + props.currentUser.uid;
            console.log(url);
            response = await fetch(url)
        } else {
            history.push("/login")
        }
        console.log(response);
        history.push("/");
    }

    return (
        <>
            <Button className={"loginRegisterButton"} onClick={callApiNewWorkout}>Submit</Button>
        </>
    )
}