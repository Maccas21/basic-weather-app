import firebase from "firebase"

const config = {
    apiKey: "AIzaSyBC9LYwwQUcDUNFN44rxUeeZfjKWE8R6Ys",
    authDomain: "basic-weather-app-ac4de.firebaseapp.com",
    projectId: "basic-weather-app-ac4de",
    storageBucket: "basic-weather-app-ac4de.appspot.com",
    messagingSenderId: "575274649496",
    appId: "1:575274649496:web:e758458d81c88aebd3cded",
    measurementId: "G-H5XDE62NC4"
  };

  firebase.initializeApp(config);

  export default firebase;

  export const database = firebase.database;
  export const auth = firebase.auth;
  export const storage = firebase.storage();
  export const messaging = firebase.messaging();