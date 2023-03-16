// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMmI6VKqUBpgd9fAGnJpbkCk33UuTznDo",
  authDomain: "aeromobile-906d2.firebaseapp.com",
  projectId: "aeromobile-906d2",
  storageBucket: "aeromobile-906d2.appspot.com",
  messagingSenderId: "501024771000",
  appId: "1:501024771000:web:13914301feedaf9a0d5d4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export default app

