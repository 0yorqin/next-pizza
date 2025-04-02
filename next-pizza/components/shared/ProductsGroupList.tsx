"use client";

import React from "react";
import { useIntersection } from "react-use";
import { Title } from "./Title";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import { useCategoryStore } from "@/store/category";

type Props = {
  title: string;
  items: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
};

const ProductsGroupList = ({
  title,
  items,
  className,
  listClassName,
  categoryId,
}: Props) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  });

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
