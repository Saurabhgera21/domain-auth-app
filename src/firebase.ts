
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYPBipMsJkS0ydNiSM-MvhaYwkFn6qeRw",
  authDomain: "hb-domain-auth-app.firebaseapp.com",
  projectId: "hb-domain-auth-app",
  storageBucket: "hb-domain-auth-app.firebasestorage.app",
  messagingSenderId: "587979114099",
  appId: "1:587979114099:web:a9e9d1f70184955fa6cc06",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export default app;
