/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import { NativeBaseProvider, Image, Box, HStack, VStack, Pressable, Heading, Input, Text, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CardProduct from '../../components/cardProduct';
import { getProduct, getPromo, deletingPromo } from '../../utils/https/product';
import React, { useEffect, useState, useMemo } from 'react';
import Skeletons from '../../components/skeleton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { getUser } from '../../utils/https/profile';
import { userAction } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import CardPromo from '../../components/cardPromo';
import moment from 'moment';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
// import { getNotificationFromAPI } from '../../utils/https/auth';


const Dashboard = () => {
  const isFocused = useIsFocused();
  const controller = useMemo(() => new AbortController(), []);
  const id = useSelector((state) => state.user?.id);
  const role = useSelector((state) => state.user?.role_id);
  const storeCart = useSelector((state) => state.cart.shoppingCart);
  console.log(storeCart.length);
  const token = useSelector((state) => state.user?.token);
  // console.log('cek role in dashboard', role);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataPromos, setDataPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const icon3 = require('../../assets/search.png');
  const [activeTab, setActiveTab] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('');
  const [limit] = useState(5);
  const [page, setPage] = useState(1);
  const [order] = useState('');
  const [show, setShow] = useState(false);
  const [notif, setNotif] = useState(false);
  // const [saveToken, setSaveToken] = useState('');


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = { limit, page, category, search: searchInput, order };
      const result = await getProduct(params, controller);
      setData(result.data.data);
      const dataPromo = await getPromo(controller);
      setDataPromos(dataPromo.data.data);
      // console.log(dataPromo.data);
      const res = await getUser(id, controller);
      const resultUser = res.data.data[0];
      const email = resultUser.email;
      const name = resultUser.display_name;
      const image = resultUser.image;
      const address = resultUser.address;
      const phone = resultUser.phone_number;
      dispatch(userAction.dataUser({ name, email, image, address, phone }));
      setNotif(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setIsLoading(false);
    }
  };

  const handleShow = () => {
    setShow(prevShow => !prevShow);
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp(); // Keluar dari aplikasi saat tombol "Kembali" ditekan
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, category]);


  const handleCategory = info => {
    setPage(1);
    setCategory(info);
  };

  const handleTabPress = (index, category) => {
    setActiveTab(index);
    handleCategory(category);
  };

  const searchDirect = () => {
    setSearchInput('');
    navigation.navigate('Product');
  };

  // const onCreateFCMToken = async () => {
  //   try {
  //     if (!messaging().isDeviceRegisteredForRemoteMessages) { await messaging().registerDeviceForRemoteMessages(); }

  //     const tokenFirebase = await messaging().getToken();
  //     setSaveToken(tokenFirebase);
  //     console.log('token FCM', tokenFirebase);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const onMessageReceived = async remoteMessage => {
  //     console.log('FCM Payload ==>', remoteMessage);
  //   };
  //   messaging().onMessage(onMessageReceived);
  // }, []);

  // const handlerTrigger = async () => {
  //   try {
  //     await getNotificationFromAPI(saveToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log('save', saveToken);
  // console.log('promo', dataPromos);

  const handleDelete = async (id) => {
    try {
      await deletingPromo(token, id, controller);
      // console.log(result.data);
      setDataPromos([]);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // console.log(dataPromos);
  const getIdAndExpiredAt = (datas) => {
    const idAndExpiredAtList = datas.map(item => {
      const id = item.id;
      const expiredAt = moment(item.expired_at).format('YYYY-MM-DD');
      const currentDate = moment().format('YYYY-MM-DD');
      const isExpired = moment(expiredAt).isBefore(currentDate, 'day');
      const status = isExpired ? 'telah kadaluarsa' : 'masih berlaku';

      return { id, expiredAt, status };
    });

    return idAndExpiredAtList;
  };

  const idAndExpiredAt = getIdAndExpiredAt(dataPromos);
  // console.log('id', idAndExpiredAt);

  const idKadaluarsa = idAndExpiredAt
    .filter(item => item.status === 'telah kadaluarsa')
    .map(item => item.id);

  idKadaluarsa.forEach(id => {
    handleDelete(id);
  });


  return (
    <NativeBaseProvider>
      <Box flex={1} position="relative" >
        <Box px={7}>
          <HStack space={2} mt={10} alignItems={'center'} justifyContent={'space-between'} >
            <Pressable onPress={() => navigation.openDrawer()}>
              <Icon name="menu" color="#000000" size={40} />
            </Pressable>
            <Pressable onPress={() => { navigation.navigate('Cart'); setNotif(false); }} position="relative" >
              <Icon name="cart-outline" color="#000000" size={30} />
              {role === 2 && notif && storeCart.length > 0 && <Box position="absolute" w="20px" h="20px" bg="red.600" rounded="full" justifyContent="center" alignItems="center" left={4} top={-5}>
                <Text fontWeight={700} fontSize="12px">{storeCart.length}</Text>
              </Box>}
            </Pressable>
          </HStack>
          <Heading fontSize={'40px'} fontWeight={'900'} marginX={'auto'} mt={'40px'}>A good coffee is a good day</Heading>
          <VStack w="100%" alignSelf="center" mt={'10px'}>
            <Input onFocus={searchDirect} placeholder="Search" size={'2xl'} inputMode={'text'} backgroundColor={'#FFFFFF'} width="100%" borderRadius="20px" py="1" px="2" value={searchInput} InputLeftElement={<Image source={icon3} alt="menu" ml="7" />} />
          </VStack>
        </Box>
        <Box pl={'70px'} h={10} mt={'10px'}>
          <ScrollView horizontal={true} pr={20} showsHorizontalScrollIndicator={false} overScrollMode="always">
            <Box flexDirection={'row'} gap={'29px'}>
              <Text
                fontSize={'20px'}
                fontWeight={activeTab === 0 ? 'bold' : 'normal'}
                onPress={() => handleTabPress(0, '')}
              >
                Favorite
              </Text>
              <Text
                fontSize={'20px'}
                fontWeight={activeTab === 1 ? 'bold' : 'normal'}
                onPress={() => handleTabPress(1, 2)}
              >
                Coffee
              </Text>
              <Text
                fontSize={'20px'}
                fontWeight={activeTab === 2 ? 'bold' : 'normal'}
                onPress={() => handleTabPress(2, 3)}
              >
                Non Coffee
              </Text>
              <Text
                fontSize={'20px'}
                fontWeight={activeTab === 3 ? 'bold' : 'normal'}
                onPress={() => handleTabPress(3, 1)}
              >
                Food
              </Text>
              <Text
                fontSize={'20px'}
                fontWeight={activeTab === 4 ? 'bold' : 'normal'}
                onPress={() => handleTabPress(4, 4)}
              >
                Add-on
              </Text>
            </Box>
          </ScrollView>
        </Box>
        <ScrollView>
          <Box px={7} alignItems={'flex-end'} mb={'10px'}>
            <Pressable onPress={() => navigation.navigate('Product')}>
              <Text color={'#6A4029'} fontSize={'16px'}>See More</Text>
            </Pressable>
          </Box>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            <Box flexDirection={'row'} ml={7} mt={8} gap={8} h={'270px'}>
              {isLoading ? (
                Array.from({ length: 5 }).map((item, idx) => (
                  <Skeletons key={idx} />
                ))
              ) : (
                data?.length > 0 && data.map((product, idx) => (
                  <CardProduct
                    key={idx}
                    id={product.id}
                    role={role}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                  />
                ))
              )}
            </Box>
          </ScrollView>
          {dataPromos.length > 0 && <>
            <Box px={7}>
              <Text fontSize="20px" mt="10px" fontWeight={700}>Promo</Text>
              <Pressable onPress={() => navigation.navigate('Promo')} alignItems={'flex-end'}>
                <Text color={'#6A4029'} fontSize={'16px'}>See More</Text>
              </Pressable>
            </Box>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
              <Box flexDirection={'row'} ml={7} mt={10} gap={8} h={'270px'}>
                {isLoading ? (
                  Array.from({ length: 5 }).map((item, idx) => (
                    <Skeletons key={idx} />
                  ))
                ) : (
                  dataPromos?.length > 0 && dataPromos.map((product, idx) => (
                    <CardPromo
                      key={idx}
                      id={product.id}
                      role={role}
                      discount={product.discount}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                    />
                  ))
                )}
              </Box>
            </ScrollView>
          </>}
          {role === 1 && <Box px={7} my={5}>
            <Pressable onPress={handleShow} display={show === true ? 'none' : 'flex'} w="50px" h="50px" rounded="full" bg="#6A4029" justifyContent="center" alignItems="center">
              <Icon name="plus" color="#FFFFFF" size={30} />
            </Pressable>
          </Box>}
          <Box w="full" flex={1} bg="#000000" size="full" />
        </ScrollView>
        {/* <Pressable onPress={onCreateFCMToken} w="50%" py={2} bg="#FFBA33" rounded="20px">
          <Text color="#6A4029" textAlign="center">get Token FCM</Text>
        </Pressable>
        <Pressable onPress={handlerTrigger} w="50%" mt={2} py={2} bg="#FFBA33" rounded="20px">
          <Text color="#6A4029" textAlign="center">Trger notif from server</Text>
        </Pressable> */}
        {show && <Box
          w="full"
          h="full"
          position="absolute"
          bg="rgba(0, 0, 0, 0.5)"
          top={0}
          left={0}
          // opacity={isModalVisible ? 1 : 0}
          transition="opacity 300ms"
        >
          <Pressable onPress={handleShow} w="50px" h="50px" top="87%" left="7%" rounded="full" bg="#6A4029" justifyContent="center" alignItems="center">
            <Icon name="plus" color="#FFFFFF" size={30} />
          </Pressable>
          <Pressable onPress={() => { navigation.navigate('AddProduct'); setShow(false); }} top="78%" left="20%" w="50%" py={2} bg="#FFBA33" rounded="20px">
            <Text color="#6A4029" textAlign="center">New Product</Text>
          </Pressable>
          <Pressable onPress={() => { navigation.navigate('AddPromo'); setShow(false); }} top="79%" left="20%" w="50%" py={2} bg="#FFBA33" rounded="20px">
            <Text color="#6A4029" textAlign="center">New Promo</Text>
          </Pressable>
        </Box>}
      </Box >
    </NativeBaseProvider >
  );
};

export default Dashboard;
