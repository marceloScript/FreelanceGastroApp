// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDVBCh6CkRlIZAzvQqM1HUWb6o-dDOUWK0",
  authDomain: "freelancegastroapp-23522.firebaseapp.com",
  projectId: "freelancegastroapp-23522",
  storageBucket: "freelancegastroapp-23522.firebasestorage.app",
  messagingSenderId: "784110070207",
  appId: "1:784110070207:web:f2fe6d01ba99a34045590a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


