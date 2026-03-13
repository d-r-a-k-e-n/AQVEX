import type { IItem } from "@/types/item";
import type { SortKey } from "@/types/sortDropdown";

export type HeaderOnItemsChange = (items: IItem[]) => void;

export type HeaderProps = {
  items: IItem[];
  onItemsChange: HeaderOnItemsChange;
};

export type UseHeaderControlsResult = {
  searchQuery: string;
  sortKey: SortKey;
  setSearchQuery: (value: string) => void;
  setSortKey: (value: SortKey) => void;
  derivedItems: IItem[];
};

