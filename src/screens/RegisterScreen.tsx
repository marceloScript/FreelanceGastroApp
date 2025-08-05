import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export default function RegisterScreen() {
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState('Temporário');
  const [notes, setNotes] = useState('');
  const [eventPeople, setEventPeople] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name || !phone || !address || !userType) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userData = {
        uid,
        userType,
        email,
        name,
        phone,
        address,
        createdAt: new Date().toISOString(),
      };

      if (userType === 'Trabalhador') {
        Object.assign(userData, { role, experience });
      } else if (userType === 'Restaurante') {
        Object.assign(userData, { companyName, jobType, notes });
      } else if (userType === 'Evento') {
        Object.assign(userData, { companyName, eventPeople, jobType, notes });
      }

      await setDoc(doc(db, 'users', uid), userData);

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker selectedValue={userType} onValueChange={setUserType} style={styles.input}>
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Trabalhador" value="Trabalhador" />
        <Picker.Item label="Restaurante" value="Restaurante" />
        <Picker.Item label="Organizador de Evento" value="Evento" />
      </Picker>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome completo ou empresa" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Telefone" keyboardType="phone-pad" />

      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Endereço completo" />

      {userType === 'Trabalhador' && (
        <>
          <Text style={styles.label}>Profissão</Text>
          <TextInput style={styles.input} value={role} onChangeText={setRole} placeholder="Garçom, Cozinheiro etc." />

          <Text style={styles.label}>Experiências Profissionais</Text>
          <TextInput style={styles.input} value={experience} onChangeText={setExperience} placeholder="Descreva as últimas experiências ou anexe currículo" multiline />
        </>
      )}

      {(userType === 'Restaurante' || userType === 'Evento') && (
        <>
          <Text style={styles.label}>Nome da Empresa</Text>
          <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} placeholder="Razão Social ou Nome Fantasia" />

          {userType === 'Evento' && (
            <>
              <Text style={styles.label}>Público Estimado</Text>
              <TextInput style={styles.input} value={eventPeople} onChangeText={setEventPeople} placeholder="Ex: 30 pessoas" keyboardType="numeric" />
            </>
          )}

          <Text style={styles.label}>Tipo de Vaga</Text>
          <Picker selectedValue={jobType} onValueChange={setJobType} style={styles.input}>
            <Picker.Item label="Temporário" value="Temporário" />
            <Picker.Item label="Fixo (CLT)" value="Fixo" />
            <Picker.Item label="Extra/Final de Semana" value="Extra" />
          </Picker>

          <Text style={styles.label}>Observações</Text>
          <TextInput style={styles.input} value={notes} onChangeText={setNotes} placeholder="Detalhes adicionais" multiline />
        </>
      )}

      <Button title="Cadastrar" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
