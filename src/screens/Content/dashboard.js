/* eslint-disable prettier/prettier */
/* eslint-disable no-array-constructor */
/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Image, Box, HStack, VStack, Pressable, Heading, Input, Text, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CardProduct from '../../components/cardProduct';
import { getProduct } from '../../utils/https/product';
import React, { useEffect, useState } from 'react';
import Skeletons from '../../components/skeleton';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const icon1 = require('../../assets/cart.png');
  const icon2 = require('../../assets/humberger.png');
  const icon3 = require('../../assets/search.png');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getProduct(
          //   {
          //   category,
          //   page,
          //   limit,
          //   name,
          //   order,
          // }
        );
        setData(result.data.data);
        // setMeta(result.data.meta);
        setIsLoading(false);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      <Box flex={1} >
        <Box px={'42px'}>
          <HStack space={2} mt={10} justifyContent={'space-between'} >
            <Pressable onPress={() => navigation.navigate('Drawer')}>
              <Image source={icon2} alt="menu" />
            </Pressable>
            <Image source={icon1} alt="cart" />
          </HStack>
          <Heading fontSize={'50px'} fontWeight={'900'} marginX={'auto'} mt={'40px'}>A good coffee is a good day</Heading>
          <VStack w="100%" alignSelf="center" mt={'10px'}>
            <Input placeholder="Search" size={'2xl'} inputMode={'text'} backgroundColor={'#FFFFFF'} width="100%" borderRadius="20px" py="1" px="2" InputLeftElement={<Image source={icon3} alt="menu" ml="7" />} />
          </VStack>
        </Box>
        <Box pl={'70px'} h={10} mt={'10px'}>
          <ScrollView horizontal={true} pr={20} >
            <Box flexDirection={'row'} gap={'29px'}>
              <Text fontSize={'20px'} >Favorite</Text>
              <Text fontSize={'20px'} >Promo</Text>
              <Text fontSize={'20px'} >Coffee</Text>
              <Text fontSize={'20px'} >Non Coffee</Text>
            </Box>
          </ScrollView>
        </Box>
        <Box px={'42px'} alignItems={'flex-end'} mb={'10px'}>
          <Text color={'#6A4029'} fontSize={'16px'}>See More</Text>
        </Box>
        <ScrollView horizontal={true} >
          <Box flexDirection={'row'} ml={'42'} mt={10} gap={10} h={'270px'}>
            {isLoading ? Array('', '', '', '', '', '', '', '').map((item, idx) => (
              <Skeletons key={idx} />
            ))
              :
              data.length > 0 &&
              data.map((product, idx) => (
                <CardProduct
                  key={idx}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
          </Box>
        </ScrollView>
      </Box >
    </NativeBaseProvider >
  );
};

export default Dashboard;
