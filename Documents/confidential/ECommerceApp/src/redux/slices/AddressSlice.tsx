import {createSlice} from '@reduxjs/toolkit';

export const AddressSlice = createSlice({
  name: 'address',
  initialState: {
    data: [],
  },
  reducers: {
    addAddress(state, action) {
      state.data.push(action.payload);
    },
    deleteAddress(state, action) {
      let newArray = state.data.filter(item => {
        return item.id !== action.payload.id;
      });
      state.data = newArray;
    },
    updateAddress(state, action) {
      let temp = state.data;
      temp.map(item => {
        if (item.id === action.payload.id) {
          item.state = action.payload.state;
          item.city = action.payload.city;
          item.pinCode = action.payload.pinCode;
          item.type = action.payload.type;
        }
      });
      state.data = temp;
    },
  },
});
export const {addAddress, deleteAddress, updateAddress} = AddressSlice.actions;
export default AddressSlice.reducer;
