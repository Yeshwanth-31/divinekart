import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item: { id, name, price, quantity }
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.items.find(i => i._id === item._id);
      if (exist) {
        exist.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) {
        item.quantity = quantity;
      }
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
