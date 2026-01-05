import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useOrderList from "../../../components/adminHook/useOrderList";

const OrderList = () => {
  const { orderList, loading } = useOrderList();

  const orderItems = orderList.orders || [];
  const orderSummary = orderList.summary || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 7;

  const totalOrders = orderSummary.total_orders || 0;
  const activeOrders = orderSummary.active_orders || 0;
  const canceledOrders = orderSummary.cancel_orders || 0;

  const getChange = (growth) => {
    if (growth.status === "decrease") {
      return `-${growth.growth_percent}%`;
    } else if (growth.status === "increase") {
      return `+${growth.growth_percent}%`;
    } else {
      return `${growth.growth_percent}%`;
    }
  };

  const getChangeType = (growth) => {
    if (growth.status === "decrease") return "decrease";
    if (growth.status === "increase") return "increase";
    return "no change";
  };

  const stats = useMemo(() => [
    {
      title: "Total Orders",
      value: totalOrders,
      change: getChange(orderSummary.order_growth || { growth_percent: 0, status: "no change" }),
      changeType: getChangeType(orderSummary.order_growth || { status: "no change" }),
      comparison: "vs last month",
    },
    {
      title: "Active Orders",
      value: activeOrders,
      change: getChange(orderSummary.active_growth || { growth_percent: 0, status: "no change" }),
      changeType: getChangeType(orderSummary.active_growth || { status: "no change" }),
      comparison: "vs last month",
    },
    {
      title: "Canceled Orders",
      value: canceledOrders,
      change: getChange(orderSummary.cancel_growth || { growth_percent: 0, status: "no change" }),
      changeType: getChangeType(orderSummary.cancel_growth || { status: "no change" }),
      comparison: "vs last month",
    },
  ], [orderSummary, totalOrders, activeOrders, canceledOrders]);

  const filteredOrders = useMemo(() => {
    return orderItems.filter((order) =>
      !searchQuery ||
      [order.order_id, order.package_name, order.provider, order.customer].some((field) =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [orderItems, searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
            currentPage === 1 ? "bg-purple-100 text-black" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          1
        </button>
      );
      if (start > 2) buttons.push(<span key="ellipsis1" className="text-gray-500 text-xs mx-1">...</span>);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
            currentPage === i ? "bg-purple-100 text-black" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) buttons.push(<span key="ellipsis2" className="text-gray-500 text-xs mx-1">...</span>);
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
            currentPage === totalPages ? "bg-purple-100 text-black" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  const getTrendIcon = (changeType) => {
    if (changeType === "increase") {
      return <TrendingUp className="w-3 h-3 text-green-600 mr-1" />;
    } else if (changeType === "decrease") {
      return <TrendingDown className="w-3 h-3 text-red-600 mr-1" />;
    } else {
      return <ArrowRight className="w-3 h-3 text-gray-600 mr-1" />;
    }
  };

  const getChangeColor = (changeType) => {
    if (changeType === "increase") return "text-green-600";
    if (changeType === "decrease") return "text-red-600";
    return "text-gray-600";
  };

  if (loading) {
    return <div className="text-center py-6 text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-2">Order List</h1>
        <p className="text-sm text-gray-600">Track, manage, and forecast your customers and orders.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
            {stat.change && (
              <div className="flex items-center mt-1 text-sm">
                {getTrendIcon(stat.changeType)}
                <span className={getChangeColor(stat.changeType)}>{stat.change}</span>
                <span className="text-gray-500 ml-1">{stat.comparison}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-5">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <p className="text-sm text-gray-600 px-5 pb-4">
          Showing {currentOrders.length} of {filteredOrders.length} orders
        </p>

        {/* Desktop: Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600 uppercase text-sm font-bold">
                <th className="py-3 px-5">ID</th>
                <th className="py-3 px-5">Offer Name</th>
                <th className="py-3 px-5">Provider Name</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5">Plan Type</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Validity</th>
                <th className="py-3 px-5">Data</th>
                <th className="py-3 px-5">Price</th>
                <th className="py-3 px-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-5 text-sm text-gray-700">
                      <Link to={`/dashboard/order-details/${order.id}`}>{order.order_id}</Link>
                    </td>
                    <td className="p-5 text-sm text-gray-700">{order.package_name}</td>
                    <td className="p-5 text-sm text-gray-700 capitalize">{order.provider}</td>
                    <td className="p-5 text-sm text-gray-700">{order.customer}</td>
                    <td className="p-5 text-sm text-gray-700 capitalize">{order.esim_type}</td>
                    <td className="p-5 text-sm text-gray-700">{order.date}</td>
                    <td className="p-5 text-sm text-gray-700">{order.validity || 0} Days</td>
                    <td className="p-5 text-sm text-gray-700">{order.data || "N/A"}</td>
                    <td className="p-5 text-sm text-gray-700">${order.price}</td>
                    <td className="p-5">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          order.esim_status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.esim_status === "expired"
                            ? "bg-red-100 text-red-800"
                            : order.esim_status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.esim_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.esim_status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500 text-sm font-medium">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card Layout */}
        <div className="sm:hidden space-y-4 p-4">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <Link to={`/dashboard/order-details/${order.id}`} className="text-sm font-medium text-gray-900">
                    {order.order_id}
                  </Link>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      order.esim_status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.esim_status === "expired"
                        ? "bg-red-100 text-red-800"
                        : order.esim_status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.esim_status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.esim_status}
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="font-medium text-gray-700">Offer Name:</span> {order.package_name}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Provider:</span> {order.provider}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Customer:</span> {order.customer}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Plan Type:</span> {order.esim_type}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Date:</span> {order.date}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Validity:</span> {order.validity} Days
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Data:</span> {order.data || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Price:</span> ${order.price}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No orders found matching your criteria.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            <div className="flex space-x-2">{renderPaginationButtons()}</div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
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