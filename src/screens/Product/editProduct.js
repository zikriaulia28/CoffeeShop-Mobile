/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton, Button, Input } from 'native-base';
import React, { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getProductDetail } from '../../utils/https/product';
import { cartAction } from '../../redux/slices/cart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const EditProduct = ({ route }) => {
  const storeCart = useSelector((state) => state.cart);
  const role = useSelector((state) => state.user?.role_id);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = route.params;
  // const placeholder = require('../../assets/placehoder-product.png');
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


  const setPrice = () => {
    if (selectedValue === 1) {
      return parseInt(product?.price).toLocaleString('id-ID');
    }
    if (selectedValue === 2) {
      return (parseInt(product?.price) * 1.3).toLocaleString('id-ID');
    }
    if (selectedValue === 3) {
      return (parseInt(product?.price) * 1.65).toLocaleString('id-ID');
    }
    return product?.price.toLocaleString('id-ID');
  };


  return (
    <NativeBaseProvider>
      <Box bg="#EBEBEB" px={7} flex={1}>
        <Box mt={10}  >
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Pressable onPress={() => navigation.goBack()} >
              <Icon name="arrow-left" color="#6A4029" size={30} />
            </Pressable>
            <Pressable bg="#6A4029" w="45px" h="45px" rounded="full" justifyContent="center" alignItems="center" onPress={() => navigation.navigate('Cart')} >
              <Icon name="trash-can-outline" color="#FFFFFF" size={30} />
            </Pressable>
          </Box>
        </Box>
        <Box bg="#EBEBEB" justifyContent="center" alignItems="center">
          {isLoading ? <Skeleton w="241.21px" h="241.21px" bg="#FFFFFF" rounded="full" /> : <Box w="241.21px" h="241.21px" bg="#FFFFFF" rounded="full">
            {product?.image && (
              <Image
                source={{ uri: product.image }}
                alt="product-img"
                w="full"
                h="full"
                resizeMode="cover"
                rounded="full"
              />
            )}
          </Box>}
          <Box flexDir="row" gap={2} mt="23px">
            <Box w="8px" h="8px" rounded="full" bg="#6A4029" />
            <Box w="8px" h="8px" rounded="full" bg="#C4C4C4" />
            <Box w="8px" h="8px" rounded="full" bg="#C4C4C4" />
            <Box w="8px" h="8px" rounded="full" bg="#C4C4C4" />
          </Box>
          {isLoading ? <Skeleton rounded="20px" mt="30px" /> : <Box mt="23px" px="54px" justifyContent="center" alignItems="center">
            <Text fontSize="28px" fontWeight={700} >{product?.name}</Text>
          </Box>}
          {isLoading ? <Skeleton mt={2} rounded="20px" >
            <Skeleton fontSize="25px" fontWeight={700} />
          </Skeleton> : <Box justifyContent="center" alignItems="center" py="10px">
            <Text fontSize="25px" fontWeight={700}>{setPrice()}</Text>
          </Box>}
        </Box>
        <Text fontWeight={900} fontSize="17px">Delivery info</Text>
        {isLoading ? <Skeleton rounded="20px" /> : <Box>
          <Input
            defaultValue="Delivery only on Monday to friday at  1 - 7 pm"
            variant="underlined" size="xl"
            multiline={true}
            numberOfLines={2}
          />
        </Box>}
        <Text fontWeight={900} fontSize="17px">Description</Text>
        {isLoading ? <Skeleton mt="31px" height="12%" rounded="20px" /> : <Box>
          <Input defaultValue="Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours."
            variant="underlined"
            size="xl"
            multiline={true}
            numberOfLines={4}
          />
        </Box>
        }
        <Box >
          <Box>
            <Button w="full" py="10px" bg="#6A4029" mt="20px" rounded="20px" alignItems="center">
              <Text color="#FFFFFF">Save change</Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditProduct;
