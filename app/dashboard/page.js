import BusinessOverview from "@/components/dashboard/BusinessOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import BusinessAlerts from "@/components/dashboard/BusinessAlerts";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="sai-page-header">
        <p className="sai-page-description">
          Manage your daily business activities quickly and easily.
        </p>
      </section>

      {/* Business Overview */}
      <section>
        <BusinessOverview />
      </section>

      {/* Quick Actions */}
      <section>
        <QuickActions />
      </section>

      {/* Alerts */}
      <section>
        <BusinessAlerts />
      </section>

      {/* Recent Activity */}
      <section>
        <RecentActivity />
      </section>
    </div>
  );
}
