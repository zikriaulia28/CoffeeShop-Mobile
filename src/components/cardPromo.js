/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import { Image, Box, Text, Pressable } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardPromo = ({ id, image, name, price, role, discount }) => {
  const calculateDiscountedPrice = () => {
    const data = discount;
    const result = parseInt(price) * (parseInt(data) / 100);
    console.log(data);
    const discountedPrice = parseFloat(price) - result;
    return discountedPrice.toLocaleString('id-ID');
  };

  const navigation = useNavigation();
  const placeholder = require('../assets/placeholder.png');
  return (
    <Pressable onPress={() => role === 2 && navigation.navigate('PromoDetail', { id })}>
      <Box border="1" borderRadius="30px" alignItems={'center'} backgroundColor={'#FFFFFF'} width={'220px'} px={'25px'} shadow={'4'}>
        <Box position="relative" w={'168px'} h={'189px'} top={'-30px'} rounded={'20px'}>
          {image ? (
            <Image source={{ uri: image }} alt="img-product" w={'168px'} h={'189px'} rounded={'20px'} />
          ) : (
            <Image source={placeholder} alt="img-product" w={'168px'} h={'189px'} rounded={'20px'} />
          )}
          {role === 1 && (<Pressable onPress={() => navigation.navigate('ProductDetail', { id })} postion="absolute" top="-25px" left={'145px'} w="35px" h="35px" rounded="full" bg="#6A4029" alignItems="center" justifyContent="center">
            <Icon name="pencil-outline" color="#FFFFFF" size={24} />
          </Pressable>)}
          <Box w="40px" h="40px" bg="#FFFFFF" rounded="full" justifyContent="center" alignItems="center" position="absolute" top={'-8px'} left={'140px'}>
            <Text fontWeight={900}>{discount}%</Text>
          </Box>
        </Box>
        <Text fontSize={'25px'} fontWeight={'900'} lineHeight={'30px'} textAlign={'center'} mt={-4} h={'52px'} w={'150px'}>{name}</Text>
        <Box width={'full'} alignItems={'center'} mt={2} mb={2}>
          <Text textAlign={'center'}>IDR {calculateDiscountedPrice()}</Text>
        </Box>
      </Box>
    </Pressable >
  );
};

export default CardPromo;
