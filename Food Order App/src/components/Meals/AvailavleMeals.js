import { useEffect, useState } from "react";
import Card from "../UI/Card";
import useMeals from "../hooks/useMeals";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
   const { sendRequest, isLoading, error } = useMeals();

   const [availableMeals, setAvailableMeals] = useState([]);

   const fetchAvailableMeals = (meals) => {
      console.log(meals);
      const fetchedMeals = [];
      for (const key in meals) {
         fetchedMeals.push({
            id: meals[key].id,
            name: meals[key].name,
            description: meals[key].description,
            price: meals[key].price,
         });
      }
      setAvailableMeals(fetchedMeals);
   };

   useEffect(() => {
      sendRequest(
         {
            url: "https://meals-app-5ca89-default-rtdb.firebaseio.com/available-meals.json",
         },
         fetchAvailableMeals
      );
   }, [sendRequest]);

   let content = isLoading && (
      <p className={styles.isLoading}>Loading...</p>
   );

   if (error) {
      content = <p className={styles.error}>{error}</p>;
   }

   if (availableMeals.length > 0) {
      content = availableMeals.map((meal) => {
         return (
            <>
               <MealItem
                  key={Math.random().toFixed(6)}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
               />
            </>
         );
      });
   }

   return (
      <section className={styles.meals}>
         <Card>
            <ul>{content}</ul>
         </Card>
      </section>
   );
};

export default AvailableMeals;
