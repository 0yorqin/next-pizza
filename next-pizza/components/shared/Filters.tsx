"use client";

import { Title } from "./Title";
import { Input } from "../ui/input";
import { RangeSlider } from "./RangeSlider";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  className?: string;
};

interface PriceRange {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRange {
  pizzaTypes: string[];
  sizes: string[];
  ingredients: string[];
}

const Filters: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const router = useRouter();
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") || [])
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") || [])
  );

  const [price, setPrice] = useState<PriceRange>({
    priceFrom: searchParams.get("priceFrom")
      ? Number(searchParams.get("priceFrom"))
      : undefined,
    priceTo: searchParams.get("priceTo")
      ? Number(searchParams.get("priceTo"))
      : undefined,
  });

  const setPriceRange = (name: keyof PriceRange, value: number) => {
    setPrice({ ...price, [name]: value });
  };

  useEffect(() => {
    const filters = {
      ...price,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIds),
    };

    const queryString = qs.stringify(filters, { arrayFormat: "comma" });

    router.push(`?${queryString}`, { scroll: false });
  }, [price, sizes, pizzaTypes, selectedIds, router]);

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Новинки и собирать чекбоксы */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Тип теста"
        onChange={togglePizzaTypes}
        selectedIds={pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Размеры"
        onChange={toggleSizes}
        selectedIds={sizes}
        items={[
          { text: "26 см", value: "26" },
          { text: "30 см", value: "30" },
          { text: "34 см", value: "34" },
        ]}
      />

      {/* Ползунок Цена от и до */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={30000}
            value={String(price.priceFrom)}
            className="rounded-full"
            onChange={(e) => setPriceRange("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="5000"
            min={100}
            max={1000}
            className="rounded-full"
            value={String(price.priceTo)}
            onChange={(e) => setPriceRange("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />
      </div>

      {/* Чекбоксы ингредиентов */}
      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={ingredients.slice(0, 6)}
        items={ingredients}
        loading={loading}
        onChange={onAddId}
        selectedIds={selectedIds}
      />
    </div>
  );
};

export default Filters;
