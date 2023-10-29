import React, { Suspense } from "react";
import {
   Redirect,
   Route,
   Switch,
} from "react-router-dom/cjs/react-router-dom";

import LoadingSpinner from "./components/UI/LoadingSpinner";

import AllQuotes from "./pages/AllQuotes";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";

const AddQuotes = React.lazy(() => import("./pages/AddQuotes"));
const QuoteDitails = React.lazy(() => import("./pages/QuoteDetails"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
   return (
      <>
         <MainNavigation />
         <Layout>
            <Suspense
               fallback={
                  <div className='centered'>
                     <LoadingSpinner />
                  </div>
               }
            >
               <Switch>
                  <Route path='/' exact>
                     <Redirect to='/all-quotes' />
                  </Route>
                  <Route path='/all-quotes' exact>
                     <AllQuotes />
                  </Route>
                  <Route path='/all-quotes/:quoteId'>
                     <QuoteDitails />
                  </Route>
                  <Route path='/add-quote'>
                     <AddQuotes />
                  </Route>

                  <Route path='*'>
                     <NotFound />
                  </Route>
               </Switch>
            </Suspense>
         </Layout>
      </>
   );
}

export default App;
