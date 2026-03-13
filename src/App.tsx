import ItemCard from "@/components/itemCard";
import { useState, useEffect } from "react";
import { itemService } from "./srvices/itemService";
import type { IItem } from "@/types/item";
import BigLogoIcon from "@/assets/icon/big-logo-icon.svg?react";
import SearchIcon from "@/assets/icon/search-icon.svg?react";
import Footer from "@/components/footer";
import Input from "@/components/input";
import Pagination from "@/components/pagination";
import { usePagination } from "@/hooks/usePagination";

export default function App() {
  const [items, setItems] = useState<IItem[]>([]);

  const ITEM_LENGTH = items.length;
  const ITEMS_PER_PAGE = 9;
  const MAX_VISIBLE_PAGES = 5;

  const { page, setPage, visiblePages, totalPages, paginatedItems } =
    usePagination(items, ITEMS_PER_PAGE, MAX_VISIBLE_PAGES);

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
        <BigLogoIcon width={187} className="mt-8 mb-4" />
        <div className="flex justify-end">
          <Input label="Поиск" icon={<SearchIcon width={20} />} />
        </div>

        <p className="text-[16px] font-medium text-[#8090A4]">
          {ITEM_LENGTH} товаров
        </p>
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
