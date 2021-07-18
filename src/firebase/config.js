import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "movie-app-5adc1.firebaseapp.com",
  projectId: "movie-app-5adc1",
  storageBucket: "movie-app-5adc1.appspot.com",
  messagingSenderId: "574746167748",
  appId: "1:574746167748:web:67538b6f1a4064140ebc91"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth }