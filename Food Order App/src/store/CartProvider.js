import { useReducer } from "react";

import CartContext from "./cart-context";

const defalutCartState = {
   meals: [],
   totalAmount: 0,
};

const cartReducer = (state, action) => {
   if (action.type === "ADD_MEAL") {
      const updatedTotalAmount =
         state.totalAmount +
         action.meal.amount * action.meal.price;

      const existingCartMealIndex = state.meals.findIndex(
         (meal) => {
            return meal.id === action.meal.id;
         }
      );

      const existingCartMeal =
         state.meals[existingCartMealIndex];

      let updatedMeals;

      if (existingCartMeal) {
         const updatedMeal = {
            ...existingCartMeal,
            amount:
               existingCartMeal.amount + action.meal.amount,
         };
         updatedMeals = [...state.meals];
         updatedMeals[existingCartMealIndex] = updatedMeal;
      } else {
         updatedMeals = state.meals.concat(action.meal);
      }
      return {
         meals: updatedMeals,
         totalAmount: updatedTotalAmount,
      };
   }

   if (action.type === "REMOVE_MEAL") {
      const existingCartMealIndex = state.meals.findIndex(
         (meal) => {
            return meal.id === action.id;
         }
      );

      const existingCartMeal =
         state.meals[existingCartMealIndex];

      let updatedMeals;

      const updatedTotalAmount =
         state.totalAmount - existingCartMeal.price;

      if (existingCartMeal.amount !== 1) {
         const updatedMeal = {
            ...existingCartMeal,
            amount: existingCartMeal.amount - 1,
         };
         updatedMeals = [...state.meals];
         updatedMeals[existingCartMealIndex] = updatedMeal;
      } else {
         updatedMeals = state.meals.filter(
            (meal) => meal.id !== action.id
         );
      }

      return {
         meals: updatedMeals,
         totalAmount: updatedTotalAmount,
      };
   }

   if (action.type === "CLEAR_CART") {
      return defalutCartState;
   }

   return defalutCartState;
};

const CartProvider = (props) => {
   const [cartState, dispatchCartAction] = useReducer(
      cartReducer,
      defalutCartState
   );

   const addMealToCart = (meal) => {
      dispatchCartAction({ type: "ADD_MEAL", meal: meal });
   };
   const removeMealFromCart = (id) => {
      dispatchCartAction({ type: "REMOVE_MEAL", id: id });
   };

   const clearCart = (id) => {
      dispatchCartAction({ type: "CLEAR_CART" });
   };

   const cartContext = {
      meals: cartState.meals,
      totalAmount: cartState.totalAmount,
      addMeal: addMealToCart,
      removeMeal: removeMealFromCart,
      clearCart: clearCart,
   };

   return (
      <CartContext.Provider value={cartContext}>
         {props.children}
      </CartContext.Provider>
   );
};

export default CartProvider;
