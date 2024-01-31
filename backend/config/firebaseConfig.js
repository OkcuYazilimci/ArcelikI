import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

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