import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
  src: string;
  size?: 20 | 30 | 40;
  alt: string;
}

const sizes = {
  20: 300,
  30: 400,
  40: 500,
} as const;

const ProductImage = ({ className, src, size, alt }: Props) => {
  const productSize = size ? sizes[size] : sizes[20];
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        className="relative left-2 top-2 transition-all z-10 duration-300"
        width={productSize}
        height={productSize}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 w-[370px] h-[370px]" />
    </div>
  );
};

export default ProductImage;
