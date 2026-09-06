export default function RecentActivity() {
  const activities = [
    {
      title: "Sale Completed",
      description: "Recent sales activity will appear here.",
    },

    {
      title: "Payment Received",
      description: "Customer payments will appear here.",
    },

    {
      title: "Stock Updated",
      description: "Inventory changes will appear here.",
    },
  ];

  return (
    <section className="mt-8">
      <div className="sai-card">
        <h3 className="sai-section-title">Recent Activity</h3>

        <div className="mt-4 space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="
                rounded-lg
                border
                border-border
                p-4
              "
            >
              <p
                className="
                font-medium
                text-text-primary
              "
              >
                {activity.title}
              </p>

              <p
                className="
                mt-1
                text-sm
                text-text-secondary
              "
              >
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
