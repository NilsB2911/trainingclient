import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React from 'react';

import store from "../../context/Store";

import jwtDecode from "jwt-decode";

export default function SubmitLogin(props) {
    let correct = true;
    let history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loginUser = async () => {
        await fetch("http://localhost:3001/user/login", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: props.email,
                pw: props.password,
            })
        }).then(response => response.json()).then(json => store.setUser(jwtDecode(json.token))).then(() => history.push("/"))
    }

    return (
        <div>
            {correct ? null : <p>Incorrect</p>}
            <Button className={"loginRegisterButton"} onClick={loginUser}>Submit</Button>
        </div>
    )
}
