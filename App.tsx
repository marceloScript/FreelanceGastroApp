import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

// Importa a tela de login
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    <>
      <LoginScreen />
      <StatusBar style="auto" />
    </>
  );
}


