import {createSlice} from '@reduxjs/toolkit';

const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    data: [],
  },
  reducers: {
    addDataToRedux(state, action) {
      state.data.push(action.payload);
    },
  },
});
export const {addDataToRedux} = LoginSlice.actions;
export default LoginSlice.reducer;
