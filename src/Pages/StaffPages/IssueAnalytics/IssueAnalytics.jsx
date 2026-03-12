import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useStaffAnalytics from "../../../components/staffHook/useStaffAnalytics";
import SectionTitle from "../../../components/SectionTitle";

const IssueAnalytics = () => {
  const {analytics, loading} = useStaffAnalytics();
  if (loading) {
    return <div>Loading...</div>;
  }
console.log(analytics);
  const openTickets = analytics.summary?.total_tickets;
  const pendingTickets = analytics.summary?.pending_this_month;
  const totalSolved = analytics.summary?.solved_this_month;
  const totalThisMonth = analytics.summary?.total_this_month;

  const getChange = (growth) => {
    return growth?.growth_percent === 0 ? null : `${growth?.growth_percent}%`;
  };

  const getChangeType = (status) => {
    if (status === "no_change") return null;
    return status;
  };

  const stats = [
    {
      title: "Total Tickets",
      value: openTickets,
      change: getChange(analytics?.summary?.open_growth),
      changeType: getChangeType(analytics?.summary?.open_growth?.status),
      comparison: "vs last month",
    },
    {
      title: "This Month Total Tickets",
      value: totalThisMonth,
      change: getChange(analytics?.summary?.open_growth),
      changeType: getChangeType(analytics?.summary?.open_growth?.status),
      comparison: "vs last month",
    },
    {
      title: "This Month Pending Tickets",
      value: pendingTickets,
      change: getChange(analytics?.summary?.pending_growth),
      changeType: getChangeType(analytics?.summary?.pending_growth?.status),
      comparison: "vs last month",
    },
    {
      title: "This Month Solved Tickets",
      value: totalSolved,
      change: getChange(analytics?.summary?.solved_growth),
      changeType: getChangeType(analytics?.summary.solved_growth?.status),
      comparison: "vs last month",
    },
  ];

  const planPerformanceData = [
    { name: "This Month Total Tickets", value: analytics?.report_pichart?.total, color: "#4F8EF7" },
    { name: "This Month Solved", value: analytics?.report_pichart?.solved, color: "#027A48" },
    { name: "This Month Pending", value: analytics?.report_pichart?.pending, color: "#FFE066" },
  ];

  const planUsageData = [
    { name: "Last Month Total Tickets", percentage: analytics.report_progress?.total, color: "#4F8EF7" },
    { name: "Last Month Solved", percentage: analytics.report_progress?.solved, color: "#027A48" },
    { name: "Last Month Pending", percentage: analytics.report_progress?.pending, color: "#FFE066" },
  ];

  return (
    <div>
      <SectionTitle
        title={"Analytics"}
        description={"Track, manage, and forecast your customer support issues."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200"
          >
            <h3 className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mt-2">
              {stat.value}
            </p>
            {/* {stat.change && (
              <div className="flex items-center mt-1 text-xs sm:text-sm">
                {stat.changeType === "increase" ? (
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mr-1" />
                )}
                <span
                  className={stat.changeType === "increase" ? "text-green-600" : "text-red-600"}
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">{stat.comparison}</span>
              </div>
            )} */}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Issue Report Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">This Month Issue Report</h3>
            <p className="text-xs sm:text-sm text-gray-500">This month performance</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planPerformanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius="80%"
                    dataKey="value"
                  >
                    {planPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              {planPerformanceData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs sm:text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-2">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Last Month Issue Report</h3>
            <p className="text-xs sm:text-sm text-gray-500">Last month performance</p>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {planUsageData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">{item.name}</span>
                  <span className="text-xs sm:text-sm text-gray-900 font-semibold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                  <div
                    className="h-3 sm:h-4 rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueAnalytics;