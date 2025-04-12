import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";

type ReturnProps = {
  ingredients: { text: string; value: string }[];
  loading: boolean;
};

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<ReturnProps["ingredients"]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(
          ingredients.map((ingredient) => ({
            text: ingredient.name,
            value: String(ingredient.id),
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
