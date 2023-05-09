/* eslint-disable prettier/prettier */
// import { configureStore } from '@reduxjs/toolkit';
// // import { composeWithDevTools } from 'redux-devtools-extension';
// import {
//   persistStore,
//   persistReducer,
//   PERSIST,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   REGISTER,
//   PURGE,
// } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import reducer from './slices';

// const persistConfig = {
//   key: 'coffee_shop',
//   storage: AsyncStorage,
//   // blacklist: ['user']
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (defaultMiddleware) => {
//     return defaultMiddleware({
//       // thunk: false,
//       serializableCheck: {
//         ignoreActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE],
//       },
//     });
//   },
//   // enhancers: [composeWithDevTools()],
// });

// export const persistor = persistStore(store);
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './slices';

const persistConfig = {
  key: 'coffee_shop',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddleware => {
    return defaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE],
      },
    });
  },
});

export const persistor = persistStore(store);
export default store;
