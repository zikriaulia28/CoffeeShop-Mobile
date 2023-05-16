/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton, ScrollView, Checkbox } from 'native-base';
import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const [selected, setSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const placeholder = require('../../assets/placehoder-product.png');
  const navigation = useNavigation();

  const handleSelect = () => {
    setSelected(selected => !selected);
  };

  return (
    <NativeBaseProvider>
      <Box pt={10} px={7}>
        <Box flexDirection="row" alignItems="center" gap="100px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">Order History</Text>
        </Box>
        <Box flexDir="row" alignItems="center" justifyContent="center" mt="40px" gap={2}>
          <Icon name="cursor-pointer" color="#FFFFFF" size={30} />
          <Text>Select an item to delete</Text>
        </Box>
        <Box flexDir="row" justifyContent="space-between" mt="40px">
          <Text color="#9A9A9D" fontWeight={700} fontSize="17px">Last Week</Text>

          {isChecked ? (
            <Text>Delete</Text>
          ) : (
            <Pressable onPress={handleSelect}>
              <Text>Select</Text>
            </Pressable>
          )}

        </Box>
        <Box flexDir="row" gap={16} mt="30px" alignItems="center">
          <Box flexDir="row" gap={5}>
            <Box w="98px" h="108px" rounded="20px">
              <Image source={placeholder} alt="img-history" w="full" h="full" rounded="20px" resizeMode="cover" />
            </Box>
            <Box gap={1}>
              <Text fontWeight={900}>Choco Coffee Latte</Text>
              <Text fontWeight={900} color="#6A4029">IDR 28.000</Text>
              <Text>XL (Extra Large)</Text>
              <Text>Delivered [Monday, 2 PM]</Text>
            </Box>
          </Box>
          {selected && (
            <Checkbox
              colorScheme="green"
              aria-hidden="true"
              aria-label="Pilih ini untuk menyetujui syarat dan ketentuan"
              isChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          )}
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default History;
