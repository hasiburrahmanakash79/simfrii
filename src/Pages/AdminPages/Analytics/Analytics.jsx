import { TrendingDown, TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useAdminAnalytics from "../../../components/adminHook/useAdminAnalytics";

/* -------------------- Helpers -------------------- */

const getGrowthUI = (status) => {
  switch (status) {
    case "increase":
      return {
        color: "text-green-600",
        Icon: TrendingUp,
      };
    case "decrease":
      return {
        color: "text-red-600",
        Icon: TrendingDown,
      };
    default:
      return {
        color: "text-gray-600",
        Icon: null,
      };
  }
};

const COLORS = {
  countries: "#FF6B8A",
  regions: "#FFE066",
  global: "#4F8EF7",
};

/* -------------------- Component -------------------- */

const Analytics = () => {
  const { adminAnalytics, loading } = useAdminAnalytics();

  if (loading) {
    return <div className="text-sm text-gray-500">Loading analytics...</div>;
  }

  const summary = adminAnalytics?.summary || {};
  const performance = adminAnalytics?.plan_performance || {};
  const usage = adminAnalytics?.plan_usage || {};

  /* ---------- Stats ---------- */

  const stats = [
    {
      title: "Total Revenue",
      value: `$${summary.total_earning ?? 0}`,
      growth: summary.earning_growth_percent,
      comparison: "vs last month",
    },
    {
      title: "Active Earning",
      value: summary.paid_earning ?? 0,
      growth: summary.paid_growth_percent,
      comparison: "vs last month",
    },
    {
      title: "Total Cancel",
      value: summary.total_failed ?? 0,
      growth: summary.failed_growth_percent,
      comparison: "From last month",
    },
  ];

  /* ---------- Charts ---------- */

  const planPerformanceData = Object.entries(performance).map(
    ([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: Number(value.toFixed(2)),
      color: COLORS[key],
    })
  );

  const planUsageData = Object.entries(usage).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    percentage: Number(value.toFixed(2)),
    color: COLORS[key],
  }));

  /* -------------------- UI -------------------- */

  return (
    <div>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium mb-2">
          Analytics
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Track, manage, and forecast your customers and orders.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {stats.map((stat, index) => {
          const growth = stat.growth || {};
          const { color, Icon } = getGrowthUI(growth.status);

          return (
            <div
              key={index}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200"
            >
              <h3 className="text-xs sm:text-sm font-medium text-gray-600">
                {stat.title}
              </h3>

              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mt-2">
                {stat.value}
              </p>

              <div className={`flex items-center mt-1 text-xs sm:text-sm ${color}`}>
                {Icon && <Icon className="w-4 h-4 mr-1" />}
                <span>{growth.growth_percent ?? 0}%</span>
                <span className="text-gray-500 ml-1">{stat.comparison}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Plan Performance */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              Plan Performance
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Last month performance
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planPerformanceData}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    dataKey="value"
                  >
                    {planPerformanceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              {planPerformanceData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs sm:text-sm text-gray-600">
                    {item.name} - {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan Usage */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-2">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              Plan Usage
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Plan usage over last month
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {planUsageData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    {item.name}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-900 font-semibold">
                    {item.percentage}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                  <div
                    className="h-2 sm:h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
