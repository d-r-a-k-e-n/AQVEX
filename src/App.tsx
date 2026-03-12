import ItemCard from "@/components/itemCard";
import { useState, useEffect } from "react";
import { itemService } from "./srvices/itemService";
import type { IItem } from "@/types/item";
import Footer from "@/components/footer";

export default function App() {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    async function getItemInfo() {
      const { data } = await itemService.getInfo();
      setItems(data.products);
    }
    getItemInfo();
  }, []);

  return (
    <main>
      <section className="max-w-[1498px] mx-auto px-6 mb-16">
        <h1 className="text-4xl font-bold text-center mt-10">Aqvex</h1>
        <ul className="flex flex-wrap justify-center gap-5">
          {items?.map(
            ({
              id,
              name,
              price,
              old_price,
              discount_percent,
              currency,
              rating,
              reviews_count,
              in_stock,
              volumes,
              category,
            }) => (
              <ItemCard
                key={id}
                name={name}
                price={price}
                old_price={old_price}
                discount_percent={discount_percent}
                currency={currency}
                rating={rating}
                reviews_count={reviews_count}
                in_stock={in_stock}
                volumes={volumes}
                category={category}
              />
            ),
          )}
        </ul>
      </section>
      <Footer />
    </main>
  );
}
