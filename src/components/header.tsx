import { useEffect, useMemo, useState } from "react";
import BigLogoIcon from "@/assets/icon/big-logo-icon.svg?react";
import SearchIcon from "@/assets/icon/search-icon.svg?react";
import Input from "@/components/input";
import SortDropdown from "@/components/sortDropdown";
import type { SortKey } from "@/types/sortDropdown";
import type { HeaderProps } from "@/types/header";

function useHeaderControls(items: HeaderProps["items"]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("popularity");

  const derivedItems = useMemo(() => {
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
          return (a.price ?? 0) - (b.price ?? 0) || a.name.localeCompare(b.name);
        case "price_desc":
          return (b.price ?? 0) - (a.price ?? 0) || a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [items, searchQuery, sortKey]);

  return { searchQuery, sortKey, setSearchQuery, setSortKey, derivedItems };
}

export default function Header({ items, onItemsChange }: HeaderProps) {
  const { searchQuery, sortKey, setSearchQuery, setSortKey, derivedItems } =
    useHeaderControls(items);

  useEffect(() => {
    onItemsChange(derivedItems);
  }, [derivedItems, onItemsChange]);

  return (
    <>
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
          {derivedItems.length} товаров
        </p>

        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>
    </>
  );
}

