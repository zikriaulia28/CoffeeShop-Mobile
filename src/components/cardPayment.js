/* eslint-disable prettier/prettier */
import { Image, Box, Text } from 'native-base';
import React from 'react';

const CardPayment = (props) => {


  const setSize = () => {
    if (props.size_id === 1) {
      return 'Regular';
    }
    if (props.size_id === 2) {
      return 'Large';
    }
    if (props.size_id === 3) {
      return 'Extra Large';
    }
    return 'No Size Set';
  };

  const setPrice = () => {
    if (props.size_id === 1) {
      return (Number(props.price) / 1000).toFixed(1);
    }
    if (props.size_id === 2) {
      return (Number(props.price * 1.3) / 1000).toFixed(1);
    }
    if (props.size_id === 3) {
      return (Number(props.price * 1.65) / 1000).toFixed(1);
    }
    return props.price;
  };

  const placeholder = require('../assets/placehoder-product.png');
  return (
    <>
      <Box flexDir="row" mb="20px" justifyContent="space-between" alignItems="center" >
        <Box flexDir="row" gap="20px">
          <Box w="76px" h="76px" rounded="20px">
            {props.image ? (
              <Image source={{ uri: props.image }} alt="product-image" w="full" h="full" resizeMode="cover" rounded="20px" />
            ) : (
              <Image source={placeholder} alt="product-image" w="full" h="full" resizeMode="cover" rounded="20px" />
            )}
          </Box>
          <Box w="51%">
            <Text fontWeight={900} fontSize="17px" mb="10px">{props.prodName}</Text>
            <Text color="#000000" fontWeight={900} >x {props.qty}</Text>
            <Text mt="10px">{setSize()}</Text>
          </Box>
        </Box>
        <Text fontSize="15px" textAlign="center" mt="10px">IDR {setPrice()}</Text>
      </Box>
    </>
  );
};

export default CardPayment;
