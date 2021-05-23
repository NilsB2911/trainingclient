import React, {Component} from 'react';
import Camerabar from "../components/main/camerabar";
import Sidebar from "../components/main/sidebar";
import RoutineInfo from "../components/main/routineInfo";
import ProgessBar from "../components/main/progessBar";

class MainView extends Component {
    render() {
        return (
            <div>
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


export default MainView;