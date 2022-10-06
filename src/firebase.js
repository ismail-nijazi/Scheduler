import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZsEVxcyB10riLbpthqsH9JeFQzLNAI2I",
  authDomain: "scheduler-testing-7f9d0.firebaseapp.com",
  projectId: "scheduler-testing-7f9d0",
  storageBucket: "scheduler-testing-7f9d0.appspot.com",
  messagingSenderId: "512862174831",
  appId: "1:512862174831:web:b570bfe51d6e694362d79a",
  measurementId: "G-LVJVFKYW0H"
};


const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);

export default app;
