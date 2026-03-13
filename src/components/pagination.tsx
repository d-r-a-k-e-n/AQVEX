import ArrowIcon from "@/assets/icon/arrow-icon.svg?react";

function PaginationItem({
  number,
  isActive,
  onClick,
}: {
  number: number;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center w-11 h-11 p-4 font-bold text-[16px] cursor-pointer ${isActive && "border border-[#43A0FD] rounded-2xl"}`}
    >
      {number}
    </div>
  );
}

export default function Pagination({
  page,
  setPage,
  visiblePages,
  totalPages,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  visiblePages: number[];
  totalPages: number;
}) {
  return (
    visiblePages?.length !== 1 && (
      <div className="flex items-center justify-center gap-3">
        <button
          className="cursor-pointer"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ArrowIcon width={24} />
        </button>

        {visiblePages.map((p) => (
          <PaginationItem
            key={p}
            number={p}
            isActive={page === p}
            onClick={() => setPage(p)}
          />
        ))}

        <button
          className="cursor-pointer"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <ArrowIcon className="rotate-180" width={24} />
        </button>
      </div>
    )
  );
}
