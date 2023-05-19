/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import { NativeBaseProvider, Box, Text, Image, Pressable, Input, ScrollView, Menu, Button, Center, Modal } from 'native-base';
import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import { createProduct } from '../../utils/https/product';
import { useSelector } from 'react-redux';

const AddProduct = () => {
  const token = useSelector((state) => state.user?.token);
  const placeholder = require('../../assets/placeholder-admin.png');
  const controller = useMemo(() => new AbortController(), []);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nameCategory, setNameCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const navigation = useNavigation();
  const [form, setForm] = useState({
    image: null,
    name: '',
    price: '',
    delivery: '',
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


  const isImg = () => {
    if (imagePreview) {
      return <Image source={{ uri: imagePreview }} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />;
    }

    return (
      <Image
        source={placeholder}
        alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full"
      />
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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await createProduct(token, form.name, form.price, form.image, categoryId, form.delivery, form.description, controller);
      console.log(result.data);
      ToastAndroid.show('Add success!', ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 500);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setIsLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <Box pt={10} flex={1} bg="#FFFFFF">
        <Box px={7} flexDirection="row" alignItems="center" justifyContent="space-between">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">New Product</Text>
          <Icon name="trash-can-outline" color="#6A4029" size={30} />
        </Box>
        <ScrollView>
          <Box mt="40px" alignItems="center">
            <Box w="200px" h="200px" rounded="full" borderWidth={1}>
              {isImg()}
            </Box>
            <Pressable onPress={() => setShowModal(true)} top={-52} left={16} w="50px" h="50px" bg="#6A4029" rounded="full" justifyContent="center" alignItems="center">
              <Icon name="plus" color="#FFFFFF" size={30} />
            </Pressable>
          </Box>
          <Box px={7}>
            <Text fontWeight={900} fontSize="17px">Name</Text>
            <Input
              variant="underlined"
              size="2xl"
              type="text"
              onChangeText={(text) => onChangeForm('name', text)}
              placeholder="Input the product name" />

            <Text mt="15px" fontWeight={900} fontSize="17px">Price</Text>
            <Input
              variant="underlined"
              size="2xl"
              type="text"
              inputMode="numeric"
              onChangeText={(text) => onChangeForm('price', text)}
              placeholder="Input the product price" />

            <Text mt="15px" fontWeight={900} fontSize="17px">Delivery info</Text>
            <Input
              variant="underlined"
              size="2xl" type="text"
              onChangeText={(text) => onChangeForm('delivery', text)} placeholder="Type delivery information"
              multiline={true}
              numberOfLines={2}
            />

            <Text mt="15px" fontWeight={900} fontSize="17px">Description</Text>
            <Input
              variant="underlined"
              size="2xl" type="text"
              onChangeText={(text) => onChangeForm('description', text)}
              placeholder="Describe your product"
              multiline={true}
              numberOfLines={2} />

            <Box>
              <Text mt="15px" fontWeight={900} fontSize="17px" mb={2}>Category</Text>
              <Menu
                w="120px"
                alignItems="center"
                trigger={triggerProps => {
                  return (
                    <Pressable {...triggerProps} bg="#6A4029" w={'35%'} h={5} alignItems="center" rounded="20px" >
                      <Text color={'#FFFFFF'} fontWeight={700}>{categoryId ? nameCategory : 'Select Category'}</Text>
                    </Pressable>
                  );
                }}>
                <Menu.Item
                  onPress={() => {
                    setNameCategory('Food');
                    setCategoryId(1);
                  }}>
                  Food
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    setNameCategory('Coffee');
                    setCategoryId(2);
                  }}>
                  Coffee
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    setNameCategory('Non-Coffee');
                    setCategoryId(3);
                  }}>
                  Non-Coffee
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    setNameCategory('Add-on');
                    setCategoryId(4);
                  }}>
                  Add-on
                </Menu.Item>
              </Menu>
            </Box>
            {isLoading ? <Button mt={5} mb={5} py={5} isLoading isLoadingText="Save Product" bg="#6A4029" rounded="20px" /> : (<Pressable disabled={form.name === '' || form.price === '' || form.delevery_info === '' || form.description === '' || categoryId === ''}
              onPress={handleSubmit} bg="#6A4029" my="20px" alignItems="center" py="20px" rounded="20px" justifyContent={'center'}>
              <Text color="#FFFFFF" fontSize="18px" fontWeight={900}>Save Product</Text>
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

export default AddProduct;
