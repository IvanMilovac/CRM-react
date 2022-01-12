import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB869OLNUdeYq68isH_ryv-I4nCCI6H6o",
  authDomain: "crm-project-im.firebaseapp.com",
  projectId: "crm-project-im",
  storageBucket: "crm-project-im.appspot.com",
  messagingSenderId: "159284708191",
  appId: "1:159284708191:web:7c8a439c2a1f8d9a27ecea",
};

const app = initializeApp(firebaseConfig);

export default app;

export const db = getFirestore();
export const auth = getAuth(app);
