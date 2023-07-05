// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDDqeZO2Lp_3k1QLStLu5wLrwn735STmhg",
    authDomain: "ecommerce-with-react-19d86.firebaseapp.com",
    projectId: "ecommerce-with-react-19d86",
    storageBucket: "ecommerce-with-react-19d86.appspot.com",
    messagingSenderId: "992599186736",
    appId: "1:992599186736:web:2cf03dbeed660220053cf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;