import React from "react";
import { Title } from "./Title";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

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
  return (
    <div className={className}>
      <Title text={title} size="lg" className="font=extrabold mb-5" />

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
