import { KeyboardAvoidingView, ScrollView, Platform, Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Login() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailUser, setemailUser] = useState('');
  const [senhaUser, setsenhaUser] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const doLogin = async () => {
    try {
      const response = await axios.get('http://demo9723279.mockable.io/');
      
      console.log('Response Data:', response.data); 
      const user = response.data; 
      if (user.email.trim().toLowerCase() === emailUser.trim().toLowerCase() &&
          user.senha === senhaUser) {
        setLoginSuccess(true);
        Alert.alert("MSG", "Login aprovado!");
      } else {
        setLoginSuccess(false);
        Alert.alert("MSG", "Login reprovado!");
      }
    } catch (error) {
      console.error(error);
      setLoginSuccess(false);
      Alert.alert("MSG", "Erro ao conectar-se à API!");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Image 
              source={require('./assets/icon.png')}
              style={styles.imgContainer}
            />
            <Text style={styles.titletext}>Login</Text>
            <Text>Teste para tela de login do meu TCC</Text>
          </View>
          <View style={styles.formView}>
            <Text style={styles.textLabel}>EMAIL*</Text>
            <TextInput 
              style={styles.textInput}
              placeholder='Insira seu email'
              keyboardType='email-address'
              value={emailUser}
              onChangeText={setemailUser}
            />
            <Text style={styles.textLabel}>SENHA*</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.textInputPassword}
                placeholder='Insira sua senha'
                secureTextEntry={secureTextEntry}
                value={senhaUser}
                onChangeText={setsenhaUser}
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Ionicons 
                  name={secureTextEntry ? 'eye-off' : 'eye'} 
                  size={24} 
                  color='gray' 
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.buttonInput} 
              onPress={doLogin}>
              <Text style={{ color: '#fff' }}>ENTRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: '5%', 
  },
  container: {
    flex: 1,
    backgroundColor: '#6cd7a3',
  },
  containerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  imgContainer: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
  textLabel: {
    fontSize: 14,
    marginBottom: 5, 
    width: '100%', 
    maxWidth: 250, 
    textAlign: 'left', 
    alignSelf: 'center', 
  },
  buttonInput: {
    fontSize: 12.1,
    textAlign: 'center',
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#00Bf63',
    marginBottom: 8,
    width: '75%',
    alignItems: 'center',
    paddingVertical: 10, 
  },
  textInput: {
    fontSize: 10.1,
    borderRadius: 15,
    backgroundColor: '#fff',
    width: '75%',
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5, 
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '75%',
    height: 50,
    marginBottom: 12,
  },
  textInputPassword: {
    flex: 1,
    fontSize: 10.1,
    paddingHorizontal: 10,
    paddingVertical: 5, 
  },
  showPasswordButton: {
    paddingHorizontal: 10,
  },
  titletext: {
    fontSize: 24.2,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
});
