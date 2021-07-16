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
            isPlaying: observable,
            setUser: action,
            setStep: action,
            elapsedTime: observable,
            incrementElapsedTime: action,
            zeroElapsedTime: action,
            setElapsedTimeManually: action,
            fetchUser: action,
            setRoomId: action
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

    socket = null

    roomId = this.socket = io("http://localhost:3002", {
        query: {
            roomId: "lol"
        }
    })

    isPlaying = false

    setPlaying() {
        this.isPlaying = !this.isPlaying
    }

    setPlayingFromSocket(data) {
        this.isPlaying = data
    }

    setSocket(roomId) {
        this.socket = io("http://localhost:3002", {
            query: {
                roomId: roomId
            }
        })
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

        console.log(this.selectedWorkout.tid);
    }

    fetchWorkouts(workouts) {
        this.allWorkouts = workouts;
    }

    setUser(newUser) {
        this.user = newUser;
    }

    async fetchUser() {
        await fetch("http://localhost:3001/user/tokenLogin", {
            method: 'post',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => response.json()).then(json => this.setUser(json))
    }
}

let store = new Store();
export default store;