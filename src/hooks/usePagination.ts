import { useState, useEffect, useMemo } from "react";

export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  maxVisiblePages: number,
) {
  const [page, setPage] = useState(1);

  const ITEM_LENGTH = items.length;
  const totalPages = Math.ceil(ITEM_LENGTH / itemsPerPage) || 1;

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  const visiblePages = useMemo(() => {
    const half = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(page - half, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return pages.slice(startPage - 1, endPage);
  }, [maxVisiblePages, page, pages, totalPages]);

  const paginatedItems = useMemo(
    () => items.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [items, itemsPerPage, page],
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return {
    page,
    setPage,
    visiblePages,
    totalPages,
    paginatedItems,
  };
}
