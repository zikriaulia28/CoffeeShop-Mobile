/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import { Image, Box, Text, Pressable } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardAllProduct = ({ id, image, name, price, role }) => {
  const navigation = useNavigation();
  const placeholder = require('../assets/placeholder.png');
  const setImage = () => {
    if (image) {
      return { uri: image };
    }
    return placeholder;
  };
  return (
    <Pressable onPress={() => {
      if (role === 1) {
        navigation.navigate('AddPromo', { id });
      } else if (role === 2) {
        navigation.navigate('ProductDetail', { id });
      }
    }}>
      <Box border="1" borderRadius="30px" alignItems={'center'} backgroundColor={'#FFFFFF'} width={'156px'} px={'25px'} shadow={'4'}>
        <Box position="relative" w={'128.98px'} h={'128.98px'} top={'-30px'} rounded="full">
          <Image source={setImage()} alt="img-product" w="full" h="full" rounded="full" resizeMode="cover" />
          {role === 1 && (<Pressable onPress={() => navigation.navigate('ProductDetail', { id })} postion="absolute" top="-45px" left={'100px'} w="35px" h="35px" rounded="full" bg="#6A4029" alignItems="center" justifyContent="center">
            <Icon name="pencil-outline" color="#FFFFFF" size={24} />
          </Pressable>)}
        </Box>
        <Text fontSize={'25px'} fontWeight={'900'} lineHeight={'30px'} textAlign={'center'} mt={-4} h={'52px'} w={'150px'}>{name}</Text>
        <Box width={'full'} alignItems={'center'} mt={2} mb={2}>
          <Text textAlign={'center'}>IDR {parseInt(price).toLocaleString('id-ID')}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default CardAllProduct;
