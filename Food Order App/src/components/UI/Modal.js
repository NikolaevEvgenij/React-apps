import styles from "./Modal.module.css";

import { createPortal } from "react-dom";

const Modal = (props) => {
   return createPortal(
      <>
         <div
            className={styles.backdrop}
            onClick={props.closeCart}
         ></div>
         <div className={styles["modal"]}>
            <div className={styles.content}>
               {props.children}
            </div>
         </div>
      </>,
      document.getElementById("portal")
   );
};

export default Modal;
