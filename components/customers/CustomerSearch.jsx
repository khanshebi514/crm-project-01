export default function CustomerSearch({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search customer..."
      className="
      w-full
      rounded-md
      border
      border-input-border
      px-4
      py-2
      text-sm
      "
    />
  );
}
