/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  delivery: '',
  notes: '',
  shoppingCart: [],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    deliveryMethod: (prevState, action) => {
      return { ...prevState, delivery: action.payload };
    },
    notes: (prevState, action) => {
      return { ...prevState, notes: action.payload };
    },
    addtoCart: (prevState, action) => {
      // console.log(action.payload);

      const exsistIdx = prevState.shoppingCart.findIndex(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.size_id === action.payload.size_id
      );

      if (exsistIdx !== -1) {
        // Jika objek dg nilai id yg sama sudah ada di dalam array,
        // tambahkan nilai qty pada objek tersebut
        const existItem = prevState.shoppingCart[exsistIdx];
        const updatedItem = {
          ...existItem,
          qty: existItem.qty + action.payload.qty,
          subtotal: existItem.subtotal + action.payload.subtotal,
        };
        const updatedCart = [
          ...prevState.shoppingCart.slice(0, exsistIdx),
          updatedItem,
          ...prevState.shoppingCart.slice(exsistIdx + 1),
        ];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      } else {
        // Jika objek dg nilai id yg sama belum ada di dalam array,
        // tambahkan objek baru ke dalam array
        const updatedCart = [...prevState.shoppingCart, action.payload];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      }

      // return {
      //   ...prevState,
      //   shoppingCart: prevState.shoppingCart.concat(action.payload),
      // };
    },
    resetCounter: () => {
      return initialState;
    },
  },
});

export const counterAction = counterSlice.actions;
export default counterSlice.reducer;