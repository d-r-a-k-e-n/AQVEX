import type React from "react";

export type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  visiblePages: number[];
  totalPages: number;
};

