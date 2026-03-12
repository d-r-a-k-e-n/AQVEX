import SmallLogoIcon from "@/assets/icon/small-logo-icon.svg?react";
import MadeInUkraineIcon from "@/assets/icon/made-in-ukraine-icon.svg?react";
import MasteCardIcon from "@/assets/icon/master-card-icon.svg?react";
import VisaIcon from "@/assets/icon/visa-icon.svg?react";
import ApplePayIcon from "@/assets/icon/apple-pay-icon.svg?react";
import GooglePayIcon from "@/assets/icon/google-pay-icon.svg?react";

export default function Footer() {
  return (
    <footer className="max-w-[1498px] mx-auto px-6 flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {" "}
          <SmallLogoIcon width={40} />
          <MadeInUkraineIcon width={58} height={40} />
        </div>
        <p className="text-[#8090A4] text-[14px]">
          AQVEX &copy; {new Date().getFullYear()} | Все права защищены
        </p>
      </div>

      <div className="flex gap-10 items-center">
        <MasteCardIcon width={65} />
        <VisaIcon width={55} />
        <ApplePayIcon width={46} />
        <GooglePayIcon width={48} />
      </div>
    </footer>
  );
}
