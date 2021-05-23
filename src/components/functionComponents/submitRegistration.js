import React, { useCallback } from 'react';
import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import app from "../../global/firebase"

export default function SubmitRegister(props) {
    let history = useHistory();
    const submitToFirebase = useCallback(async event => {
            try {
                await app.auth().createUserWithEmailAndPassword(props.email, props.password);
                let user = app.auth().currentUser;
                console.log(user.uid);
                history.push("/");
            } catch (error) {
                console.log(error);
            }
    })

    return (
        <>
            <Button disabled={!(props.password === props.confirmPassword && props.password !== "" && props.confirmPassword !== "")} onClick={submitToFirebase}>Submit</Button>
        </>
    )
}