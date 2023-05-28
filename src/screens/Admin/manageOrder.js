/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import { NativeBaseProvider, Box, Text, Image, Pressable, Button, Modal, Center, ScrollView } from 'native-base';
import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import SkeletonHistory from '../../components/skeletonHistory';
import { SwipeListView } from 'react-native-swipe-list-view';
import Octicons from 'react-native-vector-icons/Octicons';
import { getAllOrder, changeOrderDone, getDoneOrder } from '../../utils/https/transactions';
import { ToastAndroid } from 'react-native';
import CardFinished from '../../components/cardFinished';

const ManageOrder = () => {
  const token = useSelector((state) => state.user?.token);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [historyDataId, setHistoryDataId] = useState(null);
  const [dataHistory, setDataHistory] = useState([]);
  const [dataFinished, setDataFinished] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const placeholder = require('../../assets/placehoder-product.png');
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resultHistory = await getAllOrder(token, controller);
      // console.log(resultHistory.data.data);
      setDataHistory([...resultHistory.data.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDataFinished = async () => {
    setIsLoad(true);
    try {
      const resultFinished = await getDoneOrder(token, controller);
      // console.log(resultFinished.data.data);
      setDataFinished([...resultFinished.data.data]);
      setIsLoad(false);
    } catch (error) {
      console.log(error);
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataFinished();
  }, [refresh]);

  // console.log(dataFinished);

  const onButtonPress = async (id) => {
    setIsLoading(true);
    try {
      const result = await changeOrderDone(token, id, controller);
      console.log(result.data.data);
      setIsLoading(false);
      setShowModal(!showModal);
      ToastAndroid.show('Order Done!', ToastAndroid.SHORT);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const setStatus = (item) => {
    if (item.status_id === 1) {
      return 'Pending';
    }
    if (item.status_id === 2) {
      return 'Paid';
    }
    if (item.status_id === 3) {
      return 'Finished';
    }
    if (item.status_id === 4) {
      return 'Cancelled';
    }
  };

  const renderItem = ({ item }) => (
    <Box flexDir="row" mt={5} gap={7} p="16px" rounded="20px" w="315px" my={2} alignItems="center" bg="white">
      <Box w="83.5px" h="83.5px" rounded="full">
        <Image
          source={{
            uri: item.image,
          }}
          alt="img-history" w="full" h="full" rounded="full" resizeMode="cover"
        />
      </Box>
      <Box gap={1}>
        <Text fontWeight={900} fontSize="17px">{item.name}</Text>
        <Text color="#6A4029">IDR {parseInt(item.price).toLocaleString('id-ID')}</Text>
        <Text w="155px" color="#6A4029" >{setStatus(item)}</Text>
      </Box>
    </Box>
  );

  const renderHiddenItem = ({ item }) => (
    <Box flexDir="row" h="140px" w="315px" rounded="20px" justifyContent="flex-end" alignItems="center" position="relative" px="10px" >
      <Pressable
        onPress={() => {
          setHistoryDataId(item.id);
          setShowModal(true);
        }}
        bg="#6A4029"
        rounded="full"
        w="50px"
        h="50px"
        justifyContent="center"
        alignItems="center"
      >
        <Octicons name="check" size={30} color={'white'} />
      </Pressable>
    </Box>
  );

  // console.log('finish', dataFinished);

  return (
    <NativeBaseProvider>
      <Box pt={10} px={7} flex={1}>
        <Box flexDirection="row" alignItems="center" gap="80px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text fontWeight={700} fontSize="20px">Customer Order</Text>
        </Box>
        <Box flexDir="row" alignItems="center" justifyContent="center" mt="40px" gap={2}>
          <Icon name="gesture-swipe" size={30} />
          <Text>swipe on an item when it’s done</Text>
        </Box>
        <Text fontWeight={700} mt={5} fontSize="20px" color="#9A9A9D">Just now</Text>
        <Box alignItems="center" flex={1}>
          {isLoading ? (
            Array.from({ length: 2 }).map((item, idx) => (
              <Box key={idx}>
                <SkeletonHistory />
              </Box>
            ))
          ) : dataHistory.length > 0 ? <SwipeListView
            showsVerticalScrollIndicator={false}
            data={dataHistory}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            swipeToOpenPercent={120}
          /> : (<>
            <Text fontWeight={900} fontSize={20} mt="25%" >No Order Customer</Text>
          </>)
          }
        </Box>
        <Text fontWeight={700} mt={5} fontSize="20px" color="#9A9A9D">Finished</Text>
        <Box flex={1} alignItems="center">
          {isLoad ? (
            Array.from({ length: 2 }).map((item, idx) => (
              <Box key={idx}>
                <SkeletonHistory />
              </Box>
            ))
          ) : <ScrollView showsVerticalScrollIndicator={false}>
            {dataFinished.length > 0 && dataFinished.map((item, idx) => (
              <CardFinished
                key={idx}
                name={item.name}
                image={item.image}
                price={item.price}
                status_id={item.status_id}
              />
            ))
            }
          </ScrollView>
          }
        </Box>
        <Box>
          <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
              _dark: {
                bg: 'coolGray.800',
              },
              bg: 'warmGray.50',
            }}>
              <Modal.Content maxWidth="350" maxH="212">
                <Modal.CloseButton />
                <Modal.Header>Accept Order</Modal.Header>
                <Modal.Body>
                  Are you sure ?
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                      setShowModal(false);
                    }}>
                      Cancel
                    </Button>
                    {isLoading ? <Button backgroundColor="#6A4029" isLoading isLoadingText="Accept" /> : <Button onPress={() => onButtonPress(historyDataId)} backgroundColor="#6A4029" px="30px">
                      Accept</Button>
                    }
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default ManageOrder;
