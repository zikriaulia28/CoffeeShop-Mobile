/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-array-constructor */
/* eslint-disable react/no-unstable-nested-components */
import { NativeBaseProvider, Image, Box, VStack, Pressable, FlatList, Input, Text, ScrollView, Menu } from 'native-base';
import React, { useEffect, useState, useMemo } from 'react';
import CardAllProduct from '../../components/cardAllProduct';
import { getProduct } from '../../utils/https/product';
import { debounce } from 'lodash';
import { useRoute } from '@react-navigation/native';
import SkeletonProduct from '../../components/skeletonProduct';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Product = () => {
  const role = useSelector((state) => state.user?.role_id);
  const route = useRoute();
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const icon3 = require('../../assets/search.png');
  const [activeTab, setActiveTab] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('');
  const [limit] = useState(6);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('');
  const [totalPage, setTotalPage] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const params = { limit, page, category, search: searchInput, order };
    try {
      const result = await getProduct(params, controller);
      // console.log(result.data.data);
      setData(result.data.data);
      setTotalPage(result.data.meta);
      // setNoData(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        // setNoData(true);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, searchInput, order]);


  const handleCategory = info => {
    setPage(1);
    setCategory(info);
  };

  const handleTabPress = (index, category) => {
    setActiveTab(index);
    handleCategory(category);
  };

  console.log(totalPage);

  const handlePage = async () => {
    if (totalPage === page) {
      return;
    }
    const params = { limit, page: page + 1, category, search: searchInput, order };
    try {
      console.log('FETCHING NEXT, PAGE', params.page);
      const result = await getProduct(params, controller);
      const newData = [...data, ...result.data.data];
      setData(newData);
      setPage(params.page);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
      }
    }
  };

  const debouncedHandlePage = debounce(handlePage, 1000);




  const handleSearch = debounce(text => {
    setPage(1);
    setSearchInput(text);
  }, 700);

  return (
    <NativeBaseProvider>
      {/* <ScrollView flex={1} > */}
      <Box flex={1}>
        <Box px={7} flexDirection="row" alignItems="center" gap="70px" mt={10}>
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">Favorite Products</Text>
        </Box>
        <Box alignItems="center" mt={6} mb={2}>
          <Text fontSize="28px" fontWeight={900}>Everyone’s Favorite</Text>
        </Box>
        <Box px={'42px'}>
          <VStack w="100%" alignSelf="center" mt={'10px'}>
            <Input onChangeText={handleSearch} autoFocus={route.params} placeholder="Search" size={'2xl'} inputMode={'text'} backgroundColor={'#FFFFFF'} width="100%" borderRadius="20px" py="1" px="2" InputLeftElement={<Image source={icon3} alt="menu" ml="7" />} />
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

        <Box alignItems="flex-end" mr="42px" mt={2} mb={5}>
          <Menu
            w="120px"
            alignItems="center"
            trigger={triggerProps => {
              return (
                <Pressable {...triggerProps} bg="#6A4029" w={'35%'} h={5} alignItems="center" rounded="20px" >
                  <Text color={'#FFFFFF'} fontWeight={700}>{order ? order.toUpperCase() : 'Reset'}</Text>
                </Pressable>
              );
            }}>
            <Menu.Item bold onPress={() => setOrder('')}>
              Reset
            </Menu.Item>
            <Menu.Item
              onPress={() => {
                setOrder('cheapest');
                setPage(1);
              }}>
              Cheapest
            </Menu.Item>
            <Menu.Item
              onPress={() => {
                setOrder('priciest');
                setPage(1);
              }}>
              Priciest
            </Menu.Item>
            <Menu.Item
              onPress={() => {
                setOrder('latest');
                setPage(1);
              }}>
              Latest
            </Menu.Item>
            <Menu.Item
              onPress={() => {
                setOrder('oldest');
                setPage(1);
              }}>
              Oldest
            </Menu.Item>
          </Menu>
        </Box>

        {isLoading ? (<Box flexDir="row" flexWrap="wrap" gap={10} px={7} pb={2} alignItems={'center'}  >
          {Array('', '', '', '', '', '').map((item, idx) => (
            <SkeletonProduct key={idx} />
          ))}
        </Box>) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            numColumns={2}
            onEndReached={debouncedHandlePage}
            onEndReachedThreshold={0.2}
            renderItem={({ item }) => (
              <Box flexBasis="50%" px={4} pb={4} alignItems={'center'} mt={10} >
                <CardAllProduct
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  role={role}
                />
              </Box>
            )}
          />)}

      </Box >
      {/* </ScrollView> */}
    </NativeBaseProvider >
  );
};

export default Product;
