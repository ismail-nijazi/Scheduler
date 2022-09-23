import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLHXsOYa5GHdkXE_Jzt9216BIkoywdBF4",
  authDomain: "scheduler-2ba9d.firebaseapp.com",
  projectId: "scheduler-2ba9d",
  storageBucket: "scheduler-2ba9d.appspot.com",
  messagingSenderId: "358430321954",
  appId: "1:358430321954:web:7fe6a3add6d63fbed2c97b",
  measurementId: "G-9Q7KVD63VY"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);

export default app;
