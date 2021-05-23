import app from "../../global/firebase";
import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React, { useCallback } from 'react';

export default function SubmitLogin(props) {
    let history = useHistory();
    let correct = true;
    const loginToFirebase = useCallback(async event => {
        try {
            await app.auth().signInWithEmailAndPassword(props.email, props.password);
            let user = app.auth().currentUser;
            console.log("login " + user.uid);
            history.push("/");
        } catch (error) {
            console.log(error)
            correct = false;
            console.log(correct);
        }
    })

    return (
        <>
            {correct ? null : <p>Incorrect</p>}
            <Button onClick={loginToFirebase}>Submit</Button>
        </>
    )
}