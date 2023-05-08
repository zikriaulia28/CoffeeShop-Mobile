/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Image, Box, ZStack, Text, Center, Input, Button } from 'native-base';
import React from 'react';


const image = require('../../assets/forgot.png');

const Forgot = () => {
  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <ZStack flex={1} padd>
          <Image flex={1} source={image} resizeMode="contain" alt="background" />
          <Box flex={1} bg="#000000a0" size="full" />
          <Center width="full" paddingX="30px">
            <Box>
              <Text color="white" fontWeight="700" fontSize="30px" textAlign="center" mt="24">Forgot Your Password?</Text>
              <Text color="white" fontSize="20px" textAlign="center">Don't worry, we got your back</Text>
            </Box>
            <Box width="full" mt="50%">
              <Input variant="underlined" size="lg" placeholder="Enter your email adress to get link" placeholderTextColor="white" />
              <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={() => console.log('hello world')}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Send</Text></Button>
            </Box>
            <Box width="full" mt="50%">
              <Text color="white" fontSize="20px" fontWeight="700" textAlign="center">Click here if you didn’t receive any link in 2 minutes</Text>
              <Button mt="10px" backgroundColor="#6A4029" rounded="lg" onPress={() => console.log('Resend Link')}><Text color="white" fontWeight="700" fontSize="18px" >Resend Link</Text></Button>
            </Box>
          </Center>
        </ZStack>
      </Box>
    </NativeBaseProvider >
  );
};

export default Forgot;
