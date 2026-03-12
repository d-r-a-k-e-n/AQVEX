export default function Selector({
  volumes,
}: {
  volumes?: {
    id: string;
    label: string;
    in_stock: boolean;
  }[];
}) {
  return (
    <select className="py-4 px-5 border rounded-2xl border-[#EBEBEB] text-[18px] font-medium">
      {volumes?.map(({ id, label }) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </select>
  );
}
