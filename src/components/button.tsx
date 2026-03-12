export default function Button({ title, icon }: { title: string; icon?: any }) {
  return (
    <button className="py-3 px-[26px] bg-[#E8F4FF] rounded-2xl font-medium text-[18px] text-[#182A42] cursor-pointer flex gap-3">
      {icon} {title}
    </button>
  );
}
