/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import { NativeBaseProvider, Box, Text, Image, Pressable, ScrollView, Checkbox } from 'native-base';
import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import { getHistory } from '../../utils/https/transactions';
import { useSelector } from 'react-redux';
import SkeletonHistory from '../../components/skeletonHistory';

const History = () => {
  const token = useSelector((state) => state.user?.token);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  // const placeholder = require('../../assets/placehoder-product.png');
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  console.log(checkedItems);
  const handleSelect = () => {
    setSelected((prevSelected) => !prevSelected);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resultHistory = await getHistory(token, controller);
      setDataHistory([...resultHistory.data.data]);
      // console.log('ini history', resultHistory.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log('data history =>', dataHistory);

  const setSize = (size_id) => {
    if (size_id === 1) {
      return 'R (Reguler)';
    }
    if (size_id === 2) {
      return 'L (Large)';
    }
    if (size_id === 3) {
      return 'XL (Extra Large)';
    }
  };

  return (
    <NativeBaseProvider>
      <Box pt={10} px={7} flex={1}>
        <Box flexDirection="row" alignItems="center" gap="100px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">Order History</Text>
        </Box>
        <Box flexDir="row" alignItems="center" justifyContent="center" mt="40px" gap={2}>
          <Icons name="pointer" size={30} />
          <Text>Select an item to delete</Text>
        </Box>
        <Box flexDir="row" justifyContent="space-between" mt="40px">
          <Text color="#9A9A9D" fontWeight={700} fontSize="17px">Last Week</Text>

          {selected ? (
            <Text>Delete</Text>
          ) : (
            <Pressable onPress={handleSelect}>
              <Text>Select</Text>
            </Pressable>
          )}
        </Box>
        <ScrollView  >
          {isLoading ? (
            Array.from({ length: 4 }).map((item, idx) => (
              <Box key={idx}>
                <SkeletonHistory />
              </Box>
            ))
          ) : (dataHistory.length > 0 && dataHistory.map((item, idx) => (
            <Box key={idx} flexDir="row" gap={7} my={2} alignItems="center">
              <Box flexDir="row" gap={5}>
                <Box w="98px" h="108px" rounded="20px">
                  <Image source={{ uri: item.image }} alt="img-history" w="full" h="full" rounded="20px" resizeMode="cover" />
                </Box>
                <Box gap={1}>
                  <Text fontWeight={900}>{item.name}</Text>
                  <Text fontWeight={900} color="#6A4029">IDR {parseInt(item.price).toLocaleString('id-ID')}</Text>
                  <Text>{setSize(item.size_id)}</Text>
                  <Text>Delivered [Monday, 2 PM]</Text>
                </Box>
              </Box>
              {selected && (
                <Checkbox
                  colorScheme="green"
                  aria-hidden="true"
                  defaultValue={idx}
                  aria-label="Pilih ini untuk menyetujui syarat dan ketentuan"
                  isChecked={checkedItems[idx]}
                  onChange={() => handleCheckboxChange(idx)}
                />
              )}
            </Box>
          )))}
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default History;
