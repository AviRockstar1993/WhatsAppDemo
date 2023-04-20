import {createSlice} from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state, action) {
      let tempData = state.data;
      let isItemExisted = false;
      tempData.map(item => {
        if (item.id === action.payload.id) {
          isItemExisted = true;
          item.qty = item.qty + 1;
        }
      });
      if (!isItemExisted) {
        tempData.push(action.payload);
      }

      state.data = tempData;
    },
    reduceItemFromCart(state, action) {
      let tempData = state.data;
      let isItemExisted = false;
      tempData.map(item => {
        if (item.id === action.payload.id) {
          isItemExisted = true;
          if (item.qty > 1) {
            item.qty = item.qty - 1;
          }
        }
      });

      state.data = tempData;
    },
    removeItemFromCart(state, action) {
      let tempData = state.data;
      tempData.splice(action.payload, 1);
      state.data = tempData;
    },
  },
});
export const {addItemToCart, reduceItemFromCart, removeItemFromCart} =
  CartSlice.actions;
export default CartSlice.reducer;
