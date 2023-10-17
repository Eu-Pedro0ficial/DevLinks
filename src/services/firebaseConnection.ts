import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy3-3gGN2nffhWuicfcMMg8Z1T2TNTvt8",
  authDomain: "reactlinks-1f871.firebaseapp.com",
  projectId: "reactlinks-1f871",
  storageBucket: "reactlinks-1f871.appspot.com",
  messagingSenderId: "722649221217",
  appId: "1:722649221217:web:4b6f66be272e3d18b78220"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
