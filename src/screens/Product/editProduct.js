/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton, Button, Input, Modal, Center } from 'native-base';
import React, { useState, useEffect, useMemo } from 'react';
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getProductDetail } from '../../utils/https/product';
import { useSelector } from 'react-redux';
import { updateProduct, deleteProduct } from '../../utils/https/product';
import ImagePicker from 'react-native-image-crop-picker';


const EditProduct = ({ route }) => {
  const token = useSelector((state) => state.user?.token);
  const controller = useMemo(() => new AbortController(), []);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedValue] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { id } = route.params;
  const placeholder = require('../../assets/placehoder-product.png');
  const [form, setForm] = useState({
    image: null,
    name: '',
    price: '',
    delivery: '',
    description: '',
  });
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

  const isImg = () => {
    if (product && product?.image) {
      return (
        <>
          {imagePreview ? (
            <Image source={{ uri: imagePreview }} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
          ) : (
            <Image source={{ uri: product?.image }} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await updateProduct(token, id, form.name, form.price, form.image, form.delivery, form.description, controller);
      console.log(result.data);
      ToastAndroid.show('Update success!', ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 500);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setIsLoading(false);
    }
  };

  console.log('description', form.description);

  const onChangeForm = (name, value) => {
    // eslint-disable-next-line no-shadow
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteProduct(token, id, controller);
      console.log(result.data);
      ToastAndroid.show('Delete success!', ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 500);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  return (
    <NativeBaseProvider>
      <Box bg="#EBEBEB" px={7} flex={1}>
        <Box mt={10}  >
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Pressable onPress={() => navigation.goBack()} >
              <Icon name="arrow-left" color="#6A4029" size={30} />
            </Pressable>
            <Pressable onPress={() => setShowModal(true)} bg="#6A4029" w="45px" h="45px" rounded="full" justifyContent="center" alignItems="center">
              <Icon name="trash-can-outline" color="#FFFFFF" size={30} />
            </Pressable>
          </Box>
        </Box>
        <Box bg="#EBEBEB" justifyContent="center" alignItems="center">
          {isLoading ? <Skeleton w="241.21px" h="241.21px" bg="#FFFFFF" rounded="full" /> : <Pressable onPress={() => setOpenModal(true)} w="241.21px" h="241.21px" bg="#FFFFFF" rounded="full">
            {isImg}
          </Pressable>}
          <Box flexDir="row" gap={2} mt="23px">
            <Box w="8px" h="8px" rounded="full" bg="#6A4029" />
            <Box w="8px" h="8px" rounded="full" bg="#C4C4C4" />
            <Box w="8px" h="8px" rounded="full" bg="#C4C4C4" />
            <Box w="8px" h="8px" rounded="full" bg="#C4C4C4" />
          </Box>
          {isLoading ? <Skeleton rounded="20px" mt="30px" /> : <Box mt="23px" px="54px" justifyContent="center" alignItems="center">
            <Input
              onChangeText={(text) => onChangeForm('name', text)}
              fontSize="28px"
              fontWeight={700}
              defaultValue={product?.name}
              variant="unstyled"
              textAlign={'center'}
            />
          </Box>}
          {isLoading ? <Skeleton mt={2} rounded="20px" >
            <Skeleton fontSize="25px" fontWeight={700} />
          </Skeleton> : <Box justifyContent="center" alignItems="center">
            <Input
              onChangeText={(text) => onChangeForm('price', text)}
              fontSize="25px"
              fontWeight={700}
              defaultValue={setPrice()}
              variant="unstyled"
              textAlign={'center'}
            />
          </Box>}
        </Box>
        <Text fontWeight={900} fontSize="17px">Delivery info</Text>
        {isLoading ? <Skeleton rounded="20px" /> : <Box>
          <Input
            defaultValue={product?.delivery_info}
            variant="underlined" size="xl"
            multiline={true}
            numberOfLines={2}
            onChangeText={(text) => onChangeForm('delivery', text)} placeholder="Type delivery information"
          />
        </Box>}
        <Text fontWeight={900} fontSize="17px">Description</Text>
        {isLoading ? <Skeleton mt="31px" height="12%" rounded="20px" /> : <Box>
          <Input
            onChangeText={(text) => onChangeForm('description', text)}
            defaultValue={product?.description}
            variant="underlined"
            size="xl"
            multiline={true}
            numberOfLines={4}
          />
        </Box>
        }
        <Box >
          <Box>
            <Button onPress={handleSubmit} w="full" py="10px" bg="#6A4029" mt="20px" rounded="20px" alignItems="center">
              <Text color="#FFFFFF">Save change</Text>
            </Button>
          </Box>
        </Box>
        <Box>
          <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
              _dark: {
                bg: 'coolGray.800',
              },
              bg: 'warmGray.50',
            }}>
              <Modal.Content maxWidth="350" maxH="212">
                <Modal.CloseButton />
                <Modal.Header>Delete Product</Modal.Header>
                <Modal.Body>
                  Are you sure ?
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                      setShowModal(false);
                    }}>
                      Cancel
                    </Button>
                    {isLoading ? <Button backgroundColor="#6A4029" isLoading isLoadingText="Delete" /> : <Button backgroundColor="#6A4029" px="30px" onPress={handleDelete}>
                      Delete
                    </Button>
                    }
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>;
        </Box>
        <Box>
          <Center>
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)} _backdrop={{
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
                      setOpenModal(false);
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

export default EditProduct;
