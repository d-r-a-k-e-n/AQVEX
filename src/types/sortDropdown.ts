export type SortKey = "popularity" | "rating_desc" | "price_asc" | "price_desc";

export type SortDropdownProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

