/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton, Button } from 'native-base';
import React, { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getProductDetail } from '../../utils/https/product';
import { cartAction } from '../../redux/slices/cart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ProductDetail = ({ route }) => {
  const role = useSelector((state) => state.user?.role_id);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [active] = useState(true);
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

  const handleClick = (value) => {
    if (value !== '') {
      setSelectedValue(value);
    }
    console.log(value);
  };

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
    } catch (error) {
      console.error('Error while adding to cart:', error);
    }
  };


  return (
    <NativeBaseProvider>
      <Box bg="#6A4029" flex={1}>
        <Box mt={10} px={7} >
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Pressable onPress={() => navigation.goBack()} >
              <Icon name="arrow-left" color="#FFFFFF" size={30} />
            </Pressable>
            {role === 1 ? (<Pressable onPress={() => navigation.navigate('EditProduct', { id })} >
              <Icon name="pencil-outline" color="#FFFFFF" size={30} />
            </Pressable>) : (<Pressable onPress={() => navigation.navigate('Cart')} >
              <Icon name="cart-outline" color="#FFFFFF" size={30} />
            </Pressable>)}
          </Box>
          {isLoading ? <Skeleton h="58px" w="140px" mt={'32%'} roundedTopLeft="25px" roundedTopRight="25px" alignItems="center" bg="#FFBA33" >
            <Skeleton fontSize="25px" fontWeight={700} />
          </Skeleton> : <Box w="140px" mt={'32%'} roundedTopLeft="25px" roundedTopRight="25px" alignItems="center" bg="#FFBA33" py="10px">
            <Text fontSize="25px" fontWeight={700}>{setPrice()}</Text>
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
                resizeMode="cover"
                rounded="full"
              />
            )}
          </Box>}
          {isLoading ? <Skeleton px="54px" top="-15%" rounded={'20px'} /> : <Box px="54px" top="-15%" justifyContent="flex-end" alignItems="flex-end">
            <Text fontSize="28px" fontWeight={700} >{product?.name}</Text>
          </Box>}
          <Box px={7} top="-10%" >
            {isLoading ? <Skeleton w="100%" fontWeight={700} color="#6A4029" /> : <Box><Text w="80%" fontSize={'17px'} fontWeight={700} color="#6A4029">{product?.delivery_info ? product?.delivery_info : 'Delivery only on Monday to friday at  1 - 7 pm'}</Text></Box>}

            {isLoading ? <Skeleton mt="31px" height="31%" /> : <Box><Text fontSize={'17px'} fontWeight={700} mt="31px" color="#6A4029">{product?.description ? product?.description : 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.'}</Text></Box>}

            <Box mt="10%"><Text textAlign="center" fontSize="20px" fontWeight={700}>Choose a size</Text></Box>
            <Box justifyContent="center" flexDirection="row" gap="37px" mt="15px">
              <Pressable w="50px" h="50px" rounded="full" bg="#FFBA33" alignItems="center" justifyContent="center" onPress={() => handleClick(1)} active={selectedValue === 1}>
                <Text fontSize="20px" fontWeight={700} position={'absolute'}>R</Text>
                {selectedValue === 1 && active && (
                  <Icon name="checkbox-blank-circle-outline" color="#6A4029" size={50} />
                )}
              </Pressable>

              <Pressable w="50px" h="50px" rounded="full" bg="#FFBA33" alignItems="center" justifyContent="center" onPress={() => handleClick(2)} active={selectedValue === 2}>
                <Text fontSize="20px" fontWeight={700} position={'absolute'}>L</Text>
                {selectedValue === 2 && active && (
                  <Icon name="checkbox-blank-circle-outline" color="#6A4029" size={50} />
                )}
              </Pressable>

              <Pressable w="50px" h="50px" rounded="full" bg="#FFBA33" alignItems="center" justifyContent="center" onPress={() => handleClick(3)} active={selectedValue === 3}>
                <Text fontSize="20px" fontWeight={700} position={'absolute'}>XL</Text>
                {selectedValue === 3 && active && (
                  <Icon name="checkbox-blank-circle-outline" color="#6A4029" size={50} />
                )}
              </Pressable>
            </Box>

            <Box>
              <Button onPress={handleAddCart} w="full" py="10px" bg="#6A4029" mt="20px" rounded="20px" alignItems="center">
                <Text color="#FFFFFF">Add to cart</Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default ProductDetail;
