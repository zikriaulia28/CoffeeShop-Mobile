/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Pressable, ScrollView, Input } from 'native-base';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cartAction } from '../../redux/slices/cart';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDelivery } from '../../utils/https/profile';
import { userAction } from '../../redux/slices/auth';
import { ActivityIndicator } from 'react-native';
import { ToastAndroid } from 'react-native';

const Delivery = () => {
  const controller = useMemo(() => new AbortController(), []);
  const id = useSelector((state) => state.user?.id);
  const token = useSelector((state) => state.user?.token);
  const storeUser = useSelector((state) => state.user);
  const userName = storeUser.name;
  const isPhone = storeUser.phone;
  const isAddress = storeUser.address;
  const dataEmail = storeUser.email;
  console.log(storeUser.address);
  console.log(storeUser.phone);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [deliveryMethod, setDeliveryMethod] = useState(3);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const nameInputRef = useRef(null);
  const [form, setForm] = useState({
    display_name: '',
    phone_number: '',
    address: '',
  });

  const onChangeForm = (name, value) => {
    // eslint-disable-next-line no-shadow
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
  };

  const handleClick = (value) => {
    setDeliveryMethod(value);
    console.log(value);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    setIsLoad(true);
    try {
      const result = await updateUserDelivery(id, token, form.display_name, form.address, controller);
      if (result && result.data && result.data.data && result.data.data.length > 0) {
        const resultUpdate = result.data.data[0];
        const image = resultUpdate.image;
        const email = dataEmail;
        const name = resultUpdate.display_name;
        const address = result.address ? result.address : isAddress;
        const phone = isPhone;
        dispatch(userAction.dataUser({ name, email, image, address, phone }));
        ToastAndroid.show('Update success!', ToastAndroid.SHORT);
        setIsEditMode(false);
      } else {
        console.log('Invalid response format');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    } finally {
      setIsLoad(false);
    }
  };


  console.log(form.display_name);


  const handleConfirm = () => {
    dispatch(cartAction.deliveryMethod(deliveryMethod));
    navigation.navigate('Payment', { subtotal: route.params.total });
  };

  useEffect(() => {
    if (isEditMode) {
      nameInputRef.current?.focus();
    }
  }, [isEditMode]);

  return (
    <NativeBaseProvider>

      <Box flex={1} pt={10} px={7} >
        <Box flexDirection="row" alignItems="center" gap="110px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text fontWeight={700} fontSize="20px">Checkout</Text>
        </Box>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <Text fontSize="34px" fontWeight={900} mt="36px">Delivery</Text>
          <Box mt="35px" flexDir="row" justifyContent="space-between">
            <Text fontWeight={700} fontSise="17px">Address details</Text>
            {!isEditMode ? (
              <Pressable onPress={handleEditClick}>
                <Text color="#6A4029">Change</Text>
              </Pressable>
            ) : isLoad ? <ActivityIndicator /> : (
              <Pressable onPress={handleSaveClick}>
                <Text color="#6A4029">Save</Text>
              </Pressable>
            )}
          </Box>
          <Box bg="#FFFFFF" rounded="20px" mt="14px" py="25px" px="30">
            <Input
              fontWeight={700}
              variant="underlined"
              size="xl"
              defaultValue={userName}
              ref={nameInputRef}
              onChangeText={(text) => onChangeForm('display_name', text)}
            />
            <Input
              defaultValue={isAddress ? isAddress : 'Please Set Your Address'}
              variant="underlined"
              size="lg"
              multiline={true}
              onChangeText={(text) => onChangeForm('address', text)}
            />
            <Input
              defaultValue={isPhone}
              variant="underlined"
              size="lg"
              onChangeText={(text) => onChangeForm('phone_number', text)}
            />
          </Box>
          <Text fontSize="17px" fontWeight={700} mt="15px">Delivery methods</Text>
          <Box bg="#FFFFFF" gap={5} mt="14px" rounded="20px" h="200px" px="25px" py="35px">
            <Pressable onPress={() => handleClick(1)} active={deliveryMethod === 1}>
              <Box flexDir="row" alignItems="center" gap="10px">
                <Box w="20px" h="20px" top="-8px" rounded="full" borderWidth={1} borderColor={deliveryMethod === 1 ? '#6A4029' : '#9F9F9F'} alignItems="center" justifyContent="center">
                  {deliveryMethod === 1 && <Box w="15px" h="15px" rounded="full" bg="#6A4029" />}
                </Box>
                <Box w="85%" gap={4}>
                  <Text>Door delivery</Text>
                  <Box borderBottomWidth={1} borderBottomColor={'#BABABA59'} />
                </Box>
              </Box>
            </Pressable>

            <Pressable onPress={() => handleClick(2)} active={deliveryMethod === 2}>
              <Box flexDir="row" alignItems="center" gap="10px">
                <Box w="20px" h="20px" top="-8px" rounded="full" borderWidth={1} borderColor={deliveryMethod === 2 ? '#6A4029' : '#9F9F9F'} alignItems="center" justifyContent="center">
                  {deliveryMethod === 2 && <Box w="15px" h="15px" rounded="full" bg="#6A4029" />}
                </Box>
                <Box w="85%" gap={4}>
                  <Text>Pick up at store</Text>
                  <Box borderBottomWidth={1} borderBottomColor={'#BABABA59'} />
                </Box>
              </Box>
            </Pressable>

            <Pressable onPress={() => handleClick(3)} active={deliveryMethod === 3}>
              <Box flexDir="row" alignItems="center" gap="10px">
                <Box w="20px" h="20px" rounded="full" borderWidth={1} borderColor={deliveryMethod === 3 ? '#6A4029' : '#9F9F9F'} alignItems="center" justifyContent="center">
                  {deliveryMethod === 3 && <Box w="15px" h="15px" rounded="full" bg="#6A4029" />}
                </Box>
                <Box w="85%">
                  <Text>Dine in</Text>
                </Box>
              </Box>
            </Pressable>
          </Box>
          <Box flexDir="row" justifyContent="space-between" mt="28px">
            <Text fontSize="17px">Total</Text>
            <Text fontSize="22px" fontWeight={700}>IDR {route.params.total.toLocaleString('id-ID')}</Text>
          </Box>
          <Pressable onPress={handleConfirm} bg="#6A4029" my="20px" alignItems="center" py="20px" rounded="20px" justifyContent={'center'}>
            <Text color="#FFFFFF" fontSize="18px" fontWeight={900}>Proceed to payment</Text>
          </Pressable>
        </ScrollView>
      </Box>
    </NativeBaseProvider >
  );
};

export default Delivery;
