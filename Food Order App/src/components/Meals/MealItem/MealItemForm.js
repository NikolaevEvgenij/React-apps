import styles from "./MealItemForm.module.css";

import { useRef, useState } from "react";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
   const [isValid, setIsValid] = useState(true);

   const amountInputRef = useRef();

   const submitHandler = (event) => {
      event.preventDefault();

      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;

      if (
         enteredAmount.trim().length === 0 ||
         enteredAmountNumber < 1 ||
         enteredAmountNumber > 5
      ) {
         setIsValid(false);
         return;
      }

      props.onAddToCart(enteredAmountNumber);
   };

   return (
      <form
         className={styles.form}
         onSubmit={submitHandler}
      >
         <Input
            ref={amountInputRef}
            label='Amount'
            input={{
               id: "amount",
               type: "number",
               min: "1",
               max: "5",
               step: "1",
               defaultValue: "1",
            }}
         />
         <button type='submit'>Add</button>
         {!isValid && <p>Not valid number (1-5)</p>}
      </form>
   );
};

export default MealItemForm;
