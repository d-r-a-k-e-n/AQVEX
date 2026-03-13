import { useMemo } from "react";
import TwoArrowsIcon from "@/assets/icon/two-arrows-icon.svg?react";
import SmallArrowIcon from "@/assets/icon/small-arrow-icon.svg?react";

export type SortKey = "popularity" | "rating_desc" | "price_asc" | "price_desc";

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  const label = useMemo(() => {
    switch (value) {
      case "popularity":
        return "По популярности";
      case "rating_desc":
        return "По рейтингу";
      case "price_asc":
        return "Сначала дешевле";
      case "price_desc":
        return "Сначала дороже";
    }
  }, [value]);

  return (
    <div className="relative inline-flex items-center gap-2">
      <TwoArrowsIcon width={16} />
      <select
        className="appearance-none bg-transparent pr-6 cursor-pointer font-medium text-[16px] text-[#2d3a4b] outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        aria-label="Sort"
      >
        <option value="popularity">По популярности</option>
        <option value="rating_desc">По рейтингу</option>
        <option value="price_asc">Сначала дешевле</option>
        <option value="price_desc">Сначала дороже</option>
      </select>
      <span className="pointer-events-none absolute right-0 text-[#2d3a4b] text-[12px]">
        <SmallArrowIcon width={10} />
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
