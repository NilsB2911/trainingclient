import {useEffect, useRef} from "react";

export default function CameraView(props) {

    const videoRef = useRef(null);

    const setRefSource = (stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
    }

    useEffect(() => {
        if (props.stream) {
            setRefSource(props.stream)
        } else {
            console.log("no prop")
        }
    }, [videoRef]);


    return (
        <div className={"flexVideos"}>
            <video
                className={"videoTiles"}
                width={"90%"}
                ref={videoRef}
            />
        </div>
    )

}