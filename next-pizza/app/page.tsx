import { Container } from "@/components/shared/Container";
import Filters from "@/components/shared/Filters";
import ProductCard from "@/components/shared/ProductCard";
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
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16"></div>
          </div>
        </div>
      </Container>
    </>
  );
}
