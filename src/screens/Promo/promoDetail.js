/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import { NativeBaseProvider, Box, Text, Image, ScrollView, Pressable, Skeleton, Button } from 'native-base';
import React, { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getPromoDetail } from '../../utils/https/product';
import { cartAction } from '../../redux/slices/cart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const PromoDetail = ({ route }) => {
  const role = useSelector((state) => state.user?.role_id);
  const storeCart = useSelector((state) => state.cart.shoppingCart);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notif, setNotif] = useState(false);
  const { id } = route.params;
  // const placeholder = require('../../assets/placehoder-product.png');
  const navigation = useNavigation();

  const getProductById = async () => {
    setIsLoading(true);
    try {
      const response = await getPromoDetail(id);
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
    if (value !== '') {
      setSelectedValue(value);
    }
    console.log(value);
  };

  const setPrices = () => {
    if (selectedValue === 1) {
      return parseInt(product?.price);
    }
    if (selectedValue === 2) {
      return (parseInt(product?.price) * 1.3);
    }
    if (selectedValue === 3) {
      return (parseInt(product?.price) * 1.65);
    }
  };

  const handleAddCart = () => {
    try {
      const cart = {
        product_id: id,
        prodName: product.name,
        image: product.image || '',
        size_id: selectedValue || 1,
        qty: 1,
        price: product.price,
      };
      dispatch(cartAction.addtoCart(cart));
      ToastAndroid.showWithGravityAndOffset(
        'Add to cart + ',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        10,
        50,
      );
      console.log('added to cart');
      setNotif(true);
    } catch (error) {
      console.error('Error while adding to cart:', error);
    }
  };

  const calculateDiscountedPrice = () => {
    const data = product?.discount;
    const result = setPrices() * (parseInt(data) / 100);
    // console.log(data);
    const discountedPrice = setPrices() - result;
    return discountedPrice.toLocaleString('id-ID');
  };


  return (
    <NativeBaseProvider>
      <Box bg="#6A4029" flex={1}>
        <Box mt={10} px={7} >
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Pressable onPress={() => navigation.goBack()} >
              <Icon name="arrow-left" color="#FFFFFF" size={30} />
            </Pressable>
            {role === 1 ? (<Pressable onPress={() => navigation.navigate('EditPromo', { id })} >
              <Icon name="pencil-outline" color="#FFFFFF" size={30} />
            </Pressable>) : (<Pressable onPress={() => { navigation.navigate('Cart'); setNotif(false); }} position="relative">
              <Icon name="cart-outline" color="#FFFFFF" size={30} />
              {notif && <Box position="absolute" w="20px" h="20px" bg="red.600" rounded="full" justifyContent="center" alignItems="center" left={4} top={-5}>
                <Text fontWeight={700} fontSize="12px">{storeCart.length}</Text>
              </Box>}
            </Pressable>)}
          </Box>
        </Box>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          {isLoading ? <Skeleton h="58px" w="140px" left={5} mt={'32%'} roundedTopLeft="25px" roundedTopRight="25px" alignItems="center" bg="#FFBA33" >
            <Skeleton fontSize="25px" fontWeight={700} />
          </Skeleton> : <Box w="140px" mt={'32%'} left={5} roundedTopLeft="25px" roundedTopRight="25px" alignItems="center" bg="#FFBA33" py="10px">
            <Text fontSize="25px" fontWeight={700}>{calculateDiscountedPrice()}</Text>
          </Box>}
          <Box bg="#EBEBEB" roundedTopRight="40px" pb={5} pt={24}>
            {isLoading ? <Skeleton w="180px" h="180px" top={'-20%'} left={'52%'} bg="#FFFFFF" rounded="full" position="absolute" /> : <Box w="180px" h="180px" position="absolute" top={'-25%'} left={'52%'} bg="#FFFFFF" rounded="full">
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
            {isLoading ? <Skeleton px="54px" rounded={'20px'} mb={5} /> : <Box px="54px" mb={1} justifyContent="flex-end" alignItems="flex-end">
              <Text fontSize="28px" fontWeight={700} >{product?.name}</Text>
            </Box>}

            <Box px={7} mb={5}>
              {isLoading ? <Skeleton w="100%" fontWeight={700} color="#6A4029" /> : <Box><Text w="80%" fontSize={'17px'} fontWeight={700} color="#6A4029">{product?.delivery_info ? product?.delivery_info : 'Delivery only on Monday to friday at  1 - 7 pm'}</Text></Box>}

              {isLoading ? <Skeleton mt="31px" height="31%" /> : <Box><Text fontSize={'17px'} fontWeight={700} mt="31px" color="#6A4029">{product?.description ? product?.description : 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.'}</Text></Box>}

              {isLoading ? <Skeleton mt="5%" /> : <Box mt="10%"><Text textAlign="center" fontSize="20px" h="80px" maxH="100px" fontWeight={700}>Choose a size</Text></Box>}

              <Box justifyContent="center" flexDirection="row" gap="37px" mt="15px">
                {isLoading ? <Skeleton w="50px" h="50px" mb={'32'} rounded="full" /> : (<Pressable w="50px" h="50px" rounded="full" bg={selectedValue === 1 ? '#6A4029' : '#FFBA33'} alignItems="center" justifyContent="center" onPress={() => handleClick(1)} active={selectedValue === 1}>
                  <Text fontSize="20px" fontWeight={700} color={selectedValue === 1 ? '#FFFFFF' : '#000000'}>R</Text>
                </Pressable>)}

                {isLoading ? <Skeleton w="50px" h="50px" mb={'32'} rounded="full" /> : (<Pressable w="50px" h="50px" rounded="full" bg={selectedValue === 2 ? '#6A4029' : '#FFBA33'} alignItems="center" justifyContent="center" onPress={() => handleClick(2)} active={selectedValue === 2}>
                  <Text fontSize="20px" fontWeight={700} color={selectedValue === 2 ? '#FFFFFF' : '#000000'}>L</Text>
                </Pressable>)}

                {isLoading ? <Skeleton w="50px" h="50px" mb={'32'} rounded="full" /> : (<Pressable w="50px" h="50px" rounded="full" bg={selectedValue === 3 ? '#6A4029' : '#FFBA33'} alignItems="center" justifyContent="center" onPress={() => handleClick(3)} active={selectedValue === 3}>
                  <Text fontSize="20px" fontWeight={700} color={selectedValue === 3 ? '#FFFFFF' : '#000000'}>XL</Text>
                </Pressable>)}
              </Box>

              <Button onPress={handleAddCart} w="full" py="10px" bg="#6A4029" my="20px" rounded="20px" alignItems="center">
                <Text color="#FFFFFF">Add to cart</Text>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default PromoDetail;
