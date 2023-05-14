/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, Skeleton, ScrollView } from 'native-base';
import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../../utils/https/profile';
import { useSelector } from 'react-redux';
import { userAction } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';


const Profile = () => {
  const id = useSelector((state) => state.user?.id);
  const dispatch = useDispatch();
  // console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const controller = useMemo(() => new AbortController(), []);
  const placeholder = require('../../assets/placeholder-user.jpg');
  const placeholderHistory = require('../../assets/placehoder-product.png');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getUser(id, controller);
        const result = res.data.data[0];
        const email = result.email;
        const name = result.display_name;
        const image = result.image;
        setData(result);
        // console.log(result);
        dispatch(userAction.dataUser({ name, email, image }));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NativeBaseProvider>
      <Box pt={10} px={7} bg="#FFFFFF">
        <Box flexDirection="row" alignItems="center" gap="90px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text color="#6A4029" fontWeight={700} fontSize="20px">My profile</Text>
        </Box>
      </Box>
      <ScrollView flex={1}>
        <Box gap="9px">
          <Box bg="#FFFFFF">
            <Box alignItems="center" px={7} mt="58px">
              {isLoading ? <Skeleton w="100px" h="100px" rounded="full" mb="28px" /> : <Box w="100px" h="100px" rounded="full">
                {data?.image ? (
                  <Image source={{ uri: data.image }} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
                ) : (
                  <Image source={placeholder} alt="profile-img" w="full" h="full" resizeMode="cover" rounded="full" />
                )}
              </Box>}
              {isLoading ? <Skeleton h="20px" mb="10px" rounded="20px" /> : (<Text mt="17px" fontSize="18px" fontWeight={700} color="#6A4029">{data.display_name ? data.display_name : 'Please Set Name'}</Text>)}
              {isLoading ? <Skeleton h="20px" mb="10px" rounded="20px" /> : (<Text mt="10px" color="#6A4029">{data.email}</Text>)}
              {isLoading ? <Skeleton h="20px" mb="10px" rounded="20px" /> : (<Text color="#6A4029">{data.phone_number}</Text>)}
              {isLoading ? <Skeleton h="20px" mb="10px" rounded="20px" /> : (<Text mb="28px" w="80%" textAlign="center" color="#6A4029">{data.address}</Text>)}
            </Box>
          </Box>
          <Box pl={7} bg="#FFFFFF" py="24px" >
            <Box flexDirection="row" justifyContent="space-between" alignItems="center" pr="42px">
              <Text color="#6A4029" fontSize="18px" fontWeight={700}>Order History</Text>
              <Pressable onPress={() => navigation.navigate('History')}>
                <Text color="#6A4029">See More</Text>
              </Pressable>
            </Box>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
              <Box mt="16px" flexDirection="row" gap="25px">
                {isLoading ? <Skeleton w="59px" h="59px" rounded="20px" /> : <Box w="59px" h="59px" rounded="20px" shadow={1}>
                  <Image source={placeholderHistory} alt="history-img" w="full" h="full" resizeMode="cover" rounded="20px" />
                </Box>}
                {isLoading ? <Skeleton w="59px" h="59px" rounded="20px" /> : <Box w="59px" h="59px" rounded="20px" shadow={1}>
                  <Image source={placeholderHistory} alt="history-img" w="full" h="full" resizeMode="cover" rounded="20px" />
                </Box>}
                {isLoading ? <Skeleton w="59px" h="59px" rounded="20px" /> : <Box w="59px" h="59px" rounded="20px" shadow={1}>
                  <Image source={placeholderHistory} alt="history-img" w="full" h="full" resizeMode="cover" rounded="20px" />
                </Box>}
                {isLoading ? <Skeleton w="59px" h="59px" rounded="20px" /> : <Box w="59px" h="59px" rounded="20px" shadow={1}>
                  <Image source={placeholderHistory} alt="history-img" w="full" h="full" resizeMode="cover" rounded="20px" />
                </Box>}
                {isLoading ? <Skeleton w="59px" h="59px" rounded="20px" /> : <Box w="59px" h="59px" rounded="20px" shadow={1}>
                  <Image source={placeholderHistory} alt="history-img" w="full" h="full" resizeMode="cover" rounded="20px" />
                </Box>}
                {isLoading ? <Skeleton w="59px" h="59px" rounded="20px" /> : <Box w="59px" h="59px" rounded="20px" shadow={1}>
                  <Image source={placeholderHistory} alt="history-img" w="full" h="full" resizeMode="cover" rounded="20px" />
                </Box>}
              </Box>
            </ScrollView>
          </Box>
          <Box px={'42px'} bg="#FFFFFF" pb="24px">
            <Pressable flexDirection="row" justifyContent="space-between" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#FFFFFF" shadow={3} rounded="20px">
              <Text color="#6A4029" fontSize="18px" fontWeight={700}>Edit Password</Text>
              <Icon name="arrow-right" color="#6A4029" size={30} />
            </Pressable>
            <Pressable flexDirection="row" justifyContent="space-between" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#FFFFFF" shadow={3} rounded="20px">
              <Text color="#6A4029" fontSize="18px" fontWeight={700}>FAQ</Text>
              <Icon name="arrow-right" color="#6A4029" size={30} />
            </Pressable>
            <Pressable flexDirection="row" justifyContent="space-between" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#FFFFFF" shadow={3} rounded="20px">
              <Text color="#6A4029" fontSize="18px" fontWeight={700}>Help</Text>
              <Icon name="arrow-right" color="#6A4029" size={30} />
            </Pressable>
            <Pressable justifyContent="center" alignItems="center" py="16px" px="23px" w="full" mt="25px" bg="#6A4029" shadow={3} rounded="20px">
              <Text fontSize="18px" fontWeight={700} color="#FFFFFF">Save</Text>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Profile;
