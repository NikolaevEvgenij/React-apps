import styles from "./CartMeal.module.css";

const CartMeal = (props) => {
   return (
      <li key={props.id} className={styles["cart-item"]}>
         <div>
            <h2>{props.meal.name}</h2>
            <div className={styles.summary}>
               <span className={styles.price}>
                  {props.meal.price}
               </span>
               <span className={styles.amount}>
                  x {props.meal.amount}
               </span>
            </div>
         </div>
         <div className={styles.actions}>
            <button onClick={props.onRemove}>-</button>
            <button onClick={props.onAdd}>+</button>
         </div>
      </li>
   );
};

export default CartMeal;
