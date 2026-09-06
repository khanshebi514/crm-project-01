export default function CustomerSelector() {
  return (
    <div>
      <label
        className="
text-sm
font-medium
text-text-secondary
"
      >
        Customer
      </label>

      <input
        type="text"
        placeholder="Search customer (optional)"
        className="
mt-2
w-full
rounded-md
border
border-input-border
px-3
py-2
text-sm
"
      />
    </div>
  );
}
