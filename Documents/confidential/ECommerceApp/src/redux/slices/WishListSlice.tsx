import {createSlice} from '@reduxjs/toolkit';

const WishListSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToWish(state, action) {
      let tempData = state.data;
      tempData.push(action.payload);
      state.data = tempData;
    },
  },
});
export const {addItemToWish} = WishListSlice.actions;
export default WishListSlice.reducer;
