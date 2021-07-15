import React, {Component} from 'react';
import Camerabar from "../components/main/camerabar";
import Sidebar from "../components/main/sidebar";
import CountdownRoutine from "../components/main/countdownRoutine";
import ProgessBar from "../components/main/progessBar";
import store from "../context/Store";
import {observer} from "mobx-react";

@observer
class MainView extends Component {

    async componentWillUnmount() {
        this.clearStore();
    }

    async componentDidMount() {
        let paramQuery = this.props.location.search.substring(1);

        if (paramQuery) {
            console.log(paramQuery);
            await fetch(`http://localhost:3001/rooms/getCommonWorkout/${paramQuery}`, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            }).then(result => result.json()).then(wo => {
                store.setSelectedWorkout({
                    json: JSON.parse(wo.json),
                    name: wo.name,
                    time: wo.time,
                    tid: wo.tid
                })
            })
        } else {
            console.log("not yet in room");
        }
    }

    clearStore = () => {
        store.setSelectedWorkout({
            json: null,
            name: null,
            time: null,
            tid: null
        });

        store.setStep(0);
        store.zeroElapsedTime();
    }

    render() {
        return (
            <div id={"sidebarsDiv"}>
                <Camerabar/>
                <Sidebar/>
                <div id={"content"}>
                    <CountdownRoutine/>
                    <ProgessBar/>
                </div>
            </div>
        );
    }
}

export default MainView;