import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, getCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
   const showCart = useSelector((state) => state.showCart);
   const productsArray = useSelector((state) => state.productsArray);
   const totalQuantity = useSelector((state) => state.totalQuantity);
   const dispatch = useDispatch();
   const notification = useSelector((state) => state.notification);
   const changed = useSelector((state) => state.changed);

   useEffect(() => {
      dispatch(getCartData());
   }, []);

   useEffect(() => {
      if (isInitial) {
         isInitial = false;
         return;
      }

      if (changed) {
         dispatch(sendCartData({ productsArray, totalQuantity }));
      }
   }, [productsArray, totalQuantity, dispatch, changed]);

   return (
      <>
         {notification && (
            <Notification
               status={notification.status}
               title={notification.title}
               message={notification.message}
            />
         )}
         <Layout>
            {showCart && <Cart />}
            <Products />
         </Layout>
      </>
   );
}

export default App;
