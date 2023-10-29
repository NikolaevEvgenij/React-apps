import { useCallback, useState } from "react";

const useMeals = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const sendRequest = useCallback(
      async (requestSettings, applyData) => {
         setIsLoading(true);
         setError(null);

         try {
            const response = await fetch(
               requestSettings.url,
               {
                  method: requestSettings.method
                     ? requestSettings.method
                     : "GET",
                  headers: requestSettings.headers
                     ? requestSettings.headers
                     : {},
                  body: requestSettings.body
                     ? JSON.stringify(requestSettings.body)
                     : null,
               }
            );
            if (!response.ok) {
               throw new Error("Something went wrong!");
            }
            const data = await response.json();
            console.log(data);
            applyData(data);
         } catch (error) {
            setError(error.message);
         }
         setIsLoading(false);
      },
      []
   );

   return { sendRequest, isLoading, error };
};

export default useMeals;
