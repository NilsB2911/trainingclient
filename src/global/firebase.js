import firebase from "firebase/app";
import "firebase/auth"

const app = firebase.initializeApp({
    /*apiKey: process.env.REACT_APP_FIRE_APIKEY,
    authDomain: process.env.REACT_APP_FIRE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIRE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIRE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIRE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIRE_APPID*/
    apiKey: "AIzaSyAoOQsQ2TnB90bykCX9loV081oVQoB0zEM",
    authDomain: "training-app-b0d65.firebaseapp.com",
    projectId: "training-app-b0d65",
    storageBucket: "training-app-b0d65.appspot.com",
    messagingSenderId: "900759352754",
    appId: "1:900759352754:web:9b6fcba1fcf0f82bcc60ab"
})

export default app;
