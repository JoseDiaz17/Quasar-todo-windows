import * as firebase from "firebase/app"

import "firebase/firestore"
import "firebase/auth"

// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyCD3Z0eWUEgMM5mSiIY8mupGiD3vIEIsyk",
    authDomain: "my-project-1572024801549.firebaseapp.com",
    databaseURL: "https://my-project-1572024801549.firebaseio.com",
    projectId: "my-project-1572024801549",
    storageBucket: "my-project-1572024801549.appspot.com",
    messagingSenderId: "1084585016299",
    appId: "1:1084585016299:web:0ebe808977ad83e7a737ae",
    measurementId: "G-3BHR5STP5R"
  };

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let db = firebase.firestore();

export { firebaseAuth, db }