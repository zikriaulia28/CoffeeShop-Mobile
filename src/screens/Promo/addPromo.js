/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, Input, ScrollView } from 'native-base';
import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddPromo = () => {
  const placeholder = require('../../assets/placeholder-admin.png');
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [invalid, setInvalid] = useState(false);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    image: null,
    name: '',
    price: '',
    discount: '',
    delivery: '',
    expire_date: '',
    description: '',
  });

  const onChangeForm = (name, value) => {
    // eslint-disable-next-line no-shadow
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
    if (value) {
      setInvalid(false);
    }
  };

  return (
    <NativeBaseProvider>
      <Box pt={10} flex={1} bg="#FFFFFF">
        <Box px={7} flexDirection="row" alignItems="center" justifyContent="space-between">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">New Promo</Text>
          <Icon name="trash-can-outline" color="#6A4029" size={30} />
        </Box>
        <ScrollView>
          <Box mt="40px" alignItems="center">
            <Box w="200px" h="200px" rounded="full" borderWidth={1}>
              <Image source={placeholder} alt="img" w="full" h="full" rounded="full" resizeMode="contain" />
            </Box>
            <Box top={-52} left={16} w="50px" h="50px" bg="#6A4029" rounded="full" justifyContent="center" alignItems="center">
              <Icon name="plus" color="#FFFFFF" size={30} />
            </Box>
          </Box>
          <Box px={7}>
            <Text fontWeight={900} fontSize="17px">Name</Text>
            <Input variant="underlined" size="2xl" type="text" value={form.name} onChangeText={(text) => onChangeForm('name', text)} placeholder="Input the product name" />
            <Text mt="15px" fontWeight={900} fontSize="17px">Price</Text>
            <Input variant="underlined" size="2xl" type="text" value={form.price} onChangeText={(text) => onChangeForm('price', text)} placeholder="Input the product price" />
            <Text mt="15px" fontWeight={900} fontSize="17px">Discount</Text>
            <Input variant="underlined" size="2xl" type="text" value={form.discount} onChangeText={(text) => onChangeForm('discount', text)} placeholder="Input the discount you’ll use for the promo" />
            <Text mt="15px" fontWeight={900} fontSize="17px">Delivery info</Text>
            <Input variant="underlined" size="2xl" type="text" value={form.delivery} onChangeText={(text) => onChangeForm('delivery', text)} placeholder="Type delivery information" />
            <Text mt="15px" fontWeight={900} fontSize="17px">Expired Date </Text>
            <Input variant="underlined" size="2xl" type="text" value={form.expire_date} onChangeText={(text) => onChangeForm('expire_date', text)} placeholder="Type the expire date for the promo" />
            <Text mt="15px" fontWeight={900} fontSize="17px">Description</Text>
            <Input variant="underlined" size="2xl" type="text" value={form.description} onChangeText={(text) => onChangeForm('description', text)} placeholder="Describe your product" />
            <Pressable bg="#6A4029" my="20px" alignItems="center" py="20px" rounded="20px" justifyContent={'center'}>
              <Text color="#FFFFFF" fontSize="18px" fontWeight={900}>Save Promo</Text>
            </Pressable>
          </Box>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default AddPromo;
