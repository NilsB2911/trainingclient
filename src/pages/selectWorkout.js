import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

const SelectWorkout = () => {
    const [state, setState] = useState({
        allUserWorkouts: undefined,
        selectedWorkout: undefined
    })

    const context = useContext(AuthContext);
    const history = useHistory();

    /* eslint-disable */
    useEffect(() => {
        callWorkouts()
    }, [state.selectedWorkout]);
    /* eslint-enable */
    function updateSelected(wo) {
        console.log("CALLED");
        setState({selectedWorkout: wo});
        history.push('/', {toDoWo: wo})
    }

    async function callWorkouts() {
        let queryString = "http://localhost:3001/training/get/" + context.user.json.uid;
        await fetch(queryString).then(response => response.json()).then(json => setState({allUserWorkouts: json}));
    }

    let user = context.user
    return (
        <div>
            {user ? <p style={{color: "white"}}>{user.json.uid}</p> : <p style={{color: "white"}}>Not logged in</p>}
            {state.allUserWorkouts ? state.allUserWorkouts.map((wo, index) => {
                return (
                    <div className={"routineCard headline mouseHover"} onClick={() => updateSelected(wo)} key={index}>
                        <p>{wo.name}</p>
                        <p>{wo.time}</p>
                        <p>{wo.json}</p>
                    </div>
                )
            }) : <p style={{color: "white"}}>loading</p>}
        </div>
    );
}

export default SelectWorkout;