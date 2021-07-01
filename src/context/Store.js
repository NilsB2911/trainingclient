import {
    makeObservable,
    observable,
    action
} from "mobx";

class Store {
    constructor() {
        makeObservable(this, {
            fetchWorkouts: action,
            user: observable,
            allWorkouts: observable,
            selectedWorkout: observable,
            currentStep: observable,
            setUser: action,
            setStep: action,
            elapsedTime: observable,
            incrementElapsedTime: action,
            zeroElapsedTime: action,
            setElapsedTimeManually: action
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
}

let store = new Store();
export default store;