// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_o4ZkdsrXVbn6LP6MFnBFoOyLddAXVZU",
  authDomain: "admin-dashboard-firebase.firebaseapp.com",
  projectId: "admin-dashboard-firebase",
  storageBucket: "admin-dashboard-firebase.appspot.com",
  messagingSenderId: "110988706904",
  appId: "1:110988706904:web:53ead57ddf405cb4caf62d",
  measurementId: "G-5N03C893C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);