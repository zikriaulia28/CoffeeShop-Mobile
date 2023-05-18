/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton, ScrollView, Center, Button, Modal, Input, FormControl } from 'native-base';
import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../../utils/https/profile';
import { editPassword } from '../../utils/https/auth';
import { useSelector } from 'react-redux';
import { userAction } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import { getHistory } from '../../utils/https/transactions';


const Profile = () => {
  const id = useSelector((state) => state.user?.id);
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [msg, setMsg] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const controller = useMemo(() => new AbortController(), []);
  const placeholder = require('../../assets/placeholder-user.jpg');
  const navigation = useNavigation();
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
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
      setSuccess(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getUser(id, controller);
      const result = res.data.data[0];
      const email = result.email;
      const name = result.display_name;
      const image = result.image;
      setData(result);
      // console.log(result);
      dispatch(userAction.dataUser({ name, email, image }));
      const resultHistory = await getHistory(token, controller);
      setDataHistory([...resultHistory.data.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleEditPassword = async () => {
    setIsLoading(true);
    try {
      const result = await editPassword(token, form.oldPassword, form.newPassword, controller);
      setSuccess(true);
      setMsg(result.data.message);
      setIsLoading(false);
      const updatedForm = {
        ...form,
        oldPassword: '',
        newPassword: '',
      };
      setForm(updatedForm);
    } catch (error) {
      console.log(error.response.data);
      setInvalid(true);
      setMsg(error.response.data.msg);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSuccess(false);
  };



  // console.log('ini datahisto', dataHistory);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   // console.log('Data history updated: ', dataHistory);
  // }, [dataHistory]);

  return (
    <NativeBaseProvider>
      <Box pt={10} px={7} bg="#FFFFFF">
        <Box flexDirection="row" alignItems="center" gap="100px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">My profile</Text>
        </Box>
      </Box>
      <ScrollView flex={1}>
        <Box gap="9px">
          <Box bg="#FFFFFF">
            <Box alignItems="center" px={7} mt="28px">
              {isLoading ? <Skeleton w="100px" h="100px" rounded="full" mb="28px" /> : <Box position="relative" w="100px" h="100px" rounded="full">
                {data?.image ? (
                  <Image source={{ uri: data.image }} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
                ) : (
                  <Image source={placeholder} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
                )}
                <Pressable onPress={() => navigation.navigate('EditProfile')} position="absolute" w="35px" h="35px" rounded="full" bg="#6A4029" alignItems="center" justifyContent="center" top="50px" right="-10px" >
                  <Icon name="pencil-outline" color="#FFFFFF" size={24} />
                </Pressable>
              </Box>}
              {isLoading ? <Skeleton h="20px" mb="10px" rounded="20px" /> : (<Text mt="17px" fontSize="18px" fontWeight={700} color="#6A4029">{data.display_name ? data.display_name : 'Please Set Name'}</Text>)}
              {isLoading ? <Skeleton h="20px" mb="10px" rounded="20px" /> : (<Text mt="10px" color="#6A4029">{data.email}</Text>)}
              {isLoading ? <Skeleton h="20px" mb="10px" rounded="20px" /> : (<Text color="#6A4029">{data.phone_number}</Text>)}
              {isLoading ? <Skeleton h="20px" mb="10px" rounded="20px" /> : (<Text mb="28px" w="80%" textAlign="center" color="#6A4029">{data.address}</Text>)}
            </Box>
          </Box>
          <Box pl={7} bg="#FFFFFF" py="24px" >
            <Box flexDirection="row" justifyContent="space-between" alignItems="center" pr="42px">
              <Text color="#6A4029" fontSize="18px" fontWeight={700}>Order History</Text>
              <Pressable onPress={() => navigation.navigate('History')}>
                <Text color="#6A4029">See More</Text>
              </Pressable>
            </Box>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
              <Box mt="16px" flexDirection="row" gap="25px">
                {isLoading ? Array.from({ length: 5 }).map((item, idx) => (
                  <Skeleton key={idx} w="59px" h="59px" rounded="20px" />)) : (
                  dataHistory.length > 0 && dataHistory.map((item, idx) => (
                    <Box key={idx} w="59px" h="59px" rounded="20px" shadow={1}>
                      <Image source={{ uri: item.image }} alt="history-img" w="full" h="full" resizeMode="cover" rounded="20px" />
                    </Box>
                  )))
                }
              </Box>
            </ScrollView>
          </Box>
          <Box px={'42px'} bg="#FFFFFF" pb="30px">
            <Pressable onPress={() => setShowModal(true)} flexDirection="row" justifyContent="space-between" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#FFFFFF" shadow={3} rounded="20px">
              <Text color="#6A4029" fontSize="18px" fontWeight={700}>Edit Password</Text>
              <Icon name="arrow-right" color="#6A4029" size={30} />
            </Pressable>
            <Pressable flexDirection="row" justifyContent="space-between" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#FFFFFF" shadow={3} rounded="20px">
              <Text color="#6A4029" fontSize="18px" fontWeight={700}>FAQ</Text>
              <Icon name="arrow-right" color="#6A4029" size={30} />
            </Pressable>
            <Pressable flexDirection="row" justifyContent="space-between" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#FFFFFF" shadow={3} rounded="20px">
              <Text color="#6A4029" fontSize="18px" fontWeight={700}>Help</Text>
              <Icon name="arrow-right" color="#6A4029" size={30} />
            </Pressable>
            <Pressable justifyContent="center" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#6A4029" shadow={3} rounded="20px">
              <Text fontSize="18px" fontWeight={700} color="#FFFFFF">Save</Text>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
      <Box>
        <Center>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
            _dark: {
              bg: 'coolGray.800',
            },
            bg: 'warmGray.50',
          }}>
            <Modal.Content maxW="350" maxH="350px">
              <Modal.CloseButton />
              <Modal.Header>Edit Password</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Old Password</FormControl.Label>
                  <Input size="2xl" type="password" value={form.oldPassword} onChangeText={(text) => onChangeForm('oldPassword', text)} placeholder="Enter old password" />
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>New Password</FormControl.Label>
                  <Input size="2xl" type="password" value={form.newPassword} onChangeText={(text) => onChangeForm('newPassword', text)} placeholder="Enter new password" />
                </FormControl>
                {invalid && (
                  <Text mt="10px" color="red.700">
                    {invalid && msg}
                  </Text>
                )}
                {success && (
                  <Text mt="10px" color="green.700">
                    {success && msg}
                  </Text>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setShowModal(false);
                  }}>
                    Cancel
                  </Button>
                  {isLoading ? <Button backgroundColor="#6A4029" px="17px" py="8px" isLoading isLoadingText="Save" /> : success === true ? <Button px="30px" bg="#6A4029" onPress={handleClose}>
                    Close
                  </Button> : <Button onPress={handleEditPassword} bg="#6A4029" px="30px">
                    Save
                  </Button>}
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>;
      </Box>
    </NativeBaseProvider>
  );
};

export default Profile;
