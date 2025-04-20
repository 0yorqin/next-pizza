import { Container } from "@/components/shared/Container";
import GroupVariants from "@/components/shared/GroupVariants";
import ProductImage from "@/components/shared/ProductImage";
import { Title } from "@/components/shared/Title";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

const ProductModalPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage src={product.imageUrl} alt={product.name} size={40} />

        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>

          <GroupVariants
            selectedValue="2"
            items={[
              {
                name: "Маленькая",
                value: "1",
              },
              {
                name: "Средняя",
                value: "2",
              },
              {
                name: "Большая",
                value: "3",
                disabled: true,
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductModalPage;
