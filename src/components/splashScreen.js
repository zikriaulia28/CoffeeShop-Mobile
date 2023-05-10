/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box } from 'native-base';
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
      if (token) {
        handleRedirect();
      }
      if (!token) {
        navigation.navigate('Home');
      }
    }, 3500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = () => {
    navigation.navigate('MyTabs');
  };


  return (
    <NativeBaseProvider>
      <Box flex={1}>
        {/* <ZStack flex={1}>
          <Image flex={1} source={image} resizeMode="contain" alt="background" />
        </ZStack> */}
        <Lottie source={animation} autoPlay loop resizeMode="cover" />
      </Box>
    </NativeBaseProvider >
  );
};

export default SplashScreen;
