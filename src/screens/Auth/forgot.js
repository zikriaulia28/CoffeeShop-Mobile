/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Image, Box, ZStack, Text, Center, Input, Button } from 'native-base';
import React, { useState, useMemo } from 'react';
import { createOtp, forgot } from '../../utils/https/auth';
import { useNavigation } from '@react-navigation/native';



const Forgot = () => {
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [newForm, setNewForm] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEmail, setIsEmail] = useState('');
  const [form, setForm] = useState({
    email: '',
    otp: '',
    password: '',
  });

  const HandlerGetOtp = async () => {
    setLoading(true);
    try {
      if (form.email === '') {
        setLoading(false);
        setInvalid(true);
        setMsg('Input is required!!!');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setMsg('Email is invalid!');
        setInvalid(true);
        setLoading(false);
        return;
      }
      const email = form.email;
      await createOtp(email, controller);
      setIsEmail(form.email);
      setLoading(false);
      const updatedForm = {
        ...form,
        email: '',
      };
      setForm(updatedForm);
      setNewForm(true);

    } catch (error) {
      console.log(error);
      setLoading(false);
      setInvalid(true);
      setMsg(error);
    }
  };

  console.log(isEmail);
  console.log(form);

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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (form.otp === '' || form.password === '') {
        setLoading(false);
        setInvalid(true);
        setMsg('Input is required!!!');
        return;
      }
      const email = isEmail;
      const result = await forgot(email, form.otp, form.password, controller);
      setSuccess(true);
      setMsg(result.data.message);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
      setLoading(false);
      const updatedForm = {
        ...form,
        otp: '',
        password: '',
      };
      setForm(updatedForm);
      setNewForm(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
      setInvalid(true);
      setMsg(error.response.data.msg);
    }
  };

  const image = require('../../assets/forgot.png');
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
              {newForm ? (<>
                <Input value={form.otp} onChangeText={(text) => onChangeForm('otp', text)} variant="underlined" size="lg" placeholder="Enter OTP" placeholderTextColor="white" color="white" fontSize="18px" />

                <Input type="password" value={form.password} onChangeText={(text) => onChangeForm('password', text)} variant="underlined" size="lg" placeholder="Enter New Password" placeholderTextColor="white" color="white" fontSize="18px" />
              </>
              ) : (
                <Input value={form.email} onChangeText={(text) => onChangeForm('email', text)} variant="underlined" size="lg" placeholder="Enter your email adress to get link" placeholderTextColor="white" color="white" fontSize="18px" />
              )}
              {invalid && (
                <Text color="red.700" fontWeight={700} fontSize="16px">
                  {invalid && msg}
                </Text>
              )}
              {success && (
                <Text color="green.700" fontWeight={700} fontSize="16px">
                  {success && msg}
                </Text>
              )}
              {loading ? <Button isLoading isLoadingText="Send" mt="10px" backgroundColor="#FFBA33" rounded="lg" >
                Button
              </Button> : newForm ? <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={handleSubmit}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Send</Text></Button> : success ? <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={() => navigation.navigate('Login')}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Back To Login</Text></Button> : <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={HandlerGetOtp}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Send</Text></Button>}

            </Box>
            <Box width="full" mt={newForm ? '30%' : '50%'}>
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
