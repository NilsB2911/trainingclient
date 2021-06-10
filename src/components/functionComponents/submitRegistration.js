import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React from 'react';
import store from "../../context/Store";
import {toJS} from "mobx";

export default function SubmitRegister(props) {
    let history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const createUser = async () => {
        console.log(props.email, props.password, props.name)
        await fetch("http://localhost:3001/user/register", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: props.email,
                pw: props.password,
                name: props.name
            })
        }).then(response => response.json()).then(json => store.setUser(json)).then(() => console.log("REGISTER " + toJS(store.user.uid))).then(() => history.push("/"))
    }

    return (
        <div>
            <Button className={"loginRegisterButton"} disabled={!(props.password === props.confirmPassword && props.password !== "" && props.confirmPassword !== "")} onClick={createUser}>Submit</Button>
        </div>
    )
}
