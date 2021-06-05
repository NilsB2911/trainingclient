import React, {useContext} from 'react';
import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext";

export default function SubmitRegister(props) {
    let history = useHistory();
    const { user, setUser} = useContext(AuthContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const createUser = async () => {
        console.log(props.email, props.password, props.name)
        await fetch("http://localhost:3001/user/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: props.email,
                pw: props.password,
                name: props.name
            })
        }).then(answer => answer.json()).then(json => setUser(json))

        history.push("/")
        console.log(user);
    }

    return (
        <>
            <Button className={"loginRegisterButton"} disabled={!(props.password === props.confirmPassword && props.password !== "" && props.confirmPassword !== "")} onClick={createUser}>Submit</Button>
        </>
    )
}
