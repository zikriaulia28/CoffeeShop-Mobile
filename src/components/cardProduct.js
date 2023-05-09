/* eslint-disable prettier/prettier */
import { Image, Box, Text } from 'native-base';
import React from 'react';

const CardProduct = ({ image, name, price }) => {
  const placeholder = require('../assets/placeholder.png');
  return (
    <Box border="1" borderRadius="30px" alignItems={'center'} backgroundColor={'#FFFFFF'} width={'220px'} px={'25px'} shadow={'4'}>
      <Box w={'168px'} h={'189px'} top={'-30px'}>
        <Image source={{ uri: image ? image : placeholder }} alt="img-product" w={'168px'} h={'189px'} rounded={'20px'} />
      </Box>
      <Text fontSize={'25px'} fontWeight={'900'} lineHeight={'30px'} textAlign={'center'} mt={-4} h={'55px'} w={'150px'}>{name}</Text>
      <Box width={'full'} alignItems={'center'} mt={2}>
        <Text textAlign={'center'}>IDR {price}</Text>
      </Box>
    </Box>
  );
};

export default CardProduct;
