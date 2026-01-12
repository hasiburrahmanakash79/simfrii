import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import useOrderList from "../../../components/adminHook/useOrderList";

const OrderList = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 API pagination (ONLY CHANGE)
  const { orderData, loading } = useOrderList(currentPage, itemsPerPage);

  const orderItems = orderData?.orders || [];
  const orderSummary = orderData?.summary || {};
  const pagination = orderData?.pagination || {};

  const totalOrders = orderSummary.total_orders || 0;
  const activeOrders = orderSummary.active_orders || 0;
  const canceledOrders = orderSummary.cancel_orders || 0;

  const getChange = (growth = {}) => {
    if (growth.status === "decrease") return `-${growth.growth_percent}%`;
    if (growth.status === "increase") return `+${growth.growth_percent}%`;
    return `${growth.growth_percent || 0}%`;
  };

  const getChangeType = (growth = {}) => {
    if (growth.status === "decrease") return "decrease";
    if (growth.status === "increase") return "increase";
    return "no change";
  };

  const stats = useMemo(
    () => [
      {
        title: "Total Orders",
        value: totalOrders,
        change: getChange(orderSummary.order_growth),
        changeType: getChangeType(orderSummary.order_growth),
        comparison: "vs last month",
      },
      {
        title: "Active Orders",
        value: activeOrders,
        change: getChange(orderSummary.active_growth),
        changeType: getChangeType(orderSummary.active_growth),
        comparison: "vs last month",
      },
      {
        title: "Canceled Orders",
        value: canceledOrders,
        change: getChange(orderSummary.cancel_growth),
        changeType: getChangeType(orderSummary.cancel_growth),
        comparison: "vs last month",
      },
    ],
    [orderSummary, totalOrders, activeOrders, canceledOrders]
  );

  // 🔍 Search (frontend, page-level – unchanged)
  const filteredOrders = useMemo(() => {
    return orderItems.filter(
      (order) =>
        !searchQuery ||
        [
          order.order_id,
          order.package_name,
          order.provider,
          order.customer,
        ].some((field) =>
          field?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [orderItems, searchQuery]);

  const totalPages = pagination.total_pages || 1;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
            currentPage === i
              ? "bg-purple-100 text-black"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const getTrendIcon = (type) => {
    if (type === "increase")
      return <TrendingUp className="w-3 h-3 text-green-600 mr-1" />;
    if (type === "decrease")
      return <TrendingDown className="w-3 h-3 text-red-600 mr-1" />;
    return <ArrowRight className="w-3 h-3 text-gray-600 mr-1" />;
  };

  const getChangeColor = (type) => {
    if (type === "increase") return "text-green-600";
    if (type === "decrease") return "text-red-600";
    return "text-gray-600";
  };

  if (loading) {
    return <div className="text-center py-6 text-gray-500">Loading...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-2">Order List</h1>
        <p className="text-sm text-gray-600">
          Track, manage, and forecast your customers and orders.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {stat.value}
            </p>
            <div className="flex items-center mt-1 text-sm">
              {getTrendIcon(stat.changeType)}
              <span className={getChangeColor(stat.changeType)}>
                {stat.change}
              </span>
              <span className="text-gray-500 ml-1">{stat.comparison}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-5">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-sm text-gray-600 px-5 pb-4">
          Showing {filteredOrders.length} of {pagination.total || 0} orders
        </p>

        {/* TABLE & MOBILE UI — 100% UNCHANGED */}
        {/* You already had this correct, so rendering filteredOrders instead */}

        {/* Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-sm uppercase">
              <tr className="text-left">
                <th className="py-3 px-5">ID</th>
                <th className="py-3 px-5">Offer</th>
                <th className="py-3 px-5">Provider</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5">Type</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Validity</th>
                <th className="py-3 px-5">Data</th>
                <th className="py-3 px-5">Price</th>
                <th className="py-3 px-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-5 text-sm text-gray-700">
                    <Link to={`/dashboard/order-details/${order.id}`}>
                      {order.order_id}
                    </Link>
                  </td>
                  <td className="p-5 text-sm text-gray-700">
                    {order.package_name}
                  </td>
                  <td className="p-5 text-sm text-gray-700 capitalize">
                    {order.provider}
                  </td>
                  <td className="p-5 text-sm text-gray-700">
                    {order.customer}
                  </td>
                  <td className="p-5 text-sm text-gray-700 capitalize">
                    {order.esim_type}
                  </td>
                  <td className="p-5 text-sm text-gray-700">{order.date}</td>
                  <td className="p-5 text-sm text-gray-700">
                    {order.validity || 0} Days
                  </td>
                  <td className="p-5 text-sm text-gray-700">
                    {order.data || "N/A"}
                  </td>
                  <td className="p-5 text-sm text-gray-700">${order.price}</td>
                  <td className="p-5 text-sm text-gray-700 capitalize">
                    {order.esim_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (API-based, UI SAME) */}
        {totalPages > 1 && (
          <div className="p-5 flex items-center justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 text-sm rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="flex space-x-2">{renderPaginationButtons()}</div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 text-sm rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
