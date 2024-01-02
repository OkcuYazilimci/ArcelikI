import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyARCbfPRdiD3dk5Uw3bQUpLlVlviiPCCYQ",
  authDomain: "arcelikai.firebaseapp.com",
  projectId: "arcelikai",
  storageBucket: "arcelikai.appspot.com",
  messagingSenderId: "800002311195",
  appId: "1:800002311195:web:fbdfde454440c35810e4be",
  measurementId: "G-965DK6Q87V"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const firebase = {
  storage
}

export default firebase;