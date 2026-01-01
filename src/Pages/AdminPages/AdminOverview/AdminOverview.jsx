import DashboardCard from "./DashboardCard";
import SectionTitle from "../../../components/SectionTitle";
import RevenueCharts from "./RevenueCharts";
import useAdminOverview from "../../../components/adminHook/useAdminOverview";

const AdminOverview = () => {
  const { overview, loading } = useAdminOverview();
  console.log(overview);

  return (
    <div>
      <SectionTitle
        title={"Admin Overview"}
        description={"Track, manage and forecast your customers and orders."}
      />
      <DashboardCard dashboardData={overview.summary} loading={loading} />
      <RevenueCharts barChartData={overview.monthly_revenue} pieChartData={overview.earning_activity} loading={loading}  />
    </div> 
  );
};

export default AdminOverview;
