import React from "react";
import { Title } from "./Title";
import { FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./RangeSlider";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";

type Props = {
  className?: string;
};

const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Новинки и собирать чекбоксы */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* Ползунок Цена от и до */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={30000}
            defaultValue={0}
            className="rounded-full"
          />
          <Input
            type="number"
            placeholder="30000"
            min={1000}
            max={30000}
            className="rounded-full"
          />
        </div>

        <RangeSlider min={0} max={30000} step={10} value={[0, 5000]} />
      </div>

      {/* Чекбоксы ингредиентов */}
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={[
          { text: "Моцарелла", value: "1" },
          { text: "Пепперони", value: "2" },
          { text: "Помидоры", value: "3" },
          { text: "Сыр", value: "4" },
          { text: "Колбаски", value: "5" },
        ]}
        items={[
          { text: "Моцарелла", value: "1" },
          { text: "Пепперони", value: "2" },
          { text: "Помидоры", value: "3" },
          { text: "Сыр", value: "4" },
          { text: "Колбаски", value: "5" },
          { text: "Моцарелла", value: "1" },
          { text: "Пепперони", value: "2" },
          { text: "Помидоры", value: "3" },
          { text: "Сыр", value: "4" },
          { text: "Колбаски", value: "5" },
          { text: "Моцарелла", value: "1" },
        ]}
      />
    </div>
  );
};

export default Filters;
