/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Heading, Center } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react-native';
import styles from '../../styles';



const SplashScreen = () => {
  // const image = require('../assets/home.png');
  const animation = require('../assets/animation.json');
  const loader = require('../assets/loader-coffee.json');
  const navigation = useNavigation();
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    setTimeout(() => {
      if (!token) {
        navigation.navigate('Home');
      }
      if (token) {
        handleRedirect();
      }
    }, 3500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = () => {
    navigation.navigate('MyTabs');
  };


  return (
    <NativeBaseProvider>
      <Box flex={1} background="#FFBA33">
        <Center>
          <Heading mt="40px" fontSize="40px" fontWeight={700} color="#FFFFFF" borderBottomWidth={4} borderBottomColor="#6A4029" italic>Filosofi Coffe</Heading>
        </Center>
        <Lottie source={animation} autoPlay loop resizeMode="contain" />
        <Box flex={1}>
          <Lottie source={loader} autoPlay loop resizeMode="contain" style={styles.loader} />
        </Box>
      </Box>
    </NativeBaseProvider >
  );
};

export default SplashScreen;
