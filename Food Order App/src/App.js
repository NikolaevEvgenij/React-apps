import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
   const [openCart, setShowCart] = useState(false);

   const openCartHandler = () => {
      setShowCart(true);
   };

   const closeCartHandler = () => {
      setShowCart(false);
   };

   return (
      <CartProvider>
         {openCart && <Cart closeCart={closeCartHandler} />}
         <Header openCart={openCartHandler} />
         <main>
            <Meals />
         </main>
      </CartProvider>
   );
}

export default App;
