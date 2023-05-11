/* eslint-disable prettier/prettier */
import { Image, Box, Text, Pressable } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cartAction } from '../redux/slices/cart';

const CardCart = (props) => {
  const dispatch = useDispatch();

  const handleQty = info => {
    if (info === 'inc') {
      dispatch(cartAction.increment(props.product_id));
    } else {
      if (props.qty === 1) { return; }
      dispatch(cartAction.decrement(props.product_id));
    }
  };

  const setSize = () => {
    if (props.size_id === 1) {
      return 'R(Regular)';
    }
    if (props.size_id === 2) {
      return 'L(Large)';
    }
    if (props.size_id === 3) {
      return 'XL(Extra Large)';
    }
    return 'No Size Set';
  };
  // const placeholder = require('../assets/placehoder-product.png');
  console.log(props.idx);
  return (
    <>
      <Box flexDir="row" gap={20} mb="20px">
        <Box w="102px" h="102px" bg="#FFFFFF" rounded="30px" alignItems="center">
          <Box w="84px" h="84px" rounded="full" top={-20}>
            <Image source={{ uri: props.image }} alt="product-image" w="full" h="full" resizeMode="cover" rounded="full" />
            <Text fontSize="15px" textAlign="center" mt="10px">IDR {props.price}</Text>
          </Box>
        </Box>
        <Box>
          <Text fontWeight={900} fontSize="17px" mb="20px" textAlign={'center'}>{props.prodName}</Text>
          <Box flexDir="row" gap={6} justifyContent={'center'} rounded="20px">
            <Pressable onPress={() => handleQty('dec')} w="20px" h="20px" rounded="full" alignItems="center" bg="#E7AA3685"><Text color="#6A4029" fontWeight={900}>-</Text></Pressable>
            <Text color="#000000" fontWeight={900} >{props.qty}</Text>
            <Pressable onPress={() => handleQty('inc')} w="20px" h="20px" rounded="full" alignItems="center" bg="#E7AA3685"><Text color="#6A4029" fontWeight={900}>+</Text></Pressable>
          </Box>
          <Text mt="20px">{setSize()}</Text>
        </Box>
      </Box>
    </>
  );
};

export default CardCart;
