import * as firebase from "firebase/app"

import "firebase/firestore"

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: "AIzaSyD7jYYOhDjFCXFJwJb8M8d4sLcIjgYKVME",
  authDomain: "app-quasar.firebaseapp.com",
  databaseURL: "https://app-quasar.firebaseio.com",
  projectId: "app-quasar",
  storageBucket: "app-quasar.appspot.com",
  messagingSenderId: "846260216738",
  appId: "1:846260216738:web:cf1bd2f8d1951f1e2bc8fb"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)
let db = firebase.firestore();

export { firebaseApp, db }