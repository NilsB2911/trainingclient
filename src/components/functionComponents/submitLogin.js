import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

export default function SubmitLogin(props) {
    let history = useHistory();
    let correct = true;
    let {setUser} = useContext(AuthContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loginUser = async () => {
        let bodyObj = {
            email: props.email,
            pw: props.password
        }
        let queryString = "http://localhost:3001/user/login/" + bodyObj.email + "/" + bodyObj.pw;
        await fetch(queryString).then(response => response.json()).then(json => setUser({json}));
        history.push("/")
    }

    return (
        <>
            {correct ? null : <p>Incorrect</p>}
            <Button className={"loginRegisterButton"} onClick={loginUser}>Submit</Button>
        </>
    )
}
