/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, Input, ScrollView, Button } from 'native-base';
import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getProductDetail, addPromo } from '../../utils/https/product';
import { ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useSelector } from 'react-redux';


const AddPromo = ({ route }) => {
  const placeholder = require('../../assets/placeholder-admin.png');
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user?.token);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  // const [dataProduct, setDataProduct] = useState([]);
  const [product, setProduct] = useState(null);
  const { id } = route.params;
  const [form, setForm] = useState({
    name: '',
    price: '',
    discount: '',
    code: '',
    delivery: '',
    expire_date: '',
    description: '',
  });

  const onChangeForm = (name, value) => {
    // eslint-disable-next-line no-shadow
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
  };

  const getProductById = async () => {
    // setIsLoading(true);
    try {
      const response = await getProductDetail(id);
      const result = response.data.data[0];
      if (response.status === 200) {
        // setIsLoading(false);
        setProduct(result);
      }
    } catch (error) {
      console.log(error.message);
      // setIsLoading(false);
    }
  };
  console.log(product);
  // console.log(form.expire_date)
  useEffect(() => {
    getProductById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const setDiscount = () => {
    if (form.discount) {
      const discount = parseFloat(product?.price) * (parseFloat(form.discount) / 100);
      return (parseFloat(product?.price) - discount).toString();
    }
    return product?.price;
  };

  const setImg = () => {
    if (product?.image) {
      return (
        <Image source={{ uri: product?.image }} alt="img" w="full" h="full" rounded="full" />
      );
    } else {
      return <Image source={placeholder} alt="img" w="full" h="full" rounded="full" />;
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedDate = moment(currentDate).format('YYYY-MM-DD');
    setShow(false);
    setDate(currentDate);
    setForm({ ...form, expire_date: formattedDate });
    setIsChanged(true);
  };

  const showMode = currentMode => {
    // eslint-disable-next-line no-undef
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleSubmit = async () => {
    const body = {
      product_id: product.id,
      code: form.code,
      discount: form.discount,
      description: form.description,
      expired_at: form.expire_date || moment().format('YYYY-MM-DD'),
    };
    console.log('isi', body);
    setLoading(true);
    try {
      const result = await addPromo(token, body, controller);
      console.log('result', result.data.data);
      if (result.status === 201) {
        ToastAndroid.show('Add Promo success!', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.navigate('Dashboard');
        }, 500);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <Box pt={10} flex={1} bg="#FFFFFF">
        <Box px={7} flexDirection="row" alignItems="center" justifyContent="space-between">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text fontWeight={700} fontSize="20px">New Promo</Text>
          <Icon name="trash-can-outline" color="#6A4029" size={30} />
        </Box>
        <ScrollView>
          <Box mt="40px" alignItems="center">
            <Box w="200px" h="200px" rounded="full" borderWidth={1} mb={5}>
              {setImg()}
            </Box>
          </Box>
          {/* <Box px={'42px'} >
            <VStack w="100%" alignSelf="center" mt={'10px'}>
              <Input onChangeText={handleSearch} defaultValue={product.name} placeholder="Search" size={'2xl'} inputMode={'text'} backgroundColor={'#FFFFFF'} width="100%" borderRadius="20px" py="1" px="2" InputLeftElement={<Image source={icon3} alt="menu" ml="7" />} />
            </VStack>
          </Box>
          {isPick ? <Box mx={10} py="10px" rounded="20px" alignItems="center" gap={2} mt={2} bg="#6A4029">
            {loading ? (
              <ActivityIndicator />
            ) : noData ? (
              <Text >Data Not Found</Text>
            ) : (
              dataProduct.map(item => (
                <Pressable
                  onPress={() => handlePick(item)}
                  key={item.id}

                >
                  <Text fontSize="18px" color="#FFFFFF">{item.name}</Text>
                </Pressable>
              ))
            )}
          </Box> : ''} */}


          <Box px={7} mt={5}>
            <Text fontWeight={900} fontSize="17px">Name</Text>
            <Input variant="underlined" size="2xl" type="text" value={product?.name} isDisabled onChangeText={(text) => onChangeForm('name', text)} />
            <Text mt="15px" fontWeight={900} fontSize="17px">Price</Text>
            <Input variant="underlined" size="2xl" type="text" value={setDiscount()} isDisabled onChangeText={(text) => onChangeForm('price', text)} />
            <Text mt="15px" fontWeight={900} fontSize="17px">Discount</Text>
            <Input variant="underlined" size="2xl" type="text" value={form.discount} onChangeText={(text) => onChangeForm('discount', text)} placeholder="Input the discount" />
            <Text mt="15px" fontWeight={900} fontSize="17px">Code</Text>
            <Input variant="underlined" size="2xl" type="text" onChangeText={(text) => onChangeForm('code', text)} placeholder="Input the code" />
            <Box position="relative">
              <Text mt="15px" fontWeight={900} fontSize="17px">Expired Date </Text>
              <Input variant="underlined" size="2xl" type="text" value={product === null ? moment().format('YYYY-MM-DD') : isChanged ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD ')} onChangeText={(text) => onChangeForm('expire_date', text)} />
              <Pressable onPress={showDatepicker} position="absolute" top={10} right={15}>
                <Fontisto name="date" color={'#6A4029'} size={24} />
              </Pressable>
            </Box>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
            <Text mt="15px" fontWeight={900} fontSize="17px">Description</Text>
            <Input variant="underlined" size="2xl" type="text" value={form.description} onChangeText={(text) => onChangeForm('description', text)} placeholder="Describe your product" />
            {loading ? <Button isLoading bg="#6A4029" my="20px" py="20px" /> : (<Pressable onPress={handleSubmit} bg="#6A4029" my="20px" alignItems="center" py="20px" rounded="20px" justifyContent={'center'}>
              <Text color="#FFFFFF" fontSize="18px" fontWeight={900}>Save Promo</Text>
            </Pressable>)}

          </Box>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default AddPromo;
