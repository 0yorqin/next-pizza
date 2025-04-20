import { useSearchParams } from "next/navigation";

import { useState } from "react";
import { useSet } from "react-use";

interface PriceRange {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceRange {
  pizzaTypes: string[];
  sizes: string[];
  ingredients: string[];
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  price: PriceRange;
}

interface ReturnProps extends Filters {
  setPriceRange: (name: keyof PriceRange, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setIngredients: (value: string) => void;
  setPrice: (value: PriceRange) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  // Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") || [])
  );

  // Фильтр размеров
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") || [])
  );

  // Фильтр типа пиццы
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") || [])
  );

  // Предел цены
  const [price, setPrice] = useState<PriceRange>({
    priceFrom: searchParams.get("priceFrom")
      ? Number(searchParams.get("priceFrom"))
      : undefined,
    priceTo: searchParams.get("priceTo")
      ? Number(searchParams.get("priceTo"))
      : undefined,
  });

  const setPriceRange = (name: keyof PriceRange, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    price,
    setPrice,
    setPriceRange,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setIngredients: toggleIngredients,
  };
};
