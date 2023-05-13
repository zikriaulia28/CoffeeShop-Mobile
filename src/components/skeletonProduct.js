/* eslint-disable prettier/prettier */
import { Skeleton, Box } from 'native-base';
import React from 'react';

const SkeletonProduct = () => {
  return (
    <Box border="1" borderRadius="30px" alignItems={'center'} backgroundColor={'#FFFFFF'} width={'156px'} h="200px" px={'25px'} shadow={'4'} mb={10}>
      <Skeleton size="5" w={'128.98px'} h={'128.98px'} top={'-30px'} rounded={'full'} />
      <Skeleton size="5" fontSize={'30px'} fontWeight={'900'} rounded={'20px'} lineHeight={'30px'} textAlign={'center'} mt={-2} w={'150px'} />
      <Skeleton size="5" width={'full'} alignItems={'center'} rounded={'20px'} mt={'10px'} />
    </Box>
  );
};

export default SkeletonProduct;
