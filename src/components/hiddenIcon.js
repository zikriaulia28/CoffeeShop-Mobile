/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { Box } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const HiddenIcon = ({ item }) => (
  <Box bg="#FCCAC7" w="100%" h="102px" justifyContent="center" alignItems="flex-end" pr={4} rounded="20px">
    <Icon name="trash" size={30} color="#6A4029" />
  </Box>
);

export default HiddenIcon;
