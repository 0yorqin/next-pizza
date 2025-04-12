"use client";

import { Title } from "./Title";
import { Input } from "../ui/input";
import { RangeSlider } from "./RangeSlider";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { useFilters, useIngredients, useQueryFilters } from "@/hooks";

type Props = {
  className?: string;
};

const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  const {
    pizzaTypes,
    setPizzaTypes,
    sizes,
    setSizes,
    price,
    setPriceRange,
    setIngredients,
    selectedIngredients,
  } = filters;

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    setPriceRange("priceFrom", prices[0]);
    setPriceRange("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Новинки и собирать чекбоксы */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Тип теста"
        onChange={setPizzaTypes}
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
        onChange={setSizes}
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
          onValueChange={updatePrices}
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
        onChange={setIngredients}
        selectedIds={selectedIngredients}
      />
    </div>
  );
};

export default Filters;
