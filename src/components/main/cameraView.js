import {useEffect, useRef, useState} from "react";

export default function CameraView(props) {

    const videoRef = useRef(null);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                height: 1080, width: 1920
            }
        }).then(stream => {
            setRefSource(stream)
        }).catch(err => console.log(err))
    }

    const setRefSource = (stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
    }

    useEffect(() => {
        if (props.stream) {
            setRefSource(props.stream)
        } else {
            getVideo()
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