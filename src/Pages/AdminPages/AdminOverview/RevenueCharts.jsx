import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { useState, useEffect } from "react";

const RevenueCharts = ({ loading, barChartData, pieChartData }) => {
  console.log(barChartData);
  console.log(pieChartData);
  console.log(loading);

  const monthlyData = barChartData
    ? barChartData.labels.map((month, index) => ({
        month,
        primary: barChartData.last_year[index],
        secondary: barChartData.current_year[index],
      }))
    : [];

  const pieData = pieChartData
    ? [
        { name: "Local", value: pieChartData.local, color: "#FF7782" },
        { name: "Regional", value: pieChartData.regional, color: "#FDE047" },
        { name: "Global", value: pieChartData.global, color: "#799EFF" },
      ]
    : [];

  const maxRevenue =
    monthlyData.length > 0
      ? Math.max(...monthlyData.flatMap((d) => [d.primary, d.secondary]))
      : 0;

  const isLarge = maxRevenue > 1000;

  const formatYAxis = (value) => {
    return isLarge ? `${(value / 1000).toFixed(0)}K` : value.toFixed(2);
  };

  const formatValue = (value) => {
    return isLarge ? value.toLocaleString() : value.toFixed(2);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const barHeight = isMobile ? 300 : 320;
  const pieSize = isMobile ? 200 : 240;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-md font-medium mb-2 text-gray-900">{`Month: ${label}`}</p>
          <p className="text-sm text-gray-600">{`Last year: $${formatValue(
            payload[0].value
          )}`}</p>
          <p className="text-sm text-gray-600">{`Current year: $${formatValue(
            payload[1].value
          )}`}</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
          <p className="text-sm text-gray-900">{`Category: ${payload[0].name}`}</p>
          <p className="text-sm text-gray-600">{`Value: ${payload[0].value.toFixed(
            2
          )}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen mt-7">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Monthly Revenue
              </h2>
              <p className="text-sm text-gray-500">Earning over last year</p>
            </div>
            <div className="flex flex-wrap gap-5 items-center justify-center sm:justify-end">
              <div className="flex items-center gap-3">
                <div className="bg-blue-200 h-4 w-4 rounded-full"></div>
                <p className="text-sm">Last year</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-700 h-4 w-4 rounded-full"></div>
                <p className="text-sm">Current year</p>
              </div>
            </div>
          </div>
          <div className="h-[280px]" style={{ minHeight: `${barHeight}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickFormatter={formatYAxis}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="primary"
                  fill="#bedbff"
                  radius={isMobile ? [10, 10, 10, 10] : [20, 20, 20, 20]}
                />
                <Bar
                  dataKey="secondary"
                  fill="#1447e6"
                  radius={isMobile ? [10, 10, 10, 10] : [20, 20, 20, 20]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Earning Activity
            </h2>
            <p className="text-sm text-gray-500">last month earning activity</p>
          </div>
          <div className="flex justify-center mb-8">
            <div
              className="relative"
              style={{ width: pieSize, height: pieSize }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<PieTooltip />} />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 30 : 50}
                    outerRadius={isMobile ? 60 : 80}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around sm:justify-between space-y-2 sm:space-y-0 gap-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600">
                  {entry.name} : {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCharts;
