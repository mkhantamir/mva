import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_XzHuoMbsExM93vh_mk2ZCXloxiKZZx8",
  authDomain: "mva-vote.firebaseapp.com",
  projectId: "mva-vote",
  storageBucket: "mva-vote.appspot.com",
  messagingSenderId: "1133071656",
  appId: "1:1133071656:web:852be8cba0dd535053941d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
