import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "./Title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
};

const ProductCard = ({ id, name, price, imageUrl, className }: Props) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image src={imageUrl} alt={name} width={215} height={215} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          Цыпленок, сыр, помидор, оливки, картофель фри
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button
            variant="secondary"
            className="text-base font-bold cursor-pointer"
          >
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
