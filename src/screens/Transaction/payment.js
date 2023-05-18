/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import { NativeBaseProvider, Box, Text, Pressable, ScrollView, Image, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CardPayment from '../../components/cardPayment';
import React, { useState, useMemo } from 'react';
import { cartAction } from '../../redux/slices/cart';
import { addTransactions } from '../../utils/https/transactions';

const Payment = () => {
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);
  const reduxStore = useSelector(state => state);
  const token = reduxStore.user?.token;
  const cartRedux = reduxStore.cart;
  console.log('CART REDUX', cartRedux);
  // console.log('user', token);
  const bri = require('../../assets/bri.jpg');
  const bni = require('../../assets/bni.jpg');
  const storeCart = useSelector((state) => state.cart.shoppingCart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [show, setShow] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState(3);
  const [creditCard, setCreditCard] = useState(1);
  const [isSuccess, setSuccess] = useState(false);

  const dataShopping = cartRedux.shoppingCart.map(item => {
    const { image, prodName, price, qty, ...newItem } = item;
    return { ...newItem, subtotal: price * qty, qty };
  });
  console.log('data shoping', dataShopping);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const body = {
        payment_id: paymentMethod,
        promo_id: 1,
        delivery_id: cartRedux.delivery,
        status_id: 1,
        notes: '',
        products: dataShopping,
      };
      const result = await addTransactions(token, body, controller);
      console.log('ADD TRANSACTION', result.status);
      setLoading(false);
      setSuccess(true);
      dispatch(cartAction.resetCart());
      console.log('success');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const handleClick = (value) => {
    setpaymentMethod(value);
    if (value === 1) {
      setShow(true);
    } else {
      setShow(false);
    }
    console.log(value);
  };

  const handleClickCard = (value) => {
    setCreditCard(value);
    console.log(value);
  };

  const taxFee = cartRedux.delivery === 1 ? 10000 : 0;
  const grandTotal = route.params.subtotal + taxFee;



  return (
    <NativeBaseProvider >
      <Box pt={10} px={7}  >
        <Box flexDirection="row" alignItems="center" gap="110px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">Payment</Text>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false} >
          <Text fontWeight={700} mt="36px" fontSize="20px">Product</Text>
          <ScrollView maxH="250px" nestedScrollEnabled={true} >
            <Box mt="23px" bg="#FFFFFF" rounded="20px" px="20px" pt="25px">
              {storeCart.map((data, idx) => (
                <CardPayment key={idx}
                  product_id={data.product_id}
                  prodName={data.prodName}
                  image={data.image}
                  price={data.price}
                  qty={data.qty}
                  size_id={data.size_id}
                />
              ))}
            </Box>
          </ScrollView>
          <Text fontWeight={700} mt="36px" fontSize="20px">Payment method</Text>
          <Box bg="#FFFFFF" gap={2} mt="14px" rounded="20px" h="200px" px="25px" py="20px">
            <Pressable onPress={() => handleClick(1)} active={paymentMethod === 1}>
              <Box flexDir="row" alignItems="center" gap="10px">
                <Box w="20px" h="20px" top="-8px" rounded="full" borderWidth={1} borderColor={paymentMethod === 1 ? '#6A4029' : '#9F9F9F'} alignItems="center" justifyContent="center">
                  {paymentMethod === 1 && <Box w="15px" h="15px" rounded="full" bg="#6A4029" />}
                </Box>
                <Box w="85%" gap={4}>
                  <Box flexDir="row" alignItems="center" gap="10px">
                    <Box w="40px" h="40px" rounded="10px" bg="#F47B0A" justifyContent="center" alignItems="center">
                      <Icon name="credit-card-outline" color="#FFFFFF" size={30} />
                    </Box>
                    <Text>Card</Text>
                  </Box>
                  <Box borderBottomWidth={1} borderBottomColor={'#BABABA59'} />
                </Box>
              </Box>
            </Pressable>

            <Pressable onPress={() => handleClick(2)} active={paymentMethod === 2}>
              <Box flexDir="row" alignItems="center" gap="10px">
                <Box w="20px" h="20px" top="-8px" rounded="full" borderWidth={1} borderColor={paymentMethod === 2 ? '#6A4029' : '#9F9F9F'} alignItems="center" justifyContent="center">
                  {paymentMethod === 2 && <Box w="15px" h="15px" rounded="full" bg="#6A4029" />}
                </Box>
                <Box w="85%" gap={4}>
                  <Box flexDir="row" alignItems="center" gap="10px">
                    <Box w="40px" h="40px" rounded="10px" bg="#895537" justifyContent="center" alignItems="center">
                      <Icon name="bank" color="#FFFFFF" size={30} />
                    </Box>
                    <Text>Bank account</Text>
                  </Box>
                  <Box borderBottomWidth={1} borderBottomColor={'#BABABA59'} />
                </Box>
              </Box>
            </Pressable>

            <Pressable onPress={() => handleClick(3)} active={paymentMethod === 3}>
              <Box flexDir="row" alignItems="center" gap="10px">
                <Box w="20px" h="20px" rounded="full" borderWidth={1} borderColor={paymentMethod === 3 ? '#6A4029' : '#9F9F9F'} alignItems="center" justifyContent="center">
                  {paymentMethod === 3 && <Box w="15px" h="15px" rounded="full" bg="#6A4029" />}
                </Box>
                <Box w="85%">
                  <Box flexDir="row" alignItems="center" gap="10px">
                    <Box w="40px" h="40px" rounded="10px" bg="#FFBA33" justifyContent="center" alignItems="center">
                      <Icon name="truck-delivery" color="#000000" size={30} />
                    </Box>
                    <Text>Cash on delivery</Text>
                  </Box>
                </Box>
              </Box>
            </Pressable>
          </Box>

          {show && (<>
            <Text fontWeight={700} mt="36px" fontSize="20px">My Card</Text>
            <Box flexDir="row" alignItems="center" gap={'11px'} mt="20px">
              {creditCard === 1 && (<>
                <Pressable onPress={() => handleClickCard(1)} active={creditCard === 1}>
                  <Box w={creditCard === 1 ? '248px' : '207px'} h={creditCard === 1 ? '150px' : '129px'} shadow={9}>
                    <Image source={bri} w="full" h="full" alt="credit-card" rounded="10px" />
                  </Box>
                </Pressable>
                <Pressable onPress={() => handleClickCard(2)} active={creditCard === 2}>
                  <Box w={creditCard === 2 ? '248px' : '207px'} h={creditCard === 2 ? '150px' : '129px'}>
                    <Image source={bni} w="full" h="full" alt="credit-card" rounded="10px" />
                  </Box>
                </Pressable>
              </>)}
              {creditCard === 2 && (<>
                <Pressable onPress={() => handleClickCard(2)} active={creditCard === 2}>
                  <Box w={creditCard === 2 ? '248px' : '207px'} h={creditCard === 2 ? '150px' : '129px'}>
                    <Image source={bni} w="full" h="full" alt="credit-card" rounded="10px" />
                  </Box>
                </Pressable>
                <Pressable onPress={() => handleClickCard(1)} active={creditCard === 1}>
                  <Box w={creditCard === 1 ? '248px' : '207px'} h={creditCard === 1 ? '150px' : '129px'} shadow={9}>
                    <Image source={bri} w="full" h="full" alt="credit-card" rounded="10px" />
                  </Box>
                </Pressable>
              </>)}

            </Box>
          </>)}


          <Box mt="42px" flexDir="row" justifyContent="space-between" alignItems="center">
            <Text fontSize="17px">Total</Text>
            <Text fontWeight={900} fontSize="22px">Rp. {dataShopping !== [] ? parseInt(grandTotal).toLocaleString('id-ID') : 0}</Text>
          </Box>
          {isLoading ? <Button isLoading isLoadingText="Proceed payment" mt="10px" mb={10} backgroundColor="#6A4029" rounded="20px" >
            <Text color="#FFFFFF" fontSize="18px" fontWeight={900}>Proceed payment</Text>
          </Button> : isSuccess ? (<Pressable onPress={() => navigation.navigate('Dashboard')} bg="#6A4029" mt="37px" alignItems="center" py="20px" mb={10} rounded="20px">
            <Text color="#FFFFFF" fontSize="18px" fontWeight={900}>Back To Dashboard</Text>
          </Pressable>) : (<Pressable onPress={handleSubmit} bg="#6A4029" mt="37px" alignItems="center" py="20px" mb={10} rounded="20px">
            <Text color="#FFFFFF" fontSize="18px" fontWeight={900}>Proceed payment</Text>
          </Pressable>)}

        </ScrollView>
      </Box>
    </NativeBaseProvider >
  );
};

export default Payment;
