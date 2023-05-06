/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const image = require('../../assets/register.png');
const icon = require('../../assets/google.png');

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <TextInput style={styles.input} inputMode="email" placeholder="Enter your email adress" placeholderTextColor={'#FFFFFF'} />
              <TextInput style={styles.input} inputMode="text" placeholder="Enter your password" placeholderTextColor={'#FFFFFF'} />
              <TextInput style={styles.input} inputMode="text" placeholder="Enter your phone number" placeholderTextColor={'#FFFFFF'} />
            </View>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.btnCreate} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textCreate}>Create New Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGoogle}>
                <Image source={icon} style={styles.iconGoogle} />
                <Text style={styles.textGoogle}>Create with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 200,
    marginBottom: 50,
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: '#000000a0',
    flex: 1,
    alignItems: 'center',
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
    alignItems: 'center',
  },
  iconGoogle: {
    width: 24,
    height: 24,
  },
});

export default Register;
