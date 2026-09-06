export default function BusinessAlerts() {
  const alerts = [
    {
      title: "Pending Payments",
      description: "Customers with pending dues need attention.",
    },

    {
      title: "Low Stock",
      description: "Some products may require restocking.",
    },

    {
      title: "Business Updates",
      description: "Important activities will appear here.",
    },
  ];

  return (
    <section className="mt-8">
      <div className="sai-card">
        <h3 className="sai-section-title">Needs Attention</h3>

        <div className="mt-4 space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.title}
              className="
                rounded-lg
                border
                border-border
                bg-surface-secondary
                p-4
              "
            >
              <p
                className="
                font-medium
                text-text-primary
              "
              >
                {alert.title}
              </p>

              <p
                className="
                mt-1
                text-sm
                text-text-secondary
              "
              >
                {alert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
