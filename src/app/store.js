import { configureStore ,createReducer } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/ProductSlice';
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/order/orderSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart :cartReducer,
    order: orderReducer,
    user: userReducer,

  },
});
