import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import only what's needed
import { getFirestore } from "firebase/firestore"; // Import Firestore if needed

const firebaseConfig = {
  apiKey: "AIzaSyBG_vPWO83CtZCsy62jKZCGl6qZ5ejQyx8",
  authDomain: "innosphere-22705.firebaseapp.com",
  projectId: "innosphere-22705",
  storageBucket: "innosphere-22705.firebasestorage.app",
  messagingSenderId: "589436919039",
  appId: "1:589436919039:web:f8a2acf9d2122fae8140ca",
  measurementId: "G-9Z1WKH232M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get auth instance
const firestore = getFirestore(app); // Get firestore instance

export { auth, firestore, signInWithEmailAndPassword };
