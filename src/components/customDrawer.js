/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Avatar, Divider, Pressable, Center, Button, Modal } from 'native-base';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userAction } from '../redux/slices/auth';
// import { useSelector } from 'react-redux';

const CustomDrawer = () => {
  // const token = useSelector((state) => state.user.token);
  // console.log(token);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const placeholder = require('../assets/placeholder-user.jpg');


  const handleLogout = () => {
    setIsLoading(false);
    dispatch(userAction.authLogout());
    navigation.replace('SplashScreen');
    return;
  };

  return (
    <NativeBaseProvider >
      <Box w="full" h="288px" alignItems="center" gap="10px" roundedTopRight="30px" roundedBottomRight="30px" pt="47px" backgroundColor="#6A4029" shadow={9}>
        <Avatar source={placeholder} alt="Profile" w="142px" h="142px" rounded="full" resizeMode="cover" />
        <Text fontSize="17px" fontWeight="600" color="#FFFFFF">Zulaikha</Text>
        <Text color="#FFFFFF">zulaikha17@gmail.com</Text>
      </Box>
      <Box pt="39px" px="40px">
        <Pressable onPress={() => navigation.navigate('Profile')} flexDirection="row" alignItems="center" gap="13px">
          <Icon name="account-circle-outline" color="#6A4029" size={30} />
          <Text fontSize="17px" fontWeigt="600" color="#6A4029">Edit Pofile</Text>
        </Pressable>
        <Divider my="1" bg="#6A4029" mt="24px" mb="24px" />
        <Pressable onPress={() => navigation.navigate('Cart')} flexDirection="row" alignItems="center" gap="13px">
          <Icon name="cart-arrow-down" color="#6A4029" size={30} />
          <Text fontSize="17px" fontWeigt="600" color="#6A4029">Orders</Text>
        </Pressable>
        <Divider my="1" bg="#6A4029" mt="24px" mb="24px" />
        <Pressable onPress={() => navigation.navigate('Product')} flexDirection="row" alignItems="center" gap="13px">
          <Icon name="food-outline" color="#6A4029" size={30} />
          <Text fontSize="17px" fontWeigt="600" color="#6A4029">All menu</Text>
        </Pressable>
        <Divider my="1" bg="#6A4029" mt="24px" mb="24px" />
      </Box>
      <Pressable flexDirection="row" px="40px" mt="50px" alignItems="center" gap="10px" onPress={() => setShowModal(true)}>
        <Text fontSize="17px" fontWeigt="600" color="#6A4029">Sign-out</Text>
        <Icon name="arrow-right" color="#6A4029" size={20} />
      </Pressable>
      <Box>
        <Center>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
            _dark: {
              bg: 'coolGray.800',
            },
            bg: 'warmGray.50',
          }}>
            <Modal.Content maxWidth="350" maxH="212">
              <Modal.CloseButton />
              <Modal.Header>Sign-Out</Modal.Header>
              <Modal.Body>
                Are you sure ?
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setShowModal(false);
                  }}>
                    Cancel
                  </Button>
                  {isLoading ? <Button backgroundColor="#6A4029" px="30px" onPress={handleLogout}>
                    Logout
                  </Button> : <Button backgroundColor="#6A4029" isLoading isLoadingText="Logout" />
                  }
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>;
      </Box>
    </NativeBaseProvider >
  );
};

export default CustomDrawer;
