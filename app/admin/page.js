export default function AdminPage() {
  return (
    <div>
      <section className="sai-page-header">
        <h2 className="sai-page-title">Platform Overview</h2>

        <p className="sai-page-description">
          Monitor users, tenants, subscriptions, and platform activity.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Users"
          value="0"
          description="Registered platform users"
        />

        <AdminStatCard
          title="Tenants"
          value="0"
          description="Active business accounts"
        />

        <AdminStatCard
          title="Subscriptions"
          value="0"
          description="Active subscriptions"
        />

        <AdminStatCard title="Plans" value="0" description="Available plans" />
      </section>

      <section className="mt-8">
        <div className="sai-card">
          <h3 className="sai-section-title">Platform Management</h3>

          <p className="mt-2 text-sm text-text-secondary">
            Admin modules will appear here: users, tenants, billing, plans and
            audit logs.
          </p>
        </div>
      </section>
    </div>
  );
}

function AdminStatCard({ title, value, description }) {
  return (
    <div className="sai-card">
      <p className="text-sm text-text-secondary">{title}</p>

      <h3 className="mt-3 text-3xl font-bold text-text-primary">{value}</h3>

      <p className="mt-2 text-sm text-text-muted">{description}</p>
    </div>
  );
}
