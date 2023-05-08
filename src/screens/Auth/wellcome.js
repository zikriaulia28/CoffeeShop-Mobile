/* eslint-disable prettier/prettier */
// import React from 'react';
// import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const image = require('../../assets/wellcome.png');

// const Wellcome = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
//         <View style={styles.overlay}>
//           <View style={styles.containerText}>
//             <Text style={styles.title}>Welcome!</Text>
//             <Text style={styles.text}>Get a cup of coffee for free every sunday morning</Text>
//           </View>
//           <View style={styles.btnGroup}>
//             <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>
//               <Text style={styles.textRegister}>Create New Account</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Register')}>
//               <Text style={styles.textLogin}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   containerText: {
//     alignItems: 'center',
//     marginTop: 60,
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 60,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   text: {
//     color: 'white',
//     fontSize: 14,
//     textAlign: 'center',
//     width: 200,
//   },
//   overlay: {
//     backgroundColor: '#000000a0',
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 31,
//   },
//   btnRegister: {
//     paddingHorizontal: 32,
//     paddingVertical: 15,
//     borderRadius: 10,
//     backgroundColor: '#6A4029',
//     width: 350,
//   },
//   btnLogin: {
//     paddingHorizontal: 130,
//     paddingVertical: 15,
//     borderRadius: 10,
//     backgroundColor: '#FFBA33',
//   },
//   textLogin: {
//     color: '#000000',
//     fontWeight: 700,
//     fontSize: 17,
//     textAlign: 'center',
//   },
//   textRegister: {
//     color: '#FFFFFF',
//     fontWeight: 700,
//     fontSize: 17,
//     textAlign: 'center',
//   },
//   btnGroup: {
//     display: 'flex',
//     gap: 17,
//     marginBottom: 50,
//   },
// });

// export default Wellcome;

import { NativeBaseProvider, Image, Box, ZStack, Text, Center, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React from 'react';



const Wellcome = () => {
  const image = require('../../assets/wellcome.png');
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <ZStack flex={1}>
          <Image flex={1} source={image} resizeMode="contain" alt="background" />
          <Box flex={1} bg="#000000" opacity="0.3" size="full" />
          <Center width="full" height="full" paddingX="30px" paddingY="50px" justifyContent="space-between">
            <Box width="full" mt="70px">
              <Text color="white" fontWeight="700" fontSize="65px" textAlign="center">Welcome!</Text>
              <Text color="white" fontSize="17px" textAlign="center">Get a cup of coffee for free every sunday morning</Text>
            </Box>
            <Box width="full">
              <Button mt="10px" backgroundColor="#6A4029" rounded="lg" onPress={() => navigation.navigate('Register')}><Text color="#FFFFFF" fontWeight="700" fontSize="18px" >Create New Account</Text>
              </Button>
              <Button mt="10px" backgroundColor="#FFBA33" rounded="lg" onPress={() => navigation.navigate('Login')}><Text color="#6A4029" fontWeight="700" fontSize="18px" >Login</Text>
              </Button>
            </Box>
          </Center>
        </ZStack>
      </Box>
    </NativeBaseProvider >
  );
};

export default Wellcome;
