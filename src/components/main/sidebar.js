import React, {Component} from 'react';
import "../../global/globalStyle.css";
import RoutineCard from "./routineCard";

class Sidebar extends Component {
    render() {

        let testArray = [
            {
                id: 0,
                text: "r1",
                time: "10"
            },
            {
                id: 1,
                text: "r2",
                time: "5"
            },
            {
                id: 2,
                text: "r2",
                time: "5"
            },
            {
                id: 3,
                text: "r2",
                time: "10"
            },
            {
                id: 4,
                text: "r2",
                time: "5"
            },
            {
                id: 5,
                text: "r2",
                time: "10"
            },
            {
                id: 6,
                text: "r2",
                time: "5"
            },
            {
                id: 7,
                text: "r2",
                time: "5"
            },
            {
                id: 8,
                text: "r2",
                time: "6"
            },
            {
                id: 9,
                text: "r1",
                time: "10"
            },
            {
                id: 10,
                text: "r2",
                time: "5"
            },
            {
                id: 11,
                text: "r2",
                time: "5"
            },
            {
                id: 12,
                text: "r2",
                time: "10"
            },
            {
                id: 13,
                text: "r2",
                time: "5"
            },
            {
                id: 14,
                text: "r2",
                time: "10"
            },
            {
                id: 15,
                text: "r2",
                time: "5"
            },
            {
                id: 16,
                text: "r2",
                time: "5"
            },
            {
                id: 17,
                text: "r2",
                time: "6"
            }
        ]


        return (
            <div id={"cardDiv"}>
                {testArray.map(v => {
                    return (
                        <RoutineCard key={v.id * Math.random()} id={v.id} name={v.text} time={v.time}/>
                    )
                })}
            </div>
        );
    }
}

export default Sidebar;