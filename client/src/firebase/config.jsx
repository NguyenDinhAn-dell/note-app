// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByPssb4CAlv-U25wGltL2OEJyhPtqaEg4",
  authDomain: "note-app-9d76f.firebaseapp.com",
  projectId: "note-app-9d76f",
  storageBucket: "note-app-9d76f.appspot.com",
  messagingSenderId: "768994885457",
  appId: "1:768994885457:web:4c6c3aac545b59960f5d70",
  measurementId: "G-V2GB2W1YEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);