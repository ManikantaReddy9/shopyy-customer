// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK7l1oqs8Kvz8pi386d5BLBc0DKezE3R4",
  authDomain: "shopyy-orders.firebaseapp.com",
  projectId: "shopyy-orders",
  storageBucket: "shopyy-orders.firebasestorage.app",
  messagingSenderId: "807880285407",
  appId: "1:807880285407:web:b3f2e6d61ed94335221d6a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
