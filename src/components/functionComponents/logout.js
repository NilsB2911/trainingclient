import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React from 'react';

import store from "../../context/Store";

export default function Logout(props) {
    let history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logUserOut = async () => {
        await fetch("http://localhost:3001/user/logout", {
            method: 'post',
            credentials: 'include'
        }).then(res => {
            if(res.status === 200) {
                res.json().then(() => store.setUser({uid: null, name: null, email: null})).then(() => history.push("/"));
            } else {
                store.setUser({uid: null, name: null, email: null})
                history.push("/")
            }
        })
        store.currentStep = 0;
    }

    return (
        <div>
            <Button secondary onClick={logUserOut}>Logout</Button>
        </div>
    )
}