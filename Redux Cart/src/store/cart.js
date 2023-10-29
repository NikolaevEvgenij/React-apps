import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   showCart: false,
   totalQuantity: 0,
   productsArray: [],
   notification: null,
   changed: false,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      showCart(state) {
         state.showCart = !state.showCart;
      },
      addToCart(state, action) {
         state.totalQuantity++;
         state.changed = true;
         const currentProductIndex = state.productsArray.findIndex(
            (product) => {
               return product.id === action.payload.id;
            }
         );
         const currentProduct =
            state.productsArray[currentProductIndex];
         if (currentProduct) {
            currentProduct.quantity++;
            currentProduct.total =
               currentProduct.total + currentProduct.price;
         } else {
            state.productsArray.push(action.payload);
         }
      },
      removeFromCart(state, action) {
         state.totalQuantity--;
         state.changed = true;
         const currentProductIndex = state.productsArray.findIndex(
            (product) => {
               return product.id === action.payload.id;
            }
         );
         const currentProduct =
            state.productsArray[currentProductIndex];

         if (currentProduct.quantity !== 1) {
            currentProduct.quantity--;
            currentProduct.total =
               currentProduct.total - currentProduct.price;
         } else {
            state.productsArray.splice(currentProductIndex, 1);
         }
      },
      showNotification(state, action) {
         state.notification = {
            status: action.payload.status,
            title: action.payload.title,
            message: action.payload.message,
         };
      },
      loadCart(state, action) {
         state.productsArray = action.payload.productsArray;
         state.totalQuantity = action.payload.totalQuantity;
      },
   },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
