import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";

interface ReturnProps {
  ingredients: { text: string; value: string }[];
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<ReturnProps["ingredients"]>(
    []
  );

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getAll();
        setIngredients(
          ingredients.map((ingredient) => ({
            text: ingredient.name,
            value: String(ingredient.id),
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients };
};
