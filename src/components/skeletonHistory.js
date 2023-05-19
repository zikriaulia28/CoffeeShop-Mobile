/* eslint-disable prettier/prettier */
import { Skeleton, Box } from 'native-base';
import React from 'react';

const SkeletonHistory = () => {
  return (
    <Box flexDir="row" gap={10} mt="30px" bg="white" px="10px" py="15px" rounded="20px">
      <Skeleton w="83.5px" h="83.5px" rounded="full" />
      <Box gap={2}>
        <Skeleton size="5" w="200px" rounded="10px" />
        <Skeleton size="5" w="200px" rounded="10px" />
        <Skeleton size="5" w="200px" rounded="10px" />
      </Box>
    </Box>
  );
};

export default SkeletonHistory;
