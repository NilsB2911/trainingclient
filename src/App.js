import Sidebar from "./components/sidebar";
import Camerabar from "./components/camerabar";
import "./global/globalStyle.css"
import RoutineInfo from "./components/routineInfo";
import ProgessBar from "./components/progessBar";
import Toolbar from "./components/toolbar";

function App() {
    return (
        <div className="App">
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

export default App;
