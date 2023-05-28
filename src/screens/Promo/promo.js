/* eslint-disable prettier/prettier */
/* eslint-disable no-array-constructor */
import { NativeBaseProvider, Box, Pressable, FlatList, Text } from 'native-base';
import React, { useEffect, useState, useMemo } from 'react';
import CardAllPromo from '../../components/cardAllPromo';
import { getPromo } from '../../utils/https/product';
import SkeletonProduct from '../../components/skeletonProduct';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const Promo = () => {
  const role = useSelector((state) => state.user?.role_id);
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput] = useState('');
  const [category] = useState('');
  const [limit] = useState(6);
  const [page] = useState(1);
  const [order] = useState('');
  const [setTotalPage] = useState(null);


  const fetchData = async () => {
    setIsLoading(true);
    const params = { limit, page, category, search: searchInput, order };
    try {
      const result = await getPromo(params, controller);
      console.log(result.data.data);
      setData(result.data.data);
      setTotalPage(result.data.meta);
      // setNoData(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <Box px={7} flexDirection="row" alignItems="center" gap="90px" mt={10}>
          <Pressable onPress={() => navigation.goBack()} >
            <Icon name="arrow-left" color="#000000" size={30} />
          </Pressable>
          <Text fontWeight={700} fontSize="20px">Promo For You</Text>
        </Box>
        <Box alignItems="center" mt={6} mb={2}>
          <Text fontSize="28px" fontWeight={900}>Pick your good deals</Text>
          <Text >The price has been discounted</Text>
        </Box>
        <Box mt={10}>
          {isLoading ? (<Box flexDir="row" flexWrap="wrap" gap={6} px={7} pb={2} mt={10}  >
            {Array('', '', '', '', '', '').map((item, idx) => (
              <SkeletonProduct key={idx} />
            ))}
          </Box>) : (
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              numColumns={2}
              onEndReachedThreshold={0.2}
              renderItem={({ item }) => (
                <Box flexBasis="50%" px={4} pb={4} alignItems={'center'} mt={10} >
                  <CardAllPromo
                    id={item.id}
                    discount={item.discount}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    role={role}
                  />
                </Box>
              )}
            />)}
        </Box>
      </Box >
    </NativeBaseProvider >
  );
};

export default Promo;
