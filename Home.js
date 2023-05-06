/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const image = require('./src/assets/home.png');

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.text}>Coffee for
            Everyone</Text>
          <TouchableOpacity style={styles.btnHome} onPress={() => navigation.navigate('Drawer')}>
            <Text style={styles.textBtn}>Get started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },
  overlay: {
    backgroundColor: '#000000a0',
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnHome: {
    paddingHorizontal: 130,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FFBA33',
    marginBottom: 50,
  },
  textBtn: {
    color: '#000000',
    fontWeight: 700,
    fontSize: 17,
  },
});

export default Home;
