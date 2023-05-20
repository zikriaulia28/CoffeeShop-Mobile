/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import { NativeBaseProvider, Image, Box, HStack, VStack, Pressable, Heading, Input, Text, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CardProduct from '../../components/cardProduct';
import { getProduct } from '../../utils/https/product';
import React, { useEffect, useState, useMemo } from 'react';
import Skeletons from '../../components/skeleton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { getUser } from '../../utils/https/profile';
import { userAction } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const Dashboard = () => {
  const isFocused = useIsFocused();
  const controller = useMemo(() => new AbortController(), []);
  const id = useSelector((state) => state.user?.id);
  const role = useSelector((state) => state.user?.role_id);
  // console.log('cek role in dashboard', role);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
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


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = { limit, page, category, search: searchInput, order };
      const result = await getProduct(params, controller);
      setData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
      }
    }
  };

  const fetchDataUser = async () => {
    setIsLoading(true);
    try {
      const res = await getUser(id, controller);
      const result = res.data.data[0];
      const email = result.email;
      const name = result.display_name;
      const image = result.image;
      setData(result);
      dispatch(userAction.dataUser({ name, email, image }));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleShow = () => {
    setShow(prevShow => !prevShow);
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
      fetchDataUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, page, category, limit, order]);


  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, category, searchInput, limit, order]);

  const handleCategory = info => {
    setPage(1);
    setCategory(info);
  };

  const handleTabPress = (index, category) => {
    setActiveTab(index);
    handleCategory(category);
  };

  // const handleSearch = debounce(text => {
  //   setPage(1);
  //   setSearchInput(text);
  // }, 700);

  const searchDirect = () => {
    setSearchInput('');
    navigation.navigate('Product');
  };

  return (
    <NativeBaseProvider>
      <Box flex={1} position="relative" >
        <Box px={7}>
          <HStack space={2} mt={10} alignItems={'center'} justifyContent={'space-between'} >
            <Pressable onPress={() => navigation.openDrawer()}>
              <Icon name="menu" color="#000000" size={40} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Cart')} >
              <Icon name="cart-outline" color="#000000" size={30} />
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
        <Box px={7} alignItems={'flex-end'} mb={'10px'}>
          <Pressable onPress={() => navigation.navigate('Product')}>
            <Text color={'#6A4029'} fontSize={'16px'}>See More</Text>
          </Pressable>
        </Box>
        <ScrollView>
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
          {role === 1 && <Box px={7} my={5}>
            <Pressable onPress={handleShow} display={show === true ? 'none' : 'flex'} w="50px" h="50px" rounded="full" bg="#6A4029" justifyContent="center" alignItems="center">
              <Icon name="plus" color="#FFFFFF" size={30} />
            </Pressable>
          </Box>}
          <Box w="full" flex={1} bg="#000000" size="full" />
        </ScrollView>
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
