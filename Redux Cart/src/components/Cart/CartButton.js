import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

const CartButton = (props) => {
   const totalQuantity = useSelector((state) => state.totalQuantity);
   const dispatch = useDispatch();

   const toggleCart = () => {
      dispatch(cartActions.showCart());
   };

   return (
      <button className={classes.button} onClick={toggleCart}>
         <span>My Cart</span>
         <span className={classes.badge}>{totalQuantity}</span>
      </button>
   );
};

export default CartButton;
