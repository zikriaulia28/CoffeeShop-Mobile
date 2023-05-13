/* eslint-disable prettier/prettier */
import { Image, Box, Text, Pressable } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CardAllProduct = ({ id, image, name, price }) => {
  const navigation = useNavigation();
  const placeholder = require('../assets/placeholder.png');
  const setImage = () => {
    if (image) {
      return { uri: image };
    }
    return placeholder;
  };
  return (
    <Pressable onPress={() => navigation.navigate('ProductDetail', { id })}>
      <Box border="1" borderRadius="30px" alignItems={'center'} backgroundColor={'#FFFFFF'} width={'156px'} px={'25px'} shadow={'4'}>
        <Box w={'128.98px'} h={'128.98px'} top={'-30px'} rounded="full">
          <Image source={setImage()} alt="img-product" w="full" h="full" rounded="full" resizeMode="cover" />
        </Box>
        <Text fontSize={'25px'} fontWeight={'900'} lineHeight={'30px'} textAlign={'center'} mt={-4} h={'52px'} w={'150px'}>{name}</Text>
        <Box width={'full'} alignItems={'center'} mt={2} mb={2}>
          <Text textAlign={'center'}>IDR {price.toLocaleString('id-ID')}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default CardAllProduct;
