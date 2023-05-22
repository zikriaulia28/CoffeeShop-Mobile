/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import { Image, Box, Text } from 'native-base';
import React from 'react';


const CardFinished = (props) => {

  // const placeholder = require('../assets/placeholder.png');
  // const setImage = () => {
  //   if (props.image) {
  //     return { uri: props.image };
  //   }
  //   return placeholder;
  // };
  const setStatus = () => {
    if (props.status_id === 1) {
      return 'Pending';
    }
    if (props.status_id === 2) {
      return 'Finished';
    }
  };
  return (
    <Box flexDir="row" mt={5} gap={7} p="16px" rounded="20px" w="315px" my={2} alignItems="center" bg="white">
      <Box w="83.5px" h="83.5px" rounded="full">
        <Image
          source={{
            uri: props.image,
          }}
          alt="img-history" w="full" h="full" rounded="full" resizeMode="cover"
        />
      </Box>
      <Box gap={1}>
        <Text fontWeight={900} fontSize="17px">{props.name}</Text>
        <Text color="#6A4029">IDR {parseInt(props.price).toLocaleString('id-ID')}</Text>
        <Text w="155px" color="#6A4029" >{setStatus()}</Text>
      </Box>
    </Box>
  );
};

export default CardFinished;
