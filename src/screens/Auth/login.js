/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const image = require('../../assets/login.png');
const icon = require('../../assets/google.png');

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <TextInput style={styles.input} inputMode="email" placeholder="Enter your email adress" placeholderTextColor={'#FFFFFF'} />
              <TextInput style={styles.input} inputMode="text" placeholder="Enter your password" placeholderTextColor={'#FFFFFF'} />
              <Text style={styles.textForgot} onPress={() => navigation.navigate('Forgot')}>Forgot password?</Text>
            </View>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.btnCreate} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textCreate}>Create New Account</Text>
              </TouchableOpacity>
              <View style={styles.wrapperLogin}>
                <Text style={styles.rules} />
                <Text style={styles.textOrLogin}>or login in with</Text>
                <Text style={styles.rules} />
              </View>
              <TouchableOpacity style={styles.btnGoogle}>
                <Image source={icon} style={styles.iconGoogle} />
                <Text style={styles.textGoogle}>Create with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 300,
    marginBottom: 50,
    width: '100%',
  },
  image: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  overlay: {
    backgroundColor: '#000000a0',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 31,
  },
  btnCreate: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#6A4029',
  },
  btnGoogle: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  textGoogle: {
    color: '#000000',
    fontWeight: 700,
    fontSize: 17,
    textAlign: 'center',
  },
  textCreate: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 17,
    textAlign: 'center',
  },
  textForgot: {
    color: '#FFFFFF',
  },
  btnGroup: {
    display: 'flex',
    gap: 17,
  },
  input: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    color: '#FFFFFF',
    width: '100%',
    padding: 1,
    fontSize: 17,
  },
  inputGroup: {
    gap: 17,
    marginBottom: 40,
  },
  iconGoogle: {
    width: 24,
    height: 24,
  },
  wrapperLogin: {
    flexDirection: 'row',
    gap: 20,
    borderWidth: 1,
  },
  textOrLogin: {
    color: '#FFFFFF',
  },
  rules: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    width: '30%',
    height: '50%',
  },
});

export default Login;
