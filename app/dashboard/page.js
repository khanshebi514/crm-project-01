export default function DashboardPage() {
  return (
    <div>
      <section className="sai-page-header">
        <h2 className="sai-page-title">Business Overview</h2>

        <p className="sai-page-description">
          Track sales, customers, inventory, and daily operations.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Sales" value="0" description="Today's sales" />

        <DashboardCard
          title="Customers"
          value="0"
          description="Total customers"
        />

        <DashboardCard
          title="Products"
          value="0"
          description="Inventory items"
        />

        <DashboardCard title="Stock" value="0" description="Available stock" />
      </section>

      <section className="mt-8">
        <div className="sai-card">
          <h3 className="sai-section-title">Quick Actions</h3>

          <p className="mt-2 text-sm text-text-secondary">
            Sales, inventory and customer modules will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}

function DashboardCard({ title, value, description }) {
  return (
    <div className="sai-card">
      <p className="text-sm text-text-secondary">{title}</p>

      <h3 className="mt-3 text-3xl font-bold text-text-primary">{value}</h3>

      <p className="mt-2 text-sm text-text-muted">{description}</p>
    </div>
  );
}
