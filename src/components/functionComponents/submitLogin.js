import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React from 'react';

import store from "../../context/Store";
import {toJS} from "mobx";

export default function SubmitLogin(props) {
    let correct = true;
    let history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loginUser = async () => {
        let bodyObj = {
            email: props.email,
            pw: props.password
        }
        let queryString = "http://localhost:3001/user/login/" + bodyObj.email + "/" + bodyObj.pw;
        await fetch(queryString).then(response => response.json()).then(json => store.setUser(json)).then(() => console.log(toJS(store.user))).then(() => history.push("/"));
    }

    return (
        <div>
            {correct ? null : <p>Incorrect</p>}
            <Button className={"loginRegisterButton"} onClick={loginUser}>Submit</Button>
        </div>
    )
}
