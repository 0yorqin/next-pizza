import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";

type Props = {
  className?: string;
};

const SortPopup: React.FC<Props> = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
        className
      )}
    >
      <ArrowUpDown size={16} />
      <div className="max-md:hidden">
        <b>Сортировка</b>
        <b className="text-primary">популярное</b>
      </div>
    </div>
  );
};

export default SortPopup;
