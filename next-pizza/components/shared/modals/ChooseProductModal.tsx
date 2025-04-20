import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}

const ChooseProductModal = ({ product, className }: Props) => {
  return (
    <Dialog>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogTitle>{product.name}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
