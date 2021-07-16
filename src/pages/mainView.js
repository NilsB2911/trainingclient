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

    componentDidMount() {
        if (this.props.location.search) {
            store.socket.on("newWorkoutSelected", function (wo) {
                store.setSelectedWorkout({
                    json: JSON.parse(wo.json),
                    name: wo.name,
                    time: wo.time,
                    tid: wo.tid
                })
            })
            store.socket.emit("joinRoom", this.props.location.search.substring(1))
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