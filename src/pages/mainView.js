import React, {Component} from 'react';
import Camerabar from "../components/main/camerabar";
import Sidebar from "../components/main/sidebar";
import RoutineInfo from "../components/main/routineInfo";
import ProgessBar from "../components/main/progessBar";

class MainView extends Component {
    constructor() {
        super();
        this.state = {
            activeDataSet: null
        }
    }

    setActiveData = (data) => {
        //this.setState({activeDataSet: data});
        console.log(data);
    }

    render() {
        return (
            <div id={"bossContainer"}>
                <div id={"sidebarsDiv"}>
                    <Camerabar/>
                    <Sidebar onSetActiveData={this.setActiveData}/>
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