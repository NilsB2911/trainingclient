import React, {Component} from 'react';
import Camerabar from "../components/main/camerabar";
import Sidebar from "../components/main/sidebar";
import CountdownRoutine from "../components/main/countdownRoutine";
import ProgessBar from "../components/main/progessBar";
import store from "../context/Store";

class MainView extends Component {

    componentWillUnmount() {
        this.clearStore();
    }

    componentDidMount() {
        window.onbeforeunload = function() {
            this.clearStore();
        }.bind(this);
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