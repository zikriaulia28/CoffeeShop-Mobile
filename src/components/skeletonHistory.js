/* eslint-disable prettier/prettier */
import { Skeleton, Box } from 'native-base';
import React from 'react';

const SkeletonHistory = () => {
  return (
    <Box flexDir="row" gap={5} mt="30px">
      <Skeleton w="98px" h="108px" rounded="20px" />
      <Box gap={2}>
        <Skeleton size="5" w="200px" rounded="10px" />
        <Skeleton size="5" w="200px" rounded="10px" />
        <Skeleton size="5" w="200px" rounded="10px" />
        <Skeleton size="5" w="200px" rounded="10px" />
      </Box>
    </Box>
  );
};

export default SkeletonHistory;
