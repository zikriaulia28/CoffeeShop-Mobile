/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Image, Box, ZStack, Text, Center, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const Wellcome = () => {
  const image = require('../../assets/wellcome.png');
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <ZStack flex={1}>
          <Image flex={1} source={image} resizeMode="contain" alt="background" />
          <Box flex={1} bg="#000000" opacity="0.3" size="full" />
          <Center width="full" height="full" paddingX="30px" paddingY="50px" justifyContent="space-between">
            <Box width="full" mt="70px">
              <Text color="white" fontWeight="700" fontSize="65px" textAlign="center">Welcome!</Text>
              <Text color="white" fontSize="17px" textAlign="center">Get a cup of coffee for free every sunday morning</Text>
            </Box>
            <Box width="full">
              <Button mt="10px" backgroundColor="#6A4029" rounded="lg" onPress={() => navigation.navigate('Register')}><Text color="#FFFFFF" fontWeight="700" fontSize="18px" >Create New Account</Text>
              </Button>
              <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={() => navigation.navigate('Login')}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Login</Text>
              </Button>
            </Box>
          </Center>
        </ZStack>
      </Box>
    </NativeBaseProvider >
  );
};

export default Wellcome;
