/* eslint-disable prettier/prettier */
import { Skeleton, Box } from 'native-base';
import React from 'react';

const Skeletons = () => {
  return (
    <Box border="1" borderRadius="30px" alignItems={'center'} backgroundColor={'#FFFFFF'} width={'220px'} px={'25px'} >
      <Skeleton w={'168px'} h={'180px'} top={'-30px'} rounded={'20px'} />
      <Skeleton size="5" w={'200px'} rounded={'20px'} />
      <Skeleton size="5" width={'full'} alignItems={'center'} rounded={'20px'} mt={'10px'} />
    </Box>
  );
};

export default Skeletons;
