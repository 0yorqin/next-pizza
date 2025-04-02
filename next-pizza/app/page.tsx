import { Container } from "@/components/shared/Container";
import Filters from "@/components/shared/Filters";
import ProductsGroupList from "@/components/shared/ProductsGroupList";
import { Title } from "@/components/shared/Title";
import TopBar from "@/components/shared/TopBar";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="pb-14 mt-9">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Пицца 1",
                    items: [{ price: 100 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 2,
                    name: "Пицца 2",
                    items: [{ price: 200 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 3,
                    name: "Пицца 3",
                    items: [{ price: 300 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 4,
                    name: "Пицца 4",
                    items: [{ price: 400 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 5,
                    name: "Пицца 5",
                    items: [{ price: 500 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 6,
                    name: "Пицца 6",
                    items: [{ price: 600 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                ]}
              />
              <ProductsGroupList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: "Напиток 1",
                    items: [{ price: 100 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 2,
                    name: "Напиток 2",
                    items: [{ price: 200 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 3,
                    name: "Пицца 3",
                    items: [{ price: 300 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 4,
                    name: "Пицца 4",
                    items: [{ price: 400 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 5,
                    name: "Пицца 5",
                    items: [{ price: 500 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                  {
                    id: 6,
                    name: "Напиток 6",
                    items: [{ price: 600 }],
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
