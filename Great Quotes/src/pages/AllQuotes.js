import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

import QouteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
   const {
      sendRequest,
      data: loadedQuotes,
      error,
      status,
   } = useHttp(getAllQuotes, true);

   useEffect(() => {
      sendRequest();
   }, [sendRequest]);

   if (status === "pending") {
      return (
         <div className='centered'>
            <LoadingSpinner />
         </div>
      );
   }

   if (error) {
      return <div className='centered focused'>{error}</div>;
   }

   if (
      status === "completed" &&
      (!loadedQuotes || loadedQuotes.length === 0)
   ) {
      return <NoQuotesFound />;
   }
   return <QouteList quotes={loadedQuotes} />;
};

export default AllQuotes;
