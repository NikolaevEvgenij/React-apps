import styles from "./MainNavigation.module.css";

import { NavLink } from "react-router-dom/cjs/react-router-dom";

const MainNavigation = () => {
   return (
      <header className={styles.header}>
         <h1 className={styles.logo}>Great Quotes</h1>
         <nav className={styles.nav}>
            <ul>
               <li>
                  <NavLink
                     activeClassName={styles.active}
                     to='/all-quotes'
                  >
                     All Qoutes
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     activeClassName={styles.active}
                     to='/add-quote'
                  >
                     Add Qoute
                  </NavLink>
               </li>
            </ul>
         </nav>
      </header>
   );
};

export default MainNavigation;
