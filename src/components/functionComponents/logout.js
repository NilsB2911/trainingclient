import app from "../../global/firebase";
import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React, { useCallback } from 'react';

export default function Logout(props) {
    let history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logUserOut = useCallback(async event => {
        try {
            let user = app.auth().currentUser;
            console.log("logout" + user.uid);
            await app.auth().signOut();
            console.log("logged out");
            history.push("/");
        } catch (error) {
            console.log(error)
        }
        console.log(app.auth().currentUser);
    })

    return (
        <>
            <Button onClick={logUserOut}>Logout</Button>
        </>
    )
}