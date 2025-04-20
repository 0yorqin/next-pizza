import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";

type ReturnProps = {
  ingredients: { name: string; id: string }[];
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
            name: ingredient.name,
            id: String(ingredient.id),
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
