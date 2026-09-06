import DashboardCard from "./DashboardCard";

export default function BusinessOverview() {
  return (
    <section
      className="
      grid
      gap-6
      md:grid-cols-2
      xl:grid-cols-4
    "
    >
      <DashboardCard title="Sales" value="Rs 0" description="Today's sales" />

      <DashboardCard title="Profit" value="Rs 0" description="Today's profit" />

      <DashboardCard
        title="Received"
        value="Rs 0"
        description="Money collected"
      />

      <DashboardCard
        title="Due Amount"
        value="Rs 0"
        description="Pending payments"
      />
    </section>
  );
}
