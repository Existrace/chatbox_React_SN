import Rebase from 're-base'
import firebase from "firebase/app";
import 'firebase/database'

// Information de connexion firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDe6AZavjal3xTFVNqJPkjtzjYkxaUDzY8",
    authDomain: "chatbox-app-91611.firebaseapp.com",
    databaseURL: "https://chatbox-app-91611.firebaseio.com"
})

const base = Rebase.createClass(firebase.database())

export {firebaseApp}

export default base
