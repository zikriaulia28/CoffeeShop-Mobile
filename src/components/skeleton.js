/* eslint-disable prettier/prettier */
import { Skeleton, Box } from 'native-base';
import React from 'react';

const Skeletons = () => {
  return (
    <Box border="1" borderRadius="30px" alignItems={'center'} backgroundColor={'#FFFFFF'} width={'220px'} px={'25px'} shadow={'4'}>
      {/* <Box w={'168px'} h={'189px'} top={'-30px'}>
        <Image source={image ? placeholder : image} alt="img-product" w={'168px'} h={'189px'} rounded={'20px'} />
      </Box> */}
      <Skeleton size="5" w={'168px'} h={'189px'} top={'-30px'} rounded={'20px'} />
      <Skeleton size="5" fontSize={'30px'} fontWeight={'900'} rounded={'20px'} lineHeight={'30px'} textAlign={'center'} mt={-2} w={'200px'} />
      <Skeleton size="5" width={'full'} alignItems={'center'} rounded={'20px'} mt={'10px'} />
      {/* <Text fontSize={'30px'} fontWeight={'900'} lineHeight={'30px'} textAlign={'center'} mt={-2} h={'55px'} w={'200px'}>{name}</Text> */}
      {/* <Box width={'full'} alignItems={'center'}>
        <Text textAlign={'center'}>IDR {price}</Text>
      </Box> */}
    </Box>
  );
};

export default Skeletons;
