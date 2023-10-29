import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
   const productsArray = useSelector((state) => state.productsArray);

   const productsContent = productsArray.map((product) => {
      return (
         <CartItem
            key={product.id}
            item={{
               id: product.id,
               title: product.title,
               quantity: product.quantity,
               total: product.total,
               price: product.price,
            }}
         />
      );
   });

   return (
      <Card className={classes.cart}>
         <h2>Your Shopping Cart</h2>
         <ul>{productsContent}</ul>
      </Card>
   );
};

export default Cart;
