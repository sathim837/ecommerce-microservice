interface Props {
  value: string;
  onChange: (value: string) => void;
}

function ProductSearch({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none border border-slate-700 focus:border-blue-500"
    />
  );
}

export default ProductSearch;