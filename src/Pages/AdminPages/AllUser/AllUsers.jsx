import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";
import useStaffUserList from "../../../components/staffHook/useStaffUserList";

export default function AllUser() {
  const { userList, loading } = useStaffUserList();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const avatarColors = [
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-blue-100 text-blue-600",
    "bg-yellow-100 text-yellow-600",
    "bg-pink-100 text-pink-600",
    "bg-indigo-100 text-indigo-600",
    "bg-red-100 text-red-600",
    "bg-orange-100 text-orange-600",
    "bg-teal-100 text-teal-600",
  ];

  const formatDate = (dateStr) => {
    if (!dateStr?.trim()) return "N/A";
    const date = new Date(dateStr);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = (hours % 12 || 12).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${hour12}:${minutes} ${ampm}, ${day} ${month} ${year}`;
  };

  const filteredUsers = useMemo(
    () =>
      userList.filter(
        (user) =>
          user?.full_name
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          user?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      ),
    [userList, searchQuery]
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

 

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) buttons.push(renderButton(i));
    } else {
      buttons.push(renderButton(1));
      if (currentPage > 3)
        buttons.push(
          <span key="ellipsis1" className="text-gray-500 text-xs sm:text-sm">
            ...
          </span>
        );
      for (let i = start; i <= end; i++) buttons.push(renderButton(i));
      if (currentPage < totalPages - 2)
        buttons.push(
          <span key="ellipsis2" className="text-gray-500 text-xs sm:text-sm">
            ...
          </span>
        );
      buttons.push(renderButton(totalPages));
    }
    return buttons;
  };

  const renderButton = (i) => (
    <button
      key={i}
      onClick={() => handlePageChange(i)}
      className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-medium rounded-md transition-colors ${
        currentPage === i
          ? "text-black bg-purple-100"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
    >
      {i}
    </button>
  );

  if (loading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  return (
    <div>
      <SectionTitle
        title="User Management"
        description="Track, manage and forecast your customers and orders."
      />
      <div className="border border-gray-200 p-4 sm:p-5 rounded-2xl bg-white">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
            <h1 className="text-lg sm:text-xl md:text-2xl font-medium">
              All Users
            </h1>
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} results
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <div className="hidden sm:block bg-white rounded-xl">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joining Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/dashboard/userDetail/${user.id}`}
                        className="flex items-center"
                      >
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                            avatarColors[
                              user.id.charCodeAt(0) % avatarColors.length
                            ]
                          }`}
                        >
                          {user?.full_name
                            ? user.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "N/A"}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{user.full_name?.trim() || "N/A"}</p>
                          <p className="text-xs text-gray-400">USER ID: {user.id}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {user.email?.trim() || "N/A"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {user.phone_number?.trim() || "N/A"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {formatDate(user.joined_date)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {user.location?.trim() || "N/A"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap capitalize">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "suspend"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status?.trim() || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
                {!currentUsers.length && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 sm:px-6 py-12 text-center text-gray-500 text-xs sm:text-sm"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden space-y-4">
            {currentUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <Link
                    to={`/dashboard/userDetail/${user.id}`}
                    className="flex items-center"
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        avatarColors[
                          user.id.charCodeAt(0) % avatarColors.length
                        ]
                      }`}
                    >
                      {user?.full_name
                        ? user.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "N/A"}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {user.full_name?.trim() || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.email?.trim() || "N/A"}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="font-medium text-gray-700">
                      Joining Date:
                    </span>{" "}
                    {formatDate(user.joined_date)}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>{" "}
                    {user.location?.trim() || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>{" "}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "suspend"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status?.trim() || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {!currentUsers.length && (
              <div className="text-center text-gray-500 text-sm py-6">
                No users found.
              </div>
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-3">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              } rounded-md`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </button>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {renderPaginationButtons()}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              } rounded-md`}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
