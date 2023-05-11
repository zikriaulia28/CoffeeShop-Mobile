/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Pressable, ScrollView } from 'native-base';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CardCart from '../../components/cardCart';
// import HiddenIcon from '../../components/hiddenIcon';
// import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../redux/slices/cart';




const Cart = () => {
  // const placeholder = require('../../assets/placehoder-product.png');
  const navigation = useNavigation();
  const storeCart = useSelector((state) => state.cart.shoppingCart);

  let subtotal = 0;
  storeCart.forEach(item => {
    subtotal += item.price * item.qty;
  });
  const taxFee = subtotal * 0.1;
  const total = subtotal + taxFee;

  return (
    <NativeBaseProvider>
      <ScrollView flex={1}>
        <Box pt={10} px={'42px'}>
          <Box flexDirection="row" alignItems="center" gap="110px">
            <Pressable onPress={() => navigation.goBack()} >
              <Icon name="arrow-left" color="#000000" size={30} />
            </Pressable>
            <Text color="#6A4029" fontWeight={700} fontSize="20px">Cart</Text>
          </Box>

          <Box mt="47px" gap="15px">
            {storeCart.length < 1 && <Box flex={1} alignItems="center" mt="40%">
              <Box >
                <Icon name="cart-outline" color="#4F5665" size={150} />
              </Box>
              <Text fontWeight={900} fontSize="28px">No orders yet</Text>
              <Text w="60%" textAlign="center">Hit the orange button down
                below to Create an order</Text>
              <Pressable onPress={() => navigation.navigate('Product')} mt="60%" bg="#6A4029" my="20px" alignItems="center" py="20px" rounded="20px" w="full">
                <Text color="#FFFFFF" fontWeight={900}>Start odering</Text>
              </Pressable>
            </Box>}
            {storeCart.map((data, idx) => (
              <CardCart key={idx}
                product_id={data.product_id}
                prodName={data.prodName}
                image={data.image}
                price={data.price}
                qty={data.qty}
                size_id={data.size_id}
              />
            ))}
          </Box>
          {storeCart.length > 0 && (<Pressable bg="#FFBA33" my="20px" justifyContent="center" gap={10} py="20px" rounded="20px" flexDir="row">
            <Text color="#000000" fontSize="18px" fontWeight={900}>Apply Delivery Coupons</Text>
            <Icon name="arrow-right" color="#000000" size={24} />
          </Pressable>)}
          <Box w="full" borderBottomWidth={1} borderBottomColor="#E0E0E2" mb={10} />
          <Box gap="22px">
            <Box flexDir="row" justifyContent="space-between">
              <Text color="#ADADAF" fontWeight={700}>Item Total</Text>
              <Text fontWeight={700}>IDR {subtotal.toLocaleString('id-ID')}</Text>
            </Box>
            <Box flexDir="row" justifyContent="space-between">
              <Text color="#ADADAF" fontWeight={700}>Delivery Charge</Text>
              <Text fontWeight={700}>IDR 0</Text>
            </Box>
            <Box flexDir="row" justifyContent="space-between">
              <Text color="#ADADAF" fontWeight={700}>Tax</Text>
              <Text fontWeight={700}>IDR {taxFee.toLocaleString('id-ID')}</Text>
            </Box>
          </Box>
          <Box mt="54px" mb="20px" flexDir="row" justifyContent="space-between">
            <Text fontSize={'20px'} fontWeight={700}>Total :</Text>
            <Text fontSize={'20px'} fontWeight={700}>IDR {total.toLocaleString('id-ID')}</Text>
          </Box>

          {storeCart.length > 0 && (<Pressable onPress={() => navigation.navigate('Delivery', { total })} bg="#FFBA33" my="20px" alignItems="center" py="20px" rounded="20px" justifyContent={'center'} gap={10} flexDir="row">
            <Icon name="arrow-right" color="#000000" size={24} />
            <Text color="#000000" fontSize="18px" fontWeight={900}>Confirm and Checkout</Text>
          </Pressable>)}

        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Cart;
