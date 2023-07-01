// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app"
import { Auth, getAuth, initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMmI6VKqUBpgd9fAGnJpbkCk33UuTznDo",
  authDomain: "aeromobile-906d2.firebaseapp.com",
  projectId: "aeromobile-906d2",
  storageBucket: "aeromobile-906d2.appspot.com",
  messagingSenderId: "501024771000",
  appId: "1:501024771000:web:13914301feedaf9a0d5d4d",
}

let app: FirebaseApp;
let auth: Auth;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

const db = getFirestore(app)

export {db, auth}
