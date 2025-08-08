// src/services/firebase.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, initializeAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
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

// Inicializa o Firebase app (só uma instância)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let auth: Auth;

// Detecta se está no ambiente React Native (Expo) ou Web
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

if (isReactNative) {
  // React Native: tenta inicializar Auth com persistência em AsyncStorage
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    // Se já inicializado, pega a instância existente
    auth = getAuth(app);
  }
} else {
  // Web: apenas pega a instância do Auth
  auth = getAuth(app);
}

// Firestore (mesmo para web e React Native)
const db: Firestore = getFirestore(app);

export { app, auth, db };





