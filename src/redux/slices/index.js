/* eslint-disable prettier/prettier */
import { combineReducers } from '@reduxjs/toolkit';

import counterSlice from './counter';
import userSlice from './auth';
import cartSlice from './cart';

const reducers = combineReducers({
  counter: counterSlice,
  user: userSlice,
  cart: cartSlice,
});

export default reducers;
