import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React from 'react';
import store from "../../context/Store";
import jwtDecode from "jwt-decode";

export default function SubmitRegister(props) {
    let history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const createUser = async () => {
        await fetch("http://localhost:3001/user/register", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: props.email,
                pw: props.password,
                name: props.name
            })
        }).then(response => response.json()).then(json => store.setUser(jwtDecode(json.token))).then(() => history.push("/"))
    }

    return (
        <div>
            <Button className={"loginRegisterButton"} disabled={!(props.password === props.confirmPassword && props.password !== "" && props.confirmPassword !== "")} onClick={createUser}>Submit</Button>
        </div>
    )
}
