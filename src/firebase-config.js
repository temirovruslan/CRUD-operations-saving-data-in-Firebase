// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0IWtKT-0nk04ZR-TFiUGAElyCPPg9FPo",
  authDomain: "challenge-9f9b9.firebaseapp.com",
  databaseURL: "https://challenge-9f9b9-default-rtdb.firebaseio.com",
  projectId: "challenge-9f9b9",
  storageBucket: "challenge-9f9b9.appspot.com",
  messagingSenderId: "836269466128",
  appId: "1:836269466128:web:75eb30fcde5f05608f2095"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app)