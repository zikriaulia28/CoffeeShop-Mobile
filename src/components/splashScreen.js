/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react-native';



const SplashScreen = () => {
  // const image = require('../assets/home.png');
  const animation = require('../assets/animation.json');
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
      <Box flex={1} bg="#FFBA33" pt="100%">
        <Lottie source={animation} autoPlay loop resizeMode="contain" />
      </Box>
      <Box flex={1} bg="#FFBA33">
        <Box px={10}>
          <Text fontWeight={900} fontSize="20px" color="#6A4029" textAlign="center" italic >Selamat datang di Filosofi Coffee!</Text>
          <Text fontWeight={900} fontSize="18px" color="#6A4029" textAlign="center" italic>Nikmati kopi bermakna</Text>
        </Box>
      </Box>
    </NativeBaseProvider >
  );
};

export default SplashScreen;
