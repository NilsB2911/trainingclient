import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React from 'react';

import store from "../../context/Store";

export default function Logout(props) {
    let history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logUserOut = () => {
        store.setUser({
            uid: null,
            email: null,
            name: null
        });
        history.push("/login")
    }

    return (
        <div>
            <Button onClick={logUserOut}>Logout</Button>
        </div>
    )
}