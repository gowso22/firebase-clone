import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDHSUj_o1roRak_75-aX7z3YqwJeOxl3s",
  authDomain: "new-clone-2b15f.firebaseapp.com",
  projectId: "new-clone-2b15f",
  storageBucket: "new-clone-2b15f.appspot.com",
  messagingSenderId: "485972372432",
  appId: "1:485972372432:web:92fbd70276e125fce7e7d5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
