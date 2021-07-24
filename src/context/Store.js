import {
    makeObservable,
    observable,
    action
} from "mobx";

import io from "socket.io-client"

class Store {

    constructor() {
        makeObservable(this, {
            fetchWorkouts: action,
            user: observable,
            allWorkouts: observable,
            selectedWorkout: observable,
            currentStep: observable,
            roomId: observable,
            socket: observable,
            myPb: observable,
            isPlaying: observable,
            setUser: action,
            setStep: action,
            elapsedTime: observable,
            incrementElapsedTime: action,
            zeroElapsedTime: action,
            setElapsedTimeManually: action,
            fetchUser: action,
            setRoomId: action,
            fetchProfilePicture: action,
            setPb: action
        })
    }

    user = {
        uid: null,
        email: null,
        name: null,
    }

    allWorkouts = []

    selectedWorkout = {
        json: null,
        name: null,
        time: null,
        tid: null
    }

    currentStep = 0

    elapsedTime = 0

    socket = io("http://localhost:3002")

    roomId = null

    isPlaying = false

    myPb = null

    setPb(url) {
        this.myPb = url
    }

    setPlaying() {
        console.log("setPlaying")
        this.isPlaying = !this.isPlaying
    }

    setPlayingFromSocket(data) {
        console.log("setPlayingFromSocket")
        this.isPlaying = data
    }

    setRoomId(roomId) {
        this.roomId = roomId
    }

    zeroElapsedTime() {
        this.elapsedTime = 0
    }

    incrementElapsedTime(addition) {
        this.elapsedTime += addition;
    }

    setElapsedTimeManually(timeInSeconds) {
        this.elapsedTime = timeInSeconds;
    }

    setStep(index) {
        this.currentStep = index;
    }

    setSelectedWorkout(workout) {
        this.selectedWorkout.json = workout.json;
        this.selectedWorkout.name = workout.name;
        this.selectedWorkout.time = workout.time;
        this.selectedWorkout.tid = workout.tid;
    }

    fetchWorkouts(workouts) {
        console.log(workouts)
        this.allWorkouts = workouts;
    }

    setUser(newUser) {
        this.user = newUser;

        if(this.user.uid !== null) {
            this.fetchProfilePicture()
        }
    }

    async fetchUser() {
        await fetch("http://localhost:3001/user/tokenLogin", {
            method: 'post',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status === 200) {
                response.json().then(json => this.setUser(json))
            } else if (response.status === 403) {
                console.log("error with jwt cookie");
            }
        })
    }

    async fetchProfilePicture() {
        let userIdToUse = this.user.uid
        await fetch(`http://localhost:3001/user/pb/${userIdToUse}`, {
            method: "get",
            credentials: "include"
        }).then(res => res.json()).then(link => this.setPb(link.link))
    }

}

let store = new Store();
export default store;