import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDd-LeW0645rN_bSeDiPDIrwK2GiDjhI-s",
  authDomain: "educational-website-6ec29.firebaseapp.com",
  projectId: "educational-website-6ec29",
  storageBucket: "educational-website-6ec29.appspot.com",
  messagingSenderId: "748406873411",
  appId: "1:748406873411:web:0e1d0a6526fe3a7200a3f6"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

