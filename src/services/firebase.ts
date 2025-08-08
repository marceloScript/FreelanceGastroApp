// src/services/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDVBCh6CkRlIZAzvQqM1HUWb6o-dDOUWK0",
  authDomain: "freelancegastroapp-23522.firebaseapp.com",
  projectId: "freelancegastroapp-23522",
  storageBucket: "freelancegastroapp-23522.appspot.com",
  messagingSenderId: "784110070207",
  appId: "1:784110070207:web:f2fe6d01ba99a34045590a"
};

// Inicializa o Firebase apenas se ainda não existir instância
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let auth;

// Detecta se está no ambiente React Native ou Web
const isReactNative =
  typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

if (isReactNative) {
  // React Native → usa initializeAuth com persistência no AsyncStorage
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    // Caso já esteja inicializado
    auth = getAuth(app);
  }
} else {
  // Web
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };





