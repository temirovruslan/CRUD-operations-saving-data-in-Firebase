import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyC0IWtKT-0nk04ZR-TFiUGAElyCPPg9FPo",
	authDomain: "challenge-9f9b9.firebaseapp.com",
	databaseURL: "https://challenge-9f9b9-default-rtdb.firebaseio.com",
	projectId: "challenge-9f9b9",
	storageBucket: "challenge-9f9b9.appspot.com",
	messagingSenderId: "836269466128",
	appId: "1:836269466128:web:75eb30fcde5f05608f2095",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default getFirestore(app);
