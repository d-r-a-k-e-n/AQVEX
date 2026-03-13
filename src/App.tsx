import ItemCard from "@/components/itemCard";
import { useCallback, useEffect, useState } from "react";
import { itemService } from "./srvices/itemService";
import type { IItem } from "@/types/item";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination";
import { usePagination } from "@/hooks/usePagination";
import Header from "@/components/header";

export default function App() {
  const [items, setItems] = useState<IItem[]>([]);
  const [derivedItems, setDerivedItems] = useState<IItem[]>([]);

  const ITEMS_PER_PAGE = 9;
  const MAX_VISIBLE_PAGES = 5;

  const { page, setPage, visiblePages, totalPages, paginatedItems } =
    usePagination(derivedItems, ITEMS_PER_PAGE, MAX_VISIBLE_PAGES);

  useEffect(() => {
    async function getItemInfo() {
      const { data } = await itemService.getInfo();
      setItems(data.products);
    }
    getItemInfo();
  }, []);

  useEffect(() => {
    setDerivedItems(items);
  }, [items]);

  const handleHeaderItemsChange = useCallback(
    (nextItems: IItem[]) => {
      setDerivedItems(nextItems);
      setPage(1);
    },
    [setPage],
  );

  return (
    <main>
      <section className="max-w-[1498px] mx-auto px-6 mb-16">
        <Header items={items} onItemsChange={handleHeaderItemsChange} />

        <ul className="flex flex-wrap justify-center gap-5">
          {paginatedItems?.map(
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

      <Pagination
        page={page}
        setPage={setPage}
        visiblePages={visiblePages}
        totalPages={totalPages}
      />

      <Footer />
    </main>
  );
}
