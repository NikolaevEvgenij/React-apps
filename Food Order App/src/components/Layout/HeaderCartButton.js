import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
   const cartContext = useContext(CartContext);

   const numberOfCartMeals = cartContext.meals.reduce(
      (curNumber, meal) => {
         return (curNumber = curNumber + meal.amount);
      },
      0
   );

   const [bumpToggle, setBumpToggle] = useState(false);

   let btnClasses = `${styles.button} ${
      bumpToggle ? styles.bump : ""
   }`;

   useEffect(() => {
      if (cartContext.meals.length === 0) {
         return;
      }
      setBumpToggle(true);

      const timeOut = setTimeout(() => {
         setBumpToggle(false);
      }, 300);

      return () => {
         clearTimeout(timeOut);
      };
   }, [cartContext.meals]);

   return (
      <button
         className={btnClasses}
         onClick={props.openCart}
      >
         <span className={styles.icon}>
            <CartIcon />
         </span>
         <span>YourCart</span>
         <span className={styles.badge}>
            {numberOfCartMeals}
         </span>
      </button>
   );
};

export default HeaderCartButton;
