
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIBDe9lbmDXNTXjhZh33lmzGz7TWHoBmg",
  authDomain: "tech-geeks-27655.firebaseapp.com",
  projectId: "tech-geeks-27655",
  storageBucket: "tech-geeks-27655.appspot.com",
  messagingSenderId: "974897620024",
  appId: "1:974897620024:web:1333d838ce8cbe12e6b2cd"
};


const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app)
export default auth;