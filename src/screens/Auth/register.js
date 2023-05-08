/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Image, Box, ZStack, Text, Center, Input, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../utils/https/auth';
import React, { useMemo, useState } from 'react';



const Register = () => {
  const image = require('../../assets/register.png');
  const icon = require('../../assets/google.png');
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone_number: '',
  });

  const onChangeForm = (name, value) => {
    // eslint-disable-next-line no-shadow
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
    if (value) {
      setInvalid(false);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.email === '' || form.password === '' || form.phone_number === '') {
        setLoading(false);
        setInvalid(true);
        setMsg('Input is required!!!');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setMsg('Email is invalid!');
        setInvalid(true);
        setLoading(false);
        return;
      }
      const res = await register(form.email, form.password, form.phone_number, controller);
      console.log(res.data);
      setLoading(false);
      handleRedirect();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <ZStack flex={1} >
          <Image flex={1} source={image} resizeMode="contain" alt="background" />
          <Box flex={1} bg="#000000" opacity="0.3" size="full" />
          <Center width="full" height="full" paddingX="30px" paddingY="50px" justifyContent="space-between">
            <Box width="full" mt="100px">
              <Text color="white" fontWeight="700" fontSize="50px" textAlign="center">Sign Up</Text>
            </Box>
            <Box width="full">
              <Box mb="10px">
                <Input variant="underlined" size="2xl" color="white" type="text" value={form.email} onChangeText={(text) => onChangeForm('email', text)} placeholder="Enter your email address" placeholderTextColor="white" />
                <Input variant="underlined" size="2xl" color="white" type="password" value={form.password} onChangeText={(text) => onChangeForm('password', text)} placeholder="Enter your password" placeholderTextColor="white" />
                <Input variant="underlined" size="2xl" color="white" type="text" inputMode="numeric" value={form.phone_number} onChangeText={(text) => onChangeForm('phone_number', text)} placeholder="Enter your phone number" placeholderTextColor="white" />
              </Box>
              <Text color="#FF3333">{invalid && msg}</Text>
              <Box mt="10px" gap="10px">
                {loading ? <Button isLoading isLoadingText="Create Account" mt="10px" backgroundColor="#FFBA33" rounded="lg" >
                  Button
                </Button> : <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={registerHandler}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Create Account</Text>
                </Button>}
                <Button backgroundColor="#FFFFFF" rounded="lg" onPress={() => console.log('hello world')}>
                  <Box flexDirection="row" gap="10px">
                    <Image source={icon} alt="icon-google" />
                    <Text color="#000000" fontWeight="700" fontSize="18px" >Login with Google</Text>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Center>
        </ZStack>
      </Box>
    </NativeBaseProvider >
  );
};

export default Register;
