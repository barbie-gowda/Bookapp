// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwTRcVXn3WkRFFhpwUton-Sn3Uh1i45ow",
  authDomain: "mern-book-inventory-962d5.firebaseapp.com",
  projectId: "mern-book-inventory-962d5",
  storageBucket: "mern-book-inventory-962d5.appspot.com",
  messagingSenderId: "825915319275",
  appId: "1:825915319275:web:782efd0757dbc05b87efae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;