export default function DashboardCard({ title, value, description }) {
  return (
    <div className="sai-card">
      <p className="text-sm text-text-secondary">{title}</p>

      <h3
        className="
        mt-3
        text-3xl
        font-bold
        text-text-primary
      "
      >
        {value}
      </h3>

      <p
        className="
        mt-2
        text-sm
        text-text-muted
      "
      >
        {description}
      </p>
    </div>
  );
}
