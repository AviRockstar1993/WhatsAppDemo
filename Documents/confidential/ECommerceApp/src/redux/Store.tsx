import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from '../redux/slices/ProductSlice';
import WishListSlice from './slices/WishListSlice';
import CartSlice from './slices/CartSlice';
import AddressSlice from './slices/AddressSlice';
import LoginDetailSlice from './slices/LoginDetailSlice';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    wishlist: WishListSlice,
    cart: CartSlice,
    address: AddressSlice,
    login: LoginDetailSlice,
  },
});
