/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Image, Box, ZStack, Text, Center, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';



const Home = () => {
  const image = require('./src/assets/home.png');
  const navigation = useNavigation();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      handleRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = () => {
    navigation.navigate('MyTabs');
  };


  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <ZStack flex={1}>
          <Image flex={1} source={image} resizeMode="contain" alt="background" />
          <Box flex={1} bg="#000000" opacity="0.3" size="full" />
          <Center width="full" height="full" paddingX="30px" paddingY="50px" justifyContent="space-between">
            <Box width="full" mt="150px">
              <Text color="white" fontWeight="700" lineHeight="70px" fontSize="65px" textAlign="center">Coffee for
                Everyone</Text>
            </Box>
            <Box width="full">
              <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={() => navigation.navigate('Wellcome')}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Get started</Text>
              </Button>
            </Box>
          </Center>
        </ZStack>
      </Box>
    </NativeBaseProvider >
  );
};

export default Home;
