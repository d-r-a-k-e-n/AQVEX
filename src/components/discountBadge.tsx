export default function DiscountBadge({ percent }: { percent: number }) {
  return (
    <div className="relative w-[44px] h-[18px]">
      <div
        className="
            w-full
            h-full
            bg-red-500
            text-white
            text-[12px]
            font-bold
            flex
            items-center
            justify-end
            pr-[2px]
            rounded-[2px]
          "
        style={{
          clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 6% 50%)",
        }}
      >
        {percent}%
      </div>

      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
    </div>
  );
}
