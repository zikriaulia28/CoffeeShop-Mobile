/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Pressable, ScrollView } from 'native-base';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cartAction } from '../../redux/slices/cart';
import { useDispatch } from 'react-redux';

const Delivery = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [deliveryMethod, setDeliveryMethod] = useState(3);
  const handleClick = (value) => {
    setDeliveryMethod(value);
    console.log(value);
  };

  const handleConfirm = () => {
    dispatch(cartAction.deliveryMethod(deliveryMethod));
    navigation.navigate('Payment', { subtotal: route.params.total });
  };
  return (
    <NativeBaseProvider>
      <ScrollView flex={1}>
        <Box pt={10} px={7}>
          <Box flexDirection="row" alignItems="center" gap="110px">
            <Pressable onPress={() => navigation.goBack()} >
              <Icon name="arrow-left" color="#000000" size={30} />
            </Pressable>
            <Text color="#6A4029" fontWeight={700} fontSize="20px">Checkout</Text>
          </Box>
          <Text fontSize="34px" fontWeight={900} mt="36px">Delivery</Text>
          <Box mt="35px" flexDir="row" justifyContent="space-between">
            <Text fontWeight={700} fontSise="17px">Address details</Text>
            <Pressable>
              <Text color="#6A4029">Change</Text>
            </Pressable>
          </Box>
          <Box bg="#FFFFFF" h="156px" gap="8px" rounded="20px" mt="14px" py="25px" px="30">
            <Text borderBottomWidth={1} borderBottomColor={'#BABABA59'}>Iskandar Street</Text>
            <Text borderBottomWidth={1} borderBottomColor={'#BABABA59'} h="60px">Km 5 refinery road oppsite re
              public road, effurun, Jakarta  Km 5 refinery road oppsite re
              public road, effurun, Jakarta</Text>
            <Text borderBottomWidth={1} borderBottomColor={'#BABABA59'}>+62 81348287878</Text>
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
        </Box>
      </ScrollView>
    </NativeBaseProvider >
  );
};

export default Delivery;
