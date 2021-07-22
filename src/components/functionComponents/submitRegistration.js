import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom"
import React from 'react';
import store from "../../context/Store";

export default function SubmitRegister(props) {
    let history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    let formData = new FormData();
    formData.append("email", props.email)
    formData.append("pw", props.password)
    formData.append("name", props.name)
    formData.append("pb", props.profilePicture)

    const createUser = async () => {
        await fetch("http://localhost:3001/user/register", {
            method: 'post',
            credentials: "include",
            body: formData
        }).then(response => {
            if (response.status === 200) {
                response.json().then(json => store.setUser(json)).then(() => history.push("/"))
            } else if (response.status === 401) {
                props.onError();
            }
        }).catch(error => console.log(error))
    }

    return (
        <div style={{width: "100%"}}>
            <Button className={"loginRegisterButton"}
                    disabled={!(props.password === props.confirmPassword && props.password !== "" && props.confirmPassword !== "")}
                    onClick={createUser}>Submit</Button>
        </div>
    )
}
