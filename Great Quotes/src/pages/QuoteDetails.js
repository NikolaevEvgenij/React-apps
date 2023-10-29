import {
   Route,
   useParams,
   Link,
   useRouteMatch,
} from "react-router-dom/cjs/react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDitails = () => {
   const match = useRouteMatch();
   const qouteParams = useParams();

   const { quoteId } = qouteParams;

   const {
      data: loadedQuote,
      status,
      error,
      sendRequest,
   } = useHttp(getSingleQuote, true);

   useEffect(() => {
      sendRequest(quoteId);
   }, [sendRequest, quoteId]);

   if (status === "pending") {
      return (
         <div className='centered'>
            <LoadingSpinner />
         </div>
      );
   }

   if (error) {
      return <div className='cerntered'>{error}</div>;
   }

   if (!loadedQuote.text) {
      return <p>No quote found!!</p>;
   }
   return (
      <>
         <HighlightedQuote
            text={loadedQuote.text}
            author={loadedQuote.author}
         />

         <Route path={match.path} exact>
            <div className='centered'>
               <Link
                  className='btn--flat'
                  to={`${match.url}/comments`}
               >
                  Load Comments
               </Link>
            </div>
         </Route>
         <Route path={`${match.path}/comments`}>
            <Comments />
         </Route>
      </>
   );
};

export default QuoteDitails;
