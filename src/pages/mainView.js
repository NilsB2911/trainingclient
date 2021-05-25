import React, {Component} from 'react';
import Camerabar from "../components/main/camerabar";
import Sidebar from "../components/main/sidebar";
import RoutineInfo from "../components/main/routineInfo";
import ProgessBar from "../components/main/progessBar";
import {AuthContext} from "../context/AuthContext";

class MainView extends Component {
    render() {
        return (
            <div id={"bossContainer"}>
                <div id={"sidebarsDiv"}>
                    <Camerabar/>
                    <Sidebar/>
                    <div id={"content"}>
                        <RoutineInfo/>
                        <ProgessBar/>
                    </div>
                </div>
            </div>
        );
    }
}

MainView.contextType = AuthContext;

export default MainView;