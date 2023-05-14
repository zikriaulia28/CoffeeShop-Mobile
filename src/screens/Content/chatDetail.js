/* eslint-disable prettier/prettier */
import { NativeBaseProvider, Box, Text, Image, Pressable, ScrollView } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ChatDetail = () => {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <ScrollView flex={1}>
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
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ChatDetail;
