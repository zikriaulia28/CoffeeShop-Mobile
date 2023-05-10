/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton } from 'native-base';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getProductDetail } from '../../utils/https/product';

const ProductDetail = ({ route }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = route.params;
  const placeholder = require('../../assets/placehoder-product.png');
  const navigation = useNavigation();

  const getProductById = async () => {
    setIsLoading(true);
    try {
      const response = await getProductDetail(id);
      const result = response.data.data[0];
      if (response.status === 200) {
        setIsLoading(false);
        setProduct(result);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleClick = (value) => {
    setSelectedValue(value);
    console.log(value);
  };



  return (
    <NativeBaseProvider>
      <Box bg="#6A4029" flex={1}>
        <Box mt={10} px={'42px'} >
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Pressable onPress={() => navigation.goBack()} >
              <Icon name="arrow-left" color="#FFFFFF" size={30} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Cart')} >
              <Icon name="cart-outline" color="#FFFFFF" size={30} />
            </Pressable>
          </Box>
          {isLoading ? <Skeleton h="58px" w="140px" mt={'32%'} roundedTopLeft="25px" roundedTopRight="25px" alignItems="center" bg="#FFBA33" >
            <Skeleton fontSize="25px" fontWeight={700}>{product?.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Skeleton>
          </Skeleton> : <Box w="140px" mt={'32%'} roundedTopLeft="25px" roundedTopRight="25px" alignItems="center" bg="#FFBA33" py="10px">
            <Text fontSize="25px" fontWeight={700}>{product?.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
          </Box>}

        </Box>
        <Box flex={1} bg="#EBEBEB" roundedTopRight="40px">
          {isLoading ? <Skeleton w="180px" h="180px" top={'-20%'} left={'52%'} bg="#FFFFFF" rounded="full" /> : <Box w="180px" h="180px" top={'-20%'} left={'52%'} bg="#FFFFFF" rounded="full">
            {product?.image && (
              <Image
                source={{ uri: product.image }}
                alt="product-img"
                w="full"
                h="full"
                resizeMode="contain"
                rounded="full"
              />
            )}
          </Box>}
          {isLoading ? <Skeleton px="54px" top="-15%" rounded={'20px'} /> : <Box px="54px" top="-15%" justifyContent="flex-end" alignItems="flex-end">
            <Text fontSize="28px" fontWeight={700} >{product?.name}</Text>
          </Box>}
          <Box px="54px" top="-10%" >
            {isLoading ? <Skeleton w="100%" fontWeight={700} color="#6A4029" /> : <Box><Text w="80%" fontWeight={700} color="#6A4029">Delivery only on Monday to friday at  1 - 7 pm</Text></Box>}
            {isLoading ? <Skeleton mt="31px" height="29%" /> : <Box><Text fontWeight={700} mt="31px" color="#6A4029">Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.</Text></Box>}
            <Box mt="10px"><Text textAlign="center" fontSize="20px" fontWeight={700}>Choose a size</Text></Box>
            <Box justifyContent="center" flexDirection="row" gap="37px" mt="15px">
              <Pressable w="50px" h="50px" rounded="full" bg="#FFBA33" alignItems="center" justifyContent="center" onPress={() => handleClick('R')} _pressed={{ borderColor: 'brown', borderWidth: '2px' }} >
                <Text fontSize="20px" fontWeight={700}>R</Text>
              </Pressable>

              <Pressable w="50px" h="50px" rounded="full" bg="#FFBA33" alignItems="center" justifyContent="center" onPress={() => handleClick('L')} _pressed={{ borderColor: 'brown', borderWidth: '2px' }}>
                <Text fontSize="20px" fontWeight={700}>L</Text>
              </Pressable>

              <Pressable w="50px" h="50px" rounded="full" bg="#FFBA33" alignItems="center" justifyContent="center" onPress={() => handleClick('XL')} _pressed={{ borderColor: 'brown', borderWidth: '2px' }}>
                <Text fontSize="20px" fontWeight={700}>XL</Text>
              </Pressable>
            </Box>

            <Box w="full" py="10px" bg="#6A4029" mt="10px" rounded="20px" alignItems="center">
              <Pressable><Text color="#FFFFFF">Add to cart</Text></Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default ProductDetail;
