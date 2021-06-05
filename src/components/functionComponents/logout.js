import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

export default function Logout(props) {
    let history = useHistory();
    let {setUser} = useContext(AuthContext)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logUserOut = () => {
        setUser(null);
        history.push("/login")
    }

    return (
        <>
            <Button onClick={logUserOut}>Logout</Button>
        </>
    )
}