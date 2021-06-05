import React, {useEffect, useState} from 'react';
import "../../global/globalStyle.css";
import RoutineCard from "./routineCard";
import {useLocation} from "react-router";

function Sidebar() {
    const [woState, woSetState] = useState({
        toDoArray: [
            {
                id: 0,
                name: "lol",
                duration: 60
            },
            {
                id: 0,
                name: "lol",
                duration: 60
            }
        ]
    })
    const [naState, naSetState] = useState({
        name: "Kein Workout ausgewählt"
    })

    let location = useLocation();

    useEffect(() => {
        if (location.state) {
            let jsonArray = JSON.parse(location.state.toDoWo.json);
            woSetState({toDoArray: jsonArray})
            naSetState({name: location.state.toDoWo.name})
        } else {
            console.log("keine props")
        }
        // eslint-disable-next-line
    }, [location.state]);

    return (
        <div id={"cardDiv"}>
            <p id={"woName"} className={"bebas"}>{naState.name}</p>
            {woState.toDoArray.map((v, index) => {
                return (
                    <RoutineCard key={index} id={v.id} name={v.name} time={v.duration}/>
                )
            })}
        </div>
    );

}

export default Sidebar;