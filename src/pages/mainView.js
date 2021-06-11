import React, {Component} from 'react';
import Camerabar from "../components/main/camerabar";
import Sidebar from "../components/main/sidebar";
import CountdownRoutine from "../components/main/countdownRoutine";
import ProgessBar from "../components/main/progessBar";

class MainView extends Component {
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