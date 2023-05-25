/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, VStack, Input, ScrollView } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const dataChat = [
  {
    name: 'Cheryn',
    Image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    text: 'What beans do you use for making cold brew?',
    time: 'Yesterday',
  },
  {
    name: 'Boy',
    Image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'What is pinky promise? Is it made from coffee or strawberry?',
    time: '2 days ago',
  },
  {
    name: 'Selena',
    Image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'What beans do you use for making cold brew?',
    time: '5 minutes ago',
  },
  {
    name: 'Cheryn',
    Image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    text: 'What beans do you use for making cold brew?',
    time: 'Yesterday',
  },
  {
    name: 'Boy',
    Image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'What is pinky promise? Is it made from coffee or strawberry?',
    time: '2 days ago',
  },
  {
    name: 'Selena',
    Image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'What beans do you use for making cold brew?',
    time: 'Now',
  },
];

const Chat = () => {
  const navigation = useNavigation();
  const icon = require('../../assets/search.png');
  return (
    <NativeBaseProvider>

      <Box pt={10} >
        <Box px={7} flexDirection="row" alignItems="center" gap="130px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text fontWeight={700} fontSize="20px">Chat</Text>
        </Box>
        <VStack px={7} w="100%" alignSelf="center" mt={10}>
          <Input placeholder="Search Chat" size={'2xl'} inputMode={'text'} backgroundColor={'#EFEEEE'} width="100%" borderRadius="20px" py="4" px="2" InputLeftElement={<Image source={icon} alt="menu" ml="7" />} />
        </VStack>
      </Box>
      <ScrollView flex={1}>
        <Text textAlign="center" mt="10px">Choose a staff you want to talk with</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Box ml={7} flexDir="row" mt="20px" h={'120px'} gap={5}>
            {dataChat.map((item, idx) => (
              <Box key={idx} w="80px" h="80px" rounded="full">
                <Image source={{ uri: item.Image }} alt="img-chat" w="full" h="full" rounded="full" resizeMode="cover" />
                <Text textAlign="center" mt="14px">{item.name}</Text>
              </Box>
            ))}
          </Box>
        </ScrollView>
        <Box borderBottomWidth={1} borderBottomColor={'#E0E0E2'} mt="25px" />
        <Box px={7} mb={5}>
          <Text fontWeight={700} fontSize="20px" mt="10px" mb="42px">Message</Text>
          <Box gap="20px">
            {dataChat?.map((item, idx) => (
              <Pressable key={idx} onPress={() => navigation.navigate('ChatDetail')}>
                <Box flexDir="row" gap="20px">
                  <Box w="60px" h="60px" rounded="full">
                    <Image source={{ uri: item.Image }} alt="img-chat" w="full" h="full" rounded="full" resizeMode="cover" />
                  </Box>
                  <Box>
                    <Box flexDir="row" justifyContent={'space-between'}>
                      <Text fontWeight={700}>{item.name}</Text>
                      <Text color="#9A9A9D">{item.time}</Text>
                    </Box>
                    <Text mt="4px" w="240px">{item.text}</Text>
                  </Box>
                </Box>
              </Pressable>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Chat;
