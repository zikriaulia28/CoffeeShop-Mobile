/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import { NativeBaseProvider, Box, Text, Image, Pressable, Button, Modal, Center } from 'native-base';
import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getHistory } from '../../utils/https/transactions';
import { useSelector } from 'react-redux';
import SkeletonHistory from '../../components/skeletonHistory';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import Octicons from 'react-native-vector-icons/Octicons';
import { deleteTransaction } from '../../utils/https/transactions';
import { ToastAndroid } from 'react-native';

const History = () => {
  const token = useSelector((state) => state.user?.token);
  const [isLoading, setIsLoading] = useState(false);
  const [historyDataId, setHistoryDataId] = useState(null);
  const [dataHistory, setDataHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const placeholder = require('../../assets/placehoder-product.png');
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resultHistory = await getHistory(token, controller);
      setDataHistory([...resultHistory.data.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);


  const onButtonPress = async (id) => {
    setIsLoading(true);
    try {
      const result = await deleteTransaction(token, id, controller);
      console.log(result);
      setIsLoading(false);
      setShowModal(!showModal);
      ToastAndroid.show('Delete success!', ToastAndroid.SHORT);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error.response.data);
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
        <Text w="155px" color="#6A4029" >{item.method} [{moment(item.created_at).format('MMMM Do YYYY, h A')}]</Text>
      </Box>
    </Box>
  );

  const renderHiddenItem = ({ item }) => (
    <Box flexDir="row" h="140px" w="315px" rounded="20px" justifyContent="flex-end" alignItems="center" position="relative" px="10px" >
      <Pressable
        onPress={() => {
          setHistoryDataId(item.transaction_id);
          setShowModal(true);
        }}
        bg="#6A4029"
        rounded="full"
        w="50px"
        h="50px"
        justifyContent="center"
        alignItems="center"
      >
        <Octicons name="trash" size={30} color={'white'} />
      </Pressable>
    </Box>
  );

  // console.log(dataHistory)

  return (
    <NativeBaseProvider>
      <Box pt={10} px={7} flex={1}>
        <Box flexDirection="row" alignItems="center" gap="100px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text fontWeight={700} fontSize="20px">Order History</Text>
        </Box>
        <Box flexDir="row" alignItems="center" justifyContent="center" mt="40px" gap={2}>
          <Icon name="gesture-swipe" color="#000000" size={30} />
          <Text>swipe on an item to delete</Text>
        </Box>
        <Box alignItems="center" flex={1}>
          {isLoading ? (
            Array.from({ length: 6 }).map((item, idx) => (
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
            <Text fontWeight={900} fontSize={32} mt="50%">Opsss !!!</Text>
            <Text fontWeight={900} fontSize={20} >No History</Text>
          </>)
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
                <Modal.Header>Delete History</Modal.Header>
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
                    {isLoading ? <Button backgroundColor="#6A4029" isLoading isLoadingText="Delete" /> : <Button onPress={() => onButtonPress(historyDataId)} backgroundColor="#6A4029" px="30px">
                      Delete</Button>
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

export default History;
