// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth ,GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiblSBHptKQZIYQmFRd1dnkQIT2SZC8gk",
  authDomain: "hackathonwebsite-2ea7b.firebaseapp.com",
  projectId: "hackathonwebsite-2ea7b",
  storageBucket: "hackathonwebsite-2ea7b.firebasestorage.app",
  messagingSenderId: "203070019087",
  appId: "1:203070019087:web:903adebe705e872928f57a",
  measurementId: "G-P9XMLPDEMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const auth = getAuth(app)