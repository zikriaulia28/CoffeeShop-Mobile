/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, Input, ScrollView, Button } from 'native-base';
import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { editingPromo, getPromoDetail } from '../../utils/https/product';
import { ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useSelector } from 'react-redux';


const EditPromo = ({ route }) => {
  const placeholder = require('../../assets/placeholder-admin.png');
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.user?.token);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [prodPick] = useState({});
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


  const getPromoById = async () => {
    setLoading(true);
    try {
      const response = await getPromoDetail(id);
      const result = response.data.data[0];
      console.log('getPromo', response.data.data);
      if (response.status === 200) {
        setLoading(false);
        setProduct(result);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPromoById(id);
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
        <Image source={{ uri: product.image }} alt="img" w="full" h="full" rounded="full" resizeMode="contain" />
      );
    }
    return <Image source={placeholder} alt="img" w="full" h="full" rounded="full" resizeMode="contain" />;
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
      // for iOSEdit a button that closes the picker
    }
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleSubmit = async () => {
    const body = {
      product_id: product?.product_id,
      code: form.code || product?.code,
      discount: form.discount || product?.discount,
      description: form.description || product?.description,
      expired_at: form.expire_date || moment().format('YYYY-MM-DD'),
    };
    console.log('isi', body);
    setLoading(true);
    try {
      const result = await editingPromo(token, id, body, controller);
      console.log('result', result.status);
      if (result.status === 200) {
        ToastAndroid.show('Edit Promo success!', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.navigate('Dashboard');
        }, 500);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // console.log(product);

  return (
    <NativeBaseProvider>
      <Box pt={10} flex={1} bg="#FFFFFF">
        <Box px={7} flexDirection="row" alignItems="center" gap={24}>
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text fontWeight={700} fontSize="20px">Edit Promo</Text>
        </Box>
        <ScrollView>
          <Box mt="40px" alignItems="center">
            <Box w="200px" h="200px" rounded="full" borderWidth={1} mb={5}>
              {setImg()}
            </Box>
          </Box>

          <Box px={7} mt={5}>
            <Text fontWeight={900} fontSize="17px">Name</Text>
            <Input variant="underlined" size="2xl" type="text" value={product?.name} isDisabled onChangeText={(text) => onChangeForm('name', text)} />
            <Text mt="15px" fontWeight={900} fontSize="17px">Price</Text>
            <Input variant="underlined" size="2xl" type="text" value={setDiscount()} isDisabled onChangeText={(text) => onChangeForm('price', text)} />
            <Text mt="15px" fontWeight={900} fontSize="17px">Discount</Text>
            <Input variant="underlined" size="2xl" type="text" defaultValue={form.discount ? form.discount : String(product?.discount)} onChangeText={(text) => onChangeForm('discount', text)} placeholder="Input the discount" />
            <Text mt="15px" fontWeight={900} fontSize="17px">Code</Text>
            <Input variant="underlined" defaultValue={form.code ? form.code : product?.code} size="2xl" type="text" onChangeText={(text) => onChangeForm('code', text)} placeholder="Input the code" />
            <Box position="relative">
              <Text mt="15px" fontWeight={900} fontSize="17px">Expired Date </Text>
              <Input variant="underlined" size="2xl" type="text" defaultValue={prodPick === null ? moment().format('YYYY-MM-DD') : isChanged ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD ')} onChangeText={(text) => onChangeForm('expire_date', text)} />
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
            <Input variant="underlined" defaultValue={form.description ? form.description : product?.description} size="2xl" type="text" onChangeText={(text) => onChangeForm('description', text)} placeholder="Describe your product" />
            {loading ? <Button isLoading bg="#6A4029" my="20px" py="20px" rounded="20px" /> : (<Pressable onPress={handleSubmit} bg="#6A4029" my="20px" alignItems="center" py="20px" rounded="20px" justifyContent={'center'}>
              <Text color="#FFFFFF" fontSize="18px" fontWeight={900}>Save Promo</Text>
            </Pressable>)}

          </Box>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditPromo;
