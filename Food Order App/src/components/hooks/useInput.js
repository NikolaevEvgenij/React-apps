import { useReducer } from "react";

const useInput = (validateValue) => {
   const initialInputState = {
      value: "",
      isTuched: false,
   };

   const inputReduser = (state, action) => {
      if (action.type === "VALUE") {
         return {
            value: action.value,
            isTuched: state.isTuched,
         };
      }
      if (action.type === "BLUR") {
         return {
            value: state.value,
            isTuched: true,
         };
      }
      if (action.type === "RESET") {
         return { value: "", isTuched: false };
      }
      return initialInputState;
   };

   const [inputState, dispatch] = useReducer(
      inputReduser,
      initialInputState
   );

   const enteredValueIsValid = validateValue(
      inputState.value
   );
   const inputIsInvalid =
      !enteredValueIsValid && inputState.isTuched;

   const inputChangeHandler = (event) => {
      dispatch({
         type: "VALUE",
         value: event.target.value,
      });
   };

   const inputBlurHandler = () => {
      dispatch({ type: "BLUR" });
   };

   const reset = () => {
      dispatch({ type: "RESET" });
   };

   return {
      enteredValue: inputState.value,
      enteredValueIsValid,
      inputIsInvalid,
      inputChangeHandler,
      inputBlurHandler,
      reset,
   };
};

export default useInput;
