import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCmzv_aJcbGJ8t94rweJQ6XmjyjLXzV97I",
  authDomain: "last-try-c546e.firebaseapp.com",
  projectId: "last-try-c546e",
  storageBucket: "last-try-c546e.appspot.com",
  messagingSenderId: "404937275160",
  appId: "1:404937275160:web:29c123edccb3fa5ccc906d"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

