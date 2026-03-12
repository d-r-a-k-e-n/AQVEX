import img from "@/assets/img/img-card.png";
import type { IItem } from "@/types/item";
import Button from "@/components/button";
import Selector from "@/components/selector";
import DiscountBadge from "./discountBadge";
import StockIcon from "@/assets/icon/stock-icon.svg?react";
import NotStockIcon from "@/assets/icon/not-stock-icon.svg?react";
import DropIcon from "@/assets/icon/drop-icon.svg?react";
import CartIcon from "@/assets/icon/cart-icon.svg?react";

export default function ItemCard({
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
}: IItem) {
  const maxStars = 5;
  const safeRating = Math.min(Math.max(Math.round(rating), 0), maxStars);

  return (
    <li className="max-w-[347px] flex flex-col gap-3">
      <img className="rounded-2xl" src={img} alt={"item: " + name} />
      <div className="flex items-center gap-2">
        {old_price && (
          <p className="line-through decoration-[#FF2741] decoration-2 text-[22px] text-[#8090A4]">
            {old_price}
          </p>
        )}
        <p className="font-medium text-[22px] bg-linear-to-r from-[#003181] to-[#2288ED] bg-clip-text text-transparent">
          {price} {currency}
        </p>
        {discount_percent && <DiscountBadge percent={+discount_percent!} />}
      </div>

      <p className="font-medium text-[#182A42] text-[18px] line-clamp-2">
        {name}
      </p>

      <p className="text-[14px]">
        <span className="text-[#43A0FD]">{"★".repeat(safeRating)}</span>{" "}
        {reviews_count}
      </p>

      <div className="flex gap-3 text-[14px]">
        <p className="flex items-center gap-2">
          {in_stock ? (
            <>
              <StockIcon width={16} />В наличии
            </>
          ) : (
            <>
              <NotStockIcon width={16} />
              Нет в наличии
            </>
          )}
        </p>

        <div className="flex items-center gap-2">
          <DropIcon width={9} height={11} />
          <p className="text-[#8090A4]">{category}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Selector volumes={volumes} />
        <Button icon={<CartIcon width={26} />} title="В корзину" />
      </div>
    </li>
  );
}
