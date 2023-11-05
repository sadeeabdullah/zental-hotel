// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0uhB680_8WroZkhdEOYwiYKwl6iVrgH8",
  authDomain: "zenhotel-3e57c.firebaseapp.com",
  projectId: "zenhotel-3e57c",
  storageBucket: "zenhotel-3e57c.appspot.com",
  messagingSenderId: "52169753739",
  appId: "1:52169753739:web:39daeca848cafcf2ea408e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);