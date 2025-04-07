"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

type Props = {
  className?: string;
};

const SearchInput = ({ className }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      const response = await Api.products.search(searchQuery);
      setProducts(response);
    },
    200,
    [searchQuery]
  );

  const handleClick = () => {
    setFocused(false);
    setSearchQuery("");
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30 backdrop-blur-xs opacity-50" />
      )}
      <div
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
        ref={ref}
      >
        <Search className="absolute  top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Найти..."
          className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              className="px-3 py-2 transition hover:bg-primary/10 cursor-pointer flex items-center gap-2"
              href={`/product/${product.id}`}
              onClick={handleClick}
            >
              <Image
                src={product.imageUrl}
                width={32}
                height={32}
                alt="product"
              />
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchInput;
