import ItemCard from "@/components/itemCard";
import { useEffect, useMemo, useState } from "react";
import { itemService } from "./srvices/itemService";
import type { IItem } from "@/types/item";
import BigLogoIcon from "@/assets/icon/big-logo-icon.svg?react";
import SearchIcon from "@/assets/icon/search-icon.svg?react";
import Footer from "@/components/footer";
import Input from "@/components/input";
import Pagination from "@/components/pagination";
import { usePagination } from "@/hooks/usePagination";
import SortDropdown, { type SortKey } from "@/components/sortDropdown";

export default function App() {
  const [items, setItems] = useState<IItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("popularity");

  const ITEMS_PER_PAGE = 9;
  const MAX_VISIBLE_PAGES = 5;

  const filteredAndSortedItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = q
      ? items.filter((i) => i.name.toLowerCase().includes(q))
      : items;

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (sortKey) {
        case "popularity":
          return (
            (b.reviews_count ?? 0) - (a.reviews_count ?? 0) ||
            (b.rating ?? 0) - (a.rating ?? 0) ||
            a.name.localeCompare(b.name)
          );
        case "rating_desc":
          return (
            (b.rating ?? 0) - (a.rating ?? 0) ||
            (b.reviews_count ?? 0) - (a.reviews_count ?? 0) ||
            a.name.localeCompare(b.name)
          );
        case "price_asc":
          return (
            (a.price ?? 0) - (b.price ?? 0) || a.name.localeCompare(b.name)
          );
        case "price_desc":
          return (
            (b.price ?? 0) - (a.price ?? 0) || a.name.localeCompare(b.name)
          );
      }
    });

    return sorted;
  }, [items, searchQuery, sortKey]);

  const ITEM_LENGTH = filteredAndSortedItems.length;

  const { page, setPage, visiblePages, totalPages, paginatedItems } =
    usePagination(filteredAndSortedItems, ITEMS_PER_PAGE, MAX_VISIBLE_PAGES);

  useEffect(() => {
    async function getItemInfo() {
      const { data } = await itemService.getInfo();
      setItems(data.products);
    }
    getItemInfo();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortKey, setPage]);

  return (
    <main>
      <section className="max-w-[1498px] mx-auto px-6 mb-16">
        <BigLogoIcon width={187} className="mt-8 mb-4" />
        <div className="flex justify-end mb-5">
          <Input
            label="Поиск"
            icon={<SearchIcon width={20} />}
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <div className="flex gap-2 items-center justify-between mb-5">
          <p className="text-[16px] font-medium text-[#8090A4]">
            {ITEM_LENGTH} товаров
          </p>

          <SortDropdown value={sortKey} onChange={setSortKey} />
        </div>

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
