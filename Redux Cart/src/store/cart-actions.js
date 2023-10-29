import { cartActions } from "./cart";

export const sendCartData = (cartData) => {
   return async (dispatch) => {
      dispatch(
         cartActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart data!",
         })
      );

      const sendRequest = async () => {
         const response = await fetch(
            "https://redux-products-app-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
            {
               method: "PUT",
               body: JSON.stringify(cartData),
            }
         );

         if (!response.ok) {
            throw new Error("Oops, an error! Sending data failed!");
         }
      };

      try {
         await sendRequest();

         dispatch(
            cartActions.showNotification({
               status: "success",
               title: "Success!",
               message: "The data had send!",
            })
         );
      } catch (error) {
         dispatch(
            cartActions.showNotification({
               status: "error",
               title: "Error!",
               message: error.message,
            })
         );
      }
   };
};

export const getCartData = () => {
   return async (dispatch) => {
      console.log("before fetch");

      const fetchData = async () => {
         const response = await fetch(
            "https://redux-products-app-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
         );

         if (!response.ok) {
            throw new Error("error");
         }

         const data = await response.json();
         console.log(data);
         return data;
      };

      try {
         const cartData = await fetchData();

         dispatch(
            cartActions.loadCart({
               productsArray: cartData.productsArray || [],
               totalQuantity: cartData.totalQuantity,
            })
         );
      } catch (error) {
         dispatch(
            cartActions.showNotification({
               status: "error",
               title: "Error!",
               message: error.message,
            })
         );
      }
   };
};
