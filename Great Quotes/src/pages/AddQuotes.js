import { useHistory } from "react-router-dom/cjs/react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const AddQuote = () => {
   const { sendRequest, status } = useHttp(addQuote);
   const history = useHistory();

   useEffect(() => {
      if (status === "completed") {
         history.push("/all-quotes");
      }
   }, [history, status]);

   const addQuoteHandler = (quote) => {
      sendRequest(quote);

      history.push("/all-quotes");
   };

   return (
      <>
         <QuoteForm
            isLoading={status === "pending"}
            onAddQuote={addQuoteHandler}
         />
         ;
      </>
   );
};

export default AddQuote;
