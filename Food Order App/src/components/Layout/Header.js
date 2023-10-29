import mealsImage from "../../assets/meals.jpg";
import styles from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
   return (
      <>
         <header className={styles.header}>
            <h1>React Meals</h1>
            <HeaderCartButton openCart={props.openCart} />
         </header>
         <div className={styles.image}>
            <img
               src={mealsImage}
               alt='A table full of meals'
            />
         </div>
      </>
   );
};

export default Header;
