import type { InputProps } from "@/types/input";

export default function Input({ label, icon, value, onChange }: InputProps) {
    return (
      <div className="relative flex items-center w-full max-w-md">
        {icon && <div className="absolute left-4 text-slate-700">{icon}</div>}
        <input
          className="w-full py-3 pl-12 pr-4 bg-[#f1f3f6] text-[#2d3a4b] text-[18px] rounded-2xl outline-none placeholder:text-[#2d3a4b] transition-all focus:ring-2 focus:ring-blue-200"
          type="text"
          placeholder={label}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    );
  }
  