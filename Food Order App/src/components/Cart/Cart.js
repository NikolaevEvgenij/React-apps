import styles from "./Cart.module.css";

import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartMeal from "./CartMeal";
import Checkout from "./Checkout";
import useMeals from "../hooks/useMeals";

const Cart = (props) => {
   const [showForm, setShowForm] = useState(false);
   const [didSubmit, setDidSubmit] = useState(false);
   const [userData, setUserData] = useState({});

   const {
      sendRequest: submitOrder,
      isLoading,
      error,
   } = useMeals();

   const cartContext = useContext(CartContext);

   const totalAmount = `$${cartContext.totalAmount.toFixed(
      2
   )}`;

   const hasItems = cartContext.meals.length > 0;

   const cartItemRemove = (id) => {
      cartContext.removeMeal(id);
   };

   const cartItemAdd = (meal) => {
      cartContext.addMeal({ ...meal, amount: 1 });
   };

   const showFormHandler = () => {
      setShowForm(true);
   };

   const getData = (user) => {
      setUserData(user);
   };

   console.log(userData);

   const didSubmitFn = (meals) => {
      if (meals) {
         setDidSubmit(true);
         cartContext.clearCart();
      }
   };

   const confirmHandler = (event) => {
      event.preventDefault();
      submitOrder(
         {
            url: "https://meals-app-5ca89-default-rtdb.firebaseio.com/orders.json",
            method: "POST",
            Headers: {
               "Content-Type": "application/json",
            },
            body: {
               meals: cartContext.meals,
               totalAmount: cartContext.totalAmount,
               user: userData,
            },
         },
         didSubmitFn
      );
   };

   const cartMeals = (
      <ul className={styles["cart-items"]}>
         {cartContext.meals.map((meal) => {
            return (
               <CartMeal
                  meal={meal}
                  onRemove={cartItemRemove.bind(
                     null,
                     meal.id
                  )}
                  onAdd={cartItemAdd.bind(null, meal)}
               />
            );
         })}
      </ul>
   );

   const modalActions = (
      <div className={styles.actions}>
         <button
            onClick={props.closeCart}
            className={styles["button--alt"]}
         >
            Close
         </button>
         {hasItems && (
            <button
               className={styles.button}
               onClick={showFormHandler}
            >
               Submit
            </button>
         )}
      </div>
   );

   const cartModalContent = (
      <>
         {cartMeals}
         <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>

         {showForm && (
            <Checkout
               onCancel={props.closeCart}
               onComfirm={confirmHandler}
               sendData={getData}
            />
         )}
         {!showForm && modalActions}
      </>
   );

   const isSubmittingModalContent = (
      <p>Submitting your order...</p>
   );

   const isSubmittingError = (
      <>
         <p>{error}</p>;
         <div className={styles.actions}>
            <button
               onClick={props.closeCart}
               className={styles.button}
            >
               Close
            </button>
         </div>
      </>
   );

   const didSubmitModalContent = (
      <>
         <p>
            Thank you for your order! We will contact you
            soon to confirm the order!
         </p>
         <div className={styles.actions}>
            <button
               onClick={props.closeCart}
               className={styles.button}
            >
               Close
            </button>
         </div>
      </>
   );

   return (
      <Modal closeCart={props.closeCart}>
         {!isLoading &&
            !didSubmit &&
            !error &&
            cartModalContent}
         {isLoading && isSubmittingModalContent}
         {error && isSubmittingError}
         {didSubmit && didSubmitModalContent}
      </Modal>
   );
};

export default Cart;
