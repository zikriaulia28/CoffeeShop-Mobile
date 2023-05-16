/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Image, Box, ZStack, Text, Center, Input, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../utils/https/auth';
import React, { useMemo, useState } from 'react';
import { userAction } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';



const Login = () => {
  const image = require('../../assets/login.png');
  const icon = require('../../assets/google.png');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
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

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.email === '' && form.password === '') {
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
      const res = await login(form.email, form.password, controller);
      console.log('respon login', res.data);
      const token = res.data.token;
      const id = res.data.id;
      const role_id = res.data.role_id;
      // console.log('cek role', role);
      dispatch(userAction.authLogin({ id, token, role_id }));
      setLoading(false);
      handleRedirect();
    } catch (error) {
      setLoading(false);
      setMsg(error.response.data.msg);
      setInvalid(true);
    }
  };

  const handleRedirect = () => {
    navigation.navigate('MyTabs');
  };

  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <ZStack flex={1} >
          <Image flex={1} source={image} resizeMode="contain" alt="background" />
          <Box flex={1} bg="#000000" opacity="0.3" size="full" />
          <Center width="full" height="full" paddingX="30px" paddingY="50px" justifyContent="space-between">
            <Box width="full">
              <Text color="white" fontWeight="700" fontSize="50px">Login</Text>
            </Box>
            <Box width="full">
              <Box mb="10px">
                <Input variant="underlined" size="2xl" color="white" type="text" value={form.email} onChangeText={(text) => onChangeForm('email', text)} placeholder="Enter your email address" placeholderTextColor="white" />
                <Input variant="underlined" size="2xl" color="white" type="password" value={form.password} onChangeText={(text) => onChangeForm('password', text)} placeholder="Enter your password" placeholderTextColor="white" />
                <Text color="#FFFFFF" mt="5px" onPress={() => navigation.navigate('Forgot')}>Forgot password?</Text>
              </Box>
              <Text color="#FF3333">{invalid && msg}</Text>
              <Box mt="10px" gap="10px">
                {loading ? <Button isLoading isLoadingText="Login" mt="10px" backgroundColor="#FFBA33" rounded="lg" >
                  Button
                </Button> : <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={loginHandler}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Login</Text>
                </Button>}
                <Box flexDirection="row" justifyContent="space-between">
                  <Box borderBottomColor="white" borderBottomWidth="1" width="30%" height="50%" />
                  <Text color="white">or login in with</Text>
                  <Box borderBottomColor="white" borderBottomWidth="1" width="30%" height="50%" />
                </Box>
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

export default Login;

