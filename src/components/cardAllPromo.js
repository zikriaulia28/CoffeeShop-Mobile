/* eslint-disable prettier/prettier */
import { Image, Box, Text, Pressable } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardAllPromo = ({ id, image, name, price, role, discount }) => {
  const navigation = useNavigation();
  const placeholder = require('../assets/placeholder.png');
  const setImage = () => {
    if (image) {
      return { uri: image };
    }
    return placeholder;
  };
  const setDiscount = () => {
    const result = parseFloat(price) * (parseFloat(discount) / 100);
    return (parseFloat(price) - result).toLocaleString('id-ID');
  };
  return (
    <Pressable onPress={() => role === 2 && navigation.navigate('ProductDetail', { id })}>
      <Box border="1" borderRadius="30px" alignItems={'center'} backgroundColor={'#FFFFFF'} width={'156px'} px={'25px'} shadow={'4'}>
        <Box position="relative" w={'128.98px'} h={'128.98px'} top={'-30px'} rounded="full">
          <Image source={setImage()} alt="img-product" w="full" h="full" rounded="full" resizeMode="cover" />
          {role === 1 && (<Pressable onPress={() => navigation.navigate('ProductDetail', { id })} postion="absolute" top="-45px" left={'100px'} w="35px" h="35px" rounded="full" bg="#6A4029" alignItems="center" justifyContent="center">
            <Icon name="pencil-outline" color="#FFFFFF" size={24} />
          </Pressable>)}
          <Box w="40px" h="40px" bg="#FFFFFF" rounded="full" justifyContent="center" alignItems="center" left="10px" position="absolute" top={'-8px'}><Text>{discount}%</Text></Box>
        </Box>
        <Text fontSize={'25px'} fontWeight={'900'} lineHeight={'30px'} textAlign={'center'} mt={-4} h={'52px'} w={'150px'}>{name}</Text>
        <Box width={'full'} alignItems={'center'} mt={2} mb={2}>
          <Text textAlign={'center'}>IDR {setDiscount()}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default CardAllPromo;
