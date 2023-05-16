/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, ScrollView, Input } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const dataChating = [
  {
    admin: 'Hey, welcome to Coffee Time!Today is Sunday and you know what? You will get a cup of coffee free only at 7 to 9 AM. If you still have some questions to ask, let me know. Have a wonderful day!',
    user: 'Hey, what beans do you use for making cold brew? Can I request the beans?',
    timeAdmin: '12.00',
    timeUser: '12.05',
  },
  {
    admin: 'Thank you for asking. Yup, you can request the beans, what beans do you like?',
    user: 'I want arabica for the beans, thank you.',
    timeAdmin: '12.07',
    timeUser: '12.10',
  },
  {
    admin: 'Hey, welcome to Coffee Time!Today is Sunday and you know what? You will get a cup of coffee free only at 7 to 9 AM. If you still have some questions to ask, let me know. Have a wonderful day!',
    user: 'Hey, what beans do you use for making cold brew? Can I request the beans?',
    timeAdmin: '12.00',
    timeUser: '12.05',
  },
  {
    admin: 'Thank you for asking. Yup, you can request the beans, what beans do you like?',
    user: 'I want arabica for the beans, thank you.',
    timeAdmin: '12.07',
    timeUser: '12.10',
  },
];


const ChatDetail = () => {
  const adminImg = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
  const userImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>

      <Box pt={'20px'} >
        <Box px={7} flexDirection="row" alignItems="center" gap="110px">
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Box justifyContent="center" alignItems="center" gap={2}>
            <Box w="60px" h="60px" rounded="full">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }} alt="img-chat" w="full" h="full" rounded={'full'} />
            </Box>
            <Text>Cheryn</Text>
          </Box>
        </Box>
      </Box>
      <Box borderBottomWidth={1} borderBottomColor={'#E0E0E2'} mt="15px" />
      <ScrollView flex={1}>
        <Box px={7} mt="40px">
          {dataChating.map((item, idx) => (
            <Box key={idx}>
              <Box flexDir="row" gap={2} mb={10} >
                <Box w="40px" h="40px">
                  <Image source={{ uri: adminImg }} alt="img-chatDetails" w="full" h="full" rounded="full" />
                </Box>
                <Box>
                  <Box w="250px" bg="#6A4029" p="14px" rounded={'10px'}>
                    <Text color="#FFFFFF">{item.admin}</Text>
                  </Box>
                  <Text textAlign="right">{item.timeAdmin}</Text>
                </Box>
              </Box>
              <Box flexDir="row" justifyContent="flex-end" gap={2} mb={10}>
                <Box>
                  <Box w="237px" borderWidth={1} borderColor="#6A402985" p="14px" rounded={'10px'}>
                    <Text>{item.user}</Text>
                  </Box>
                  <Text textAlign="left">{item.timeUser}</Text>
                </Box>
                <Box w="40px" h="40px">
                  <Image source={{ uri: userImg }} alt="img-chatDetails" w="full" h="full" rounded="full" />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </ScrollView>
      <Box px={7} mb={10}>
        <Input px={4} fontSize="17px" placeholder="Type a message..." InputRightElement={<Icon name="camera-outline" color="#000000" size={30} right={10} />} />
      </Box>
    </NativeBaseProvider>
  );
};

export default ChatDetail;
