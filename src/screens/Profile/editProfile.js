/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton, ScrollView, Input, Radio } from 'native-base';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const storeUser = useSelector((state) => state.user);
  const image = storeUser.image;
  const navigation = useNavigation();
  const placeholder = require('../../assets/placeholder-user.jpg');
  const [value, setValue] = useState('');


  const setImg = () => {
    if (image !== null) {
      return { uri: image };
    }
    return placeholder;
  };
  return (
    <NativeBaseProvider>

      <Box pt={10} px={'42px'}>
        <Box flexDirection="row" alignItems="center" gap="90px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">Edit Profile</Text>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box alignItems="center" mt="28px">
            { }
            <Box w="120px" h="120px" rounded="full">
              <Image source={setImg()} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
            </Box>
            <Pressable onPress={() => console.log('edit img')} w="40px" h="40px" rounded="full" bg="#6A4029" alignItems="center" justifyContent="center" top="-40px" left="40px" >
              <Icon name="pencil-outline" color="#FFFFFF" size={24} />
            </Pressable>
          </Box>
          <Box mt="20px">
            <Box mb="27px">
              <Text color="#9F9F9F">Name :</Text>
              <Input variant="underlined" size="2xl" color="white" _focus={{ borderBottomColor: '#6A4029' }} type="text" placeholder="Enter your name" />
            </Box>
            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
              setValue(nextValue);
              console.log(value);
            }}>
              <Box flexDirection={'row'} gap={10}>
                <Radio value="Female" my={1} _checked={value === 'Female'}>
                  Female
                </Radio>
                <Radio value="Male" my={1} _checked={value === 'Male'}>
                  Male
                </Radio>
              </Box>
            </Radio.Group>
            <Box mb="21px" mt="20px">
              <Text color="#9F9F9F">Email Address :</Text>
              <Input variant="underlined" size="2xl" color="white" _focus={{ borderBottomColor: '#6A4029' }} type="text" placeholder="Enter your email address" />
            </Box>
            <Box mb="21px">
              <Text color="#9F9F9F">Phone Number :</Text>
              <Input variant="underlined" size="2xl" inputMode="tel" color="white" _focus={{ borderBottomColor: '#6A4029' }} type="text" placeholder="Enter your phone number" />
            </Box>
            <Box mb="21px">
              <Text color="#9F9F9F">Date of Birth</Text>
              <Input variant="underlined" size="2xl" color="white" _focus={{ borderBottomColor: '#6A4029' }} type="text" placeholder="Enter Date of Birth" />
            </Box>
            <Box mb="21px">
              <Text color="#9F9F9F">Delivery Adress :</Text>
              <Input variant="underlined" size="2xl" color="white" _focus={{ borderBottomColor: '#6A4029' }} type="text" placeholder="Enter your address" />
            </Box>
            <Pressable justifyContent="center" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#6A4029" shadow={3} rounded="20px" mb="40px">
              <Text fontSize="18px" fontWeight={700} color="#FFFFFF">Save</Text>
            </Pressable>
          </Box>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditProfile;
