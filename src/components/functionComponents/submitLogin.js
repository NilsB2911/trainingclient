import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React from 'react';

import store from "../../context/Store";


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
        }).then(response => {
            if (response.status === 200) {
                response.json().then(json => store.setUser(json)).then(() => history.push("/"))
            } else if (response.status === 401) {
                props.onError();
            }
        })
    }

    return (
        <div style={{width: "100%"}}>
            {correct ? null : <p>Incorrect</p>}
            <Button className={"loginRegisterButton"} onClick={loginUser}>Submit</Button>
        </div>
    )
}
