/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton, ScrollView, Input, Button, Center, Modal } from 'native-base';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { getUser } from '../../utils/https/profile';
import { PermissionsAndroid } from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RadioGroup from 'react-native-radio-buttons-group';
import ImagePicker from 'react-native-image-crop-picker';
import { updateUser } from '../../utils/https/profile';
import { useDispatch } from 'react-redux';
import { userAction } from '../../redux/slices/auth';
import { ToastAndroid } from 'react-native';


const EditProfile = () => {
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const id = useSelector((state) => state.user?.id);
  const token = useSelector((state) => state.user?.token);
  const navigation = useNavigation();
  const placeholder = require('../../assets/placeholder-user.jpg');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [form, setForm] = useState({
    image: null,
    display_name: '',
    gender: '',
    phone_number: '',
    birth_day: '',
    address: '',
  });

  // const [selectedId, setSelectedId] = useState(data && data.gender === 'female' ? '1' : '2');
  const [selectedId, setSelectedId] = useState('');

  console.log(selectedId);
  console.log(data);
  console.log(data.gender);

  const onChangeForm = (name, value) => {
    // eslint-disable-next-line no-shadow
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getUser(id, controller);
      const result = res.data.data[0];
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // console.log(data);
  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    if (data && data.gender === 'female') {
      setSelectedId('1'); // Set nilai awal menjadi "1" untuk Female
    } else {
      setSelectedId('2'); // Set nilai awal menjadi "2" untuk Male (default)
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);


  const setImg = () => {
    if (data && data.image) {
      return (
        <>
          {imagePreview ? (
            <Image source={{ uri: imagePreview }} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
          ) : (
            <Image source={{ uri: data.image }} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
          )}
        </>
      );
    }
    return (
      <>
        {imagePreview ? (
          <Image source={{ uri: imagePreview }} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
        ) : (
          <Image
            source={placeholder}
            alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full"
          />
        )}
      </>
    );
  };

  const pickImage = async () => {
    try {
      // Request permission to access device's gallery
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let result = await ImagePicker.openPicker({
          mediaType: 'photo',
          multiple: false,
          cropping: true,
          width: 400,
          height: 300,
          cropperCircleOverlay: false,
          freeStyleCropEnabled: true,
        });
        if (!result.cancelled) {
          console.log(result);
          setImagePreview(result.path);
          setForm({
            ...form,
            image: result,
          });
        }
      } else {
        console.log('Gallery permission denied');
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const takeImage = async () => {
    try {
      let result = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        width: 400,
        height: 300,
        cropperCircleOverlay: false,
        freeStyleCropEnabled: true,
      });
      if (!result.cancelled) {
        setShowModal(false);
        setImagePreview(result.path);
        setForm({
          ...form,
          image: result,
        });
      }
    } catch (error) {
      console.log('Error taking image:', error);
    }
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedDate = moment(currentDate).format('YYYY-MM-DD');
    setShow(false);
    setDate(currentDate);
    setForm({ ...form, birth_day: formattedDate });
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

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Female',
        value: 'female',
      },
      {
        id: '2',
        label: 'Male',
        value: 'male',
      },
    ],
    []
  );

  const onRadioPress = (value) => {
    setSelectedId(value);
    let genderValue = value === '1' ? 'female' : 'male';
    setForm({ ...form, gender: genderValue });
  };

  const handleSubmit = async () => {
    setIsLoad(true);
    try {
      if (form.gender === '') {
        setForm({ ...form, gender: data.gender });
      }
      const result = await updateUser(id, token, form.display_name, form.address, form.birth_day, form.image, form.gender, controller);
      console.log(result.data.data[0]);
      const resultUpdate = result.data.data[0];
      const image = resultUpdate.image;
      const email = data.email;
      const name = resultUpdate.display_name;
      dispatch(userAction.dataUser({ name, email, image }));
      ToastAndroid.show('Update success!', ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.navigate('Profile');
      }, 500);
      setIsLoad(false);
    } catch (error) {
      console.log(error.response.data);
      setIsLoad(false);
    }
  };

  // console.log(data.gender);
  // console.log('selected', selectedId);

  return (
    <NativeBaseProvider>

      <Box pt={10} px={'42px'} bg="#FFFFFF">
        <Box flexDirection="row" alignItems="center" gap="90px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">Edit Profile</Text>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box alignItems="center" mt="28px">
            {isLoading ? <Skeleton w="120px" h="120px" rounded="full" /> : <Box w="120px" h="120px" rounded="full">
              {setImg()}
            </Box>}
            <Pressable onPress={() => setShowModal(true)} w="40px" h="40px" rounded="full" bg="#6A4029" alignItems="center" justifyContent="center" top="-40px" left="40px" >
              <Icon name="pencil-outline" color="#FFFFFF" size={24} />
            </Pressable>
          </Box>
          <Box mt="20px">
            <Box mb="27px">
              <Text color="#9F9F9F" fontWeight={700}>Name :</Text>
              {isLoading ? <Skeleton rounded="20px" mt={2} /> : (<Input defaultValue={data.dislplay_name === null ? 'Set Name' : data.display_name} onChangeText={(text) => onChangeForm('display_name', text)} variant="underlined" size="2xl" _focus={{ borderBottomColor: '#6A4029' }} type="text" />)}

            </Box>

            <RadioGroup
              radioButtons={radioButtons}
              onPress={value => onRadioPress(value)}
              selectedId={selectedId}
              layout="row"
            />


            <Box mb="21px" mt="20px">
              <Text color="#9F9F9F" fontWeight={700}>Email Address :</Text>
              {isLoading ? <Skeleton rounded="20px" mt={1} /> : (<Input isDisabled value={data.email} variant="underlined" size="2xl" _focus={{ borderBottomColor: '#6A4029' }} type="text" />)}
            </Box>

            <Box mb="21px">
              <Text color="#9F9F9F" fontWeight={700}>Phone Number :</Text>
              {isLoading ? <Skeleton rounded="20px" mt={1} /> : (<Input defaultValue={data.phone_number} onChangeText={(text) => onChangeForm('phone_number', text)} variant="underlined" size="2xl" inputMode="numeric" _focus={{ borderBottomColor: '#6A4029' }} type="text" />)}
            </Box>

            <Box mb="21px">
              <Text color="#9F9F9F" fontWeight={700}>Date of Birth</Text>
              <Box position="relative">
                {isLoading ? <Skeleton rounded="20px" mt={1} /> : (<><Input isDisabled defaultValue={data.birth_day === null ? moment().format('YYYY-MM-DD') : isChanged ? moment(date).format('YYYY-MM-DD') : moment(data.birth_day).format('YYYY-MM-DD ')} onChangeText={(text) => onChangeForm('birth_day', text)} variant="underlined" size="2xl" _focus={{ borderBottomColor: '#6A4029' }} type="text" />
                  <Pressable onPress={showDatepicker} position="absolute" top={3} right={15}>
                    <Fontisto name="date" color={'#6A4029'} size={24} />
                  </Pressable></>)}
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
            </Box>
            <Box mb="21px">
              <Text color="#9F9F9F">Delivery Address :</Text>
              {isLoading ? <Skeleton rounded="20px" /> : (<Input defaultValue={data.address} onChangeText={(text) => onChangeForm('address', text)} variant="underlined" size="2xl" _focus={{ borderBottomColor: '#6A4029' }} type="text" multiline={true} numberOfLines={2} />)}
            </Box>
            {isLoad ? <Button isLoading isLoadingText="Save" mb={10} bg="#6A4029" /> : (<Pressable onPress={handleSubmit} justifyContent="center" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#6A4029" shadow={3} rounded="20px" mb="40px">
              <Text fontSize="18px" fontWeight={700} color="#FFFFFF">Save</Text>
            </Pressable>)}
          </Box>
        </ScrollView>
        <Box>
          <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
              _dark: {
                bg: 'coolGray.800',
              },
              bg: 'warmGray.50',
            }}>
              <Modal.Content maxWidth="350" maxH="250">
                <Modal.CloseButton />
                <Modal.Header>Select Camera Or Galery</Modal.Header>
                <Modal.Body>
                  <Button backgroundColor="#6A4029" px="30px" mb={1} onPress={pickImage}>
                    Open Galery
                  </Button>
                  <Button backgroundColor="#6A4029" px="30px" onPress={takeImage}>
                    Open Camera
                  </Button>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                      setShowModal(false);
                    }}>
                      Cancel
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>;
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditProfile;
