import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCCw7NysXLFWdJQnKlyxecVKCy_rPvdCEc',
  authDomain: 'scheduler-d411b.firebaseapp.com',
  projectId: 'scheduler-d411b',
  storageBucket: 'scheduler-d411b.appspot.com',
  messagingSenderId: '544384833974',
  appId: '1:544384833974:web:06dbb4345a0a6ab7698917',
  measurementId: 'G-CZR67Y53YF'
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);

export default app;
