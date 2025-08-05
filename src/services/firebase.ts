import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDVBCh6CkRlIZAzvQqM1HUWb6o-dDOUWK0",
  authDomain: "freelancegastroapp-23522.firebaseapp.com",
  projectId: "freelancegastroapp-23522",
  storageBucket: "freelancegastroapp-23522.firebasestorage.app",
  messagingSenderId: "784110070207",
  appId: "1:784110070207:web:f2fe6d01ba99a34045590a"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };



