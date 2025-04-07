import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { _ingredients, categories, products } from "./constants";
import { Prisma } from "@prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 26 | 30 | 34;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Doe",
        email: "z2b3n@example.com",
        password: hashSync("11111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Doe",
        email: "1V4o7@example.com",
        password: hashSync("11111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперумба пицца",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Ветчинумба пицца",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11ee7d60fda22358ac33c6a44eb093a2.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо йорворизо",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11ee7d61706d472f9a5d71eb94149304.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // pizza 1
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 26 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 26 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 34 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 34 }),

      // pizza 2
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 26 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 26 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 34 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 34 }),

      // pizza 3
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 26 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 26 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 34 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 34 }),

      // other
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "12313",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "21313",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 2,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
