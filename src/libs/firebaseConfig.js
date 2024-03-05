// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// import { initFirestore } from "@auth/firebase-adapter";
// import { cert } from "firebase-admin/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjhXwrnSaPxqWHhgvUrmp-FT-HLk4F8Zw",
  authDomain: "desidine-35d0c.firebaseapp.com",
  projectId: "desidine-35d0c",
  storageBucket: "desidine-35d0c.appspot.com",
  messagingSenderId: "639001889711",
  appId: "1:639001889711:web:f3bdc3b2170bc0ad20bd5a",
  measurementId: "G-WEDDEFDQ2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export { storage, db, auth, googleProvider };
// export const firestore = initFirestore({
//   credential: cert({
//     projectId: process.env.FIRE_PROJECT_ID,
//     clientEmail: process.env.FIRE_CLIENT_EMAIL,
//     privateKey: process.env.FIRE_PRIVATE_KEY,
//   }),
// });

// export { storage, db };

// Sample DB usages
// Get a list of cities from your database
// async function getCities(firestore) {
//   const citiesCol = collection(firestore, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }
