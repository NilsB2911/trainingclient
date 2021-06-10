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
            setUser: action
        })
    }

    user = {
        uid: null,
        email: null,
        name: null
    }

    allWorkouts = []

    selectedWorkout = {
        json: [{}],
        name: null,
        time: null
    }

    currentStep = 0

    setSelectedWorkout(workout) {
        this.selectedWorkout.json = workout.json;
        this.selectedWorkout.name = workout.name;
        this.selectedWorkout.time = workout.time;

        console.log(this.selectedWorkout);
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